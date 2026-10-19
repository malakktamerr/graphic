import { useTranslation } from 'react-i18next';

function Design() {
  const { t } = useTranslation('courses');
  
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading with Image Background */}
        <div className="mb-6 sm:mb-8">
          <div className="relative inline-block rounded-full" style={{ minHeight: '50px', minWidth: '200px' }}>
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
            
            {/* Text Content */}
            <h1 className="relative px-4 sm:px-12 lg:px-16 py-2 sm:py-5 lg:py-6 text-sm sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white inline-block" style={{ zIndex: 10 }}>
              {t('design.heading')}
            </h1>
          </div>
        </div>

        {/* Subtitle with Gradient Text */}
        <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-4 sm:mt-0">
          <span className="text-red-500">{t('design.subtitle1')}</span>
          <span 
           className="bg-gradient-to-r from-[#00C3FF] via-[#F600FF] via-[#F600FF] to-[#FF00CC] bg-clip-text text-transparent">

          
            {t('design.subtitle2')}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Design;