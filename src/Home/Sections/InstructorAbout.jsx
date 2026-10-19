import { useTranslation } from 'react-i18next';
import AnimatedWords from "../../components/AnimatedWords/AnimatedWords";

const gradientStyle = {
  backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const InstructorAbout = ({ hideWho = false }) => {
  const { t, i18n } = useTranslation('home');
  const isAr = i18n.language?.startsWith('ar');

  return (
    <section className="w-full py-20 bg-white flex justify-center px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="text-center flex flex-col items-center gap-4 max-w-full">

        {/* Small title */}
        {!hideWho && (
          <AnimatedWords
            text={t('instructorAbout.who')}
            as="p"
            className="font-lexend text-2xl md:text-[48px] font-bold tracking-wider inline-block text-black"
          />
        )}

        {/* Main title */}
        <div className="font-lexend font-bold relative inline-block max-w-full" style={{ fontSize: 'clamp(26px, 5.5vw, 96px)' }}>
          {isAr ? (
            <AnimatedWords
              text={t('instructorAbout.meet')}
              as="span"
              className="inline"
              style={gradientStyle}
            />
          ) : (
            <>
              <AnimatedWords
                text="Meet Your Ment"
                as="span"
                className="inline"
                style={gradientStyle}
              />
              <span className="relative inline-block" style={gradientStyle}>
                {/* Star above the letter o */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '0.4em', height: '0.4em' }}
                  >
                    <defs>
                      <pattern id="starImgPattern" patternUnits="userSpaceOnUse" width="24" height="24">
                        <image href="/nzrzOfxWPwo-4.png" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
                      </pattern>
                    </defs>
                    <path fill="url(#starImgPattern)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </span>
                o
              </span>
              <AnimatedWords
                text="r"
                as="span"
                className="inline"
                style={gradientStyle}
              />
            </>
          )}
        </div>



      </div>
    </section>
  );
};

export default InstructorAbout;
