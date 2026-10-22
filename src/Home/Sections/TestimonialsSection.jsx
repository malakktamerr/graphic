import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedWords from '../../components/AnimatedWords/AnimatedWords';
import { getComments } from '../../api/comments';

const avatarImages = ["/32 1.png", "/32 2.png", "/32 3.png", "/84 1.png"];

const TestimonialCard = ({ testimonial, bgGradient, textColor, quoteColor }) => (
  <div>
    <div
      className="rounded-[30px] lg:rounded-[50px] p-4 lg:p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col overflow-hidden relative group"
      style={{ height: '202px', background: bgGradient }}
    >
      <div className="absolute inset-0 rounded-[30px] lg:rounded-[50px] pointer-events-none">
        <div className="absolute inset-0 rounded-[30px] lg:rounded-[50px] p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
          <div className="w-full h-full rounded-[30px] lg:rounded-[50px]" style={{ background: bgGradient }}></div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[30px] lg:rounded-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-[30px] lg:rounded-[50px] p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
          <div className="w-full h-full rounded-[30px] lg:rounded-[50px]" style={{ background: bgGradient }}></div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
          <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className={`text-xs lg:text-base font-bold ${textColor}`}>{testimonial.name}</h4>
            {testimonial.title && <p className={`text-xs ${textColor}`}>{testimonial.title}</p>}
          </div>
        </div>
        <p className={`text-xs lg:text-sm ${quoteColor} leading-relaxed flex-1 overflow-hidden`}>"{testimonial.quote}"</p>
      </div>
    </div>
    <div className="flex gap-0.5 justify-start mt-2 lg:mt-3 ml-4 lg:ml-6">
      {[...Array(testimonial.rating || 5)].map((_, i) => (
        <svg key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation('home');
  const isAr = i18n.language?.startsWith('ar');
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desktopStart, setDesktopStart] = useState(0); // index أول كارت في الـ 6 الظاهرين
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    getComments({ per_page: 20 })
      .then((res) => {
        const mapped = (res.data || []).map((comment, index) => ({
          name: comment.name,
          title: '',
          quote: comment.message,
          rating: comment.rating,
          image: avatarImages[index % avatarImages.length],
        }));
        setTestimonials(mapped);
      })
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  // Auto-rotate desktop (كل 4 ثواني يبدل الـ 6 الظاهرين)
  useEffect(() => {
    if (loading || testimonials.length <= 6) return;
    const interval = setInterval(() => {
      setDesktopStart((prev) => (prev + 3) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [loading, testimonials.length]);

  // Auto-scroll mobile
  useEffect(() => {
    if (loading || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setMobileIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        if (scrollRef.current) {
          const cardWidth = scrollRef.current.offsetWidth * 0.85 + 20;
          scrollRef.current.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [loading, testimonials.length]);

  // الـ 6 الظاهرين على الديسكتوب
  const desktopVisible = testimonials.length > 0
    ? Array.from({ length: Math.min(6, testimonials.length) }, (_, i) =>
        testimonials[(desktopStart + i) % testimonials.length]
      )
    : [];

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="mb-3 sm:mb-4 font-bold" style={{
            fontSize: 'clamp(36px, 7vw, 96px)',
            backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}>
            {t('trainees.sectionTitle', 'أداء المتدربين')}
          </h2>
          <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1.4 }}>
            {isAr ? (
              <>
                <p className="text-black sm:hidden" style={{ whiteSpace: 'pre-line' }}>{t('testimonials.desc1')} {t('testimonials.desc2')}</p>
                <div className="hidden sm:block" style={{ whiteSpace: 'pre-line' }}>
                  <p className="text-black">{t('testimonials.desc1')}</p>
                  <p className="text-black">{t('testimonials.desc2')}</p>
                </div>
              </>
            ) : (
              <>
                <p className="text-black sm:hidden">Elite voices: Success stories that began with passion and transformed into tangible professional realities thanks to methodology. Testimonials: From the classroom to leading their own projects</p>
                <div className="hidden sm:block">
                  <p className="text-black">Elite voices: Success stories that began with</p>
                  <p className="text-black">passion and transformed into tangible </p>
                  <p className="text-black">professional realities thanks to methodology.</p>
                  <p className="text-black">Testimonials: From the classroom to leading</p>
                  <p className="text-black">their own projects</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && (
        <>
          {/* Desktop: 6 cards max, auto-rotating */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {desktopVisible.map((testimonial, index) => {
              const bgGradient = 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 20%, #2d2d2d 60%, #1a1a1a 100%)';
              const textColor = 'text-white';
              const quoteColor = 'text-gray-300';
              return <TestimonialCard key={`${desktopStart}-${index}`} testimonial={testimonial} bgGradient={bgGradient} textColor={textColor} quoteColor={quoteColor} />;
            })}
          </div>

          {/* Mobile: horizontal scroll, auto-play */}
          <div ref={scrollRef} className="flex md:hidden overflow-x-auto gap-5 pb-4 snap-x snap-mandatory scrollbar-hide">
            <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
            {testimonials.map((testimonial, index) => {
              const bgGradient = 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 20%, #2d2d2d 60%, #1a1a1a 100%)';
              const textColor = 'text-white';
              const quoteColor = 'text-gray-300';
              return (
                <div key={index} className="min-w-[85vw] flex-shrink-0 snap-center">
                  <TestimonialCard testimonial={testimonial} bgGradient={bgGradient} textColor={textColor} quoteColor={quoteColor} />
                </div>
              );
            })}
          </div>
        </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;

