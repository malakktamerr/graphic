import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import BASE_URL from '../../api/config';

// Typewriter hook
function useTypewriter(text, speed = 40, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const EarlyAccessSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  const { isAr } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [email, setEmail] = useState(user?.email || '');

  const lines = [
    t('earlyAccess.line1'),
    t('earlyAccess.line2'),
    t('earlyAccess.line3'),
    t('earlyAccess.line4'),
    t('earlyAccess.line5'),
  ].filter(Boolean);

  // Build cumulative delays per line
  const speed = 35;
  const lineDelays = lines.reduce((acc, line, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + lines[i - 1].length * speed + 200;
    acc.push(prev);
    return acc;
  }, []);

  // Typewriter state for all lines
  const [lineTexts, setLineTexts] = useState(lines.map(() => ''));
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setLineTexts(lines.map(() => ''));
    const timers = [];
    lines.forEach((line, li) => {
      let i = 0;
      const start = setTimeout(() => {
        const interval = setInterval(() => {
          i++;
          setLineTexts(prev => {
            const next = [...prev];
            next[li] = line.slice(0, i);
            return next;
          });
          if (i >= line.length) clearInterval(interval);
        }, speed);
        timers.push(interval);
      }, lineDelays[li]);
      timers.push(start);
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, t('earlyAccess.line1'), t('earlyAccess.line2')]);

  useEffect(() => {
    fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
      headers: { 'Accept': 'application/json' },
    })
      .then(r => r.json())
      .then(d => setSubscribers(d?.data || []))
      .catch(() => {});
  }, []);

  const handleGetAccess = async () => {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!token || !currentUser) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email || currentUser.email }),
      });

      const data = await res.json();

      if (data?.data?.is_subscribed) {
        navigate('/course-videos');
      } else {
        navigate('/subscribe');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-white pt-10 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-12 lg:py-24 px-6 sm:px-10 lg:px-16 mt-4 sm:mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div style={{ lineHeight: '1.4' }}>
          <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-black mb-3 sm:mb-6">
            {lineTexts.map((text, i) => (
              <span key={i} className={`block whitespace-nowrap ${isAr ? 'mb-5' : 'mb-1 sm:mb-4'}`}>
                {text}
                {text.length < lines[i]?.length && (
                  <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
                )}
              </span>
            ))}
          </h2>
        </div>

        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
          <span className="bg-gradient-to-r from-[#FF0000] via-[#00FFFF] via-[#F600FF] to-[#00FF11] bg-clip-text text-transparent font-semibold">
            {t('earlyAccess.tagline')}
            {t('earlyAccess.tagline2') && (
              <>
                <br />
                {t('earlyAccess.tagline2')}
              </>
            )}
          </span>
        </p>

        <div className="mb-8 sm:mb-12">
          <div className={`${isAr ? 'flex flex-col items-center gap-4' : ''}`}>
            <div className="inline-block px-8 sm:px-10 md:px-12 py-2 sm:py-4 md:py-5 rounded-full font-bold"
              style={{ background: 'linear-gradient(to right, #666666, #969696, #CECECE, #575757)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', fontFamily: 'Climate Crisis, sans-serif', fontSize: 'clamp(24px, 5vw, 48px)' }}>
              {t('earlyAccess.designYourIncome')}
            </div>
            <div className={`${isAr ? 'mt-4' : 'mt-6 sm:mt-20'} relative inline-block rounded-full px-8 sm:px-16`} style={{ minHeight: '50px', minWidth: '200px' }}>
              <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
                style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className="relative py-2 font-semibold inline-block" style={{ zIndex: 10, fontSize: 'clamp(20px, 5vw, 48px)', color: 'white' }}>
                {t('earlyAccess.lifetimeSubscription')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-0 justify-center items-center mb-2 sm:mb-4 mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg shadow-gray-300/60 mt-8 sm:mt-40"
          style={{ maxWidth: '1300px' }}>
          <input
            type="email"
            placeholder={t('earlyAccess.emailPlaceholder')}
            className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-transparent border-none rounded-full text-black focus:outline-none text-sm sm:text-base min-w-0"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleGetAccess} disabled={loading}
            className="btn-wave px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full font-semibold text-sm sm:text-base transition-colors disabled:opacity-60">
            {loading ? 'Loading...' : (
              <>
                {t('earlyAccess.getEarlyAccess')}
              </>
            )}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
          <div className="flex -space-x-2">
            {subscribers.length > 0 ? (
              subscribers.slice(0, 5).map((sub, i) => (
                sub.avatar_url ? (
                  <img key={i} src={sub.avatar_url} alt={sub.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover" />
                ) : (
                  <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: `hsl(${i * 60}, 60%, 50%)` }}>
                    {sub.name?.charAt(0)?.toUpperCase()}
                  </div>
                )
              ))
            ) : (
              <>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-500 border-2 border-white"></div>
              </>
            )}
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            {subscribers.length > 0 ? `${subscribers.length}+ ${t('studentsAccess', { ns: 'common' })}` : `3 ${t('studentsAccess', { ns: 'common' })}`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
