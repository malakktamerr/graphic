import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import PortfolioSection from '../../Home/Sections/PortfolioSection';
import { getVideoGallery } from '../../api/videos';

function MobileCarousel({ cards, isAr }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const stopAuto = () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => setCurrent(prev => (prev + 1) % cards.length), 3000);
  };

  useEffect(() => { startAuto(); return () => stopAuto(); /* eslint-disable-next-line */ }, [cards.length]);

  if (cards.length === 0) return null;

  const card = cards[current];
  const title = card.title_ar ? (isAr ? card.title_ar : card.title_en) : card.title;
  const description = card.description_ar ? (isAr ? card.description_ar : card.description_en) : card.description;
  const image = card.image_url || card.image;

  return (
    <div className="w-full" onTouchStart={stopAuto} onTouchEnd={startAuto}>
      <div className="relative rounded-3xl overflow-hidden flex flex-col mx-2 transition-all duration-500">
        <div className="relative p-[2px] rounded-t-3xl" style={{ background: 'linear-gradient(135deg, #FF0000, #00BBFF, #00FF51, #EA00FF)' }}>
          <div className="relative h-56 overflow-hidden rounded-t-3xl">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="bg-black p-6 rounded-b-3xl flex flex-col gap-4" style={{ minHeight: '180px' }}>
          <h3 className="text-lg font-bold text-white text-center">{title}</h3>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9FE422' }}>
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p className="text-gray-300 leading-relaxed text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        {cards.map((_, i) => (
          <button key={i} onClick={() => { stopAuto(); setCurrent(i); }} className="transition-all duration-300 rounded-full"
            style={{ width: i === current ? '28px' : '10px', height: '10px', background: i === current ? 'linear-gradient(to right, #F9BA01, #663010)' : '#D1D5DB' }} />
        ))}
      </div>
    </div>
  );
}

const CountUp = ({ value, className }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const clean = String(value).replace(/,/g, '');
  const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
  const suffix = value.includes('+') ? '+' : '';
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setCount(0);
    animated.current = false;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 10000;
        const startTime = performance.now();
        const frame = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * num));
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      } else if (!entry.isIntersecting) {
        setCount(0);
        animated.current = false;
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  const display = num >= 1000 ? count.toLocaleString() : count;

  return <span ref={ref} className={className}>{display}{suffix}</span>;
};

