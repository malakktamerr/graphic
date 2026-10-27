
// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { getFreeLectures } from '../../api/freeLectures';

// const CourseCardSection = () => {
//   const { t, i18n } = useTranslation('home');
//   const isAr = i18n.language?.startsWith('ar');
//   const [lectures, setLectures] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isVideoOpen, setIsVideoOpen] = useState(false);
//   const navigate = useNavigate();

//   // Typewriter
//   const [started, setStarted] = useState(false);
//   const sectionRef = useRef(null);
//   const speed = 35;
//   const lines = [t('courseCard.title'), t('courseCard.desc')];
//   const lineDelays = lines.reduce((acc, line, i) => {
//     const prev = i === 0 ? 0 : acc[i - 1] + lines[i - 1].length * speed + 200;
//     acc.push(prev);
//     return acc;
//   }, []);
//   const [lineTexts, setLineTexts] = useState(lines.map(() => ''));

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
//     const timers = [];
//     lines.forEach((line, li) => {
//       let i = 0;
//       const start = setTimeout(() => {
//         const interval = setInterval(() => {
//           i++;
//           setLineTexts(prev => { const next = [...prev]; next[li] = line.slice(0, i); return next; });
//           if (i >= line.length) clearInterval(interval);
//         }, speed);
//         timers.push(interval);
//       }, lineDelays[li]);
//       timers.push(start);
//     });
//     return () => timers.forEach(clearTimeout);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [started, t('courseCard.title')]);

//   useEffect(() => {
//     getFreeLectures()
//       .then(setLectures)
//       .catch(() => setLectures([]));
//   }, []);

//   const activeLecture = lectures?.[activeIndex] ?? null;

//   if (lectures !== null && lectures.length === 0) return null;

//   return (
//     <section ref={sectionRef} className="w-full bg-white py-6 sm:py-8 lg:py-12 px-6 sm:px-10 lg:px-16">
//       <div className="max-w-5xl xl:max-w-7xl mx-auto">
//         {/* Free Lecture Heading - Above Card */}
//         <div className="text-center mb-8 sm:mb-10 lg:mb-12">
//           <h2 className="font-lexend font-bold mb-4 sm:mb-6 break-words" style={{
//             fontSize: 'clamp(1.25rem, 5vw, 4.5rem)',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: '250px auto', // تم تقليل الزوم هنا بتصغير مقاس الخلفية (يمكنك تعديل الرقم حسب الرغبة)
//             backgroundPosition: 'center',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             color: 'transparent',
//             wordBreak: 'break-word',
//             overflowWrap: 'break-word',
//           }}>
//             {lineTexts[0]}
//             {lineTexts[0].length < lines[0].length && (
//               <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//             )}
//           </h2>
//           <p className="text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4 font-semibold" style={{ whiteSpace: 'pre-line', backgroundImage: 'linear-gradient(to right, #888, #000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
//             {lineTexts[1]}
//             {lineTexts[1].length < lines[1].length && (
//               <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//             )}
//           </p>
//         </div>

//         {/* Course Card */}
//         <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/40 overflow-hidden p-4 sm:p-5 lg:p-6">
//           {/* Top Section - Video/Banner with Animated Border */}
//           <div className="relative mb-4 group">
//             {/* Video Container with Border */}
//             <div className="relative w-full aspect-[16/11] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 bg-black">
//               {/* Static Border */}
//               <div className="absolute inset-0 rounded-3xl pointer-events-none z-20" style={{
//                 background: 'linear-gradient(to bottom, #FF0000, #DDFF11, #FF00FF, #00F2FF)',
//                 padding: '2px',
//                 WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                 WebkitMaskComposite: 'xor',
//                 maskComposite: 'exclude',
//               }} />

//               {/* Animated Light on Hover */}
//               <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 border-light-animate" style={{
//                 background: 'linear-gradient(to bottom, transparent, white, transparent)',
//                 padding: '2px',
//                 WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                 WebkitMaskComposite: 'xor',
//                 maskComposite: 'exclude',
//               }} />

//               {/* Skeleton or Thumbnail */}
//               {lectures === null ? (
//                 <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl" />
//               ) : activeLecture?.image_url ? (
//                 <img
//                   src={activeLecture.image_url}
//                   alt={isAr ? activeLecture.name_ar || activeLecture.name : activeLecture.name_en || activeLecture.name}
//                   className="absolute inset-0 w-full h-full object-cover rounded-3xl"
//                 />
//               ) : activeLecture?.video_file_url ? (
//                 <video
//                   src={`${activeLecture.video_file_url}#t=0.1`}
//                   className="absolute inset-0 w-full h-full object-cover rounded-3xl"
//                   preload="metadata"
//                   muted
//                   playsInline
//                 />
//               ) : null}
            
