import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AnimatedWords from '../components/AnimatedWords/AnimatedWords';

const BenefitsSection = () => {
  const { t } = useTranslation('courses');
  const { isAr } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const benefits = [
    {
      icon: "/Mask group (3).png",
      title: t('benefits.b1Title'),
      subtitle: t('benefits.b1Sub'),
      description: t('benefits.b1Desc'),
      image: "/Mask g.png",
      position: "right"
    },
    {
      icon: "/Mask group (4).png",
      title: t('benefits.b2Title'),
      subtitle: t('benefits.b2Sub'),
      description: t('benefits.b2Desc'),
      image: "/vv.png",
      position: "left"
    },
    {
      icon: "/Mask group (5).png",
      title: t('benefits.b3Title'),
      subtitle: t('benefits.b3Sub'),
      description: t('benefits.b3Desc'),
      image: "/Mask group (12).png",
      position: "right"
    },
    {
      icon: "/Mask group (6).png",
      title: t('benefits.b4Title'),
      subtitle: t('benefits.b4Sub'),
      description: t('benefits.b4Desc'),
      image: "/Maskj.png",
      position: "left"
    }
  ];

  // Auto-rotate on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [benefits.length]);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ellipse Top */}
      <img
        src="/Ellipse 63.png"
        alt=""
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(1400px, 100%)', zIndex: 0, opacity: 1 }}
      />
      {/* Background Ellipse Bottom - behind last card */}
      <img
        src="/Ellipse 66.png"
        alt=""
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: 'min(1200px, 100%)', zIndex: 0, opacity: 1 }}
      />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Mobile: single card with icon, auto-rotating */}
        <div className="lg:hidden">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${index === activeIndex ? 'block opacity-100' : 'hidden opacity-0'}`}
            >
              {/* Icon + Card side by side */}
              <div className="flex items-center gap-3 mb-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 object-contain" />
                </div>
                {/* Card */}
                <div className="flex-1 bg-black text-white relative group overflow-hidden rounded-2xl" style={{ minHeight: '180px' }}>
                  <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
                    <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
                      <div className="w-full h-full rounded-2xl bg-black"></div>
                    </div>
                  </div>
                  <div className="relative z-20 p-4 flex flex-col justify-center h-full" dir={isAr ? 'rtl' : 'ltr'} style={isAr ? { textAlign: 'right' } : {}}>
                    <h3 className="text-sm font-bold mb-2" style={isAr ? {
                      backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    } : { color: 'white' }}>{benefit.title}</h3>
                    <div className="space-y-1">
                      <div className="flex items-start gap-1">
                        <span className="text-green-400 text-sm flex-shrink-0">✓</span>
                        <p className="text-xs font-semibold">{benefit.subtitle}</p>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="text-green-400 text-sm flex-shrink-0">✓</span>
                        <p className="text-xs text-gray-300 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {benefits.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-black w-4' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: original layout */}
        <div className="hidden lg:block" dir="ltr">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 lg:mb-24"
          >
            {benefit.position === 'left' && (
              <div className="flex-shrink-0">
                <img src={benefit.icon} alt={benefit.title} className="w-34 h-34 sm:w-40 sm:h-40 lg:w-50 lg:h-50 object-contain" />
              </div>
            )}

            <div className="w-full max-w-4xl bg-black text-white relative group overflow-hidden" style={{ height: '350px', borderRadius: '32px 32px 48px 48px' }}>
              <div className="absolute inset-0 rounded-3xl pointer-events-none z-10">
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
                  <div className="w-full h-full rounded-3xl bg-black"></div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-transparent via-white to-transparent border-light-animate">
                  <div className="w-full h-full rounded-3xl bg-black"></div>
                </div>
              </div>
              <div className={`relative z-20 flex ${benefit.position === 'right' ? 'flex-row' : 'flex-row-reverse'} items-stretch h-full`}>
                <div className={`w-[50%] flex-shrink-0 flex items-center justify-center ${benefit.position === 'right' ? 'pr-0' : 'pl-0'}`}>
                  <img src={benefit.image} alt={benefit.title} className={`w-full h-full object-cover ${benefit.position === 'right' ? 'rounded-r-3xl' : 'rounded-l-3xl'}`} />
                </div>
                <div className="w-[80%] p-6 sm:p-8 flex flex-col justify-center" dir={isAr ? 'rtl' : 'ltr'} style={isAr ? { textAlign: 'right' } : {}}>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3" style={isAr ? {
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  } : { color: 'white' }}>{benefit.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✓</span>
                      <p className="text-sm sm:text-base font-semibold">{benefit.subtitle}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✓</span>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {benefit.position === 'right' && (
              <div className="flex-shrink-0">
                <img src={benefit.icon} alt={benefit.title} className="w-34 h-34 sm:w-40 sm:h-40 lg:w-50 lg:h-50 object-contain" />
              </div>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Animated Text Box */}
      <div className="max-w-7xl mx-auto mt-16 lg:mt-24 px-4">
        <div className="bg-white rounded-[40px] p-5 sm:p-12 lg:p-16 mx-auto" style={{ border: '6px solid #D4AF37', maxWidth: '798px', height: 'auto', minHeight: 'auto' }}>
          <AnimatedWords
            text={t('benefits.quote1')}
            as="p"
            className={`font-semibold sm:text-xl lg:text-6xl font-sm text-center mb-4 ${isAr ? '' : 'leading-relaxed'}`}
            style={{ lineHeight: isAr ? '1.5' : undefined }}
            byLine={true}
            gradientPerLine={true}
          />
          <AnimatedWords
            text={t('benefits.quote2')}
            as="p"
            className="font-bold text-center text-base sm:text-5xl"
            style={{ color: '#000000', fontSize: undefined }}
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
