import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

const ValuePropositionSection = () => {
  const { t } = useTranslation('courses');
  const { isAr } = useLanguage();

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32 lg:mb-40">
      <div className="max-w-5xl mx-auto">

        {/* ── First Block ── */}
        <div className="mb-12 sm:mb-16 lg:mb-20">

          {/* Desktop only: icon above box with negative margin */}
          <div className="hidden sm:flex justify-end mb-[-100px] lg:mb-[-100px]">
            <img src="/group.png" alt="Design Tool"
              className="w-40 sm:w-40 lg:w-48 h-40 sm:h-40 lg:h-48 object-contain" />
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 relative z-10">
            {isAr
              ? <><span className="text-gray-400">{t('value.h1Gray')}</span> {t('value.h1')}</>
              : <>{t('value.h1')} <span className="text-gray-400">{t('value.h1Gray')}</span></>
            }
          </h2>

          <div className="relative rounded-2xl sm:rounded-3xl p-[2px] group z-10"
            style={{background: 'linear-gradient(180deg, #ef4444 0%, #ef4444 15%, #22c55e 40%, #3b82f6 65%, #ec4899 90%, #ec4899 100%)'}}>
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-12 lg:p-16 overflow-hidden">
              {/* Mobile only: icon inside box top-right */}
              <img src="/group.png" alt="Design Tool"
                className="sm:hidden absolute top-3 right-3 w-14 h-14 object-contain opacity-90" />
              <p className={`text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent pr-16 sm:pr-0 whitespace-pre-line ${isAr ? 'leading-loose' : 'leading-relaxed'}`}>
                {t('value.p1')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Second Block ── */}
        <div>

          {/* Desktop only: icon above box with negative margin */}
          <div className="hidden sm:flex justify-end mb-[-100px] lg:mb-[-120px]">
            <img src="/Mask group (9).png" alt="Community"
              className="w-40 sm:w-40 lg:w-48 h-40 sm:h-40 lg:h-48 object-contain" />
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 relative z-10">
            {isAr
              ? <><span className="text-gray-400">{t('value.h2Gray')}</span> {t('value.h2')}</>
              : <>Join the elite <span className="text-gray-400">community of creative designers.</span></>
            }
          </h2>

          <div className="relative rounded-2xl sm:rounded-[40px] p-[2px] group z-10"
            style={{background: 'linear-gradient(180deg, #ef4444 0%, #ef4444 15%, #22c55e 40%, #3b82f6 65%, #ec4899 90%, #ec4899 100%)'}}>
            <div className="absolute inset-0 rounded-2xl sm:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-[40px] p-5 sm:p-12 lg:p-16 overflow-hidden">
              {/* Mobile only: icon inside box top-right */}
              <img src="/Mask group (9).png" alt="Community"
                className="sm:hidden absolute top-3 right-3 w-14 h-14 object-contain opacity-90" />
              <p className={`text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent pr-16 sm:pr-0 ${isAr ? 'leading-loose' : 'leading-relaxed'}`}>
                {isAr ? t('value.p2') : "We take pride in our graduates who started their journey with us and today, they are part of some of the biggest advertising and marketing agencies across the Arab world."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValuePropositionSection;