//               {/* Play Button - Centered */}
//               <div className="absolute inset-0 flex items-center justify-center z-30">
//                 <button
//                   onClick={() => activeLecture && setIsVideoOpen(true)}
//                   className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full border-4 border-cyan-300/80 bg-cyan-600/40 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 overflow-hidden backdrop-blur-sm"
//                   aria-label="Play video"
//                 >
//                   <img src="/1182011_555.png" alt="Play" className="w-full h-full object-cover rounded-full" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Lecture tabs if multiple */}
//           {lectures && lectures.length > 1 && (
//             <div className="flex gap-2 mb-4 flex-wrap">
//               {lectures.map((lec, i) => (
//                 <button
//                   key={lec.id}
//                   onClick={() => setActiveIndex(i)}
//                   className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${
//                     i === activeIndex
//                       ? 'bg-black text-white border-black'
//                       : 'bg-white text-black border-gray-300 hover:border-black'
//                   }`}
//                 >
//                   {lec.name}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Time and Students Count */}
//           <div className="flex items-center gap-4 sm:gap-6 mb-4">
//             <div className="flex items-center gap-2">
//               <img src="/clock_5417422 1.png" alt="Time" className="w-3 h-3 sm:w-5 sm:h-5 object-contain mt-0.5 sm:mt-1" />
//               <span className="text-gray-700 text-sm sm:text-base lg:text-lg font-sm leading-none">1 Minute</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <img src="/group_694642 1.png" alt="Students" className="w-5 h-5 sm:w-7 sm:h-7 object-contain mt-0.5 sm:mt-1" />
//               <span className="text-gray-700 text-sm sm:text-base lg:text-lg font-sm leading-none">10,000 Students</span>
//             </div>
//           </div>

//           {/* Bottom Section - Course Details */}
//           <div className="pt-0">
//             {lectures === null ? (
//               <div className="space-y-3">
//                 <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-1/2" />
//                 <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
//                 <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
//                   {activeLecture ? (isAr ? activeLecture.name_ar || activeLecture.name : activeLecture.name_en || activeLecture.name) : 'Free Section'}
//                 </h3>
//                 <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
//                   {activeLecture ? (isAr ? activeLecture.description_ar || activeLecture.description : activeLecture.description_en || activeLecture.description) : ''}
//                 </p>
//               </>
//             )}
            
//             {/* Rating */}
//             <div className="flex items-center gap-2 mb-6">
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                   </svg>
//                 ))}
//               </div>
//               <span className="text-black text-sm sm:text-base">(600,00 review)</span>
//             </div>

//             {/* CTA Button */}
//             <div className="flex justify-end">
//               <button onClick={() => navigate('/course-videos')} className="btn-wave flex items-center bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-lg font-semibold text-sm sm:text-base">
//                 {t('buttons.viewAllCourses', { ns: 'common' })}
//                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Video Modal */}
//         {isVideoOpen && activeLecture && (
//           <div 
//             className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
//             onClick={() => setIsVideoOpen(false)}
//           >
//             <div 
//               className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setIsVideoOpen(false)}
//                 className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
//                 aria-label="Close video"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//               <video className="w-full h-full" controls autoPlay>
//                 <source src={activeLecture.video_file_url} />
//               </video>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CourseCardSection;


import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFreeLectures } from '../../api/freeLectures';

