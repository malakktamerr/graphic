import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import BASE_URL from '../../api/config';

const CourseProjectsSection = () => {
  const { t } = useTranslation('home');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/projects?all_locales=false`)
      .then(res => res.json())
      .then(data => {
        const imgs = data.data.map(item => item.image_url);
        setImages(imgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // fallback images لو الـ API فشل
  const fallbackImages = [
    '/tyvm-sound 3.png',
    '/tyvm-sound 8.png',
    '/tyvm-sound 2.png',
    '/2 4.png',
    '/2 5.png',
    '/tyvm-sound 7.png',
    '/tyvm-sound 6.png',
    '/tyvm-sound 13.png',
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  // قسم الصور على 3 صفوف وكرر كل صف
  const chunkSize = Math.ceil(displayImages.length / 3);
  const makeRow = (start, end) => {
    let row = displayImages.slice(start, end);
    if (row.length === 0) row = displayImages;
    while (row.length < 8) row = [...row, ...row];
    return row;
  };
  const row1 = makeRow(0, chunkSize);
  const row2 = makeRow(chunkSize, chunkSize * 2);
  const row3 = makeRow(chunkSize * 2, displayImages.length);

  const coverflowConfig = {
    rotate: 30,
    stretch: 10,
    depth: -500,
    modifier: 1,
    slideShadows: false,
  };

  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  const SwiperRow = ({ images: rowImages, reverse = false, speed = 3000 }) => (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      effect="coverflow"
      grabCursor={false}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={coverflowConfig}
      spaceBetween={40}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
        pauseOnMouseEnter: true,
      }}
      speed={isMobileDevice ? speed * 2 : speed}
      loop={true}
      allowTouchMove={false}
      className="w-full"
    >
      {rowImages.map((img, index) => (
        <SwiperSlide key={index} style={{ width: isMobileDevice ? '240px' : '364px', height: isMobileDevice ? '150px' : '228px' }}>
          <img
            src={img}
            alt={`Project ${index + 1}`}
            className="w-full h-full object-cover rounded-2xl shadow-xl"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 3.75rem)',
              backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {t('courseProjects.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-black font-semibold">
            {t('courseProjects.subtitle')}
          </p>
        </div>
      </div>

      {/* Fade Gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-32 sm:w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-32 sm:w-48 bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Rows */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-12 relative">
          <div className="relative z-10"><SwiperRow images={row1} reverse={false} speed={4000} /></div>
          <div className="relative z-10"><SwiperRow images={row2} reverse={true} speed={3500} /></div>
          <div className="relative z-10"><SwiperRow images={row3} reverse={false} speed={4500} /></div>
        </div>
      )}
    </section>
  );
};

export default CourseProjectsSection;
