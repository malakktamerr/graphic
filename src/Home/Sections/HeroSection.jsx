// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useState, useEffect, useRef } from 'react';

// const HeroSection = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation('home');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [started, setStarted] = useState(false);
//   const sectionRef = useRef(null);

//   const lines = [
//     t('hero.line1'),
//     t('hero.line2'),
//     t('hero.subtitle'),
//   ];

//   const speed = 100;
//   const lineDelays = lines.reduce((acc, line, i) => {
//     const prev = i === 0 ? 0 : acc[i - 1] + lines[i - 1].length * speed + 200;
//     acc.push(prev);
//     return acc;
//   }, []);

//   const [lineTexts, setLineTexts] = useState(lines.map(() => ''));
//   const [allComplete, setAllComplete] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setStarted(true); },
//       { threshold: 0.3 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!started) return;
//     setLineTexts(lines.map(() => ''));
//     setAllComplete(false);
//     const timers = [];
//     let completedCount = 0;
    
//     lines.forEach((line, li) => {
//       let i = 0;
//       const start = setTimeout(() => {
//         const interval = setInterval(() => {
//           i++;
//           setLineTexts(prev => {
//             const next = [...prev];
//             next[li] = line.slice(0, i);
//             return next;
//           });
//           if (i >= line.length) {
//             clearInterval(interval);
//             completedCount++;
//             if (completedCount === lines.length) {
//               setAllComplete(true);
//             }
//           }
//         }, speed);
//         timers.push(interval);
//       }, lineDelays[li]);
//       timers.push(start);
//     });
//     return () => timers.forEach(clearTimeout);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [started, t('hero.line1')]);

//   return (
//     <div className="w-full p-px rounded-b-[40px] sm:rounded-b-[120px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
//     <section ref={sectionRef} className="w-full bg-white flex items-start justify-center pb-0 md:pb-8 relative overflow-hidden rounded-b-[39px] sm:rounded-b-[119px]">
//       <div className="relative w-full max-w-[98%]">
//         <img 
//           src="/cover-websitebar2 1.png" 
//           alt="Hero"
//           className="w-[92%] mx-auto h-auto object-contain"
//         />
        
//         {/* Text and Buttons overlay */}
//         <div className="absolute top-[15%] sm:top-40 md:top-48 lg:top-64 left-2 sm:left-8 md:left-12 lg:left-20 z-10 max-w-[45%] sm:max-w-md">

//           <div className="min-h-[120px] sm:min-h-[280px]">
//             <h1 className="text-base sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-4">
//               <span
//                 className="inline-block leading-tight"
//                 style={{
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 {lineTexts[0]}
//                 {lineTexts[0].length < lines[0]?.length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//               <br />
//               <span
//                 className="inline-block leading-tight"
//                 style={{
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 {lineTexts[1]}
//                 {lineTexts[1].length < lines[1]?.length && lineTexts[0].length === lines[0]?.length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//             </h1>

//             <p className="text-[10px] sm:text-2xl md:text-3xl font-thin md:font-extralight mb-2 md:mb-8">
//               <span className="bg-gradient-to-r from-[#00C3FF] via-[#F600FF] via-[#F600FF] to-[#FF00CC] bg-clip-text text-transparent">
//                 {lineTexts[2]}
//                 {lineTexts[2].length < lines[2]?.length && lineTexts[1].length === lines[1]?.length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-gradient-to-r from-[#00C3FF] via-[#F600FF] to-[#FF00CC] align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//             </p>
//           </div>

//           {/* Floating Image */}
//           <div className="absolute top-[80px] sm:top-[160px] left-0 z-0 pointer-events-none">
//             <img 
//               src="/background_removed_image_cOJ5pLLfT5SGchOf9rJdfw 1.png" 
//               alt="Design Icon"
//               className="h-16 sm:h-40 lg:h-30 object-contain"
//             />
//           </div>


//         </div>
//       </div>
//     </section>
//     </div>
//   );
// };

// export default HeroSection;



import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  const lines = [
    t('hero.line1'),
    t('hero.line2'),
    t('hero.subtitle'),
  ];

  const speed = 100;
  const lineDelays = lines.reduce((acc, line, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + lines[i - 1].length * speed + 200;
    acc.push(prev);
    return acc;
  }, []);

  const [lineTexts, setLineTexts] = useState(lines.map(() => ''));
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setLineTexts(lines.map(() => ''));
    setAllComplete(false);
    const timers = [];
    let completedCount = 0;
    
    lines.forEach((line, li) => {
      let i = 0;
      const start = setTimeout(() => {
        const interval = setInterval(() => {
          i++;
          setLineTexts(prev => {
            const next = [...prev];
            next[li] = line.slice(0, i);
            return next;
          });
          if (i >= line.length) {
            clearInterval(interval);
            completedCount++;
            if (completedCount === lines.length) {
              setAllComplete(true);
            }
          }
        }, speed);
        timers.push(interval);
      }, lineDelays[li]);
      timers.push(start);
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, t('hero.line1')]);

  return (
    <div className="w-full p-px rounded-b-[40px] sm:rounded-b-[120px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
      <section ref={sectionRef} className="w-full bg-white flex items-start justify-center pb-0 relative overflow-hidden rounded-b-[39px] sm:rounded-b-[119px]">
        <div className="relative w-full">
          <img 
            src="/cover-websitebar2 1.png" 
            alt="Hero"
            className="w-full h-auto object-cover block"
          />
          
          {/* Text and Buttons overlay */}
          <div className="absolute top-[15%] sm:top-40 md:top-48 lg:top-64 left-4 sm:left-8 md:left-12 lg:left-20 z-10 max-w-[45%] sm:max-w-md">

            <div className="min-h-[120px] sm:min-h-[280px]">
              <h1 className="text-base sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-4">
                <span
                  className="inline-block leading-tight"
                  style={{
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {lineTexts[0]}
                  {lineTexts[0].length < lines[0]?.length && (
                    <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
                  )}
                </span>
                <br />
                <span
                  className="inline-block leading-tight"
                  style={{
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {lineTexts[1]}
                  {lineTexts[1].length < lines[1]?.length && lineTexts[0].length === lines[0]?.length && (
                    <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
                  )}
                </span>
              </h1>

              <p className="text-[10px] sm:text-2xl md:text-3xl font-thin md:font-extralight mb-2 md:mb-8">
                <span className="bg-gradient-to-r from-[#00C3FF] via-[#F600FF] via-[#F600FF] to-[#FF00CC] bg-clip-text text-transparent">
                  {lineTexts[2]}
                  {lineTexts[2].length < lines[2]?.length && lineTexts[1].length === lines[1]?.length && (
                    <span className="inline-block w-[2px] h-[1em] bg-gradient-to-r from-[#00C3FF] via-[#F600FF] to-[#FF00CC] align-middle ml-0.5 animate-pulse" />
                  )}
                </span>
              </p>
            </div>

            {/* Floating Image */}
            <div className="absolute top-[80px] sm:top-[160px] left-0 z-0 pointer-events-none">
              <img 
                src="/background_removed_image_cOJ5pLLfT5SGchOf9rJdfw 1.png" 
                alt="Design Icon"
                className="h-16 sm:h-40 lg:h-30 object-contain"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;