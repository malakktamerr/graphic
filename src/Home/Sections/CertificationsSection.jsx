import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCertificates } from '../../api/certificates';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const certImages = [
  "/Excellence-in-Graphic-Design 6.png",
  "/Excellence-in-Graphic-Design 1.png",
  "/Excellence-in-Graphic-Design 5.png",
  "/Excellence-in-Graphic-Design 3.png",
  "/Excellence-in-Graphic-Design 2 (1).png",
  "/Excellence-in-Graphic-Design 2 (1).png",
];

const CertificationsSection = () => {
  const { t, i18n } = useTranslation('home');
  const isRTL = i18n.language === 'ar';
  const [certifications, setCertifications] = useState([]);
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
      .then((data) => {
        console.log('Certificates API Response:', data);
        if (data?.data?.length > 0) {
          const mapped = data.data.map((cert, i) => {
            console.log(`Certificate ${i}:`, {
              id: cert.id,
              image_url: cert.image_url,
              name: cert.holder?.name,
              certificate_number: cert.certificate_number
            });
            return {
              name: cert.holder?.name || 'Unknown',
              achievement: isRTL
                ? (cert.name_ar || cert.course?.title_ar || cert.course?.title || 'Excellence in Graphic Design')
                : (cert.name_en || cert.course?.title_en || cert.course?.title || 'Excellence in Graphic Design'),
              description: isRTL
                ? (cert.description_ar || cert.description || "رؤية تناسب طموحاتي تمامًا. لدي أفكار جديدة ورائعة أعلم أنني سأحققها.")
                : (cert.description_en || cert.description || "vision that fits my ambitions perfectly. I have new ideas and great that I know I will achieve them."),
              image: cert.image_url || certImages[i % certImages.length],
              displayName: cert.holder?.name?.split(' ')[0] || 'Student',
              certificate_number: cert.certificate_number,
              issued_at: cert.issued_at,
            };
          });
          console.log('Mapped Certificates:', mapped);
          setCertifications(mapped);
        }
      })
      .catch((error) => {
        console.error('Error fetching certificates:', error);
      });
  }, [isRTL]);

  // Auto-scroll تلقائي
  useEffect(() => {
    if (certifications.length === 0 || !scrollRef.current || isMobile) return;

    // انتظر شوية عشان الـ DOM يتبني
    const startScroll = setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        const container = scrollRef.current;
        if (!container) return;

        // حساب عرض عمود واحد (3 كروت) + الـ gap
        const colWidth = container.scrollWidth / Math.ceil(certifications.length / 2);
        const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 2;

        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: isRTL ? -colWidth : colWidth, behavior: 'smooth' });
        }
      }, 3000);
    }, 500);

    return () => {
      clearTimeout(startScroll);
      clearInterval(autoScrollRef.current);
    };
  }, [certifications.length, isRTL]);

  return (
    <>
      {/* Title outside the dark container */}
      <div className="text-center mb-0 px-4 py-6">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{
          backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {t('certifications.our')}
        </h2>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{
          backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {t('certifications.title')}
        </h2>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-medium mt-1 mb-4 text-black">{t('certifications.reflect')}</p>
      </div>

      {/* Medal - overlapping the dark container */}
      <div className="flex justify-center relative z-30 mb-[-50px] sm:mb-[-60px] lg:mb-[-70px]">
        <img
          src="/10603705_42828 2.png"
          alt="Medal"
          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
        />
      </div>

    <section className="w-full relative py-6 sm:py-8 lg:py-10 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Color */}
      <div className="absolute inset-0 w-full h-full bg-[#010000] rounded-3xl sm:rounded-[40px] lg:rounded-[50px]"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/11 82013.png"
          alt="Background"
          className="w-full h-full object-cover rounded-3xl sm:rounded-[40px] lg:rounded-[50px]"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>

        {/* Mobile: Swiper */}
        <div className="block sm:hidden mb-8">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            centeredSlides={true}
          >
            {certifications.map((cert, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl p-4 border-4 border-gray-300 shadow-lg flex flex-col mx-2">
                  <div className="mb-3">
                    <h3 className="text-xs font-bold text-gray uppercase tracking-wider">CERTIFICATION</h3>
                    <h4 className="text-base font-normal text-black mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-700">{cert.achievement}</p>
                  </div>
                  <p className="text-xs text-black mb-3 leading-relaxed">{cert.description}</p>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="w-full aspect-[391/441]">
                    <img src={cert.image} alt={cert.name} className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = certImages[index % certImages.length]; }} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div
          ref={scrollRef}
          className="hidden sm:grid pb-4 scrollbar-hide mb-8 sm:mb-12"
          style={{
            gridTemplateRows: 'repeat(2, auto)',
            gridAutoFlow: 'column',
            gridAutoColumns: 'clamp(280px, calc((100% - 3rem) / 3), 400px)',
            gap: '1.5rem',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-3 lg:p-4 border-4 border-gray-300 shadow-lg overflow-visible flex flex-col"
            >
              {(index === 1 || index === 4) ? (
                <>
                  {/* Image Section - Top */}
                  <div className="relative mb-6 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                    <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
                    <img
  src={cert.image}
  alt={cert.name}
  className="max-w-full max-h-full scale-110 object-contain"
  onError={(e) => {
    if (e.target.src !== certImages[index % certImages.length]) {
      e.target.src = certImages[index % certImages.length];
    }
  }}
/>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="mt-auto">
                    {/* Title */}
                    <div className="mb-4">
                    <div className="relative inline-flex items-center mb-2">
  <h3 className="text-xs sm:text-lg lg:text-3xl font-bold text-gray uppercase tracking-wider">
    CERTIFICATION
  </h3>

  <img
    src="/10603705_42828 2.png"
    alt="Decoration"
    className="
      absolute
      top-1/2 -translate-y-1/2
      w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22
      object-contain
      pointer-events-none
    "
    style={isRTL ? { left: '-4.5rem' } : { right: '-4.5rem' }}
  />
</div>

                      <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-700 font-normal">
                        {cert.achievement}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Title */}
                  <div className="mb-4">
                      <div className="relative inline-flex items-center mb-2">
  <h3 className="text-xs sm:text-lg lg:text-2xl font-bold text-gray uppercase tracking-wider">
    CERTIFICATION
  </h3>

  <img
    src="/10603705_42828 2.png"
    alt="Decoration"
    className="
      absolute
      top-[100%] -translate-y-1/2
      w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22
      object-contain
      pointer-events-none
    "
    style={isRTL ? { left: '-5.5rem' } : { right: '-5.5rem' }}
  />
</div>



                    <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 font-normal">
                      {cert.achievement}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Image Section - Bottom */}
                  <div className="relative mt-auto rounded-lg p-2 flex items-center justify-center">
                    <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
                    <img
  src={cert.image}
  alt={cert.name}
  className="max-w-full max-h-full scale-110 object-contain"
  onError={(e) => {
    if (e.target.src !== certImages[index % certImages.length]) {
      e.target.src = certImages[index % certImages.length];
    }
  }}
/>

                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link to="/certifications" className="btn-wave px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full shadow-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center border-2 border-gray-300 bg-gradient-to-r from-gray-500 via-white to-gray-300 text-black transition-transform duration-200">
            <span>{t('certifications.viewAll')}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default CertificationsSection;

