import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedWords from '../../components/AnimatedWords/AnimatedWords';
import { getBrands } from '../../api/brands';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const PortfolioSection = () => {
  const { t, i18n } = useTranslation('home');
  const isAr = i18n.language?.startsWith('ar');
  const fallbackLogos = [
    { src: "/amazon 1.png", alt: "Amazon" },
    { src: "/2 1.png", alt: "Nike" },
    { src: "/2 2.png", alt: "Buffalo Burger" },
    { src: "/2 3.png", alt: "Brave" },
    { src: "/2 5.png", alt: "Carrefour" },
    { src: "/2 4.png", alt: "Zezeeta" },
    { src: "/2 6.png", alt: "Logo" },
    { src: "/2 7.png", alt: "Burger King" },
    { src: "/2 8.png", alt: "Logo" },
    { src: "/2 9.png", alt: "Logo" },
    { src: "/amazon 2.png", alt: "Amazon" },
  ];

  const [logos, setLogos] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    getBrands()
      .then((brands) => {
        const mapped = brands
          .filter((b) => b.is_active)
          .map((b) => ({ src: b.image_url, alt: b.name }));
        setLogos(mapped.length > 0 ? mapped : fallbackLogos);
      })
      .catch(() => setLogos(fallbackLogos));
  }, []);
  
  return (
    <section className="w-full py-16 mt-20 bg-white overflow-hidden">
  {/* Section Title */}
  <div className="text-center mb-12">
  <div className="font-lexend font-bold relative inline-block 
  text-[48px] sm:text-[64px] md:text-[96px]">

  {isAr ? (
    <span className="relative inline-block" style={{ letterSpacing: '0.08em' }}>
      {/* Star above ش */}
      <span className="absolute -top-2 sm:-top-3 md:-top-4" style={{ right: 0 }}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12">
          <defs>
            <pattern id="starImgPortfolioAr" patternUnits="userSpaceOnUse" width="24" height="24">
              <image href="/nzrzOfxWPwo-4.png" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
            </pattern>
          </defs>
          <path fill="url(#starImgPortfolioAr)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>
      <AnimatedWords
        text="شركاء النجاح"
        as="span"
        className="inline"
        style={{
          backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '0.08em',
        }}
      />
    </span>
  ) : (
    <>
      <span className="relative inline-block" style={{
        backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent'
      }}>
        O
        <span className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12">
            <defs>
              <pattern id="starImgPortfolio" patternUnits="userSpaceOnUse" width="24" height="24">
                <image href="/nzrzOfxWPwo-4.png" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <path fill="url(#starImgPortfolio)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
      </span>
      <AnimatedWords
        text="ur Customers"
        as="span"
        className="inline"
        style={{
          backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      />
    </>
  )}
</div>
  </div>

  {/* White strip with logos - Swiper */}
<div className="w-full bg-white py-6 mt-20 overflow-hidden" style={{ maxWidth: '100vw' }}>
  
  {logos === null ? (
    /* Skeleton */
    <div className="flex gap-10 px-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-12 md:h-16 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse"
          style={{ width: '80px' }}
        />
      ))}
    </div>
  ) : (
    <Swiper
      ref={swiperRef}
      modules={[Autoplay]}
      spaceBetween={40}
      slidesPerView="auto"
      loop={true}
      speed={3000}
      autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
      className="flex items-center"
    >
      {[...logos, ...logos].map((logo, i) => (
        <SwiperSlide key={i} className="flex justify-center items-center py-4" style={{ width: '220px' }}>
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )}

</div>

    
 
</section>
  );
};

export default PortfolioSection;