function Instructor() {
  const { t } = useTranslation('instructor');
  const { isAr } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [cards, setCards] = useState([
    { image: '/Mask groupo.png', title: t('cards.c1Title'), description: t('cards.c1Desc') },
    { image: '/Mask group (1).png', title: t('cards.c2Title'), description: t('cards.c2Desc') },
    { image: '/Mask group (2).png', title: t('cards.c3Title'), description: t('cards.c3Desc') },
  ]);
  const [apiStats, setApiStats] = useState({
    total_students: 0,
    total_certificates: 0,
  });

  useEffect(() => {
    fetch('https://elnasrcourses.com/api/v1/stats')
      .then(r => r.json())
      .then(json => {
        if (json?.data) {
          setApiStats({
            total_students: json.data.total_students || 0,
            total_certificates: json.data.total_certificates || 0,
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('https://elnasrcourses.com/api/v1/platform-cards')
      .then(r => r.json())
      .then(json => {
        if (json?.success && json?.data) {
          // Filter cards with display_location = "instructor", or show all if no location
          const instructorCards = json.data.filter(card => !card.display_location || card.display_location === 'instructor');
          
          // Only update if we found cards
          if (instructorCards.length > 0) {
            setCards(instructorCards);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getVideoGallery({ placement: 'instructors' })
      .then((data) => {
        const sorted = (data?.data || []).sort((a, b) => a.sort_order - b.sort_order);
        if (sorted.length > 0) {
          setVideos(sorted);
        } else {
          return getVideoGallery({ placement: 'contact' })
            .then(d => setVideos((d?.data || []).sort((a, b) => a.sort_order - b.sort_order)));
        }
      })
      .catch(() => {});
  }, []);

  const VideoBlock = ({ video }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!video) return null;
    return (
      <>
       <section className="relative w-full bg-white py-6 md:py-16 px-6 sm:px-8 lg:px-12">
  <div className="w-full max-w-5xl mx-auto">
    <style>{`@keyframes ping-out{0%,100%{transform:scale(1.25);opacity:0.5}50%{transform:scale(1.5);opacity:0}}.animate-ping-out{animation:ping-out 1.5s ease-in-out infinite}`}</style>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-gray-800">
        
        {/* الفيديو */}
        <video className="absolute inset-0 w-full h-full object-cover" src={`${video.video_url}#t=0.1`} preload="metadata" muted playsInline />

        {/* الطبقة الغامقة الشفافة */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

        {/* زر التشغيل الدائري الشفاف */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div 
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 border border-white/40 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-200 cursor-pointer"
          >
            <svg 
              className="w-6 h-6 sm:w-8 sm:h-8 text-white translate-x-0.5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* شريط معلومات الفيديو السفلي */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-1 z-30">
          <div className="w-full h-0.5 bg-gray-600 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
          </div>
          <div className="flex justify-between items-center text-white text-[10px] sm:text-xs opacity-80 mt-1">
            <div className="flex gap-4">
              <span>00:00 / 02:30</span>
            </div>
            <div className="font-mono truncate max-w-[200px]">Video</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>







        {isOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <video className="w-full h-full" controls autoPlay><source src={video.video_url} type="video/mp4"/></video>
            </div>
          </div>
        )}
      </>
    );
  };

  const stats = [
    { number: `${apiStats.total_students}+`, desc: t('stats.s1Desc') },
    { number: `${apiStats.total_certificates}+`, desc: t('stats.s2Desc') },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
     <section className="w-full flex items-start justify-center pt-16 md:pt-20 relative" style={{ minHeight: 'auto' }}>
        <div className="relative w-full max-w-full">
          <style>{`
            @keyframes borderRotate {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animated-border-wrap {
              background: linear-gradient(90deg, #ff0080, #ff8c00, #ffed00, #40e0d0, #0080ff, #8000ff, #00ff80);
              background-size: 300% 300%;
              animation: borderRotate 4s linear infinite;
              padding: 1px;
              border-radius: 0 0 130px 130px;
            }
          `}</style>
          <div className="animated-border-wrap">
            <img className="w-full h-auto object-cover" src="/cover-websitebar2 2 (1).png" alt="Instructor Cover" style={{ borderRadius: '0 0 60px 60px', display: 'block', transform: isAr ? 'scaleX(-1)' : 'none' }} />
          </div>
          <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:px-20">
            <div className="flex flex-col gap-1 sm:gap-2.5 md:gap-4 w-[75%]: sm:w-[65%] md:w-[60%]" style={{ maxWidth: '100%' }}>
              {isAr ? (
                <>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {t('hero.line1')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                    {t('hero.line1')}
                  </p>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {t('hero.line1b')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                    {t('hero.line1b')}
                  </p>
                  <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(16px, 3.8vw, 64px)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', lineHeight: 1.2, letterSpacing: '0.05em' }}>
                    {t('hero.name')}
                  </p>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line', paddingLeft: '40px' }}>
                    {t('hero.line2')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line', paddingLeft: '10px' }}>
                    {t('hero.line2')}
                  </p>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line', paddingLeft: '40px' }}>
                    {t('hero.line2b')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line', paddingLeft: '10px' }}>
                    {t('hero.line2b')}
                  </p>
                </>
              ) : (
                <>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {t('hero.line1')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                    {t('hero.line1')}
                  </p>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {t('hero.line2')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                    {t('hero.line2')}
                  </p>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {t('hero.line3')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                    {t('hero.line3')}
                  </p>
                  <p className="hidden md:block" style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '40px', color: '#fff', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {t('hero.line4')}
                  </p>
                  <p className="md:hidden" style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(9px, 2.6vw, 15px)', color: '#fff', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                    {t('hero.line4')}
                  </p>
                  <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: 'clamp(16px, 3.8vw, 64px)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', lineHeight: 1.2, letterSpacing: '0.05em' }}>
                    {t('hero.name')}
                  </p>
                </>
              )}
              <img src="/background_removed_image_cOJ5pLLfT5SGchOf9rJdfw 2.png" alt="Adobe Tools" style={{ width: 'clamp(90px, 25vw, 350px)', height: 'auto', objectFit: 'contain', marginTop: '4px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="w-full bg-white py-8 md:py-16 px-6 md:px-12 lg:px-20 mt-4 md:mt-12 journey-section-pb" dir="ltr" style={{ overflow: 'visible', paddingBottom: 'clamp(40px, 15vw, 220px)', position: 'relative' }}>
        <style>{`@media (max-width: 767px) { .journey-section-pb { padding-bottom: 40px !important; } }`}</style>
        <h2 className="text-center font-bold mb-12" style={{ fontFamily: 'Lexend', fontSize: 'clamp(16px, 3vw, 48px)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
          {t('journey.title')}
        </h2>
        <div className="relative max-w-7xl mx-auto">
          <div className="black-journey-box" style={{ background: '#000', borderRadius: '24px', maxWidth: '1175px', marginLeft: '0', marginRight: '-150px', position: 'relative', overflow: 'visible' }}>
            <style>{`
              .black-journey-box { padding: 48px 400px 48px 48px; }
              @media (max-width: 767px) { .black-journey-box { padding: 32px 24px 48px 24px; margin-right: 0 !important; } .black-journey-box .yellow-frame { display: none; } }
            `}</style>
            <div className="yellow-frame" style={{ position: 'absolute', top: '-2px', left: '40px', right: '-130px', bottom: '-2px', border: '4px solid #D8A10F', borderRadius: '24px', pointerEvents: 'none', zIndex: 5 }} />
            <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '16px', color: '#fff', textAlign: 'justify', textAlignLast: 'center', lineHeight: 1.8, marginBottom: '24px', whiteSpace: 'pre-line' }}>{t('journey.p1')}</p>
            <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '16px', color: '#fff', textAlign: 'justify', textAlignLast: 'center', lineHeight: 1.8, marginBottom: '24px', whiteSpace: 'pre-line' }}>{t('journey.p2')}</p>
            <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: '16px', color: '#fff', textAlign: 'justify', textAlignLast: 'center', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{t('journey.p3')}</p>
            {/* Person image positioned relative to the box */}
            <img src="/12121 3.png" alt="Abdullah Al-Nasr" className="hidden md:block" style={{ position: 'absolute', bottom: '40px', right: '20px', maxWidth: '320px', width: '28%', objectFit: 'contain', zIndex: 10, pointerEvents: 'none' }} />
          </div>
          <img src="/Capture 1.png" alt="Mouse" className="hidden md:block" style={{ position: 'absolute', bottom: '-60%', right: '10%', width: '45%', minWidth: '250px', maxWidth: '550px', objectFit: 'contain', zIndex: 10, pointerEvents: 'none' }} />
          <img src="/Vector 5.png" alt="Mouse Cable" className="hidden md:block" style={{ position: 'absolute', bottom: '-85%', right: '32%', width: '16%', minWidth: '80px', maxWidth: '200px', objectFit: 'contain', zIndex: 9, pointerEvents: 'none' }} />
        </div>
      </section>

      {/* MY GOAL Section */}
      <section className="w-full bg-white px-6 md:px-12 lg:px-20 mt-2 md:mt-16" style={{ overflow: 'visible', paddingTop: 'clamp(16px, 3vw, 80px)', paddingBottom: 'clamp(32px, 5vw, 80px)' }}>
        <div className="relative max-w-3xl mx-auto">
          <img src="/38338220784 1.png" alt="Target" className="hidden md:block" style={{ position: 'absolute', left: '-260px', top: '-40px', width: '450px', objectFit: 'contain', zIndex: 10 }} />
          <div style={{ position: 'relative', zIndex: 11, marginBottom: 'clamp(40px, 8vw, 80px)', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(48px, 10vw, 96px)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', letterSpacing: '2px', display: 'inline-block' }}>
              {t('goal.title')}
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 'clamp(-32px, -4vw, -60px)', left: 0, right: 0, bottom: '60px', border: '4px solid #D8A10F', borderRadius: '20px', pointerEvents: 'none', zIndex: 5 }} />
            <div style={{ background: '#000', borderRadius: '20px', padding: '30px 30px 100px 30px', position: 'relative', zIndex: 4 }}>
              <p style={{ fontFamily: 'Lexend', fontWeight: 800, fontSize: 'clamp(16px, 2.5vw, 32px)', color: '#fff', textAlign: 'center', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {t('goal.text')}
              </p>
              {isAr && (
                <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 48px)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', textAlign: 'center', marginTop: '16px' }}>
                  {t('goal.name')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Number One Section */}
      <section className="w-full bg-white py-8 md:py-16 px-6 md:px-12 lg:px-20 mt-4 md:mt-12" style={{ overflow: 'visible', paddingBottom: 'clamp(40px, 15vw, 220px)' }}>
        <h2 className="text-center font-bold mb-12" style={{ fontFamily: 'Lexend', fontSize: 'clamp(16px, 3vw, 48px)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'bottom', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
          {t('whyTitle')}
        </h2>
      </section>

      {/* Video 1 */}
      {videos.find(v => v.sort_order === 0) && <VideoBlock video={videos.find(v => v.sort_order === 0)} />}

      {/* Cards Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="block md:hidden"><MobileCarousel cards={cards} isAr={isAr} /></div>
          <div className="hidden md:grid md:grid-cols-3 gap-12">
            {cards.map((card, index) => {
              const title = card.title_ar ? (isAr ? card.title_ar : card.title_en) : card.title;
              const description = card.description_ar ? (isAr ? card.description_ar : card.description_en) : card.description;
              const image = card.image_url || card.image;
              
              return (
                <div key={card.id || index} className={`relative rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 flex flex-col h-full ${index === 1 ? 'scale-110 z-10' : ''}`}>
                  <div className="relative p-[1px] rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #FF0000, #00BBFF, #00FF51, #EA00FF)' }}>
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="bg-black p-6 space-y-8 rounded-b-3xl flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white text-center">{title}</h3>
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9FE422' }}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <p className="text-gray-300 leading-relaxed text-[12px]">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video 2 */}
      {videos.find(v => v.sort_order === 1) && <VideoBlock video={videos.find(v => v.sort_order === 1)} />}

      {/* Experience Section */}
      <section className="w-full bg-white py-6 md:py-12 overflow-hidden" dir="ltr">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Mobile */}
          <div className="flex flex-col items-center md:hidden">
            <div className="relative w-full flex items-center justify-center" style={{ height: '220px' }}>
              <div className="absolute bg-black" style={{ left: '0', right: '20%', top: 0, bottom: 0, borderRadius: '12px' }}></div>
              <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center" style={{ zIndex: 10 }}>
                <span className="text-white font-black" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '18px', letterSpacing: '0.1em' }}>{t('experience.label')}</span>
              </div>
              <div className="relative flex items-center justify-center" style={{ zIndex: 2, marginLeft: '30px' }}>
                <span style={{ position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'visible', backgroundImage: 'linear-gradient(to right, #CCCCCC, #FFFFFF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', fontSize: '180px', fontWeight: 900, lineHeight: 1, zIndex: 1 }}>8</span>
                <span style={{ position: 'absolute', right: 0, top: 0, width: '50%', overflow: 'visible', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'bottom', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', fontSize: '180px', fontWeight: 900, lineHeight: 1, direction: 'rtl', zIndex: 1 }}>8</span>
                <span style={{ visibility: 'hidden', fontSize: '180px', fontWeight: 900, lineHeight: 1 }}>8</span>
              </div>
            </div>
            <h2 className="text-black font-bold text-center mt-4" style={{ fontSize: '22px', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
              {isAr ? (
                <>
                  <span style={{ display: 'block', fontSize: '36px', lineHeight: 1.2, marginBottom: '12px' }}>{t('experience.years')}</span>
                  <span style={{ display: 'block', fontSize: '36px', lineHeight: 1.2, backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('experience.years2')}</span>
                </>
              ) : (
                t('experience.years')
              )}
            </h2>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex flex-col items-center justify-center gap-8" style={{ transform: 'translateX(80px)' }}>
            <div className="flex flex-row items-center gap-16">
              <div className="relative flex-shrink-0 mt-24" style={{ width: '430px', height: '430px', overflow: 'visible' }}>
                <div className="absolute inset-0 bg-black" style={{ zIndex: 0, transform: 'translateX(-95px)', borderRadius: '24px' }}></div>
                <div className="absolute top-0 bottom-0 flex items-center justify-center" style={{ zIndex: 10, height: '100%', left: '-126px' }}>
                  <span className="text-white tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 'clamp(30px, 5vw, 65px)', letterSpacing: '0.07em', fontWeight: 900, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{t('experience.label')}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ overflow: 'visible', zIndex: 1 }}>
                  <div className="relative" style={{ fontSize: 'clamp(250px, 45vw, 680px)', fontWeight: 900, lineHeight: 1, transform: isAr ? 'translateX(120px) translateY(60px)' : 'translateX(120px)' }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'visible', backgroundImage: 'linear-gradient(to right, #CCCCCC, #FFFFFF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontSize: 'clamp(250px, 45vw, 600px)', fontWeight: 900, lineHeight: 1, zIndex: 1 }}>8</span>
                    <span style={{ position: 'absolute', right: 0, top: 0, width: '50%', overflow: 'visible', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'bottom', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontSize: 'clamp(250px, 45vw, 600px)', fontWeight: 900, lineHeight: 1, direction: 'rtl', zIndex: 1 }}>8</span>
                    <span style={{ visibility: 'hidden', fontSize: 'clamp(250px, 45vw, 600px)', fontWeight: 900, lineHeight: 1 }}>8</span>
                  </div>
                </div>
              </div>
              <h2 className="text-black font-bold" style={{ fontSize: 'clamp(20px, 4vw, 32px)', lineHeight: 1.1, transform: 'translateX(60px)', whiteSpace: 'pre-line' }}>
                {isAr ? (
                  <>
                    <span style={{ display: 'block', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.2, marginBottom: '16px' }}>{t('experience.years')}</span>
                    <span style={{ display: 'block', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.2, backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('experience.years2')}</span>
                  </>
                ) : (
                  t('experience.years')
                )}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-8 md:py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center gap-20 md:gap-32">
            {/* First row - 2 stats */}
            <div className="flex flex-wrap justify-center gap-16 md:gap-32" style={{ direction: 'ltr' }}>
              {stats.slice(0, 2).map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px]" style={{ fontFamily: 'Lexend', fontWeight: 200, lineHeight: '100%', backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}><CountUp value={stat.number} /></h3>
                  </div>
                  <div className="w-full h-0.5 mt-2" style={{ background: 'linear-gradient(to right, #E6A326 0%, #E9DB69 50%, #000000 50%, #000000 100%)' }}></div>
                  <p className="mt-2" style={{ fontWeight: 600, fontSize: 'clamp(14px, 1.5vw, 24px)', whiteSpace: 'pre-line' }}>
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Second row - 24/7 support */}
            <div className="flex flex-col items-center">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px]" style={{ fontFamily: 'Lexend', fontWeight: 200, lineHeight: '100%', backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}><CountUp value="24" /></h3>
              <div className="w-full h-0.5 mt-2" style={{ background: 'linear-gradient(to right, #E6A326 0%, #E9DB69 50%, #000000 50%, #000000 100%)' }}></div>
              <p className="mt-2 text-center" style={{ fontWeight: 600, fontSize: 'clamp(14px, 1.5vw, 24px)' }}>
                {t('stats.s3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection />

      {/* Final CTA Section */}
      <section className="w-full bg-white py-8 md:py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 48px)', color: '#000', lineHeight: 1.4, marginBottom: '40px', whiteSpace: 'pre-line' }}>
            {t('cta.line1')}
          </p>
          <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(20px, 4vw, 48px)', color: '#000', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
            {t('cta.line2')}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Instructor;
