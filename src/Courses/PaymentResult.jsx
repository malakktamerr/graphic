import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

function PaymentResult({ type }) {
  const { paymentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Extract useful params from URL
  const result      = searchParams.get('result') || '';
  const invoiceId   = searchParams.get('invoice_id') || '';
  const orderId     = searchParams.get('order_id') || paymentId || '';
  const tranDate    = searchParams.get('transaction_date') || '';
  const receiptId   = searchParams.get('receipt_id') || '';
  const paymentType = searchParams.get('payment_type') || '';

  const isSuccess = type === 'success';

  useEffect(() => {
    // small delay so the animation feels smooth
    const t = setTimeout(() => setVisible(true), 100);

    // refresh user data after successful payment
    if (isSuccess) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`https://elnasrcourses.com/api/v1/auth/user`, {
          headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        })
          .then(r => r.json())
          .then(json => {
            // try different response shapes
            const freshUser = json?.data || json?.user || json;
            if (freshUser?.id || freshUser?.email) {
              freshUser.is_enrolled = true;
              localStorage.setItem('user', JSON.stringify(freshUser));
            } else {
              // fallback: just set is_enrolled on existing user
              const stored = JSON.parse(localStorage.getItem('user') || 'null');
              if (stored) {
                stored.is_enrolled = true;
                localStorage.setItem('user', JSON.stringify(stored));
              }
            }
          })
          .catch(() => {
            // fallback: just set is_enrolled on existing user
            const stored = JSON.parse(localStorage.getItem('user') || 'null');
            if (stored) {
              stored.is_enrolled = true;
              localStorage.setItem('user', JSON.stringify(stored));
            }
          });
      }
    }

    return () => clearTimeout(t);
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-16">

      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />

      {/* Modal */}
      <div
        className="relative z-50 bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Icon */}
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

        {/* Title */}
        <h1 className={`text-2xl font-black mb-2 ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
          {isSuccess ? 'تم الدفع بنجاح! 🎉' : 'فشلت عملية الدفع'}
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          {isSuccess
            ? 'تم تأكيد اشتراكك. يمكنك الآن الوصول إلى الكورس.'
            : 'لم تكتمل عملية الدفع. يمكنك المحاولة مرة أخرى.'}
        </p>

        {/* Receipt details — success only */}
        {isSuccess && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-right space-y-2">
            {orderId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">رقم الطلب</span>
                <span className="font-semibold text-black truncate max-w-[180px]">{orderId}</span>
              </div>
            )}
            {invoiceId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">رقم الفاتورة</span>
                <span className="font-semibold text-black">{invoiceId}</span>
              </div>
            )}
            {paymentType && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">طريقة الدفع</span>
                <span className="font-semibold text-black capitalize">{paymentType}</span>
              </div>
            )}
            {tranDate && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">التاريخ</span>
                <span className="font-semibold text-black">{tranDate}</span>
              </div>
            )}
            {result && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">الحالة</span>
                <span className="font-semibold text-green-600">{result}</span>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {isSuccess ? (
            <button
              onClick={() => navigate('/course-videos')}
              className="w-full py-3 rounded-full font-bold text-black text-base"
              style={{ background: 'linear-gradient(to right, #4ade80, #facc15)' }}
            >
              ابدأ التعلم الآن →
            </button>
          ) : (
            <button
              onClick={() => navigate(-2)}
              className="w-full py-3 rounded-full font-bold text-white text-base bg-black"
            >
              حاول مرة أخرى
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-full font-semibold text-gray-500 text-sm border border-gray-200 hover:border-gray-400 transition-colors"
          >
            الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentResult;
