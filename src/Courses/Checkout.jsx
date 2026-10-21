import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCheckout } from '../api/checkout';
import { useToast } from '../components/Toast/ToastProvider';

function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation('checkout');
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  // Check if this is a payment result redirect
  // Fix malformed URLs with multiple '?' by parsing manually
  const urlParams = new URLSearchParams(window.location.search);
  let status = urlParams.get('status');
  
  // Handle malformed URL with double '?' (e.g., ?status=success?payment_id=...)
  if (!status && window.location.search.includes('?status=')) {
    const match = window.location.search.match(/[?&]status=(success|failed)/);
    if (match) status = match[1];
  }
  
  const isPaymentResult = status === 'success' || status === 'failed';

  useEffect(() => {
    // Skip API call if this is a payment result page
    if (isPaymentResult) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    getCheckout(courseId)
      .then((d) => {
        setData(d);
        setSelectedCountry(d.pricing?.country_id || '');
        setSelectedMethod(d.payment_methods?.[0] || '');
      })
      .catch(() => {
        const msg = t('failedLoad');
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  }, [courseId, navigate, isPaymentResult]);

  const handleCountryChange = async (countryId) => {
    setSelectedCountry(countryId);
    try {
      const updated = await getCheckout(courseId, countryId);
      setData(updated);
      setSelectedMethod(updated.payment_methods?.[0] || '');
    } catch {}
  };

  const handlePay = async () => {
    if (!selectedMethod) return;
    const token = localStorage.getItem('token');
    setPaying(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://elnasrcourses.com/api/v1'}/courses/${courseId}/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            payment_method: selectedMethod,
            country_id: selectedCountry,
          }),
        }
      );
      const json = await res.json();
      if (json?.data?.redirect_url) {
        toast.success(t('redirecting'));
        setTimeout(() => { window.location.href = json.data.redirect_url; }, 800);
      } else {
        const msg = json.message || t('paymentFailed');
        toast.error(msg);
      }
    } catch {
      toast.error(t('networkError'));
    } finally {
      setPaying(false);
    }
  };

  // ── Payment Result View (check BEFORE loading) ──
  if (isPaymentResult) {
    const isSuccess = status === 'success';
    
    // Parse parameters manually to handle malformed URLs
    const parseParam = (name) => {
      const match = window.location.search.match(new RegExp(`[?&]${name}=([^&]*)`));
      return match ? decodeURIComponent(match[1]) : '';
    };
    
    const invoiceId = parseParam('invoice_id') || '';
    const orderId = parseParam('order_id') || parseParam('requested_order_id') || '';
    const tranDate = parseParam('transaction_date') || '';
    const receiptId = parseParam('receipt_id') || '';
    const paymentType = parseParam('payment_type') || '';
    const result = parseParam('result') || '';

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-16">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <div className="relative z-50 bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
            {isSuccess ? (
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <h1 className={`text-2xl font-black mb-2 ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
            {isSuccess ? t('paymentSuccess') : t('paymentFailedTitle')}
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            {isSuccess ? t('successMessage') : t('failedMessage')}
          </p>

          {isSuccess && (
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-right space-y-2">
              {orderId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('orderNumber')}</span>
                  <span className="font-semibold text-black truncate max-w-[180px]">{orderId}</span>
                </div>
              )}
              {invoiceId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('invoiceNumber')}</span>
                  <span className="font-semibold text-black">{invoiceId}</span>
                </div>
              )}
              {paymentType && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('paymentMethodLabel')}</span>
                  <span className="font-semibold text-black capitalize">{paymentType}</span>
                </div>
              )}
              {tranDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('date')}</span>
                  <span className="font-semibold text-black">{tranDate}</span>
                </div>
              )}
              {result && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('status')}</span>
                  <span className="font-semibold text-green-600">{result}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {isSuccess ? (
              <button
                onClick={() => navigate('/course-videos')}
                className="w-full py-3 rounded-full font-bold text-black text-base"
                style={{ background: 'linear-gradient(to right, #4ade80, #facc15)' }}
              >
                {t('startLearning')}
              </button>
            ) : (
              <button
                onClick={() => navigate(`/checkout/${courseId}`)}
                className="w-full py-3 rounded-full font-bold text-white text-base bg-black"
              >
                {t('tryAgain')}
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-full font-semibold text-gray-500 text-sm border border-gray-200 hover:border-gray-400 transition-colors"
            >
              {t('home')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading skeleton ──
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="space-y-4 w-full max-w-md px-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  );

  if (error && !data) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  );

  const { course, pricing, payment_methods, countries, already_enrolled } = data;

  // ── Already enrolled ──
  if (already_enrolled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-2xl font-bold">{t('alreadyEnrolled')}</p>
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="px-6 py-3 bg-black text-white rounded-full"
        >
          {t('goToCourse')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

          {/* Course info */}
          {course?.thumbnail_url && (
            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-2xl">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
              />
              <div>
                <p className="text-sm font-bold text-black leading-tight">{course.title}</p>
                {course.short_description && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{course.short_description}</p>
                )}
              </div>
            </div>
          )}

          {/* Header */}
          <h1 className="text-2xl font-black text-black mb-1">{t('title')}</h1>
          <p className="text-sm font-semibold text-black mb-5">{t('billing')}</p>

          {/* Country */}
          <div className="mb-5">
            <label className="block text-xs text-gray-500 mb-1">{t('country')}</label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 appearance-none bg-white pr-10"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name_en} ({c.currency_code})
                  </option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Price */}
          <div className="bg-black text-white rounded-2xl px-5 py-4 mb-5 flex items-center justify-between">
            <span className="text-sm text-gray-400">{t('total') || 'Total'}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">{pricing?.amount}</span>
              <span className="text-sm font-semibold text-gray-300">{pricing?.currency}</span>
            </div>
          </div>

          <hr className="border-gray-100 mb-5" />

          {/* Payment method */}
          <p className="text-sm font-bold text-black mb-3">{t('paymentMethod')}</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {payment_methods.map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                  selectedMethod === method
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <span className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                  selectedMethod === method ? 'border-white bg-white' : 'border-gray-400'
                }`} />
                {method}
              </button>
            ))}
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={paying || !selectedMethod}
            className="w-full py-4 rounded-full font-bold text-base text-black disabled:opacity-50 transition-all"
            style={{ background: 'linear-gradient(to right, #4ade80, #facc15)' }}
          >
            {paying ? t('processing') : t('subscribeBtn')}
          </button>

          <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
            {t('finePrint')}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-4 py-2 text-gray-400 text-xs hover:text-black transition-colors"
          >
            {t('back')}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;
