import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import TestimonialsSection from '../Home/Sections/TestimonialsSection';
import { getCertificates } from '../api/certificates';

const certImages = [
  "/Excellence-in-Graphic-Design 6.png",
  "/Excellence-in-Graphic-Design 1.png",
  "/Excellence-in-Graphic-Design 5.png",
  "/Excellence-in-Graphic-Design 3.png",
  "/Excellence-in-Graphic-Design 2 (1).png",
  "/Excellence-in-Graphic-Design 2 (1).png",
];

const Certifications = () => {
  const { t } = useTranslation('certifications');
  const { isAr } = useLanguage();
  const [certs, setCerts] = useState([]);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getCertificates({ per_page: 50 })
      .then(data => {
        console.log('Certificates API response:', data);
        setCerts(data?.data || []);
      })
      .catch(() => {});
  }, []);

  // Auto-scroll تلقائي
  useEffect(() => {
    if (certs.length === 0 || !scrollRef.current) return;

    const startScroll = setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        const container = scrollRef.current;
        if (!container) return;

        const colWidth = container.scrollWidth / Math.ceil(certs.length / 2);
        const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 2;

        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: isAr ? -colWidth : colWidth, behavior: 'smooth' });
        }
      }, 3000);
    }, 500);

    return () => {
      clearTimeout(startScroll);
      clearInterval(autoScrollRef.current);
    };
  }, [certs.length, isAr]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative w-full bg-black overflow-visible" style={{ minHeight: 'clamp(400px, 80vw, 700px)' }}>
        <img src="/515 2.png" alt="Background" className="absolute inset-0 w-full object-cover"
          style={{ zIndex: 0, top: 0, left: 0, right: 0, bottom: '-280px', height: 'calc(100% + 280px)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center" style={{ zIndex: 2, pointerEvents: 'none' }}>
          <img src="/b_عايزها_علي_خلفية_بيض 1.png" alt="Person Left" className="hidden md:block object-contain flex-shrink-0"
            style={{ width: 'clamp(180px, 30vw, 452px)', height: 'clamp(260px, 45vw, 579px)', opacity: 0.4, marginBottom: '-40px', marginRight: '-220px' }} />
          <div style={{ position: 'relative', width: 'clamp(180px, 35%, 400px)', zIndex: 3 }}>
            <img src="/45565621 1 (1).png" alt="Person Center" className="object-contain w-full" style={{ opacity: 0.8 }} />
          </div>
          <img src="/b_عايز_الشخص_ده_يكون_ع-(1) 1.png" alt="Person Right" className="hidden md:block object-contain flex-shrink-0"
            style={{ width: 'clamp(180px, 30vw, 452px)', height: 'clamp(270px, 45vw, 679px)', opacity: 0.6, marginBottom: '-40px', marginLeft: '-220px' }} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
          <h1 className="text-center leading-tight">
            <span className="block text-white font-bold" style={{ fontSize: 'clamp(2rem, 7vw, 96px)' }}>{t('hero.our')}</span>
            <span className="block font-bold" style={{ fontSize: 'clamp(1.8rem, 6vw, 4.5rem)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.title')}</span>
            <span className="block text-white font-medium" style={{ fontSize: 'clamp(1rem, 3.5vw, 48px)', marginTop: '4px' }}>{t('hero.subtitle')}</span>
          </h1>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="w-full relative" style={{ zIndex: 20 }}>
        {/* Medal - between hero and black section */}
        <div className="flex justify-center" style={{ position: 'absolute', top: '-60px', left: 0, right: 0, zIndex: 30 }}>
          <img src="/10603705_42828 2.png" alt="Medal Icon" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain" />
        </div>
        <div className="w-full relative overflow-hidden" style={{ borderRadius: 'clamp(40px, 10vw, 150px)', marginTop: 'clamp(-80px, -10vw, -160px)', position: 'relative', zIndex: 10 }}>
        <section className="w-full relative px-4 sm:px-6 lg:px-8 overflow-visible"
          style={{ background: '#000', paddingTop: 'clamp(80px, 12vw, 100px)', paddingBottom: '80px' }}>
          <div className="relative z-20 max-w-7xl mx-auto">
            <div className="text-center mb-12 mt-8">
              <span className="block font-bold" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.title')}</span>
            </div>

            {certs.length === 0 ? (
              <p className="text-center text-gray-400 py-12">{t('loading')}</p>
            ) : (
              <>
                <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
                {/* Cards grid - 2 rows × 3 cols with auto-scroll */}
                <div
                  ref={scrollRef}
                  className="pb-4 scrollbar-hide mb-8"
                  style={{
                    display: 'grid',
                    gridTemplateRows: isMobile ? 'repeat(1, auto)' : 'repeat(2, auto)',
                    gridAutoFlow: 'column',
                    gridAutoColumns: isMobile ? 'calc(100% - 1rem)' : 'clamp(280px, calc((100% - 3rem) / 3), 400px)',
                    gap: '1.5rem',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                  }}
                >
                  {certs.map((cert, index) => (
                    <div
                      key={cert.id}
                      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-3 lg:p-4 border-4 border-gray-300 shadow-lg overflow-visible flex flex-col"
                    >
                      {(index % 6 === 1 || index % 6 === 4) ? (
                        <>
                          {/* Image Top */}
                          <div className="relative mb-6 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                            <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
                              <img
                                src={cert.image_url || certImages[index % certImages.length]}
                                alt={cert.holder?.name}
                                className="max-w-full max-h-full scale-110 object-contain"
                                onError={(e) => { e.target.src = certImages[index % certImages.length]; }}
                              />
                            </div>
                          </div>
                          <div className="mt-auto">
                            <div className="mb-4">
                              <div className="relative inline-flex items-center mb-2">
                                <h3 className="text-xs sm:text-lg lg:text-3xl font-bold text-gray uppercase tracking-wider">
                                  {t('card.label')}
                                </h3>
                                <img src="/10603705_42828 2.png" alt="Decoration"
                                  className="absolute top-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22 object-contain pointer-events-none"
                                  style={isAr ? { left: '-4.5rem' } : { right: '-4.5rem' }}
                                />
                              </div>
                              <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
                                {cert.holder?.name || t('card.student')}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-700 font-normal">
                                {isAr ? (cert.course?.title_ar || cert.course?.title) : (cert.course?.title_en || cert.course?.title) || t('card.excellence')}
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
                              {isAr ? (cert.description_ar || cert.description) : (cert.description_en || cert.description) || t('card.defaultDesc')}
                            </p>
                            <div className="flex gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Content Top */}
                          <div className="mb-4">
                            <div className="relative inline-flex items-center mb-2">
                              <h3 className="text-xs sm:text-lg lg:text-2xl font-bold text-gray uppercase tracking-wider">
                                {t('card.label')}
                              </h3>
                              <img src="/10603705_42828 2.png" alt="Decoration"
                                className="absolute top-[100%] -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22 object-contain pointer-events-none"
                                style={isAr ? { left: '-5.5rem' } : { right: '-5.5rem' }}
                              />
                            </div>
                            <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
                              {cert.holder?.name || t('card.student')}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-700 font-normal">
                              {isAr ? (cert.course?.title_ar || cert.course?.title) : (cert.course?.title_en || cert.course?.title) || t('card.excellence')}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
                            {isAr ? (cert.description_ar || cert.description) : (cert.description_en || cert.description) || t('card.defaultDesc')}
                          </p>
                          <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          {/* Image Bottom */}
                          <div className="relative mt-auto rounded-lg p-2 flex items-center justify-center">
                            <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
                              <img
                                src={cert.image_url || certImages[index % certImages.length]}
                                alt={cert.holder?.name}
                                className="max-w-full max-h-full scale-110 object-contain"
                                onError={(e) => { e.target.src = certImages[index % certImages.length]; }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
        </div>

        <section className="pt-4 pb-8 md:pb-28 px-4 bg-white mb-16 md:mb-56">
          <div className="max-w-6xl mx-auto">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-3xl">
                <img src="/Group (1).png" alt="Success Story" className="w-full object-contain" />
                <div className="absolute -right-4 md:-right-8 bottom-5 flex flex-col gap-2">
                  <img src="/encouragement 1.png" alt="Background" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                  <div className="flex gap-1">
                    <span className="text-gray-800">★</span>
                    <span className="text-gray-800">★</span>
                  </div>
                </div>
                <div className="absolute -bottom-20 md:-bottom-40 left-1/2 transform -translate-x-1/2 w-full text-center">
                  <div className="relative inline-block rounded-full px-4 md:px-8 py-3 md:py-4 mb-2 shadow-lg w-full md:w-auto" style={{ minHeight: '50px' }}>
                    <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
                      style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }} />
                    <h2 className="relative text-white font-bold" style={{ zIndex: 1, fontSize: 'clamp(14px, 4vw, 48px)' }}>{t('successStory.line1')}</h2>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900" style={{ fontSize: 'clamp(14px, 4vw, 48px)' }}>{t('successStory.line2')}</h3>
                    <h3 className="font-bold text-gray-900" style={{ fontSize: 'clamp(14px, 4vw, 48px)' }}>{t('successStory.line3')}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 48px)', color: '#000', lineHeight: 1.4, marginBottom: '40px', whiteSpace: 'pre-line' }}>
              {t('cta.ready')}
            </p>
            <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(20px, 4vw, 48px)', color: '#000', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
              {t('cta.join')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Certifications;
