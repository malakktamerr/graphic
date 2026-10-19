import { useTranslation } from 'react-i18next';
import AnimatedWords from '../components/AnimatedWords/AnimatedWords';
import FadeInText from '../components/FadeInText/FadeInText';

const InstructorProfile = () => {
  const { t } = useTranslation('instructor');
  const { t: tCourses } = useTranslation('courses');

  const achievements = [
    { icon: "/group.png",      text: t('profile.a1') },
    { icon: "/group (7).png",  text: t('profile.a2') },
    { icon: "/group (8).png",  text: t('profile.a3') },
    { icon: "/group (9).png",  text: t('profile.a4') },
  ];

  return (
    <section className="w-full pt-28 sm:pt-48 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 relative mb-16 sm:mb-20 lg:mb-24">
      <div className="max-w-4xl mx-auto relative">
        {/* Border Gradient Wrapper */}
        <div className="rounded-[40px] p-[2px] bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-2xl">
          {/* Main Card */}
          <div className="bg-white rounded-[34px] overflow-visible relative">
          {/* Person Image - Positioned Above Card */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-30 sm:hidden" style={{ top: '-110px' }}>
            <img 
              src="/17 2.png" 
              alt="Abdullah Al-Nasr"
              className="h-[260px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 z-30 hidden sm:block" style={{ top: '-220px' }}>
            <img 
              src="/17 2.png" 
              alt="Abdullah Al-Nasr"
              className="h-[520px] w-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Golden Background Section */}
          <div className="relative w-full h-[160px] sm:h-[300px] rounded-t-[32px] rounded-b-[32px] overflow-hidden">
            <img 
              src="/nzrzOfxWPwo-4.png" 
              alt="Background"
              className="w-full h-full object-cover object-center rounded-b-[32px]"
            />
          </div>

          {/* Achievements List */}
          <div className="p-5 sm:p-10 lg:p-12 space-y-5 sm:space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 mt-1 sm:mt-2">
                    <img 
                      src={achievement.icon} 
                      alt="icon"
                      className="w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <FadeInText
                      text={achievement.text}
                      as="p"
                      className="text-sm sm:text-2xl lg:text-3xl font-semibold leading-relaxed"
                      delay={index * 0.3}
                      style={{
                        background: 'linear-gradient(to right, #000000, #808080)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'Lexend, sans-serif'
                      }}
                    />
                  </div>
                </div>
                
                {/* Colored Line Separator */}
                {index < achievements.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-3/4 h-0.5 bg-gradient-to-r from-red-400 via-green-400 via-cyan-400 to-purple-400 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Quote Box */}
        <div className="mt-12 sm:mt-20">
          <AnimatedWords
            text={t('profile.quote')}
            as="p"
            className="text-sm sm:text-lg text-center leading-relaxed italic"
            style={{ fontWeight: 400, backgroundImage: 'linear-gradient(to right, #888, #000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}
            byLine={true}
          />
        </div>
      </div>
    </section>
  );
};

export default InstructorProfile;
