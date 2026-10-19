import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';

const SuccessStorySection = () => {
  const { t } = useTranslation('home');
  const { isAr } = useLanguage();

  return (
    <section className="pt-4 pb-28 px-4 bg-white mb-56 md:mb-56">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex items-center justify-center">
          {/* Main Illustration */}
          <div className="relative w-full max-w-3xl">
            <img 
              src="/Group (1).png" 
              alt="Success Story" 
              className="w-full object-contain"
            />
            
            {/* Thumbs Up Icons - Right Side */}
            <div className="absolute -right-4 sm:-right-8 bottom-5 flex flex-col gap-2">
             <img 
              src="/encouragement 1.png" 
                  alt="Background" 
                  className="w-14 h-14 sm:w-24 sm:h-24 object-contain"
               />
              <div className="flex gap-1">
                <span className="text-gray-800">★</span>
                <span className="text-gray-800">★</span>
              </div>
            </div>

            {/* Text Overlay at Bottom */}
            <div className="absolute -bottom-24 sm:-bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-2xl text-center">
              {/* Banner with Background Image */}
              <div className="relative inline-block rounded-full px-4 sm:px-8 py-3 sm:py-4 mb-2 shadow-lg w-[90vw] sm:w-auto md:min-w-[700px]">
                {/* Background Image */}
                <img 
                  src="/nzrzOfxWPwo 1.png" 
                  alt="Background" 
                  className="absolute rounded-full"
                  style={{ 
                    zIndex: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <h2 className="relative text-white text-base sm:text-xl md:text-2xl lg:text-5xl font-bold" style={{ zIndex: 1 }}>
                  {t('successStory.line1')}
                </h2>
              </div>

              {/* Black Text Below */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900">
                  {t('successStory.line2')}
                </h3>
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900">
                  {t('successStory.line3')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStorySection;
