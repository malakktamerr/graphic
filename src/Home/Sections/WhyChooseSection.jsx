import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyChooseSection = () => {
  const { t } = useTranslation('home');
  return (
    <section className="relative w-full bg-white pt-16 sm:pt-20 lg:pt-24 px-6 sm:px-10 lg:px-16 pb-16 sm:pb-64">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="font-bold mb-6 sm:mb-12 bg-gradient-to-r from-gray-300 via-gray-500 to-black bg-clip-text text-transparent w-fit break-words" style={{ fontSize: 'clamp(1.25rem, 4vw, 3.75rem)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {t('whyChoose.title')} {t('whyChoose.us')}
        </h2>

        {/* Content Box */}
        <div 
          className="relative w-full p-[2px] rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #00FFFF, #FF69B4, #00FF00)'
          }}
        >
          <div className="bg-white rounded-3xl p-5 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-black font-bold leading-relaxed break-words" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.875rem)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {t('whyChoose.desc').split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </p>
            </div>

            {/* Icons */}
            <div className="relative flex-shrink-0">
              <div className="relative w-28 h-28 sm:w-48 sm:h-48 flex items-center justify-center overflow-hidden">
                <div className="w-24 h-24 sm:w-40 sm:h-40 overflow-hidden relative">
                  <img 
                    src="/ScreenRecording2026-02-17142643-ezgif.com-video-to-gif-converter.gif" 
                    alt="Icon" 
                    className="absolute"
                    style={{ 
                      width: '110%',
                      height: '110%',
                      top: '-10%',
                      right: '-5%',
                      objectFit: 'cover',
                      willChange: 'auto',
                      transform: 'translateZ(0)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;