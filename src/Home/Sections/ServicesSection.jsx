import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-10 lg:px-16">
      <div className="max-w-full mx-auto">
        {/* Profile Image - Top */}
        <div className="flex justify-center -mb-12 sm:-mb-16 lg:-mb-24">
          <img
            src="/45565621 1.png"
            alt="Abdullah ElNasr"
            className="w-[200px] sm:w-[300px] lg:w-[500px] h-auto object-contain"
          />
        </div>

        {/* Content Box */}
        <div 
          className="relative rounded-[40px] sm:rounded-[80px] lg:rounded-[120px] p-6 sm:p-14 lg:p-20 pt-2 sm:pt-3 lg:pt-4 pb-6 sm:pb-8 lg:pb-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #3d2a1a 50%, #8B6914 100%)'
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-70">
            <img
              src="/11 82014.png"
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content - Above background */}
          <div className="relative z-10">
            {/* Header with Logo - Centered */}
            <div className="flex justify-center mb-2">
              <img
                src="/logo alnaser text 1.png"
                alt="Abdullah ElNasr Logo"
                className="h-6 sm:h-10 lg:h-16 w-auto"
              />
            </div>

            {/* Title - Centered */}
            <h2 
              className="text-xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center"
              style={{
                backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {t('services.name')}
            </h2>

            {/* Subtitle - Centered */}
            <p className="text-white text-sm sm:text-xl mb-6 font-medium text-center">
              {t('services.subtitle')}
            </p>

            {/* Content with Border */}
            <div className="flex gap-3 sm:gap-6 mb-8 sm:translate-x-[40px]">
              {/* Gradient Left Line */}
              <div className="flex-shrink-0 w-0.5 rounded-full" style={{ background: 'linear-gradient(to bottom, #C1C1C1, #FFFFFF, #737373)', minHeight: '100%' }}></div>
              <div className="flex-1">
                <p className="text-white leading-relaxed mb-4 font-bold" style={{ fontSize: 'clamp(13px, 2vw, 32px)', fontFamily: 'Lexend' }}>
                  {t('services.bio1')}
                </p>
                
                <p className="text-white leading-relaxed font-bold" style={{ fontSize: 'clamp(13px, 2vw, 32px)', fontFamily: 'Lexend' }}>
                  {t('services.bio2')}
                </p>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="flex justify-center sm:justify-end">
              <button 
                onClick={() => navigate('/instructor')}
                className="btn-wave text-black px-4 sm:px-6 py-3 rounded-full font-bold flex items-center justify-center gap-3 sm:gap-8 shadow-lg cursor-pointer" 
                style={{ background: 'linear-gradient(to right, #C1C1C1, #FFFFFF, #737373)', fontSize: 'clamp(16px, 3vw, 32px)', fontFamily: 'Lexend', fontWeight: 500 }}
              >
                <span className="whitespace-nowrap">{t('services.learnMore')}</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
