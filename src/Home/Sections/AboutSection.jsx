// import { useTranslation } from 'react-i18next';

// const AboutSection = () => {
//   const { t, i18n } = useTranslation('home');
//   const isAr = i18n.language?.startsWith('ar');

//   const titles = isAr
//     ? [t('about.title1'), t('about.title2'), t('about.title4')]
//     : [t('about.title1'), t('about.title2'), t('about.title3'), t('about.title4')];

// const goldGradientTextStyle = {
//   background: 'linear-gradient(180deg, #df9b27 0%, #aa5108 55%, #632300 100%)',
//   WebkitBackgroundClip: 'text',
//   backgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   color: 'transparent',
// };
//   return (
//     <section 
//       className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Main Title */}
//         <div className="text-center mb-12 sm:mb-16">
//           <style>{`
//             @keyframes fadeUpAbout {
//               from { opacity: 0; transform: translateY(24px); }
//               to { opacity: 1; transform: translateY(0); }
//             }
//           `}</style>
//           <h2 className="font-bold leading-tight break-words" style={{ fontSize: 'clamp(1.25rem, 4vw, 3.75rem)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
//             {titles.map((line, i) => (
//               <span
//                 key={i}
//                 className="block mb-2 sm:mb-4"
//                 style={{
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   WebkitTextFillColor: 'transparent',
//                   animation: `fadeUpAbout 0.8s ease-out ${i * 0.4}s both`,
//                 }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h2>
//         </div>
        
//         {/* Content Sections */}
//         <div className="space-y-8 sm:space-y-12">
//           {/* First Point */}
//           <div className="text-center">
//             <p
//               className="font-medium mb-3 break-words"
//               style={{
//                 fontSize: 'clamp(0.875rem, 2.5vw, 2.25rem)',
//                 backgroundImage: 'linear-gradient(to right, #000000, #666666)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 color: 'transparent',
//                 wordBreak: 'break-word',
//                 overflowWrap: 'break-word',
//               }}
//             >
//               {t('about.point1')}
//             </p>
//             <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black-400 mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//             </svg>
//           </div>

//           {/* Second Point */}
//           <div className="text-center">
//             <p
//               className="font-medium mb-3 break-words"
//               style={{
//                 fontSize: 'clamp(0.875rem, 2.5vw, 2.25rem)',
//                 backgroundImage: 'linear-gradient(to right, #000000, #666666)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 color: 'transparent',
//                 wordBreak: 'break-word',
//                 overflowWrap: 'break-word',
//               }}
//             >
//               {t('about.point2')}
//             </p>
//             <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//             </svg>
//           </div>

//           {/* Third Point */}
//           <div className="text-center">
//             <p
//               className="font-medium mb-3 break-words"
//               style={{
//                 fontSize: 'clamp(0.875rem, 2.5vw, 2.25rem)',
//                 backgroundImage: 'linear-gradient(to right, #000000, #666666)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 color: 'transparent',
//                 wordBreak: 'break-word',
//                 overflowWrap: 'break-word',
//               }}
//             >
//               {t('about.point3')}
//             </p>
//             <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black-400 mx-auto mt-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;

import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t, i18n } = useTranslation('home');
  const isAr = i18n.language?.startsWith('ar');

  const titles = isAr
    ? [t('about.title1'), t('about.title2'), t('about.title4')]
    : [t('about.title1'), t('about.title2'), t('about.title3'), t('about.title4')];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-12 sm:mb-16">
          <style>{`
            @keyframes fadeUpAbout {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          
          <h2 
            // className="font-bold leading-tight break-words" 
            // style={{ 
            //   fontSize: 'clamp(1.25rem, 4vw, 3.75rem)', 
            //   wordBreak: 'break-word', 
            //   overflowWrap: 'break-word',
            //   backgroundImage: 'linear-gradient(180deg, #FDE074 0%, #E29924 35%, #B15509 70%, #682200 100%)',
            //   WebkitBackgroundClip: 'text',
            //   backgroundClip: 'text',
            //   WebkitTextFillColor: 'transparent',
            //   color: 'transparent',
            // }}
            className="font-bold leading-tight break-words -mt-5" 
style={{ 
  fontSize: 'clamp(1.25rem, 4vw, 3.75rem)', 
  wordBreak: 'break-word', 
  overflowWrap: 'break-word',
  backgroundImage: 'linear-gradient(180deg, #FDE074 0%, #E29924 35%, #B15509 70%, #682200 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
}}
          >
            {titles.map((line, i) => (
              <span
                key={i}
                className="block mb-2 sm:mb-4"
style={{ 
  fontSize: 'clamp(1.25rem, 4vw, 3.75rem)', 
  wordBreak: 'break-word', 
  overflowWrap: 'break-word',
  lineHeight: '1.5',
  paddingBottom: '8px', // تعطي مساحة كافية تحت السطر لتظهر النقاط والحروف السفلية كاملة
  backgroundImage: 'linear-gradient(180deg, #FDE074 0%, #E29924 35%, #B15509 70%, #682200 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
}}
              >
                {line}
              </span>
            ))}
          </h2>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-8 sm:space-y-12">
          {/* First Point */}
          <div className="text-center">
            <p
              className="font-medium mb-3 break-words text-neutral-800"
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 2.25rem)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {t('about.point1')}
            </p>
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>

          {/* Second Point */}
          <div className="text-center">
            <p
              className="font-medium mb-3 break-words text-neutral-800"
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 2.25rem)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {t('about.point2')}
            </p>
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500 mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>

          {/* Third Point */}
          <div className="text-center">
            <p
              className="font-medium mb-3 break-words text-neutral-800"
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 2.25rem)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {t('about.point3')}
            </p>
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black mx-auto mt-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;