const CourseCardSection = () => {
  const { t, i18n } = useTranslation('home');
  const isAr = i18n.language?.startsWith('ar');
  const [lectures, setLectures] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();

  // Typewriter
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);
  const speed = 35;
  const lines = [t('courseCard.title'), t('courseCard.desc')];
  const lineDelays = lines.reduce((acc, line, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + lines[i - 1].length * speed + 200;
    acc.push(prev);
    return acc;
  }, []);
  const [lineTexts, setLineTexts] = useState(lines.map(() => ''));

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
    const timers = [];
    lines.forEach((line, li) => {
      let i = 0;
      const start = setTimeout(() => {
        const interval = setInterval(() => {
          i++;
          setLineTexts(prev => { const next = [...prev]; next[li] = line.slice(0, i); return next; });
          if (i >= line.length) clearInterval(interval);
        }, speed);
        timers.push(interval);
      }, lineDelays[li]);
      timers.push(start);
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, t('courseCard.title')]);

  useEffect(() => {
    getFreeLectures()
      .then(setLectures)
      .catch(() => setLectures([]));
  }, []);

  const activeLecture = lectures?.[activeIndex] ?? null;

  if (lectures !== null && lectures.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-white py-6 sm:py-8 lg:py-12 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl xl:max-w-7xl mx-auto">
        {/* Free Lecture Heading - Above Card */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="font-lexend font-bold mb-4 sm:mb-6 break-words" style={{
            fontSize: 'clamp(1.25rem, 5vw, 4.5rem)',
            backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
            backgroundSize: '250px auto',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}>
            {lineTexts[0]}
            {lineTexts[0].length < lines[0].length && (
              <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
            )}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4 font-semibold" style={{ whiteSpace: 'pre-line', backgroundImage: 'linear-gradient(to right, #888, #000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
            {lineTexts[1]}
            {lineTexts[1].length < lines[1].length && (
              <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
            )}
          </p>
        </div>

        {/* Course Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/40 overflow-hidden p-4 sm:p-5 lg:p-6">
          {/* Top Section - Video/Banner with Animated Border */}
          <div className="relative mb-4 group">
            {/* Video Container with Border */}
            <div className="relative w-full aspect-[16/11] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 bg-black">
              {/* Static Border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none z-20" style={{
                background: 'linear-gradient(to bottom, #FF0000, #DDFF11, #FF00FF, #00F2FF)',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }} />

              {/* Animated Light on Hover */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 border-light-animate" style={{
                background: 'linear-gradient(to bottom, transparent, white, transparent)',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }} />

              {/* Skeleton or Thumbnail / Video */}
              {lectures === null ? (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl" />
              ) : activeLecture?.image_url ? (
                <img
                  src={activeLecture.image_url}
                  alt={isAr ? activeLecture.name_ar || activeLecture.name : activeLecture.name_en || activeLecture.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                />
              ) : activeLecture?.video_file_url ? (
                <video
                  src={`${activeLecture.video_file_url}#t=0.1`}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                  preload="metadata"
                  muted
                  playsInline
                />
              ) : null}
            
              {/* Dark Transparent Overlay (الطبقة الغامقة الشفافة) */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none z-25" />

              {/* Play Button - Centered */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <button
                  onClick={() => activeLecture && setIsVideoOpen(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 border border-white/40 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-200 cursor-pointer"
                  aria-label="Play video"
                >
                  <svg 
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white translate-x-0.5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Lecture tabs if multiple */}
          {lectures && lectures.length > 1 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {lectures.map((lec, i) => (
                <button
                  key={lec.id}
                  onClick={() => setActiveIndex(i)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${
                    i === activeIndex
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {lec.name}
                </button>
              ))}
            </div>
          )}

          {/* Time and Students Count */}
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <div className="flex items-center gap-2">
              <img src="/clock_5417422 1.png" alt="Time" className="w-3 h-3 sm:w-5 sm:h-5 object-contain mt-0.5 sm:mt-1" />
              <span className="text-gray-700 text-sm sm:text-base lg:text-lg font-sm leading-none">1 Minute</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/group_694642 1.png" alt="Students" className="w-5 h-5 sm:w-7 sm:h-7 object-contain mt-0.5 sm:mt-1" />
              <span className="text-gray-700 text-sm sm:text-base lg:text-lg font-sm leading-none">10,000 Students</span>
            </div>
          </div>

          {/* Bottom Section - Course Details */}
          <div className="pt-0">
            {lectures === null ? (
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-1/2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              </div>
            ) : (
              <>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
                  {activeLecture ? (isAr ? activeLecture.name_ar || activeLecture.name : activeLecture.name_en || activeLecture.name) : 'Free Section'}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                  {activeLecture ? (isAr ? activeLecture.description_ar || activeLecture.description : activeLecture.description_en || activeLecture.description) : ''}
                </p>
              </>
            )}
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-black text-sm sm:text-base">(600,00 review)</span>
            </div>

            {/* CTA Button */}
            <div className="flex justify-end">
              <button onClick={() => navigate('/course-videos')} className="btn-wave flex items-center bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-lg font-semibold text-sm sm:text-base cursor-pointer">
                {t('buttons.viewAllCourses', { ns: 'common' })}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && activeLecture && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10 cursor-pointer"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video className="w-full h-full" controls autoPlay>
                <source src={activeLecture.video_file_url} />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCardSection;