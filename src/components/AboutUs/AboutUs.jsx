

// import { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../../hooks/useLanguage';
// import InstructorAbout from '../../Home/Sections/InstructorAbout';
// import ServicesSection from '../../Home/Sections/ServicesSection';
// import PortfolioSection from '../../Home/Sections/PortfolioSection';
// import TestimonialsSection from '../../Home/Sections/TestimonialsSection';
// import TraineesShowcase from '../../Home/Sections/TraineesShowcase';

// function parseCountValue(str) {
//   const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
//   const suffix = str.replace(/[0-9]/g, '');
//   return { num: isNaN(num) ? 0 : num, suffix };
// }

// function AnimatedStat({ value, className, style }) {
//   const ref = useRef(null);
//   const [started, setStarted] = useState(false);
//   const [display, setDisplay] = useState(0);
//   const { num, suffix } = parseCountValue(value);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     let animating = false;
//     let timer;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           if (animating) return;
//           setDisplay(0);
//           animating = true;
//           const duration = 1000;
//           const step = 16;
//           const totalSteps = duration / step;
//           const increment = num / totalSteps;
//           let current = 0;
//           timer = setInterval(() => {
//             current += increment;
//             if (current >= num) {
//               setDisplay(num);
//               clearInterval(timer);
//               timer = null;
//             } else {
//               setDisplay(Math.floor(current));
//             }
//           }, step);
//         } else {
//           if (timer) { clearInterval(timer); timer = null; }
//           animating = false;
//           setDisplay(0);
//         }
//       },
//       { threshold: 0.3 }
//     );
//     obs.observe(el);
//     return () => { obs.disconnect(); if (timer) clearInterval(timer); };
//   }, [num]);

//   return (
//     <h3 ref={ref} className={className} style={style}>
//       {display}{suffix}
//     </h3>
//   );
// }

// const pillarImages = ["/71.png", "/pmg.png", "/Mak group.png", "/Mask roup (12).png"];

// const pillarTitles = [
//   "A deep understanding of the psychology of the Gulf market",
//   "Business of Design methodology",
//   "Real-world agency simulation",
//   "A lifetime asset that grows forever",
// ];

// const pillarTextsEn = [
//   "We don't teach general design; we reveal the secrets of refined taste and high-quality standards demanded by leading companies in the Arab world.",
//   "Talent alone is not enough. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education.",
//   "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry.",
//   "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated with AI technologies.",
// ];

// const MobilePillarsCarousel = ({ isAr, pillarTextsAr, pillarTitlesAr }) => {
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const start = () => {
//       autoScrollRef.current = setInterval(() => {
//         if (!el) return;
//         const max = el.scrollWidth - el.clientWidth;
//         if (el.scrollLeft >= max - 10) {
//           el.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
//         }
//       }, 3000);
//     };
//     start();
//     const pause = () => clearInterval(autoScrollRef.current);
//     const resume = () => start();
//     el.addEventListener('touchstart', pause);
//     el.addEventListener('touchend', resume);
//     return () => {
//       clearInterval(autoScrollRef.current);
//       el.removeEventListener('touchstart', pause);
//       el.removeEventListener('touchend', resume);
//     };
//   }, []);

//   return (
//     <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1 relative z-10">
//       {pillarImages.map((image, i) => (
//         <div key={i} className="flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden bg-black snap-center relative">
//           <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//           <img src={image} alt={pillarTitles[i]} className="w-full h-40 object-cover" />
//           <div className="p-4" dir={isAr ? 'rtl' : 'ltr'}>
//             <div className="flex items-start gap-2 mb-2">
//               <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9FE422] flex items-center justify-center mt-0.5">
//                 <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//               </span>
//               <h3 className="font-bold text-sm" style={isAr ? {
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                 } : { color: 'white' }}>
//                 {isAr ? pillarTitlesAr[i] : pillarTitles[i]}
//               </h3>
//             </div>
//             <p className="text-gray-300 text-xs leading-relaxed">
//               {isAr ? pillarTextsAr[i] : pillarTextsEn[i]}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// function AboutUs() {
//   const { isAr } = useLanguage();
//   const { t } = useTranslation('aboutus');
//   const visionRef = useRef(null);
//   const [visionStarted, setVisionStarted] = useState(false);
//   const [visionTexts, setVisionTexts] = useState(['', '']);

//   const visionLines = isAr
//     ? ['سد الفجوة بين إتقان الأداة', 'وإتقان الأعمال']
//     : ['Bridging the gap between mastering', 'the tool and mastering the business'];

//   useEffect(() => {
//     setVisionTexts(['', '']);
//     setVisionStarted(false);
//   }, [isAr]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisionStarted(true); },
//       { threshold: 0.3 }
//     );
//     if (visionRef.current) observer.observe(visionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!visionStarted) return;
//     const speed = 60;
//     const timers = [];
//     visionLines.forEach((line, li) => {
//       const delay = li === 0 ? 0 : visionLines[0].length * speed + 200;
//       let i = 0;
//       const start = setTimeout(() => {
//         const interval = setInterval(() => {
//           i++;
//           setVisionTexts(prev => {
//             const next = [...prev];
//             next[li] = line.slice(0, i);
//             return next;
//           });
//           if (i >= line.length) clearInterval(interval);
//         }, speed);
//         timers.push(interval);
//       }, delay);
//       timers.push(start);
//     });
//     return () => timers.forEach(clearTimeout);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [visionStarted, isAr]);
//   return (
//     <div className="min-h-screen bg-white">
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative">
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/nasr.png" 
//             alt="Courses Cover"
//           />
//           {/* Mobile overlay */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:hidden">
//             {!isAr && (
//               <h1 className="font-bold text-center mb-3" style={{ 
//                 fontSize: 'clamp(36px, 12vw, 64px)',
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 About Us
//               </h1>
//             )}
//             <p dir={isAr ? 'ltr' : undefined} className={`text-sm font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-left px-12' : 'text-center'}`}>
//               {isAr ? (
//                 <>
//                   نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
//                   نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
//                   على أســـواق الخليج والأســــواق<br />
//                   <span className="block text-left">العالميــــة.</span>
//                 </>
//               ) : (
//                 <>
//                   We don't just teach design we<br />
//                   unleash elite designers to lead<br />
//                   and dominate Gulf and global<br />
//                   markets.
//                 </>
//               )}
//             </p>
//           </div>
//           {/* Desktop overlay */}
//           <div className="hidden md:flex absolute inset-0 items-center justify-center -ml-64 -mt-72 md:-mt-96">
//             <div className={`text-white font-lexend max-w-2xl ${isAr ? 'text-right' : 'text-left'}`}>
//               {!isAr && (
//                 <h1 className="inline-block font-bold leading-[1.01] whitespace-nowrap" style={{ 
//                   fontSize: 'clamp(42px, 10vw, 128px)',
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   transform: 'translateX(-2vw)'
//                 }}>
//                   About Us
//                 </h1>
//               )}
//               <p 
//   className={`mt-6 text-lg md:text-2xl lg:text-4xl font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-right' : 'text-center'}`} 
//   style={isAr ? { transform: 'translate(-160px, 25px)' } : {}}
// >
//   {isAr ? (
//     <>
//       نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
//       نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
//       على أســـواق الخليج والأســــواق<br />
//       <span className="block text-right">العالميــــة.</span>
//     </>
//   ) : (
//     <>
//       We don't just teach design we<br />
//       unleash elite designers to lead<br />
//       and dominate Gulf and global<br />
//       markets.
//     </>
//   )}
// </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Our Vision Section */}
//       <section className="w-full bg-white py-12 md:py-16 mb-24 mt-24">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <div className="inline-block mb-8 relative p-[3px] rounded-[60px] animated-border" style={{
//             background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//             backgroundSize: '300% 300%',
//           }}>
//             <style>{`
//               @keyframes borderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .animated-border:hover {
//                 animation: borderMove 3s ease infinite;
//               }
//             `}</style>
//             <div className="bg-white rounded-[58px] p-[6px]">
//               <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                 <img src="/nzrzOfxWPwo 1.png" alt="Vision Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h2 className="text-3xl md:text-5xl font-bold text-white">
//                     {isAr ? 'رؤيتنا' : 'Our vision'}
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="max-w-4xl mx-auto" ref={visionRef}>
//             <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ lineHeight: isAr ? '2.2' : '1.8' }}>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[0]}
//                 {visionTexts[0].length < visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[1]}
//                 {visionTexts[1].length < visionLines[1].length && visionTexts[0].length === visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//             </h3>
//           </div>
//         </div>
//       </section>
      
//       {/* Mission Section with Images */}
//       <section className="w-full bg-white pt-4 md:pt-6 pb-1 md:pb-16 lg:pb-20 overflow-x-hidden -mt-16 md:-mt-24 lg:-mt-32 relative z-10">
//   <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//     <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-8 lg:gap-12 items-start">
      
//       {/* Left Image */}
//       <div className="flex justify-center">
//         <div className="animated-border-img p-[1px] rounded-3xl" style={{
//           background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//           backgroundSize: '300% 300%',
//         }}>
//           <img src="/Mask group (11).png" alt="Designer working" className="w-full max-w-md h-auto object-cover rounded-3xl" />
//         </div>
//       </div>

//       {/* Center Text Content */}
//       <div className="text-center px-2 flex flex-col items-center justify-start mt-0" style={{ gap: isAr ? '24px' : '8px' }}>
//         {(isAr ? [
//           "بينما ينشغل العالم بتعليم",
//           "استخدام البرامج، تركز رؤيتنا",
//           "على تنمية نخبة من المصممين",
//           "الذين يفهمون الغاية من التصميم.",
//           "",
//           "نسعى لأن نكون الجسر",
//           "الذي يُمكّن المصممين العرب",
//           "من الانتقال من التعلم العشوائي",
//           "إلى الاحترافية التي تتمتع",
//           "بها الوكالات العالمية.",
//         ] : [
//           "While the world is preoccupied",
//           "with teaching how to use",
//           "software, our vision is focused",
//           "on cultivating an elite group",
//           "that understands the purpose",
//           "of design.",
//           "We aspire to be the bridge",
//           "that allows Arab designers to",
//           "move from haphazard",
//           "learning to the professionalism",
//           "of global agencies.",
//         ]).map((line, i) => (
//           <span key={i} className="block font-bold leading-snug"
//             style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 2vw, 36px)', backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}>
//             {line}
//           </span>
//         ))}
//       </div>

//       {/* Right Image */}
//       <div className="flex justify-center">
//         <div className="animated-border-img p-[1px] rounded-3xl" style={{
//           background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//           backgroundSize: '300% 300%',
//         }}>
//           <img src="/Mask group (8).png" alt="Designer with tablet" className="w-full max-w-md h-auto object-cover rounded-3xl" />
//         </div>
//       </div>

//     </div>
//   </div>
// </section>







//       {/* Our Mission Section */}
//       <section className="w-full bg-white py-8 md:py-12 mt-16">
//         <div className="w-full">
//           {/* Our Mission Badge */}
//           <div className="flex justify-center mb-24">
//             <div className="inline-block relative p-[2px] rounded-[60px] animated-border-mission2" style={{
//               background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//               backgroundSize: '300% 300%',
//             }}>
//               <style>{`
//                 @keyframes borderMoveMission2 {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .animated-border-mission2:hover {
//                   animation: borderMoveMission2 3s ease infinite;
//                 }
//               `}</style>
//               <div className="bg-white rounded-[58px] p-[6px]">
//                 <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                   <img src="/nzrzOfxWPwo 1.png" alt="Mission Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-black">{t('mission.badge')}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Image with Overlay and Animated Border Box */}
//           <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1441/593' }}>
//             <img src="/i-want-to-find-a-place-where-there-are-y_-i9BElK5RRCc7L2AYEM1VQ_lITVPwkFSIe_yfevqvJAwA_cover 1.png" alt="Our Mission" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-black/70"></div>
//             <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}></div>
//             <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
//               <style>{`
//                 @keyframes moveBorder {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .mission-border-anim {
//                   background: linear-gradient(135deg, #0000EA, #FF00E5, #00ffff, #FF00E5, #0000EA);
//                   background-size: 300% 300%;
//                   animation: moveBorder 3s ease infinite;
//                 }
//               `}</style>
//               {/* Mobile */}
//               <div className="md:hidden w-full relative flex items-center p-4 rounded-2xl">
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed text-sm">
//                   {t('mission.mobile')}
//                 </p>
//               </div>
//               {/* Desktop */}
//               <div className="hidden md:flex" style={{ width: '1400px', maxWidth: '90%', height: '350px', position: 'relative', alignItems: 'center', padding: '40px', marginLeft: isAr ? 'auto' : '5%', marginRight: isAr ? '5%' : 'auto' }}>
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed" style={{ fontSize: '36px', whiteSpace: 'pre-line' }}>
//                   {t('mission.desktop')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

      
//       {/* Secret Section */}
//       <section className="w-full bg-white py-12 md:py-16">
//         <div className="w-full px-6 sm:px-8 lg:px-12">
//           <div className="relative w-full max-w-[1031px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '1031/509' }}>
//             <div className="secret-border-anim" style={{
//               position: 'absolute', inset: 0, borderRadius: '20px', padding: '3px', zIndex: 10,
//               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//               WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//             }} />
//             <style>{`
//               @keyframes secretBorderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .secret-border-anim {
//                 background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//                 background-size: 300% 300%;
//                 animation: secretBorderMove 3s ease infinite;
//               }
//             `}</style>
//             <img src="/in4.png" alt="Secret Section" className="w-full h-full object-cover rounded-3xl scale-x-[-1]" />
//             {/* Mobile text */}
//             <div className="absolute inset-0 flex items-center justify-center px-4 md:hidden" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-lg leading-snug text-center">
//                 {t('secret.mobile')}
//               </h2>
//             </div>
//             {/* Desktop text */}
//             <div className="hidden md:flex absolute inset-0 items-center justify-start px-10" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug" style={{ transform: 'translateY(1%)', whiteSpace: 'pre-line' }}>
//                 {t('secret.desktop')}
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Philosophy Section */}
//       <section className="w-full py-16 md:py-24 bg-white -mt-10 md:-mt-16 lg:-mt-20 relative z-10">
//   <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-0">
//     {t('philosophy.lines', { returnObjects: true }).map((line, i) => (
//       <span key={i} className="font-bold leading-relaxed" style={{
//         fontSize: 'clamp(20px, 2.5vw, 36px)',
//         backgroundImage: 'linear-gradient(to right, #000000, #888888)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         display: 'block',
//       }}>{line}</span>
//     ))}
//   </div>
// </section>

//       {/* Four Pillars Section */}
//       <section className="w-full bg-white py-12 md:py-16 relative mt-16">
//         {/* Background Ellipse */}
//         <img 
//           src="/Ellipse 65.png" 
//           alt="" 
//           className="absolute left-1/2 pointer-events-none"
//           style={{ width: 'min(1432.6px, 100%)', height: 'auto', minHeight: '550px', zIndex: 0, top: '-15%', transform: 'translateX(-50%)', clipPath: 'inset(0 0 25% 0)' }}
//         />
//         <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8 relative z-10">
//         <style>{`
//             @keyframes pillarBorderMove {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .pillar-border-anim {
//               background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: pillarBorderMove 3s ease infinite;
//             }
//           `}</style>

//           {/* ── MOBILE: auto-scroll carousel ── */}
//           <MobilePillarsCarousel isAr={isAr} pillarTextsAr={[
//             t('pillars.pillar1.text'),
//             t('pillars.pillar2.text'),
//             t('pillars.pillar3.text'),
//             t('pillars.pillar4.text'),
//           ]} pillarTitlesAr={[
//             t('pillars.pillar1.title'),
//             t('pillars.pillar2.title'),
//             t('pillars.pillar3.title'),
//             t('pillars.pillar4.title'),
//           ]} />

//           {/* ── DESKTOP: stacked layout ── */}
//           <div className="hidden md:flex flex-col gap-8 relative z-10">
//           {/* Pillar 1 - Image Left, Text Right */}
//           <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//             <div className="md:w-[45%] flex-shrink-0 relative">
//               <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//               <img src={pillarImages[0]} alt="Gulf Market" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//             </div>
//             <div className="flex-1 p-6 md:p-8 flex flex-col justify-start">
//               <div className="flex items-start gap-2 mb-3">
//                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center mt-1">
//                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                 </span>
//                 <h3 className="font-bold text-base md:text-xl md:whitespace-nowrap" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                   {isAr ? t('pillars.pillar1.title') : <>A deep understanding of the psychology of<br className="hidden md:block" /> the Gulf market:</>}
//                 </h3>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar1.text') : "We don't teach general design; rather, we reveal to you the secrets of refined taste and the high-quality standards demanded by leading companies in the Arab world. Our goal is for you to master the \"language of the market,\" so you become a designer understood and appreciated by clients at first glance."}</p>
//             </div>
//           </div>

//           {/* Pillar 2 - Text Left, Image Right */}
//           <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//             <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                 </span>
//                 <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                   {isAr ? t('pillars.pillar2.title') : 'Business of Design methodology:'}
//                 </h3>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar2.text') : "Talent alone is not enough. The biggest gap in our region is the talented designer who doesn't know how to sell themselves or their project. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education, transforming you from an order fulfiller to a technical consultant who leads projects and makes decisions with confidence."}</p>
//             </div>
//             <div className="md:w-[45%] flex-shrink-0 relative">
//               <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//               <img src={pillarImages[1]} alt="Business of Design" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//             </div>
//           </div>

//           {/* Pillar 3 - Image Left, Text Right */}
//           <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//             <div className="md:w-[45%] flex-shrink-0 relative">
//               <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//               <img src={pillarImages[2]} alt="Real-world agency" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//             </div>
//             <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                 </span>
//                 <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                   {isAr ? t('pillars.pillar3.title') : 'Real-world agency simulation (Real-world Workflow):'}
//                 </h3>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar3.text') : "True learning begins when theorizing stops. Our projects aren't just academic exercises; they're a realistic simulation of the creative agencies industry. You'll learn how to build strategy and present your work professionally, ensuring you stand out and land the biggest projects."}</p>
//             </div>
//           </div>

//           {/* Pillar 4 - Text Left, Image Right */}
//           <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//             <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                 </span>
//                 <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                   {isAr ? t('pillars.pillar4.title') : 'A lifetime asset that grows forever.'}
//                 </h3>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar4.text') : "Subscribing to our service isn't just about accessing educational videos; it's about acquiring a lasting professional asset. Our content is constantly updated to keep pace with AI technologies and market changes, ensuring you always stay ahead, at no extra cost."}</p>
//             </div>
//             <div className="md:w-[45%] flex-shrink-0 relative">
//               <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//               <img src={pillarImages[3]} alt="Lifetime asset" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//             </div>
//           </div>
//           </div>
//         </div>
//       </section>

//       {/* Instructor About Section */}
//       <InstructorAbout hideWho={true} />

//     <ServicesSection /> 
// <PortfolioSection />
//       {/* New Section with Subtract Image */}
//       <section className="w-full bg-white py-12 md:py-16 lg:py-20">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//           {/* Title */}
//           <div className="relative inline-block w-full text-center mb-12 md:mb-32">
//             <h2 className="relative text-center font-bold" style={{
//               fontSize: 'clamp(36px, 6vw, 96px)',
//               fontFamily: 'Lexend',
//               lineHeight: 1.1,
//               backgroundImage: 'url(/nzrzOfxWPwo.png)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               color: 'transparent',
//               WebkitTextFillColor: 'transparent',
//             }}>
//               {t('impact.title').split('\n').map((line, i) => (
//                 <span key={i}>{line}{i === 0 && <br />}</span>
//               ))}
//             </h2>
//           </div>

//           {/* Mobile: clean stacked stats */}
//           <div className="md:hidden flex flex-col gap-8">
//             <div className="flex flex-col">
//               <AnimatedStat value={t('impact.stat1.value')} className="font-light" style={{ fontFamily: 'Lexend', fontSize: '64px', lineHeight: '100%', backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} />
//               <div className="w-full h-0.5 mt-2" style={{ background: 'linear-gradient(to right, #E6A326 0%, #E9DB69 50%, #000000 50%, #000000 100%)' }}></div>
//               <p className="mt-2 font-semibold text-sm">{t('impact.stat1.label')}</p>
//             </div>
//             <div className="flex flex-col">
//               <AnimatedStat value={t('impact.stat2.value')} className="font-light" style={{ fontFamily: 'Lexend', fontSize: '64px', lineHeight: '100%', backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} />
//               <div className="w-full h-0.5 mt-2" style={{ background: 'linear-gradient(to right, #E6A326 0%, #E9DB69 50%, #000000 50%, #000000 100%)' }}></div>
//               <p className="mt-2 font-semibold text-sm">{t('impact.stat2.label')}</p>
//             </div>
//           </div>

//           {/* Desktop: original layout */}
//           <div className="hidden md:flex justify-center items-center">
//             <div className="flex flex-row gap-32" style={{ direction: 'ltr' }}>
//                 <div className="flex flex-col">
//                   <div className="flex items-center gap-3">
//                     <AnimatedStat value={t('impact.stat1.value')} className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px]" style={{ fontFamily: 'Lexend', fontWeight: 200, lineHeight: '100%', backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} />
//                   </div>
//                   <div className="w-full h-0.5 mt-2" style={{ background: 'linear-gradient(to right, #E6A326 0%, #E9DB69 50%, #000000 50%, #000000 100%)' }}></div>
//                   <p className="mt-2" style={{ fontWeight: 600, fontSize: 'clamp(14px, 1.5vw, 24px)', whiteSpace: 'pre-line' }}>
//                     {t('impact.stat1.label')}
//                   </p>
//                 </div>
//                 <div className="flex flex-col">
//                   <div className="flex items-center gap-3">
//                     <AnimatedStat value={t('impact.stat2.value')} className="" style={{ fontFamily: 'Lexend', fontWeight: 200, fontSize: '96px', lineHeight: '100%', backgroundImage: 'linear-gradient(to right, #E6A326, #E9DB69, #E29C14)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} />
//                   </div>
//                   <div className="w-full h-0.5 mt-2" style={{ background: 'linear-gradient(to right, #E6A326 0%, #E9DB69 50%, #000000 50%, #000000 100%)' }}></div>
//                   <p className="mt-2" style={{ fontWeight: 600, fontSize: 'clamp(14px, 1.5vw, 24px)', whiteSpace: 'pre-line' }}>
//                     {t('impact.stat2.label')}
//                   </p>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Experience Section */}
//       <section className="w-full bg-white py-12 md:py-16">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

//           {/* Mobile layout */}
//           <div className="md:hidden flex flex-col items-center gap-6 text-center">
//             <div className="relative flex items-center justify-center">
//               <div className="bg-black rounded-2xl px-6 py-4 flex items-center gap-3 overflow-hidden">
//                 <span className="text-white font-black tracking-widest text-xs" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}>EXPERIENCE</span>
//                 {/* Number 8 with split color like desktop */}
//                 <div className="relative" style={{ fontSize: '120px', fontWeight: 900, lineHeight: 1 }}>
//                   <span style={{
//                     position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'hidden',
//                     backgroundImage: 'linear-gradient(to right, #CCCCCC, #FFFFFF)',
//                     WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
//                     fontSize: '120px', fontWeight: 900, lineHeight: 1, zIndex: 1,
//                   }}>8</span>
//                   <span style={{
//                     position: 'absolute', right: 0, top: 0, width: '50%', overflow: 'hidden',
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center bottom',
//                     WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
//                     fontSize: '120px', fontWeight: 900, lineHeight: 1, direction: 'rtl', zIndex: 1,
//                   }}>8</span>
//                   <span style={{ visibility: 'hidden', fontSize: '120px', fontWeight: 900, lineHeight: 1 }}>8</span>
//                 </div>
//               </div>
//             </div>
//             <h2 className="text-black font-bold text-3xl" style={{ whiteSpace: 'pre-line' }}>{t('experience.label')}</h2>
//             <p className="text-gray-600 text-sm max-w-xs" style={{ whiteSpace: 'pre-line' }}>
//               {t('experience.description')}
//             </p>
//           </div>

//           {/* Desktop layout - original unchanged */}
//           <div className="hidden md:flex flex-col items-center justify-center gap-8" style={{ transform: 'translateX(80px)', direction: 'ltr' }}>
//             <div className="flex flex-row items-center gap-8 md:gap-16">
//               <div className="relative flex-shrink-0 mt-12" style={{ width: '430px', height: '430px', overflow: 'visible' }}>
//                 <div className="absolute inset-0 bg-black" style={{ zIndex: 0, transform: 'translateX(-95px)' }}></div>
//                 <div className="absolute top-0 bottom-0 flex items-center justify-center" style={{ zIndex: 10, height: '100%', left: '-126px' }}>
//                   <span className="text-white tracking-widest" style={{
//                     writingMode: 'vertical-rl', transform: 'rotate(180deg)',
//                     fontSize: 'clamp(30px, 5vw, 65px)', letterSpacing: '0.07em', fontWeight: 900,
//                     height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                   }}>EXPERIENCE</span>
//                 </div>
//                 <div className="absolute inset-0 flex items-center justify-center" style={{ overflow: 'visible', zIndex: 1 }}>
//                   <div className="relative" style={{ fontSize: 'clamp(250px, 45vw, 680px)', fontWeight: 900, lineHeight: 1, transform: isAr ? 'translateX(120px) translateY(40px)' : 'translateX(120px)', direction: 'ltr' }}>
//                     <span style={{
//                       position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'visible',
//                       backgroundImage: 'linear-gradient(to right, #CCCCCC, #FFFFFF)',
//                       WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
//                       fontSize: 'clamp(250px, 45vw, 600px)', fontWeight: 900, lineHeight: 1, zIndex: 1,
//                     }}>8</span>
//                     <span style={{
//                       position: 'absolute', right: 0, top: 0, width: '50%', overflow: 'visible',
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center bottom',
//                       WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
//                       fontSize: 'clamp(250px, 45vw, 600px)', fontWeight: 900, lineHeight: 1, direction: 'rtl', zIndex: 1,
//                     }}>8</span>
//                     <span style={{ visibility: 'hidden', fontSize: 'clamp(250px, 45vw, 600px)', fontWeight: 900, lineHeight: 1 }}>8</span>
//                   </div>
//                 </div>
//               </div>
//               <h2 className="font-bold" style={{ fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.1, transform: 'translateX(60px)', whiteSpace: 'pre-line' }}>
//                 {isAr ? (
//                   <>
//                     <span className="text-black">سنوات</span>
//                     <br />
//                     <span style={{
//                       backgroundImage: 'url(/nzrzOfxWPwo.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     }}>الخبرة</span>
//                   </>
//                 ) : t('experience.label')}
//               </h2>
//             </div>
//             <p className="text-gray-600 text-left" style={{ transform: 'translateX(-250px)', maxWidth: '430px', fontSize: 'clamp(14px, 1.5vw, 24px)', whiteSpace: 'pre-line' }}>
//               {isAr ? (
//                 <>
//                   {t('experience.description').split('\n')[0]}<span style={{ unicodeBidi: 'embed', direction: 'ltr' }}>...</span>
//                   {'\n'}{t('experience.description').split('\n')[1]}
//                 </>
//               ) : t('experience.description')}
//             </p>
//           </div>

//         </div>
//       </section>

      
// <TraineesShowcase />
// <TestimonialsSection />
//       {/* Our Values Section */}
//       <section className="lg:block w-full bg-white relative">
//         <div className="relative w-full">
//           <img src="/professional-portrait-of-a-gulf-woman-st_VMTN33Z4RIao7LQi0EaSVA_9T8J_OzSQ7GRNT_78pt7yg_4k 1.png" alt="Our Values" className="w-full h-auto object-cover" style={{ transform: isAr ? 'translateX(-1%) scaleX(-1)' : 'translateX(-1%)' }} />
//           <div className={`absolute top-24 md:top-32 lg:top-48 ${isAr ? 'right-8 md:right-12 lg:right-[180px]' : 'left-8 md:left-12 lg:left-[180px]'}`}>
//             <div className="border border-white bg-black/5 backdrop-blur-md flex flex-col justify-center" style={{ width: '950px', height: '350px', borderRadius: '16px' }}>
//               <div className={`px-8 ${isAr ? 'text-right' : 'text-left'}`}>
//                 <div className="flex items-center gap-4 mb-4">
//                   <h2 className="text-white" style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: '96px', lineHeight: '100%' }}>{t('values.title')}</h2>
                  
//                 </div>
//                 <div className="flex gap-3 mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                       <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <div className="w-1/2 h-px bg-white mb-4"></div>
//                 <p className="text-xl text-white font-medium">{t('values.subtitle')}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

     
//     </div>
//   );
// }

// export default AboutUs;








// import { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../../hooks/useLanguage';
// import InstructorAbout from '../../Home/Sections/InstructorAbout';
// import ServicesSection from '../../Home/Sections/ServicesSection';
// import PortfolioSection from '../../Home/Sections/PortfolioSection';
// import TestimonialsSection from '../../Home/Sections/TestimonialsSection';
// import TraineesShowcase from '../../Home/Sections/TraineesShowcase';

// function parseCountValue(str) {
//   const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
//   const suffix = str.replace(/[0-9]/g, '');
//   return { num: isNaN(num) ? 0 : num, suffix };
// }

// function AnimatedStat({ value, className, style }) {
//   const ref = useRef(null);
//   const [started, setStarted] = useState(false);
//   const [display, setDisplay] = useState(0);
//   const { num, suffix } = parseCountValue(value);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     let animating = false;
//     let timer;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           if (animating) return;
//           setDisplay(0);
//           animating = true;
//           const duration = 1000;
//           const step = 16;
//           const totalSteps = duration / step;
//           const increment = num / totalSteps;
//           let current = 0;
//           timer = setInterval(() => {
//             current += increment;
//             if (current >= num) {
//               setDisplay(num);
//               clearInterval(timer);
//               timer = null;
//             } else {
//               setDisplay(Math.floor(current));
//             }
//           }, step);
//         } else {
//           if (timer) { clearInterval(timer); timer = null; }
//           animating = false;
//           setDisplay(0);
//         }
//       },
//       { threshold: 0.3 }
//     );
//     obs.observe(el);
//     return () => { obs.disconnect(); if (timer) clearInterval(timer); };
//   }, [num]);

//   return (
//     <h3 ref={ref} className={className} style={style}>
//       {display}{suffix}
//     </h3>
//   );
// }

// const pillarImages = ["/71.png", "/pmg.png", "/Mak group.png", "/Mask roup (12).png"];

// const pillarTitles = [
//   "A deep understanding of the psychology of the Gulf market",
//   "Business of Design methodology",
//   "Real-world agency simulation",
//   "A lifetime asset that grows forever",
// ];

// const pillarTextsEn = [
//   "We don't teach general design; we reveal the secrets of refined taste and high-quality standards demanded by leading companies in the Arab world.",
//   "Talent alone is not enough. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education.",
//   "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry.",
//   "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated with AI technologies.",
// ];

// const MobilePillarsCarousel = ({ isAr, pillarTextsAr, pillarTitlesAr }) => {
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const start = () => {
//       autoScrollRef.current = setInterval(() => {
//         if (!el) return;
//         const max = el.scrollWidth - el.clientWidth;
//         if (el.scrollLeft >= max - 10) {
//           el.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
//         }
//       }, 3000);
//     };
//     start();
//     const pause = () => clearInterval(autoScrollRef.current);
//     const resume = () => start();
//     el.addEventListener('touchstart', pause);
//     el.addEventListener('touchend', resume);
//     return () => {
//       clearInterval(autoScrollRef.current);
//       el.removeEventListener('touchstart', pause);
//       el.removeEventListener('touchend', resume);
//     };
//   }, []);

//   return (
//     <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1 relative z-10">
//       {pillarImages.map((image, i) => (
//         <div key={i} className="flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden bg-black snap-center relative">
//           <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//           <img src={image} alt={pillarTitles[i]} className="w-full h-40 object-cover" />
//           <div className="p-4" dir={isAr ? 'rtl' : 'ltr'}>
//             <div className="flex items-start gap-2 mb-2">
//               <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9FE422] flex items-center justify-center mt-0.5">
//                 <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//               </span>
//               <h3 className="font-bold text-sm" style={isAr ? {
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               } : { color: 'white' }}>
//                 {isAr ? pillarTitlesAr[i] : pillarTitles[i]}
//               </h3>
//             </div>
//             <p className="text-gray-300 text-xs leading-relaxed">
//               {isAr ? pillarTextsAr[i] : pillarTextsEn[i]}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// function AboutUs() {
//   const { isAr } = useLanguage();
//   const { t } = useTranslation('aboutus');
//   const visionRef = useRef(null);
//   const [visionStarted, setVisionStarted] = useState(false);
//   const [visionTexts, setVisionTexts] = useState(['', '']);

//   const visionLines = isAr
//     ? ['سد الفجوة بين إتقان الأداة', 'وإتقان الأعمال']
//     : ['Bridging the gap between mastering', 'the tool and mastering the business'];

//   useEffect(() => {
//     setVisionTexts(['', '']);
//     setVisionStarted(false);
//   }, [isAr]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisionStarted(true); },
//       { threshold: 0.3 }
//     );
//     if (visionRef.current) observer.observe(visionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!visionStarted) return;
//     const speed = 60;
//     const timers = [];
//     visionLines.forEach((line, li) => {
//       const delay = li === 0 ? 0 : visionLines[0].length * speed + 200;
//       let i = 0;
//       const start = setTimeout(() => {
//         const interval = setInterval(() => {
//           i++;
//           setVisionTexts(prev => {
//             const next = [...prev];
//             next[li] = line.slice(0, i);
//             return next;
//           });
//           if (i >= line.length) clearInterval(interval);
//         }, speed);
//         timers.push(interval);
//       }, delay);
//       timers.push(start);
//     });
//     return () => timers.forEach(clearTimeout);
//   }, [visionStarted, isAr]);

//   return (
//     <div className="min-h-screen bg-white space-y-12 md:space-y-16">
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative">
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/nasr.png" 
//             alt="Courses Cover"
//           />
//           {/* Mobile overlay */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:hidden">
//             {!isAr && (
//               <h1 className="font-bold text-center mb-3" style={{ 
//                 fontSize: 'clamp(36px, 12vw, 64px)',
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 About Us
//               </h1>
//             )}
//             <p dir={isAr ? 'ltr' : undefined} className={`text-sm font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-left px-12' : 'text-center'}`}>
//               {isAr ? (
//                 <>
//                   نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
//                   نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
//                   على أســـواق الخليج والأســــواق<br />
//                   <span className="block text-left">العالميــــة.</span>
//                 </>
//               ) : (
//                 <>
//                   We don't just teach design we<br />
//                   unleash elite designers to lead<br />
//                   and dominate Gulf and global<br />
//                   markets.
//                 </>
//               )}
//             </p>
//           </div>
//           {/* Desktop overlay */}
//           <div className="hidden md:flex absolute inset-0 items-center justify-center -ml-64 -mt-72 md:-mt-96">
//             <div className={`text-white font-lexend max-w-2xl ${isAr ? 'text-right' : 'text-left'}`}>
//               {!isAr && (
//                 <h1 className="inline-block font-bold leading-[1.01] whitespace-nowrap" style={{ 
//                   fontSize: 'clamp(42px, 10vw, 128px)',
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   transform: 'translateX(-2vw)'
//                 }}>
//                   About Us
//                 </h1>
//               )}
//               <p 
//                 className={`mt-6 text-lg md:text-2xl lg:text-4xl font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-right' : 'text-center'}`} 
//                 style={isAr ? { transform: 'translate(-160px, 25px)' } : {}}
//               >
//                 {isAr ? (
//                   <>
//                     نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
//                     نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
//                     على أســـواق الخليج والأســــواق<br />
//                     <span className="block text-right">العالميــــة.</span>
//                   </>
//                 ) : (
//                   <>
//                     We don't just teach design we<br />
//                     unleash elite designers to lead<br />
//                     and dominate Gulf and global<br />
//                     markets.
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Our Vision Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <div className="inline-block mb-8 relative p-[3px] rounded-[60px] animated-border" style={{
//             background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//             backgroundSize: '300% 300%',
//           }}>
//             <style>{`
//               @keyframes borderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .animated-border:hover {
//                 animation: borderMove 3s ease infinite;
//               }
//             `}</style>
//             <div className="bg-white rounded-[58px] p-[6px]">
//               <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                 <img src="/nzrzOfxWPwo 1.png" alt="Vision Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h2 className="text-3xl md:text-5xl font-bold text-white">
//                     {isAr ? 'رؤيتنا' : 'Our vision'}
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="max-w-4xl mx-auto" ref={visionRef}>
//             <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ lineHeight: isAr ? '2.2' : '1.8' }}>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[0]}
//                 {visionTexts[0].length < visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[1]}
//                 {visionTexts[1].length < visionLines[1].length && visionTexts[0].length === visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//             </h3>
//           </div>
//         </div>
//       </section>
      
//       {/* Mission Section with Images */}
//       <section className="w-full bg-white py-8 md:py-12 overflow-x-hidden relative z-10">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-8 lg:gap-12 items-center">
            
//             {/* Left Image */}
//             <div className="flex justify-center">
//               <div className="animated-border-img p-[1px] rounded-3xl" style={{
//                 background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//                 backgroundSize: '300% 300%',
//               }}>
//                 <img src="/Mask group (11).png" alt="Designer working" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
//               </div>
//             </div>

//             {/* Center Text Content */}
//             <div className="text-center px-2 flex flex-col items-center justify-center" style={{ gap: isAr ? '20px' : '8px' }}>
//               {(isAr ? [
//                 "بينما ينشغل العالم بتعليم",
//                 "استخدام البرامج، تركز رؤيتنا",
//                 "على تنمية نخبة من المصممين",
//                 "الذين يفهمون الغاية من التصميم.",
//                 "",
//                 "نسعى لأن نكون الجسر",
//                 "الذي يُمكّن المصممين العرب",
//                 "من الانتقال من التعلم العشوائي",
//                 "إلى الاحترافية التي تتمتع",
//                 "بها الوكالات العالمية.",
//               ] : [
//                 "While the world is preoccupied",
//                 "with teaching how to use",
//                 "software, our vision is focused",
//                 "on cultivating an elite group",
//                 "that understands the purpose",
//                 "of design.",
//                 "We aspire to be the bridge",
//                 "that allows Arab designers to",
//                 "move from haphazard",
//                 "learning to the professionalism",
//                 "of global agencies.",
//               ]).map((line, i) => (
//                 <span key={i} className="block font-bold leading-snug"
//                   style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 2vw, 32px)', backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}>
//                   {line}
//                 </span>
//               ))}
//             </div>

//             {/* Right Image */}
//             <div className="flex justify-center">
//               <div className="animated-border-img p-[1px] rounded-3xl" style={{
//                 background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//                 backgroundSize: '300% 300%',
//               }}>
//                 <img src="/Mask group (8).png" alt="Designer with tablet" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Our Mission Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="w-full">
//           {/* Our Mission Badge */}
//           <div className="flex justify-center mb-12">
//             <div className="inline-block relative p-[2px] rounded-[60px] animated-border-mission2" style={{
//               background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//               backgroundSize: '300% 300%',
//             }}>
//               <style>{`
//                 @keyframes borderMoveMission2 {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .animated-border-mission2:hover {
//                   animation: borderMoveMission2 3s ease infinite;
//                 }
//               `}</style>
//               <div className="bg-white rounded-[58px] p-[6px]">
//                 <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                   <img src="/nzrzOfxWPwo 1.png" alt="Mission Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-black">{t('mission.badge')}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Image with Overlay and Animated Border Box */}
//           <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1441/593' }}>
//             <img src="/i-want-to-find-a-place-where-there-are-y_-i9BElK5RRCc7L2AYEM1VQ_lITVPwkFSIe_yfevqvJAwA_cover 1.png" alt="Our Mission" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-black/70"></div>
//             <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}></div>
//             <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
//               <style>{`
//                 @keyframes moveBorder {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .mission-border-anim {
//                   background: linear-gradient(135deg, #0000EA, #FF00E5, #00ffff, #FF00E5, #0000EA);
//                   background-size: 300% 300%;
//                   animation: moveBorder 3s ease infinite;
//                 }
//               `}</style>
//               {/* Mobile */}
//               <div className="md:hidden w-full relative flex items-center p-4 rounded-2xl">
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed text-sm">
//                   {t('mission.mobile')}
//                 </p>
//               </div>
//               {/* Desktop */}
//               <div className="hidden md:flex" style={{ width: '1400px', maxWidth: '90%', height: '350px', position: 'relative', items: 'center', padding: '40px', marginLeft: isAr ? 'auto' : '5%', marginRight: isAr ? '5%' : 'auto' }}>
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed" style={{ fontSize: '32px', whiteSpace: 'pre-line' }}>
//                   {t('mission.desktop')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Secret Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="w-full px-6 sm:px-8 lg:px-12">
//           <div className="relative w-full max-w-[1031px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '1031/509' }}>
//             <div className="secret-border-anim" style={{
//               position: 'absolute', inset: 0, borderRadius: '20px', padding: '3px', zIndex: 10,
//               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//               WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//             }} />
//             <style>{`
//               @keyframes secretBorderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .secret-border-anim {
//                 background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//                 background-size: 300% 300%;
//                 animation: secretBorderMove 3s ease infinite;
//               }
//             `}</style>
//             <img src="/in4.png" alt="Secret Section" className="w-full h-full object-cover rounded-3xl scale-x-[-1]" />
//             {/* Mobile text */}
//             <div className="absolute inset-0 flex items-center justify-center px-4 md:hidden" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-lg leading-snug text-center">
//                 {t('secret.mobile')}
//               </h2>
//             </div>
//             {/* Desktop text */}
//             <div className="hidden md:flex absolute inset-0 items-center justify-start px-10" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug" style={{ transform: 'translateY(1%)', whiteSpace: 'pre-line' }}>
//                 {t('secret.desktop')}
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Philosophy Section */}
//       <section className="w-full py-8 md:py-12 bg-white relative z-10">
//         <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-0">
//           {t('philosophy.lines', { returnObjects: true }).map((line, i) => (
//             <span key={i} className="font-bold leading-relaxed" style={{
//               fontSize: 'clamp(20px, 2.5vw, 36px)',
//               backgroundImage: 'linear-gradient(to right, #000000, #888888)',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               color: 'transparent',
//               display: 'block',
//             }}>{line}</span>
//           ))}
//         </div>
//       </section>

//       {/* Four Pillars Section */}
//       <section className="w-full bg-white py-8 md:py-12 relative">
//         {/* Background Ellipse */}
//         <img 
//           src="/Ellipse 65.png" 
//           alt="" 
//           className="absolute left-1/2 pointer-events-none"
//           style={{ width: 'min(1432.6px, 100%)', height: 'auto', minHeight: '550px', zIndex: 0, top: '-15%', transform: 'translateX(-50%)', clipPath: 'inset(0 0 25% 0)' }}
//         />
//         <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8 relative z-10">
//         <style>{`
//             @keyframes pillarBorderMove {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .pillar-border-anim {
//               background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: pillarBorderMove 3s ease infinite;
//             }
//           `}</style>

//           {/* ── MOBILE: auto-scroll carousel ── */}
//           <MobilePillarsCarousel isAr={isAr} pillarTextsAr={[
//             t('pillars.pillar1.text'),
//             t('pillars.pillar2.text'),
//             t('pillars.pillar3.text'),
//             t('pillars.pillar4.text'),
//           ]} pillarTitlesAr={[
//             t('pillars.pillar1.title'),
//             t('pillars.pillar2.title'),
//             t('pillars.pillar3.title'),
//             t('pillars.pillar4.title'),
//           ]} />

//           {/* ── DESKTOP: stacked layout ── */}
//           <div className="hidden md:flex flex-col gap-8 relative z-10">
//             {/* Pillar 1 - Image Left, Text Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[0]} alt="Gulf Market" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-start">
//                 <div className="flex items-start gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center mt-1">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-base md:text-xl md:whitespace-nowrap" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar1.title') : <>A deep understanding of the psychology of<br className="hidden md:block" /> the Gulf market:</>}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar1.text') : "We don't teach general design; rather, we reveal to you the secrets of refined taste and the high-quality standards demanded by leading companies in the Arab world. Our goal is for you to master the \"language of the market,\" so you become a designer understood and appreciated by clients at first glance."}</p>
//               </div>
//             </div>

//             {/* Pillar 2 - Text Left, Image Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar2.title') : 'Business of Design methodology:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar2.text') : "Talent alone is not enough. The biggest gap in our region is the talented designer who doesn't know how to sell themselves or their project. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education, transforming you from an order fulfiller to a technical consultant who leads projects and makes decisions with confidence."}</p>
//               </div>
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[1]} alt="Business of Design" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//             </div>

//             {/* Pillar 3 - Image Left, Text Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[2]} alt="Real-world agency" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar3.title') : 'Real-world agency simulation (Real-world Workflow):'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar3.text') : "True learning begins when theorizing stops. Our projects aren't just academic exercises; they're a realistic simulation of the creative agencies industry. You'll learn how to build strategy and present your work professionally, ensuring you stand out and land the biggest projects."}</p>
//               </div>
//             </div>

//             {/* Pillar 4 - Text Left, Image Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar4.title') : 'A lifetime asset that grows forever:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar4.text') : "Subscribing to our service isn't just about watching recorded videos; it's about acquiring a lasting professional asset. We continuously update our content with modern AI technologies and new market insights, ensuring you stay ahead of the curve throughout your career."}</p>
//               </div>
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[3]} alt="Lifetime asset" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Additional Sections */}
//       <InstructorAbout />
//       <ServicesSection />
//       <PortfolioSection />
//       <TestimonialsSection />
      
//       {/* Bottom Showcase Section Image */}
// <section className="lg:block w-full bg-white relative -mt-8 md:-mt-12 lg:-mt-16 z-20">
//   <div className="relative w-full">
//     <img src="/professional-portrait-of-a-gulf-woman-st_VMTN33Z4RIao7LQi0EaSVA_9T8J_OzSQ7GRNT_78pt7yg_4k 1.png" alt="Our Values" className="w-full h-auto object-cover block" style={{ transform: isAr ? 'translateX(-1%) scaleX(-1)' : 'translateX(-1%)' }} />
//     <div className={`absolute top-16 md:top-24 lg:top-36 ${isAr ? 'right-8 md:right-12 lg:right-[180px]' : 'left-8 md:left-12 lg:left-[180px]'}`}>
//       <div className="border border-white bg-black/5 backdrop-blur-md flex flex-col justify-center" style={{ width: '950px', height: '350px', borderRadius: '16px' }}>
//         <div className={`px-8 ${isAr ? 'text-right' : 'text-left'}`}>
//           <div className="flex items-center gap-4 mb-4">
//             <h2 className="text-white" style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: '96px', lineHeight: '100%' }}>{t('values.title')}</h2>
//           </div>
//           <div className="flex gap-3 mb-2">
//             {[...Array(5)].map((_, i) => (
//               <svg key={i} className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//               </svg>
//             ))}
//           </div>
//           <div className="w-1/2 h-px bg-white mb-4"></div>
//           <p className="text-xl text-white font-medium">{t('values.subtitle')}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//     </div>
//   );
// }

// export default AboutUs;




// import { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../../hooks/useLanguage';
// import InstructorAbout from '../../Home/Sections/InstructorAbout';
// import ServicesSection from '../../Home/Sections/ServicesSection';
// import PortfolioSection from '../../Home/Sections/PortfolioSection';
// import TestimonialsSection from '../../Home/Sections/TestimonialsSection';
// import TraineesShowcase from '../../Home/Sections/TraineesShowcase';

// function parseCountValue(str) {
//   const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
//   const suffix = str.replace(/[0-9]/g, '');
//   return { num: isNaN(num) ? 0 : num, suffix };
// }

// function AnimatedStat({ value, className, style }) {
//   const ref = useRef(null);
//   const [started, setStarted] = useState(false);
//   const [display, setDisplay] = useState(0);
//   const { num, suffix } = parseCountValue(value);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     let animating = false;
//     let timer;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           if (animating) return;
//           setDisplay(0);
//           animating = true;
//           const duration = 1000;
//           const step = 16;
//           const totalSteps = duration / step;
//           const increment = num / totalSteps;
//           let current = 0;
//           timer = setInterval(() => {
//             current += increment;
//             if (current >= num) {
//               setDisplay(num);
//               clearInterval(timer);
//               timer = null;
//             } else {
//               setDisplay(Math.floor(current));
//             }
//           }, step);
//         } else {
//           if (timer) { clearInterval(timer); timer = null; }
//           animating = false;
//           setDisplay(0);
//         }
//       },
//       { threshold: 0.3 }
//     );
//     obs.observe(el);
//     return () => { obs.disconnect(); if (timer) clearInterval(timer); };
//   }, [num]);

//   return (
//     <h3 ref={ref} className={className} style={style}>
//       {display}{suffix}
//     </h3>
//   );
// }

// const pillarImages = ["/71.png", "/pmg.png", "/Mak group.png", "/Mask roup (12).png"];

// const pillarTitles = [
//   "A deep understanding of the psychology of the Gulf market",
//   "Business of Design methodology",
//   "Real-world agency simulation",
//   "A lifetime asset that grows forever",
// ];

// const pillarTextsEn = [
//   "We don't teach general design; we reveal the secrets of refined taste and high-quality standards demanded by leading companies in the Arab world.",
//   "Talent alone is not enough. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education.",
//   "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry.",
//   "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated with AI technologies.",
// ];

// const MobilePillarsCarousel = ({ isAr, pillarTextsAr, pillarTitlesAr }) => {
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const start = () => {
//       autoScrollRef.current = setInterval(() => {
//         if (!el) return;
//         const max = el.scrollWidth - el.clientWidth;
//         if (el.scrollLeft >= max - 10) {
//           el.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
//         }
//       }, 3000);
//     };
//     start();
//     const pause = () => clearInterval(autoScrollRef.current);
//     const resume = () => start();
//     el.addEventListener('touchstart', pause);
//     el.addEventListener('touchend', resume);
//     return () => {
//       clearInterval(autoScrollRef.current);
//       el.removeEventListener('touchstart', pause);
//       el.removeEventListener('touchend', resume);
//     };
//   }, []);

//   return (
//     <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1 relative z-10">
//       {pillarImages.map((image, i) => (
//         <div key={i} className="flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden bg-black snap-center relative">
//           <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//           <img src={image} alt={pillarTitles[i]} className="w-full h-40 object-cover" />
//           <div className="p-4" dir={isAr ? 'rtl' : 'ltr'}>
//             <div className="flex items-start gap-2 mb-2">
//               <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9FE422] flex items-center justify-center mt-0.5">
//                 <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//               </span>
//               <h3 className="font-bold text-sm" style={isAr ? {
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               } : { color: 'white' }}>
//                 {isAr ? pillarTitlesAr[i] : pillarTitles[i]}
//               </h3>
//             </div>
//             <p className="text-gray-300 text-xs leading-relaxed">
//               {isAr ? pillarTextsAr[i] : pillarTextsEn[i]}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// function AboutUs() {
//   const { isAr } = useLanguage();
//   const { t } = useTranslation('aboutus');
//   const visionRef = useRef(null);
//   const [visionStarted, setVisionStarted] = useState(false);
//   const [visionTexts, setVisionTexts] = useState(['', '']);

//   const visionLines = isAr
//     ? ['سد الفجوة بين إتقان الأداة', 'وإتقان الأعمال']
//     : ['Bridging the gap between mastering', 'the tool and mastering the business'];

//   useEffect(() => {
//     setVisionTexts(['', '']);
//     setVisionStarted(false);
//   }, [isAr]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisionStarted(true); },
//       { threshold: 0.3 }
//     );
//     if (visionRef.current) observer.observe(visionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!visionStarted) return;
//     const speed = 60;
//     const timers = [];
//     visionLines.forEach((line, li) => {
//       const delay = li === 0 ? 0 : visionLines[0].length * speed + 200;
//       let i = 0;
//       const start = setTimeout(() => {
//         const interval = setInterval(() => {
//           i++;
//           setVisionTexts(prev => {
//             const next = [...prev];
//             next[li] = line.slice(0, i);
//             return next;
//           });
//           if (i >= line.length) clearInterval(interval);
//         }, speed);
//         timers.push(interval);
//       }, delay);
//       timers.push(start);
//     });
//     return () => timers.forEach(clearTimeout);
//   }, [visionStarted, isAr]);

//   return (
//     <div className="min-h-screen bg-white space-y-12 md:space-y-16">
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative">
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/nasr.png" 
//             alt="Courses Cover"
//           />
//           {/* Mobile overlay */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:hidden">
//             {!isAr && (
//               <h1 className="font-bold text-center mb-3" style={{ 
//                 fontSize: 'clamp(36px, 12vw, 64px)',
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 About Us
//               </h1>
//             )}
//             <p dir={isAr ? 'ltr' : undefined} className={`text-sm font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-left px-12' : 'text-center'}`}>
//               {isAr ? (
//                 <>
//                   نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
//                   نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
//                   على أســـواق الخليج والأســــواق<br />
//                   <span className="block text-left">العالميــــة.</span>
//                 </>
//               ) : (
//                 <>
//                   We don't just teach design we<br />
//                   unleash elite designers to lead<br />
//                   and dominate Gulf and global<br />
//                   markets.
//                 </>
//               )}
//             </p>
//           </div>
//           {/* Desktop overlay */}
//           <div className="hidden md:flex absolute inset-0 items-center justify-center -ml-64 -mt-72 md:-mt-96">
//             <div className={`text-white font-lexend max-w-2xl ${isAr ? 'text-right' : 'text-left'}`}>
//               {!isAr && (
//                 <h1 className="inline-block font-bold leading-[1.01] whitespace-nowrap" style={{ 
//                   fontSize: 'clamp(42px, 10vw, 128px)',
//                   backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   transform: 'translateX(-2vw)'
//                 }}>
//                   About Us
//                 </h1>
//               )}
//               <p 
//                 className={`mt-6 text-lg md:text-2xl lg:text-4xl font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-right' : 'text-center'}`} 
//                 style={isAr ? { transform: 'translate(-160px, 25px)' } : {}}
//               >
//                 {isAr ? (
//                   <>
//                     نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
//                     نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
//                     على أســـواق الخليج والأســــواق<br />
//                     <span className="block text-right">العالميــــة.</span>
//                   </>
//                 ) : (
//                   <>
//                     We don't just teach design we<br />
//                     unleash elite designers to lead<br />
//                     and dominate Gulf and global<br />
//                     markets.
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Our Vision Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <div className="inline-block mb-8 relative p-[3px] rounded-[60px] animated-border" style={{
//             background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//             backgroundSize: '300% 300%',
//           }}>
//             <style>{`
//               @keyframes borderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .animated-border:hover {
//                 animation: borderMove 3s ease infinite;
//               }
//             `}</style>
//             <div className="bg-white rounded-[58px] p-[6px]">
//               <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                 <img src="/nzrzOfxWPwo 1.png" alt="Vision Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h2 className="text-3xl md:text-5xl font-bold text-white">
//                     {isAr ? 'رؤيتنا' : 'Our vision'}
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="max-w-4xl mx-auto" ref={visionRef}>
//             <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ lineHeight: isAr ? '2.2' : '1.8' }}>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[0]}
//                 {visionTexts[0].length < visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[1]}
//                 {visionTexts[1].length < visionLines[1].length && visionTexts[0].length === visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//             </h3>
//           </div>
//         </div>
//       </section>
      
//       {/* Mission Section with Images */}
//       <section className="w-full bg-white py-8 md:py-12 overflow-x-hidden relative z-10">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-8 lg:gap-12 items-center">
            
//             {/* Left Image */}
//             <div className="flex justify-center">
//               <div className="animated-border-img p-[1px] rounded-3xl" style={{
//                 background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//                 backgroundSize: '300% 300%',
//               }}>
//                 <img src="/Mask group (11).png" alt="Designer working" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
//               </div>
//             </div>

//             {/* Center Text Content */}
//             <div className="text-center px-2 flex flex-col items-center justify-center" style={{ gap: isAr ? '20px' : '8px' }}>
//               {(isAr ? [
//                 "بينما ينشغل العالم بتعليم",
//                 "استخدام البرامج، تركز رؤيتنا",
//                 "على تنمية نخبة من المصممين",
//                 "الذين يفهمون الغاية من التصميم.",
//                 "",
//                 "نسعى لأن نكون الجسر",
//                 "الذي يُمكّن المصممين العرب",
//                 "من الانتقال من التعلم العشوائي",
//                 "إلى الاحترافية التي تتمتع",
//                 "بها الوكالات العالمية.",
//               ] : [
//                 "While the world is preoccupied",
//                 "with teaching how to use",
//                 "software, our vision is focused",
//                 "on cultivating an elite group",
//                 "that understands the purpose",
//                 "of design.",
//                 "We aspire to be the bridge",
//                 "that allows Arab designers to",
//                 "move from haphazard",
//                 "learning to the professionalism",
//                 "of global agencies.",
//               ]).map((line, i) => (
//                 <span key={i} className="block font-bold leading-snug"
//                   style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 2vw, 32px)', backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}>
//                   {line}
//                 </span>
//               ))}
//             </div>

//             {/* Right Image */}
//             <div className="flex justify-center">
//               <div className="animated-border-img p-[1px] rounded-3xl" style={{
//                 background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//                 backgroundSize: '300% 300%',
//               }}>
//                 <img src="/Mask group (8).png" alt="Designer with tablet" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Our Mission Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="w-full">
//           {/* Our Mission Badge */}
//           <div className="flex justify-center mb-12">
//             <div className="inline-block relative p-[2px] rounded-[60px] animated-border-mission2" style={{
//               background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//               backgroundSize: '300% 300%',
//             }}>
//               <style>{`
//                 @keyframes borderMoveMission2 {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .animated-border-mission2:hover {
//                   animation: borderMoveMission2 3s ease infinite;
//                 }
//               `}</style>
//               <div className="bg-white rounded-[58px] p-[6px]">
//                 <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                   <img src="/nzrzOfxWPwo 1.png" alt="Mission Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-black">{t('mission.badge')}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Image with Overlay and Animated Border Box */}
//           <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1441/593' }}>
//             <img src="/i-want-to-find-a-place-where-there-are-y_-i9BElK5RRCc7L2AYEM1VQ_lITVPwkFSIe_yfevqvJAwA_cover 1.png" alt="Our Mission" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-black/70"></div>
//             <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}></div>
//             <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
//               <style>{`
//                 @keyframes moveBorder {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .mission-border-anim {
//                   background: linear-gradient(135deg, #0000EA, #FF00E5, #00ffff, #FF00E5, #0000EA);
//                   background-size: 300% 300%;
//                   animation: moveBorder 3s ease infinite;
//                 }
//               `}</style>
//               {/* Mobile */}
//               <div className="md:hidden w-full relative flex items-center p-4 rounded-2xl">
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed text-sm">
//                   {t('mission.mobile')}
//                 </p>
//               </div>
//               {/* Desktop */}
//               <div className="hidden md:flex" style={{ width: '1400px', maxWidth: '90%', height: '350px', position: 'relative', alignItems: 'center', padding: '40px', marginLeft: isAr ? 'auto' : '5%', marginRight: isAr ? '5%' : 'auto' }}>
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed" style={{ fontSize: '32px', whiteSpace: 'pre-line' }}>
//                   {t('mission.desktop')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Secret Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="w-full px-6 sm:px-8 lg:px-12">
//           <div className="relative w-full max-w-[1031px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '1031/509' }}>
//             <div className="secret-border-anim" style={{
//               position: 'absolute', inset: 0, borderRadius: '20px', padding: '3px', zIndex: 10,
//               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//               WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//             }} />
//             <style>{`
//               @keyframes secretBorderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .secret-border-anim {
//                 background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//                 background-size: 300% 300%;
//                 animation: secretBorderMove 3s ease infinite;
//               }
//             `}</style>
//             <img src="/in4.png" alt="Secret Section" className="w-full h-full object-cover rounded-3xl scale-x-[-1]" />
//             {/* Mobile text */}
//             <div className="absolute inset-0 flex items-center justify-center px-4 md:hidden" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-lg leading-snug text-center">
//                 {t('secret.mobile')}
//               </h2>
//             </div>
//             {/* Desktop text */}
//             <div className="hidden md:flex absolute inset-0 items-center justify-start px-10" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug" style={{ transform: 'translateY(1%)', whiteSpace: 'pre-line' }}>
//                 {t('secret.desktop')}
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Philosophy Section */}
//       <section className="w-full py-8 md:py-12 bg-white relative z-10">
//         <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-0">
//           {t('philosophy.lines', { returnObjects: true }).map((line, i) => (
//             <span key={i} className="font-bold leading-relaxed" style={{
//               fontSize: 'clamp(20px, 2.5vw, 36px)',
//               backgroundImage: 'linear-gradient(to right, #000000, #888888)',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               color: 'transparent',
//               display: 'block',
//             }}>{line}</span>
//           ))}
//         </div>
//       </section>

//       {/* Four Pillars Section */}
//       <section className="w-full bg-white py-8 md:py-12 relative">
//         {/* Background Ellipse */}
//         <img 
//           src="/Ellipse 65.png" 
//           alt="" 
//           className="absolute left-1/2 pointer-events-none"
//           style={{ width: 'min(1432.6px, 100%)', height: 'auto', minHeight: '550px', zIndex: 0, top: '-15%', transform: 'translateX(-50%)', clipPath: 'inset(0 0 25% 0)' }}
//         />
//         <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8 relative z-10">
//         <style>{`
//             @keyframes pillarBorderMove {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .pillar-border-anim {
//               background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: pillarBorderMove 3s ease infinite;
//             }
//           `}</style>

//           {/* ── MOBILE: auto-scroll carousel ── */}
//           <MobilePillarsCarousel isAr={isAr} pillarTextsAr={[
//             t('pillars.pillar1.text'),
//             t('pillars.pillar2.text'),
//             t('pillars.pillar3.text'),
//             t('pillars.pillar4.text'),
//           ]} pillarTitlesAr={[
//             t('pillars.pillar1.title'),
//             t('pillars.pillar2.title'),
//             t('pillars.pillar3.title'),
//             t('pillars.pillar4.title'),
//           ]} />

//           {/* ── DESKTOP: stacked layout ── */}
//           <div className="hidden md:flex flex-col gap-8 relative z-10">
//             {/* Pillar 1 - Image Left, Text Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[0]} alt="Gulf Market" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-start">
//                 <div className="flex items-start gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center mt-1">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-base md:text-xl md:whitespace-nowrap" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar1.title') : <>A deep understanding of the psychology of<br className="hidden md:block" /> the Gulf market:</>}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar1.text') : "We don't teach general design; rather, we reveal to you the secrets of refined taste and the high-quality standards demanded by leading companies in the Arab world. Our goal is for you to master the \"language of the market,\" so you become a designer understood and appreciated by clients at first glance."}</p>
//               </div>
//             </div>

//             {/* Pillar 2 - Text Left, Image Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar2.title') : 'Business of Design methodology:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar2.text') : "Talent alone is not enough. The biggest gap in our region is the talented designer who doesn't know how to sell themselves or their project. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education, transforming you from an order fulfiller to a technical consultant who leads projects and makes decisions with confidence."}</p>
//               </div>
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[1]} alt="Business of Design" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//             </div>

//             {/* Pillar 3 - Image Left, Text Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[2]} alt="Real-world agency" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar3.title') : 'Real-world agency simulation (Real-world Workflow):'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar3.text') : "True learning begins when theorizing stops. Our projects aren't just academic exercises; they're a realistic simulation of the creative agencies industry. You'll learn how to build strategy and present your work professionally, ensuring you stand out and land the biggest projects."}</p>
//               </div>
//             </div>

//             {/* Pillar 4 - Text Left, Image Right */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                       backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                     } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar4.title') : 'A lifetime asset that grows forever:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar4.text') : "Subscribing to our service isn't just about watching recorded videos; it's about acquiring a lasting professional asset. We continuously update our content with modern AI technologies and new market insights, ensuring you stay ahead of the curve throughout your career."}</p>
//               </div>
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[3]} alt="Lifetime asset" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Additional Sections */}
//       <InstructorAbout />
//       <ServicesSection />
//       <PortfolioSection />
//       <TestimonialsSection />
      
//       {/* Bottom Showcase Section Image */}
//       <section className="w-full py-8 md:py-12 bg-white">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex justify-center">
//           <TraineesShowcase />
//         </div>
//       </section>

//       {/* Our Values Section (Modified to take full width screen & shift up) */}
//       {/* <section className="lg:block w-full bg-black relative -mt-8 md:-mt-12 lg:-mt-16 z-20">
//         <div className="relative w-full">
//           <img src="/professional-portrait-of-a-gulf-woman-st_VMTN33Z4RIao7LQi0EaSVA_9T8J_OzSQ7GRNT_78pt7yg_4k 1.png" alt="Our Values" className="w-full h-auto object-cover block" style={{ transform: isAr ? 'translateX(-1%) scaleX(-1)' : 'translateX(-1%)' }} />
//           <div className={`absolute top-16 md:top-24 lg:top-36 ${isAr ? 'right-8 md:right-12 lg:right-[180px]' : 'left-8 md:left-12 lg:left-[180px]'}`}>
//             <div className="border border-white bg-black/5 flex flex-col justify-center" style={{ width: '950px', height: '350px', borderRadius: '16px',transform: 'translateX(30px)' }}>
//               <div className={`px-8 ${isAr ? 'text-right' : 'text-left'}`}>
//                 <div className="flex items-center gap-4 mb-4">
//                   <h2 className="text-white" style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: '96px', lineHeight: '100%' }}>{t('values.title')}</h2>
//                 </div>
//                 <div className="flex gap-3 mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                       <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <div className="w-1/2 h-px bg-white mb-4"></div>
//                 <p className="text-xl text-white font-medium">{t('values.subtitle')}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section> */}





// <section className="w-full bg-black relative -mt-8 md:-mt-12 lg:-mt-16 z-20 overflow-hidden">
//   <div className="relative w-full flex items-center justify-center">
//     <img 
//       src="/professional-portrait-of-a-gulf-woman-st_VMTN33Z4RIao7LQi0EaSVA_9T8J_OzSQ7GRNT_78pt7yg_4k 1.png" 
//       alt="Our Values" 
//       className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto object-cover block" 
//       style={{ transform: isAr ? 'translateX(-1%) scaleX(-1)' : 'translateX(-1%)' }} 
//     />
    
//     <div className={`absolute inset-0 flex items-center px-4 sm:px-8 md:px-12 lg:px-[180px] ${isAr ? 'justify-end' : 'justify-start'}`}>
//       <div 
//         className="border border-white bg-black/50 sm:bg-black/40 backdrop-blur-[2px] flex flex-col justify-center p-6 sm:p-8 md:p-10 w-full max-w-[950px]" 
//         style={{ 
//           height: 'auto', 
//           minHeight: '260px', 
//           borderRadius: '16px',
//         }}
//       >
//         <div className={`w-full ${isAr ? 'text-right' : 'text-left'}`}>
//           <div className="flex items-center gap-4 mb-3 sm:mb-4">
//             <h2 
//               className="text-white font-light" 
//               style={{ 
//                 fontFamily: 'Lexend', 
//                 fontSize: 'clamp(36px, 7vw, 96px)', 
//                 lineHeight: '100%' 
//               }}
//             >
//               {t('values.title')}
//             </h2>
//           </div>

//           <div className={`flex gap-2 sm:gap-3 mb-3 sm:mb-4 ${isAr ? 'justify-end sm:justify-start' : 'justify-start'}`}>
//             {[...Array(5)].map((_, i) => (
//               <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//               </svg>
//             ))}
//           </div>

//           <div className="w-1/2 h-px bg-white mb-3 sm:mb-4"></div>

//           <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white font-medium">
//             {t('values.subtitle')}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>   




//       {/* Mask Group Banner Image at Bottom */}
//       <section className="w-full py-6 bg-white flex justify-center items-center">
//         <div className="w-full max-w-5xl px-4">
         
//         </div>
//       </section>

//     </div>
//   );
// }

// export default AboutUs;



// import { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../../hooks/useLanguage';
// import BASE_URL from '../../api/config';
// import InstructorAbout from '../../Home/Sections/InstructorAbout';
// import ServicesSection from '../../Home/Sections/ServicesSection';
// import PortfolioSection from '../../Home/Sections/PortfolioSection';
// import TestimonialsSection from '../../Home/Sections/TestimonialsSection';
// import TraineesShowcase from '../../Home/Sections/TraineesShowcase';

// function parseCountValue(str) {
//   const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
//   const suffix = str.replace(/[0-9]/g, '');
//   return { num: isNaN(num) ? 0 : num, suffix };
// }

// function AnimatedStat({ value, className, style }) {
//   const ref = useRef(null);
//   const [started, setStarted] = useState(false);
//   const [display, setDisplay] = useState(0);
//   const { num, suffix } = parseCountValue(value);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     let animating = false;
//     let timer;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           if (animating) return;
//           setDisplay(0);
//           animating = true;
//           const duration = 1000;
//           const step = 16;
//           const totalSteps = duration / step;
//           const increment = num / totalSteps;
//           let current = 0;
//           timer = setInterval(() => {
//             current += increment;
//             if (current >= num) {
//               setDisplay(num);
//               clearInterval(timer);
//               timer = null;
//             } else {
//               setDisplay(Math.floor(current));
//             }
//           }, step);
//         } else {
//           if (timer) { clearInterval(timer); timer = null; }
//           animating = false;
//           setDisplay(0);
//         }
//       },
//       { threshold: 0.3 }
//     );
//     obs.observe(el);
//     return () => { obs.disconnect(); if (timer) clearInterval(timer); };
//   }, [num]);

//   return (
//     <h3 ref={ref} className={className} style={style}>
//       {display}{suffix}
//     </h3>
//   );
// }

// const pillarImages = ["/71.png", "/pmg.png", "/Mak group.png", "/Mask roup (12).png"];

// const pillarTitles = [
//   "A deep understanding of the psychology of the Gulf market",
//   "Business of Design methodology",
//   "Real-world agency simulation",
//   "A lifetime asset that grows forever",
// ];

// const pillarTextsEn = [
//   "We don't teach general design; we reveal the secrets of refined taste and high-quality standards demanded by leading companies in the Arab world.",
//   "Talent alone is not enough. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education.",
//   "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry.",
//   "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated with AI technologies.",
// ];

// const MobilePillarsCarousel = ({ isAr, pillarTextsAr, pillarTitlesAr }) => {
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const start = () => {
//       autoScrollRef.current = setInterval(() => {
//         if (!el) return;
//         const max = el.scrollWidth - el.clientWidth;
//         if (el.scrollLeft >= max - 10) {
//           el.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
//         }
//       }, 3000);
//     };
//     start();
//     const pause = () => clearInterval(autoScrollRef.current);
//     const resume = () => start();
//     el.addEventListener('touchstart', pause);
//     el.addEventListener('touchend', resume);
//     return () => {
//       clearInterval(autoScrollRef.current);
//       el.removeEventListener('touchstart', pause);
//       el.removeEventListener('touchend', resume);
//     };
//   }, []);

//   return (
//     <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1 relative z-10">
//       {pillarImages.map((image, i) => (
//         <div key={i} className="flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden bg-black snap-center relative">
//           <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//           <img src={image} alt={pillarTitles[i]} className="w-full h-40 object-cover" />
//           <div className="p-4" dir={isAr ? 'rtl' : 'ltr'}>
//             <div className="flex items-start gap-2 mb-2">
//               <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9FE422] flex items-center justify-center mt-0.5">
//                 <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//               </span>
//               <h3 className="font-bold text-sm" style={isAr ? {
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               } : { color: 'white' }}>
//                 {isAr ? pillarTitlesAr[i] : pillarTitles[i]}
//               </h3>
//             </div>
//             <p className="text-gray-300 text-xs leading-relaxed">
//               {isAr ? pillarTextsAr[i] : pillarTextsEn[i]}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// function AboutUs() {
//   const { isAr } = useLanguage();
//   const { t } = useTranslation('aboutus');
//   const visionRef = useRef(null);
//   const [visionStarted, setVisionStarted] = useState(false);
//   const [visionTexts, setVisionTexts] = useState(['', '']);

//   // Backend Rating states
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('token');

//   // Fetch average rating from backend
//   useEffect(() => {
//     fetch(`${BASE_URL}/ratings`, {
//       headers: { 'Accept': 'application/json' },
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json?.average || json?.data?.average) {
//           setAverageRating(json.average || json.data.average);
//         }
//       })
//       .catch(() => {});
//   }, []);

//   // Handle rating submission to backend
//   const handleRate = async (selectedRating) => {
//     setRating(selectedRating);
//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/ratings`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ rating: selectedRating }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setIsSubmitted(true);
//         if (data?.average) {
//           setAverageRating(data.average);
//         }
//       } else {
//         setIsSubmitted(true);
//       }
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//       setIsSubmitted(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const visionLines = isAr
//     ? ['سد الفجوة بين إتقان الأداة', 'وإتقان الأعمال']
//     : ['Bridging the gap between mastering', 'the tool and mastering the business'];

//   useEffect(() => {
//     setVisionTexts(['', '']);
//     setVisionStarted(false);
//   }, [isAr]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisionStarted(true); },
//       { threshold: 0.3 }
//     );
//     if (visionRef.current) observer.observe(visionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!visionStarted) return;
//     const speed = 60;
//     const timers = [];
//     visionLines.forEach((line, li) => {
//       const delay = li === 0 ? 0 : visionLines[0].length * speed + 200;
//       let i = 0;
//       const start = setTimeout(() => {
//         const interval = setInterval(() => {
//           i++;
//           setVisionTexts(prev => {
//             const next = [...prev];
//             next[li] = line.slice(0, i);
//             return next;
//           });
//           if (i >= line.length) clearInterval(interval);
//         }, speed);
//         timers.push(interval);
//       }, delay);
//       timers.push(start);
//     });
//     return () => timers.forEach(clearTimeout);
//   }, [visionStarted, isAr]);

//   return (
//     <div className="min-h-screen bg-white space-y-12 md:space-y-16">
//       {/* Hero Section */}
                      
// <section className="w-full bg-white flex items-center justify-center pt-16 md:pt-20 relative overflow-hidden">
//   <div className="relative w-full max-w-full">
//     <img
//       className="w-full h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] object-cover"
//       src="/nasr.png" 
//       alt="Courses Cover"
//     />
    
//     {!isAr && (
//       <div className="absolute inset-0 flex flex-col justify-center pl-10 sm:pl-16 md:pl-24 lg:pl-32 pr-6 -translate-y-6 md:-translate-y-16 items-start text-left">
//         <div className="max-w-3xl">
//           <h1 className="font-bold mb-4" style={{ 
//             fontSize: 'clamp(32px, 7vw, 96px)',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//             lineHeight: 1.1
//           }}>
//             About Us
//           </h1>
//           <p className="text-base sm:text-xl md:text-2xl lg:text-4xl font-semibold tracking-wide text-white leading-loose text-left">
//             We don't just teach design we<br />
//             unleash elite designers to lead<br />
//             and dominate Gulf and global<br />
//             markets.
//           </p>
//         </div>
//       </div>
//     )}

//     {isAr && (
//       <div className="absolute inset-0 flex flex-col justify-center pl-16 sm:pl-28 md:pl-40 lg:pl-56 pr-6 -translate-y-6 md:-translate-y-16 items-start">
//         <div className="w-full max-w-xl text-right" dir="rtl">
//           <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide text-white leading-loose space-y-4">
//             <span className="block mb-3 sm:mb-4">نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل</span>
//             <span className="block mb-3 sm:mb-4">نطلق العنان لمصممين نخبة ليقودوا ويسيطروا</span>
//             <span className="block">على أســـواق الخليج والأســــواق العالمية.</span>
//           </p>
//         </div>
//       </div>
//     )}
//   </div>
// </section>







//       {/* Our Vision Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <div className="inline-block mb-8 relative p-[3px] rounded-[60px] animated-border" style={{
//             background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//             backgroundSize: '300% 300%',
//           }}>
//             <style>{`
//               @keyframes borderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .animated-border:hover {
//                 animation: borderMove 3s ease infinite;
//               }
//             `}</style>
//             <div className="bg-white rounded-[58px] p-[6px]">
//               <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                 <img src="/nzrzOfxWPwo 1.png" alt="Vision Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h2 className="text-3xl md:text-5xl font-bold text-white">
//                     {isAr ? 'رؤيتنا' : 'Our vision'}
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="max-w-4xl mx-auto" ref={visionRef}>
//             <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ lineHeight: isAr ? '2.2' : '1.8' }}>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[0]}
//                 {visionTexts[0].length < visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//               <span className="block pb-2" style={{
//                 backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {visionTexts[1]}
//                 {visionTexts[1].length < visionLines[1].length && visionTexts[0].length === visionLines[0].length && (
//                   <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
//                 )}
//               </span>
//             </h3>
//           </div>
//         </div>
//       </section>
      
//       {/* Mission Section with Images */}
//       <section className="w-full bg-white py-8 md:py-12 overflow-x-hidden relative z-10">
//         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-8 lg:gap-12 items-center">
            
//             {/* Left Image */}
//             <div className="flex justify-center">
//               <div className="animated-border-img p-[1px] rounded-3xl" style={{
//                 background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//                 backgroundSize: '300% 300%',
//               }}>
//                 <img src="/Mask group (11).png" alt="Designer working" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
//               </div>
//             </div>

//             {/* Center Text Content */}
//             <div className="text-center px-2 flex flex-col items-center justify-center" style={{ gap: isAr ? '20px' : '8px' }}>
//               {(isAr ? [
//                 "بينما ينشغل العالم بتعليم",
//                 "استخدام البرامج، تركز رؤيتنا",
//                 "على تنمية نخبة من المصممين",
//                 "الذين يفهمون الغاية من التصميم.",
//                 "",
//                 "نسعى لأن نكون الجسر",
//                 "الذي يُمكّن المصممين العرب",
//                 "من الانتقال من التعلم العشوائي",
//                 "إلى الاحترافية التي تتمتع",
//                 "بها الوكالات العالمية.",
//               ] : [
//                 "While the world is preoccupied",
//                 "with teaching how to use",
//                 "software, our vision is focused",
//                 "on cultivating an elite group",
//                 "that understands the purpose",
//                 "of design.",
//                 "We aspire to be the bridge",
//                 "that allows Arab designers to",
//                 "move from haphazard",
//                 "learning to the professionalism",
//                 "of global agencies.",
//               ]).map((line, i) => (
//                 <span key={i} className="block font-bold leading-snug"
//                   style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 2vw, 32px)', backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}>
//                   {line}
//                 </span>
//               ))}
//             </div>

//             {/* Right Image */}
//             <div className="flex justify-center">
//               <div className="animated-border-img p-[1px] rounded-3xl" style={{
//                 background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//                 backgroundSize: '300% 300%',
//               }}>
//                 <img src="/Mask group (8).png" alt="Designer with tablet" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Our Mission Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="w-full">
//           {/* Our Mission Badge */}
//           <div className="flex justify-center mb-12">
//             <div className="inline-block relative p-[2px] rounded-[60px] animated-border-mission2" style={{
//               background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
//               backgroundSize: '300% 300%',
//             }}>
//               <style>{`
//                 @keyframes borderMoveMission2 {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .animated-border-mission2:hover {
//                   animation: borderMoveMission2 3s ease infinite;
//                 }
//               `}</style>
//               <div className="bg-white rounded-[58px] p-[6px]">
//                 <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
//                   <img src="/nzrzOfxWPwo 1.png" alt="Mission Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-black">{t('mission.badge')}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Image with Overlay and Animated Border Box */}
//           <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1441/593' }}>
//             <img src="/i-want-to-find-a-place-where-there-are-y_-i9BElK5RRCc7L2AYEM1VQ_lITVPwkFSIe_yfevqvJAwA_cover 1.png" alt="Our Mission" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-black/70"></div>
//             <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}></div>
//             <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
//               <style>{`
//                 @keyframes moveBorder {
//                   0% { background-position: 0% 50%; }
//                   50% { background-position: 100% 50%; }
//                   100% { background-position: 0% 50%; }
//                 }
//                 .mission-border-anim {
//                   background: linear-gradient(135deg, #0000EA, #FF00E5, #00ffff, #FF00E5, #0000EA);
//                   background-size: 300% 300%;
//                   animation: moveBorder 3s ease infinite;
//                 }
//               `}</style>
//               {/* Mobile */}
//               <div className="md:hidden w-full relative flex items-center p-4 rounded-2xl">
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed text-sm">
//                   {t('mission.mobile')}
//                 </p>
//               </div>
//               {/* Desktop */}
//               <div className="hidden md:flex" style={{ width: '1400px', maxWidth: '90%', height: '350px', position: 'relative', alignItems: 'center', padding: '40px', marginLeft: isAr ? 'auto' : '5%', marginRight: isAr ? '5%' : 'auto' }}>
//                 <div className="mission-border-anim" style={{
//                   position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
//                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                   WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//                 }} />
//                 <p className="text-white font-bold leading-relaxed" style={{ fontSize: '32px', whiteSpace: 'pre-line' }}>
//                   {t('mission.desktop')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Secret Section */}
//       <section className="w-full bg-white py-8 md:py-12">
//         <div className="w-full px-6 sm:px-8 lg:px-12">
//           <div className="relative w-full max-w-[1031px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '1031/509' }}>
//             <div className="secret-border-anim" style={{
//               position: 'absolute', inset: 0, borderRadius: '20px', padding: '3px', zIndex: 10,
//               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//               WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
//             }} />
//             <style>{`
//               @keyframes secretBorderMove {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//               }
//               .secret-border-anim {
//                 background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//                 background-size: 300% 300%;
//                 animation: secretBorderMove 3s ease infinite;
//               }
//             `}</style>
//             <img src="/in4.png" alt="Secret Section" className="w-full h-full object-cover rounded-3xl scale-x-[-1]" />
//             {/* Mobile text */}
//             <div className="absolute inset-0 flex items-center justify-center px-4 md:hidden" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-lg leading-snug text-center">
//                 {t('secret.mobile')}
//               </h2>
//             </div>
//             {/* Desktop text */}
//             <div className="hidden md:flex absolute inset-0 items-center justify-start px-10" style={{ zIndex: 3 }}>
//               <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug" style={{ transform: 'translateY(1%)', whiteSpace: 'pre-line' }}>
//                 {t('secret.desktop')}
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Philosophy Section */}
//       <section className="w-full py-8 md:py-12 bg-white relative z-10">
//         <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-0">
//           {t('philosophy.lines', { returnObjects: true }).map((line, i) => (
//             <span key={i} className="font-bold leading-relaxed" style={{
//               fontSize: 'clamp(20px, 2.5vw, 36px)',
//               backgroundImage: 'linear-gradient(to right, #000000, #888888)',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               color: 'transparent',
//               display: 'block',
//             }}>{line}</span>
//           ))}
//         </div>
//       </section>

//       {/* Four Pillars Section */}
//       <section className="w-full bg-white py-8 md:py-12 relative">
//         <img 
//           src="/Ellipse 65.png" 
//           alt="" 
//           className="absolute left-1/2 pointer-events-none"
//           style={{ width: 'min(1432.6px, 100%)', height: 'auto', minHeight: '550px', zIndex: 0, top: '-15%', transform: 'translateX(-50%)', clipPath: 'inset(0 0 25% 0)' }}
//         />
//         <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8 relative z-10">
//         <style>{`
//             @keyframes pillarBorderMove {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .pillar-border-anim {
//               background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: pillarBorderMove 3s ease infinite;
//             }
//           `}</style>

//           {/* MOBILE: auto-scroll carousel */}
//           <MobilePillarsCarousel isAr={isAr} pillarTextsAr={[
//             t('pillars.pillar1.text'),
//             t('pillars.pillar2.text'),
//             t('pillars.pillar3.text'),
//             t('pillars.pillar4.text'),
//           ]} pillarTitlesAr={[
//             t('pillars.pillar1.title'),
//             t('pillars.pillar2.title'),
//             t('pillars.pillar3.title'),
//             t('pillars.pillar4.title'),
//           ]} />

//           {/* DESKTOP: stacked layout */}
//           <div className="hidden md:flex flex-col gap-8 relative z-10">
//             {/* Pillar 1 */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[0]} alt="Gulf Market" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-start">
//                 <div className="flex items-start gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center mt-1">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-base md:text-xl md:whitespace-nowrap" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar1.title') : <>A deep understanding of the psychology of<br className="hidden md:block" /> the Gulf market:</>}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar1.text') : "We don't teach general design; rather, we reveal to you the secrets of refined taste and the high-quality standards demanded by leading companies in the Arab world. Our goal is for you to master the \"language of the market,\" so you become a designer understood and appreciated by clients at first glance."}</p>
//               </div>
//             </div>

//             {/* Pillar 2 */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar2.title') : 'Business of Design methodology:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar2.text') : "Talent alone is not enough. The biggest gap in our region is the talented designer who doesn't know how to sell themselves or their project. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education, transforming you from an order fulfiller to a technical consultant who leads projects and makes decisions with confidence."}</p>
//               </div>
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[1]} alt="Business of Design" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//             </div>

//             {/* Pillar 3 */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[2]} alt="Real-world agency" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar3.title') : 'Real-world agency simulation:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar3.text') : "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry, where you experience real challenges, tight deadlines, and professional feedback."}</p>
//               </div>
//             </div>

//             {/* Pillar 4 */}
//             <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </span>
//                   <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                   } : { color: 'white' }}>
//                     {isAr ? t('pillars.pillar4.title') : 'A lifetime asset that grows forever:'}
//                   </h3>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar4.text') : "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated continuously with AI technologies and modern market requirements."}</p>
//               </div>
//               <div className="md:w-[45%] flex-shrink-0 relative">
//                 <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
//                 <img src={pillarImages[3]} alt="Lifetime asset" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Rating / Values Section placed at the very bottom before footer (Stars aligned right under 'قيمنا') */}
//   <section className="w-full bg-white py-8 md:py-12">
//   <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//     <div className="relative w-full rounded-2xl overflow-hidden bg-black">
//       <img 
//         src="/professional-portrait-of-a-gulf-woman-st_VMTN33Z4RIao7LQi0EaSVA_9T8J_OzSQ7GRNT_78pt7yg_4k 1.png" 
//         alt="Our Values" 
//         className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto object-cover block" 
//         style={{ transform: isAr ? 'translateX(-1%) scaleX(-1)' : 'translateX(-1%)' }} 
//       />
//       <div className={`absolute inset-0 flex items-center px-4 sm:px-8 md:px-12 lg:px-16 ${isAr ? 'justify-end' : 'justify-start'}`}>
//         <div 
//           className="border border-white bg-black/50 sm:bg-black/40 backdrop-blur-[2px] flex flex-col justify-center p-6 sm:p-8 md:p-10 w-full max-w-[950px]" 
//           style={{ height: 'auto', minHeight: '260px', borderRadius: '16px' }}
//         >
//           <div className={`w-full ${isAr ? 'text-right' : 'text-left'}`}>
//             {/* 1. عنوان Our Values */}
//             <div className="flex items-center gap-4 mb-3 sm:mb-4">
//               <h2 className="text-white font-light" style={{ fontFamily: 'Lexend', fontSize: 'clamp(36px, 7vw, 96px)', lineHeight: '100%' }}>
//                 {t('values.title')}
//               </h2>
//             </div>

//             {/* 2. الخط الفاصل */}
//             <div className="w-1/2 h-px bg-white mb-3 sm:mb-4"></div>

//             {/* 3. الوصف (What We Stand For) */}
//             <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white font-medium mb-6">
//               {t('values.subtitle')}
//             </p>

//             {/* 4. النجوم في الأسفل (محاذاة تامة للطرف الأيسر في الإنجليزي والأيمن في العربي) */}
//             <div className={`flex items-center gap-3 ${isAr ? 'justify-start flex-row' : 'justify-start flex-row'}`}>
//               <div className="flex gap-2 sm:gap-3">
//                 {[...Array(5)].map((_, i) => {
//                   const starValue = i + 1;
//                   return (
//                     <button
//                       key={i}
//                       type="button"
//                       disabled={loading}
//                       onClick={() => handleRate(starValue)}
//                       onMouseEnter={() => setHover(starValue)}
//                       onMouseLeave={() => setHover(0)}
//                       className="focus:outline-none transition-transform hover:scale-110 cursor-pointer bg-transparent border-none p-0"
//                       title={`Rate ${starValue} stars`}
//                     >
//                       <svg 
//                         className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-colors ${
//                           starValue <= (hover || rating)
//                             ? 'text-yellow-400 fill-yellow-400'
//                             : 'text-white fill-none'
//                         }`} 
//                         stroke="currentColor" 
//                         strokeWidth="2" 
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                       </svg>
//                     </button>
//                   );
//                 })}
//               </div>

//               {isSubmitted && (
//                 <span className="text-green-400 text-xs sm:text-sm font-medium bg-green-950/60 px-3 py-1 rounded-full border border-green-500/30 animate-pulse">
//                   {isAr ? '✓ تم التقييم بنجاح' : '✓ Rated successfully'}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//     </div>
//   );
// }

// export default AboutUs;




import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import BASE_URL from '../../api/config';
import InstructorAbout from '../../Home/Sections/InstructorAbout';
import ServicesSection from '../../Home/Sections/ServicesSection';
import PortfolioSection from '../../Home/Sections/PortfolioSection';
import TestimonialsSection from '../../Home/Sections/TestimonialsSection';
import TraineesShowcase from '../../Home/Sections/TraineesShowcase';

function parseCountValue(str) {
  const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
  const suffix = str.replace(/[0-9]/g, '');
  return { num: isNaN(num) ? 0 : num, suffix };
}

function AnimatedStat({ value, className, style }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState(0);
  const { num, suffix } = parseCountValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let animating = false;
    let timer;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (animating) return;
          setDisplay(0);
          animating = true;
          const duration = 1000;
          const step = 16;
          const totalSteps = duration / step;
          const increment = num / totalSteps;
          let current = 0;
          timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setDisplay(num);
              clearInterval(timer);
              timer = null;
            } else {
              setDisplay(Math.floor(current));
            }
          }, step);
        } else {
          if (timer) { clearInterval(timer); timer = null; }
          animating = false;
          setDisplay(0);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); if (timer) clearInterval(timer); };
  }, [num]);

  return (
    <h3 ref={ref} className={className} style={style}>
      {display}{suffix}
    </h3>
  );
}

const pillarImages = ["/71.png", "/pmg.png", "/Mak group.png", "/Mask roup (12).png"];

const pillarTitles = [
  "A deep understanding of the psychology of the Gulf market",
  "Business of Design methodology",
  "Real-world agency simulation",
  "A lifetime asset that grows forever",
];

const pillarTextsEn = [
  "We don't teach general design; we reveal the secrets of refined taste and high-quality standards demanded by leading companies in the Arab world.",
  "Talent alone is not enough. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education.",
  "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry.",
  "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated with AI technologies.",
];

const MobilePillarsCarousel = ({ isAr, pillarTextsAr, pillarTitlesAr }) => {
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const start = () => {
      autoScrollRef.current = setInterval(() => {
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
        }
      }, 3000);
    };
    start();
    const pause = () => clearInterval(autoScrollRef.current);
    const resume = () => start();
    el.addEventListener('touchstart', pause);
    el.addEventListener('touchend', resume);
    return () => {
      clearInterval(autoScrollRef.current);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, []);

  return (
    <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1 relative z-10">
      {pillarImages.map((image, i) => (
        <div key={i} className="flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden bg-black snap-center relative">
          <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
          <img src={image} alt={pillarTitles[i]} className="w-full h-40 object-cover" />
          <div className="p-4" dir={isAr ? 'rtl' : 'ltr'}>
            <div className="flex items-start gap-2 mb-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9FE422] flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </span>
              <h3 className="font-bold text-sm" style={isAr ? {
                backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              } : { color: 'white' }}>
                {isAr ? pillarTitlesAr[i] : pillarTitles[i]}
              </h3>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              {isAr ? pillarTextsAr[i] : pillarTextsEn[i]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

function AboutUs() {
  const { isAr } = useLanguage();
  const { t } = useTranslation('aboutus');
  const visionRef = useRef(null);
  const [visionStarted, setVisionStarted] = useState(false);
  const [visionTexts, setVisionTexts] = useState(['', '']);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${BASE_URL}/ratings`, {
      headers: { 'Accept': 'application/json' },
    })
      .then(res => res.json())
      .then(json => {
        if (json?.average || json?.data?.average) {
          setAverageRating(json.average || json.data.average);
        }
      })
      .catch(() => {});
  }, []);

  const handleRate = async (selectedRating) => {
    setRating(selectedRating);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ rating: selectedRating }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        if (data?.average) {
          setAverageRating(data.average);
        }
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const visionLines = isAr
    ? ['سد الفجوة بين إتقان الأداة', 'وإتقان الأعمال']
    : ['Bridging the gap between mastering', 'the tool and mastering the business'];

  useEffect(() => {
    setVisionTexts(['', '']);
    setVisionStarted(false);
  }, [isAr]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisionStarted(true); },
      { threshold: 0.3 }
    );
    if (visionRef.current) observer.observe(visionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visionStarted) return;
    const speed = 60;
    const timers = [];
    visionLines.forEach((line, li) => {
      const delay = li === 0 ? 0 : visionLines[0].length * speed + 200;
      let i = 0;
      const start = setTimeout(() => {
        const interval = setInterval(() => {
          i++;
          setVisionTexts(prev => {
            const next = [...prev];
            next[li] = line.slice(0, i);
            return next;
          });
          if (i >= line.length) clearInterval(interval);
        }, speed);
        timers.push(interval);
      }, delay);
      timers.push(start);
    });
    return () => timers.forEach(clearTimeout);
  }, [visionStarted, isAr]);

  return (
    <div className="min-h-screen bg-white space-y-12 md:space-y-16">
      {/* Hero Section */}
      {/* <section className="w-full bg-white flex items-center justify-center pt-16 md:pt-20 relative overflow-hidden">
        <div className="relative w-full max-w-full">
          <img
            className="w-full h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] object-cover"
            src="/nasr.png" 
            alt="Courses Cover"
          />
          
          {!isAr && (
            <div className="absolute inset-0 flex flex-col justify-center pl-10 sm:pl-16 md:pl-24 lg:pl-32 pr-6 -translate-y-6 md:-translate-y-16 items-start text-left">
              <div className="max-w-3xl">
                <h1 className="font-bold mb-4" style={{ 
                  fontSize: 'clamp(32px, 7vw, 96px)',
                  backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1
                }}>
                  About Us
                </h1>
                <p className="text-base sm:text-xl md:text-2xl lg:text-4xl font-semibold tracking-wide text-white leading-loose text-left">
                  We don't just teach design we<br />
                  unleash elite designers to lead<br />
                  and dominate Gulf and global<br />
                  markets.
                </p>
              </div>
            </div>
          )}

          {isAr && (
            <div className="absolute inset-0 flex flex-col justify-center pl-10 sm:pl-16 md:pl-24 lg:pl-32 pr-6 -translate-y-6 md:-translate-y-16 items-start text-left">
              <div className="max-w-3xl text-right" dir="rtl">
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide text-white leading-loose space-y-4">
                  <span className="block mb-3 sm:mb-4">نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل</span>
                  <span className="block mb-3 sm:mb-4">نطلق العنان لمصممين نخبة ليقودوا ويسيطروا</span>
                  <span className="block">على أســـواق الخليج والأســــواق العالمية.</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section> */}
<section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative">
  <div className="relative w-full max-w-full">
    <img
      className="w-full h-auto object-cover"
      src="/nasr.png"
      alt="Courses Cover"
    />
    {/* Mobile overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:hidden">
      {!isAr && (
        <h1 className="font-bold text-center mb-3" style={{
          fontSize: 'clamp(36px, 12vw, 64px)',
          backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          About Us
        </h1>
      )}
      <p dir={isAr ? 'ltr' : undefined} className={`text-sm font-medium tracking-wide text-white leading-relaxed ${isAr ? 'text-left px-12' : 'text-center'}`}>
        {isAr ? (
          <>
            نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
            نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
            على أســـواق الخليج والأســــواق<br />
            <span className="block text-left">العالميــــة.</span>
          </>
        ) : (
          <>
            We don't just teach design we<br />
            unleash elite designers to lead<br />
            and dominate Gulf and global<br />
            markets.
          </>
        )}
      </p>
    </div>
    {/* Desktop overlay */}
    <div className="hidden md:flex absolute inset-0 items-center justify-center">
      {!isAr && (
        <div className="absolute left-[8%] lg:left-[12%] text-white font-lexend max-w-xl lg:max-w-2xl text-left -mt-20 md:-mt-32">
          <h1 className="font-bold leading-[1.01]" style={{
            fontSize: 'clamp(40px, 7vw, 100px)',
            backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            About Us
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-3xl font-medium tracking-wide text-white leading-relaxed text-left">
            We don't just teach design we<br />
            unleash elite designers to lead<br />
            and dominate Gulf and global<br />
            markets.
          </p>
        </div>
      )}

      {isAr && (
        <div className="absolute inset-0 flex items-center justify-center -ml-64 -mt-72 md:-mt-96">
          <div className="text-white font-lexend max-w-2xl text-right">
            <p
              className="mt-6 text-lg md:text-2xl lg:text-4xl font-medium tracking-wide text-white leading-relaxed text-right"
              style={{ transform: 'translate(-160px, 25px)' }}
            >
              نحن لا نكتــفي بتــدريس التصميـــم فحســب، بل<br />
              نطلق العنان لمصممين نخبة ليقودوا ويسيطروا<br />
              على أســـواق الخليج والأســــواق<br />
              <span className="block text-right">العالميــــة.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</section>
      {/* Our Vision Section */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="inline-block mb-8 relative p-[3px] rounded-[60px] animated-border" style={{
            background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
            backgroundSize: '300% 300%',
          }}>
            <style>{`
              @keyframes borderMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animated-border:hover {
                animation: borderMove 3s ease infinite;
              }
            `}</style>
            <div className="bg-white rounded-[58px] p-[6px]">
              <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
                <img src="/nzrzOfxWPwo 1.png" alt="Vision Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl md:text-5xl font-bold text-white">
                    {isAr ? 'رؤيتنا' : 'Our vision'}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto" ref={visionRef}>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ lineHeight: isAr ? '2.2' : '1.8' }}>
              <span className="block pb-2" style={{
                backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                {visionTexts[0]}
                {visionTexts[0].length < visionLines[0].length && (
                  <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
                )}
              </span>
              <span className="block pb-2" style={{
                backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                {visionTexts[1]}
                {visionTexts[1].length < visionLines[1].length && visionTexts[0].length === visionLines[0].length && (
                  <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
                )}
              </span>
            </h3>
          </div>
        </div>
      </section>
      
      {/* Mission Section with Images */}
      <section className="w-full bg-white py-8 md:py-12 overflow-x-hidden relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-8 lg:gap-12 items-center">
            
            <div className="flex justify-center">
              <div className="animated-border-img p-[1px] rounded-3xl" style={{
                background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
                backgroundSize: '300% 300%',
              }}>
                <img src="/Mask group (11).png" alt="Designer working" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
              </div>
            </div>

            <div className="text-center px-2 flex flex-col items-center justify-center" style={{ gap: isAr ? '20px' : '8px' }}>
              {(isAr ? [
                "بينما ينشغل العالم بتعليم",
                "استخدام البرامج، تركز رؤيتنا",
                "على تنمية نخبة من المصممين",
                "الذين يفهمون الغاية من التصميم.",
                "",
                "نسعى لأن نكون الجسر",
                "الذي يُمكّن المصممين العرب",
                "من الانتقال من التعلم العشوائي",
                "إلى الاحترافية التي تتمتع",
                "بها الوكالات العالمية.",
              ] : [
                "While the world is preoccupied",
                "with teaching how to use",
                "software, our vision is focused",
                "on cultivating an elite group",
                "that understands the purpose",
                "of design.",
                "We aspire to be the bridge",
                "that allows Arab designers to",
                "move from haphazard",
                "learning to the professionalism",
                "of global agencies.",
              ]).map((line, i) => (
                <span key={i} className="block font-bold leading-snug"
                  style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 2vw, 32px)', backgroundImage: 'linear-gradient(to right, #000000 0%, #888888 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}>
                  {line}
                </span>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="animated-border-img p-[1px] rounded-3xl" style={{
                background: 'linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
                backgroundSize: '300% 300%',
              }}>
                <img src="/Mask group (8).png" alt="Designer with tablet" className="w-full max-w-md h-auto object-cover rounded-3xl scale-x-[-1]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="w-full">
          <div className="flex justify-center mb-12">
            <div className="inline-block relative p-[2px] rounded-[60px] animated-border-mission2" style={{
              background: 'linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80)',
              backgroundSize: '300% 300%',
            }}>
              <style>{`
                @keyframes borderMoveMission2 {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .animated-border-mission2:hover {
                  animation: borderMoveMission2 3s ease infinite;
                }
              `}</style>
              <div className="bg-white rounded-[58px] p-[6px]">
                <div className="relative rounded-[52px] overflow-hidden" style={{width: '300px', height: '100px'}}>
                  <img src="/nzrzOfxWPwo 1.png" alt="Mission Background" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.5)', transformOrigin: 'center top' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black">{t('mission.badge')}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1441/593' }}>
            <img src="/i-want-to-find-a-place-where-there-are-y_-i9BElK5RRCc7L2AYEM1VQ_lITVPwkFSIe_yfevqvJAwA_cover 1.png" alt="Our Mission" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}></div>
            <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
              <style>{`
                @keyframes moveBorder {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .mission-border-anim {
                  background: linear-gradient(135deg, #0000EA, #FF00E5, #00ffff, #FF00E5, #0000EA);
                  background-size: 300% 300%;
                  animation: moveBorder 3s ease infinite;
                }
              `}</style>
              <div className="md:hidden w-full relative flex items-center p-4 rounded-2xl">
                <div className="mission-border-anim" style={{
                  position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
                }} />
                <p className="text-white font-bold leading-relaxed text-sm">
                  {t('mission.mobile')}
                </p>
              </div>
              <div className="hidden md:flex" style={{ width: '1400px', maxWidth: '90%', height: '350px', position: 'relative', alignItems: 'center', padding: '40px', marginLeft: isAr ? 'auto' : '5%', marginRight: isAr ? '5%' : 'auto' }}>
                <div className="mission-border-anim" style={{
                  position: 'absolute', inset: 0, borderRadius: '16px', padding: '3px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
                }} />
                <p className="text-white font-bold leading-relaxed" style={{ fontSize: '32px', whiteSpace: 'pre-line' }}>
                  {t('mission.desktop')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secret Section */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="relative w-full max-w-[1031px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '1031/509' }}>
            <div className="secret-border-anim" style={{
              position: 'absolute', inset: 0, borderRadius: '20px', padding: '3px', zIndex: 10,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
            }} />
            <style>{`
              @keyframes secretBorderMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .secret-border-anim {
                background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
                background-size: 300% 300%;
                animation: secretBorderMove 3s ease infinite;
              }
            `}</style>
            <img src="/in4.png" alt="Secret Section" className="w-full h-full object-cover rounded-3xl scale-x-[-1]" />
            <div className="absolute inset-0 flex items-center justify-center px-4 md:hidden" style={{ zIndex: 3 }}>
              <h2 className="text-white font-bold text-lg leading-snug text-center">
                {t('secret.mobile')}
              </h2>
            </div>
            <div className="hidden md:flex absolute inset-0 items-center justify-start px-10" style={{ zIndex: 3 }}>
              <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug" style={{ transform: 'translateY(1%)', whiteSpace: 'pre-line' }}>
                {t('secret.desktop')}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-8 md:py-12 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-0">
          {t('philosophy.lines', { returnObjects: true }).map((line, i) => (
            <span key={i} className="font-bold leading-relaxed" style={{
              fontSize: 'clamp(20px, 2.5vw, 36px)',
              backgroundImage: 'linear-gradient(to right, #000000, #888888)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'block',
            }}>{line}</span>
          ))}
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="w-full bg-white py-8 md:py-12 relative">
        <img 
          src="/Ellipse 65.png" 
          alt="" 
          className="absolute left-1/2 pointer-events-none"
          style={{ width: 'min(1432.6px, 100%)', height: 'auto', minHeight: '550px', zIndex: 0, top: '-15%', transform: 'translateX(-50%)', clipPath: 'inset(0 0 25% 0)' }}
        />
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8 relative z-10">
        <style>{`
            @keyframes pillarBorderMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .pillar-border-anim {
              background: linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
              background-size: 300% 300%;
              animation: pillarBorderMove 3s ease infinite;
            }
          `}</style>

          <MobilePillarsCarousel isAr={isAr} pillarTextsAr={[
            t('pillars.pillar1.text'),
            t('pillars.pillar2.text'),
            t('pillars.pillar3.text'),
            t('pillars.pillar4.text'),
          ]} pillarTitlesAr={[
            t('pillars.pillar1.title'),
            t('pillars.pillar2.title'),
            t('pillars.pillar3.title'),
            t('pillars.pillar4.title'),
          ]} />

          <div className="hidden md:flex flex-col gap-8 relative z-10">
            {/* Pillar 1 */}
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
              <div className="md:w-[45%] flex-shrink-0 relative">
                <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
                <img src={pillarImages[0]} alt="Gulf Market" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-start">
                <div className="flex items-start gap-2 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <h3 className="font-bold text-base md:text-xl md:whitespace-nowrap" style={isAr ? {
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  } : { color: 'white' }}>
                    {isAr ? t('pillars.pillar1.title') : <>A deep understanding of the psychology of<br className="hidden md:block" /> the Gulf market:</>}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar1.text') : "We don't teach general design; rather, we reveal to you the secrets of refined taste and the high-quality standards demanded by leading companies in the Arab world. Our goal is for you to master the \"language of the market,\" so you become a designer understood and appreciated by clients at first glance."}</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  } : { color: 'white' }}>
                    {isAr ? t('pillars.pillar2.title') : 'Business of Design methodology:'}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar2.text') : "Talent alone is not enough. The biggest gap in our region is the talented designer who doesn't know how to sell themselves or their project. Our curriculum places negotiation skills, strategic pricing, and project management at the heart of our education, transforming you from an order fulfiller to a technical consultant who leads projects and makes decisions with confidence."}</p>
              </div>
              <div className="md:w-[45%] flex-shrink-0 relative">
                <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
                <img src={pillarImages[1]} alt="Business of Design" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
              <div className="md:w-[45%] flex-shrink-0 relative">
                <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
                <img src={pillarImages[2]} alt="Real-world agency" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  } : { color: 'white' }}>
                    {isAr ? t('pillars.pillar3.title') : 'Real-world agency simulation:'}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar3.text') : "True learning begins when theorizing stops. Our projects are a realistic simulation of the creative agencies industry."}</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-black">
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9FE422] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <h3 className="font-bold text-lg md:text-xl" style={isAr ? {
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  } : { color: 'white' }}>
                    {isAr ? t('pillars.pillar4.title') : 'A lifetime asset that grows forever:'}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{isAr ? t('pillars.pillar4.text') : "Subscribing to our service isn't just about videos; it's about acquiring a lasting professional asset updated with AI technologies."}</p>
              </div>
              <div className="md:w-[45%] flex-shrink-0 relative">
                <div className="pillar-border-anim" style={{ position:'absolute', inset:0, borderRadius:'16px', padding:'2px', WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', pointerEvents:'none', zIndex:10 }} />
                <img src={pillarImages[3]} alt="Lifetime asset" className="w-full h-full object-cover" style={{ minHeight: '200px' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <InstructorAbout />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Trainees Showcase */}
      <TraineesShowcase />

      {/* Testimonials & Rating Section */}
      <TestimonialsSection />
      
      <section className="w-full bg-white py-12 px-6">
        <div className="max-w-xl mx-auto text-center bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            {isAr ? 'قيم تجربتك معنا' : 'Rate Your Experience'}
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            {isAr ? 'رأيك يهمنا في تطوير محتوى المنصة وتحسين جودة التعليم' : 'Your feedback helps us improve our platform and course quality.'}
          </p>

          <div className="flex justify-center gap-2 mb-4" dir="ltr">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={loading}
                className="text-3xl focus:outline-none transition-transform hover:scale-110"
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <span className={(hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              </button>
            ))}
          </div>

          {averageRating > 0 && (
            <div className="text-sm font-medium text-gray-700 mt-2">
              {isAr ? `التقييم العام: ${Number(averageRating).toFixed(1)} / 5` : `Average Rating: ${Number(averageRating).toFixed(1)} / 5`}
            </div>
          )}

          {isSubmitted && (
            <p className="text-green-600 font-medium text-sm mt-3 animate-fade-in">
              {isAr ? 'شكراً لك! تم إرسال تقييمك بنجاح.' : 'Thank you! Your rating has been submitted successfully.'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;