// import { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import { getCertificates } from '../api/certificates';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const certImages = [
//   "/Excellence-in-Graphic-Design 6.png",
//   "/Excellence-in-Graphic-Design 1.png",
//   "/Excellence-in-Graphic-Design 5.png",
//   "/Excellence-in-Graphic-Design 3.png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
// ];

// const CertificationsSection = () => {
//   const { t } = useTranslation('courses');
//   const { isAr } = useLanguage();
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     getCertificates({ per_page: 50, search: '' })
//       .then((json) => {
//         console.log('Certificates API response:', json);
//         const items = json.data || [];
//         setCertifications(
//           items.map((item, index) => ({
//             id: item.id,
//             name: item.holder?.name || '',
//             achievement: isAr 
//               ? (item.title_ar || item.course?.title_ar || item.course?.title || t('certifications.excellence'))
//               : (item.title_en || item.course?.title_en || item.course?.title || t('certifications.excellence')),
//             description: isAr 
//               ? (item.description_ar || item.description || t('certifications.defaultDesc'))
//               : (item.description_en || item.description || t('certifications.defaultDesc')),
//             image: item.image_url || certImages[index % certImages.length],
//             displayName: item.holder?.name || '',
//             certificateNumber: item.certificate_number,
//           }))
//         );
//       })
//       .catch((err) => console.error('Failed to fetch certificates:', err))
//       .finally(() => setLoading(false));
//   }, [isAr, t]);

//   // Auto-scroll تلقائي
//   useEffect(() => {
//     if (certifications.length === 0 || !scrollRef.current) return;

//     const startScroll = setTimeout(() => {
//       autoScrollRef.current = setInterval(() => {
//         const container = scrollRef.current;
//         if (!container) return;

//         const rows = isMobile ? 1 : 2;
//         const cols = Math.ceil(certifications.length / rows);
//         const colWidth = container.scrollWidth / cols;
//         const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 2;

//         if (isAtEnd) {
//           container.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           container.scrollBy({ left: isAr ? -colWidth : colWidth, behavior: 'smooth' });
//         }
//       }, 3000);
//     }, 500);

//     return () => {
//       clearTimeout(startScroll);
//       clearInterval(autoScrollRef.current);
//     };
//   }, [certifications.length, isAr, isMobile]);

//   return (
//     <div className="w-full relative">
//       {/* Title - Outside the background, with image behind text */}
//       <div className="text-center mb-0 px-4 sm:px-6 lg:px-8 relative z-30">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//           <div style={{
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bott',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>{t('certifications.title')}</div>
//           <div className="text-black text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">{t('certifications.subtitle')}</div>
//         </h1>
//       </div>

//       {/* Medal - overlapping the background container */}
//       <div className="flex justify-center relative z-40 mb-[-50px] sm:mb-[-60px] lg:mb-[-70px]">
//         <img 
//           src="/10603705_42828 2.png" 
//           alt="Medal Icon" 
//           className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
//         />
//       </div>

//       {/* Background section with content */}
//       <section className="w-full min-h-screen relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible mb-16 sm:mb-20 lg:mb-24" style={{background: 'linear-gradient(135deg, rgba(230,230,230,0.3), rgba(255,255,255,0.3), rgba(219,219,219,0.3))', borderRadius: '120px'}}>
        
//         {/* Background Image - Ellipse 64 */}
//         <div className="absolute -top-80 right-0 w-3/4 h-full z-10 hidden sm:flex items-center">
//           <img
//             src="/Ellipse 64.png"
//             alt="Background"
//             className="w-full h-4/5 object-fill rounded-[70px]"
//           />
//         </div>
        
//         <div className="relative z-20 max-w-7xl mx-auto">

//         {/* Certifications Grid */}
//           <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>

//           {/* Mobile: Swiper */}
//           <div className="block sm:hidden mb-8">
//             <Swiper
//               modules={[Autoplay]}
//               slidesPerView={1}
//               spaceBetween={16}
//               loop={true}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               centeredSlides={true}
//               className="w-full"
//             >
//               {loading ? null : certifications.map((cert, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="bg-white rounded-2xl p-4 border-4 border-gray-300 shadow-lg flex flex-col mx-2">
//                     <div className="mb-3">
//                       <h3 className="text-xs font-bold text-gray uppercase tracking-wider">{t('certifications.label')}</h3>
//                       <h4 className="text-base font-normal text-black mb-1">{cert.name || t('certifications.student')}</h4>
//                       <p className="text-sm text-gray-700">{cert.achievement}</p>
//                     </div>
//                     <p className="text-xs text-black mb-3 leading-relaxed">{cert.description}</p>
//                     <div className="flex gap-1 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                         </svg>
//                       ))}
//                     </div>
//                     <div className="w-full aspect-[391/441]">
//                       <img src={cert.image} alt={cert.name} className="w-full h-full object-contain"
//                         onError={(e) => { e.target.src = certImages[index % certImages.length]; }} />
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Desktop: Grid */}
//           <div
//             ref={scrollRef}
//             className="hidden sm:grid pb-4 scrollbar-hide mb-8 sm:mb-12"
//             style={{
//               gridTemplateRows: 'repeat(2, auto)',
//               gridAutoFlow: 'column',
//               gridAutoColumns: 'clamp(280px, calc((100% - 3rem) / 3), 400px)',
//               gap: '1.5rem',
//               overflowX: 'auto',
//               overflowY: 'hidden',
//             }}
//           >
//           {loading ? (
//             <p className="text-gray-500 col-span-3 text-center">{t('certifications.loading')}</p>
//           ) : (
//           certifications.map((cert, index) => (
//             <div 
//               key={index}
//               className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-3 lg:p-4 border-4 border-gray-300 shadow-lg overflow-visible flex flex-col"
//             >
//               {(index === 1 || index === 4) ? (
//                 <>
//                   {/* Image Section - Top */}
//                   <div className="relative mb-6 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
//                     <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
//                       <img
//                         src={cert.image}
//                         alt={cert.name}
//                         className="max-w-full max-h-full scale-110 object-contain"
//                         onError={(e) => {
//                           e.target.src = certImages[index % certImages.length];
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Content - Bottom */}
//                   <div className="mt-auto">
//                     {/* Title */}
//                     <div className="mb-4">
//                       <div className="relative inline-flex items-center mb-2">
//                         <h3 className="text-xs sm:text-lg lg:text-3xl font-bold text-gray uppercase tracking-wider">
//                           {t('certifications.label')}
//                         </h3>

//                         <img
//                           src="/10603705_42828 2.png"
//                           alt="Decoration"
//                           className="
//                             absolute
//                             top-1/2 -translate-y-1/2
//                             w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22
//                             object-contain
//                             pointer-events-none
//                           "
//                           style={isAr ? { left: '-4.5rem' } : { right: '-4.5rem' }}
//                         />
//                       </div>

//                       <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
//                         {cert.name || t('certifications.student')}
//                       </h4>
//                       <p className="text-sm sm:text-base text-gray-700 font-normal">
//                         {cert.achievement}
//                       </p>
//                       {cert.certificateNumber && (
//                         <p className="text-xs text-gray-400 mt-1">#{cert.certificateNumber}</p>
//                       )}
//                     </div>

//                     {/* Description */}
//                     <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
//                       {cert.description}
//                     </p>

//                     {/* Rating */}
//                     <div className="flex gap-1 mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                         </svg>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {/* Title */}
//                   <div className="mb-4">
//                     <div className="relative inline-flex items-center mb-2">
//                       <h3 className="text-xs sm:text-lg lg:text-2xl font-bold text-gray uppercase tracking-wider">
//                         {t('certifications.label')}
//                       </h3>

//                       <img
//                         src="/10603705_42828 2.png"
//                         alt="Decoration"
//                         className="
//                           absolute
//                           top-[100%] -translate-y-1/2
//                           w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22
//                           object-contain
//                           pointer-events-none
//                         "
//                         style={isAr ? { left: '-4.5rem' } : { right: '-4.5rem' }}
//                       />
//                     </div>

//                     <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
//                       {cert.name || t('certifications.student')}
//                     </h4>
//                     <p className="text-sm sm:text-base text-gray-700 font-normal">
//                       {cert.achievement}
//                     </p>
//                     {cert.certificateNumber && (
//                       <p className="text-xs text-gray-400 mt-1">#{cert.certificateNumber}</p>
//                     )}
//                   </div>

//                   {/* Description */}
//                   <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
//                     {cert.description}
//                   </p>

//                   {/* Rating */}
//                   <div className="flex gap-1 mb-4">
//                     {[...Array(5)].map((_, i) => (
//                       <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                       </svg>
//                     ))}
//                   </div>

//                   {/* Image Section - Bottom */}
//                   <div className="relative mt-auto rounded-lg p-2 flex items-center justify-center">
//                     <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
//                       <img
//                         src={cert.image}
//                         alt={cert.name}
//                         className="max-w-full max-h-full scale-110 object-contain"
//                         onError={(e) => {
//                           e.target.src = certImages[index % certImages.length];
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//           )}
//           </div>

//         <div className="flex justify-center">
//           <button
//             className="btn-wave px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full shadow-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center border-2 border-gray-300 bg-gradient-to-r from-gray-500 via-white to-gray-300 text-black transition-transform duration-200"
//           >
//             <span>{t('certifications.viewAll')}</span>
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CertificationsSection;


// import { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import { getCertificates } from '../api/certificates';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const certImages = [
//   "/Excellence-in-Graphic-Design 6.png",
//   "/Excellence-in-Graphic-Design 1.png",
//   "/Excellence-in-Graphic-Design 5.png",
//   "/Excellence-in-Graphic-Design 3.png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
// ];

// const CertificationsSection = () => {
//   const { t } = useTranslation('courses');
//   const { isAr } = useLanguage();
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     getCertificates({ per_page: 50, search: '' })
//       .then((json) => {
//         const items = json.data || [];
//         setCertifications(
//           items.map((item, index) => ({
//             id: item.id,
//             name: item.holder?.name || '',
//             achievement: isAr 
//               ? (item.title_ar || item.course?.title_ar || item.course?.title || t('certifications.excellence'))
//               : (item.title_en || item.course?.title_en || item.course?.title || t('certifications.excellence')),
//             description: isAr 
//               ? (item.description_ar || item.description || t('certifications.defaultDesc'))
//               : (item.description_en || item.description || t('certifications.defaultDesc')),
//             image: item.image_url || certImages[index % certImages.length],
//             displayName: item.holder?.name || '',
//             certificateNumber: item.certificate_number,
//           }))
//         );
//       })
//       .catch((err) => console.error('Failed to fetch certificates:', err))
//       .finally(() => setLoading(false));
//   }, [isAr, t]);

//   useEffect(() => {
//     if (certifications.length === 0 || !scrollRef.current) return;

//     const startScroll = setTimeout(() => {
//       autoScrollRef.current = setInterval(() => {
//         const container = scrollRef.current;
//         if (!container) return;

//         const rows = isMobile ? 1 : 2;
//         const cols = Math.ceil(certifications.length / rows);
//         const colWidth = container.scrollWidth / cols;
//         const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 2;

//         if (isAtEnd) {
//           container.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           container.scrollBy({ left: colWidth, behavior: 'smooth' });
//         }
//       }, 3000);
//     }, 500);

//     return () => {
//       clearTimeout(startScroll);
//       clearInterval(autoScrollRef.current);
//     };
//   }, [certifications.length, isMobile]);

//   return (
//     <div className="w-full relative">
//       {/* Title */}
//       <div className="text-center mb-0 px-4 sm:px-6 lg:px-8 relative z-30">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//           <div style={{
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bott',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>{t('certifications.title')}</div>
//           <div className="text-black text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">{t('certifications.subtitle')}</div>
//         </h1>
//       </div>

//       {/* Medal */}
//       <div className="flex justify-center relative z-40 mb-[-50px] sm:mb-[-60px] lg:mb-[-70px]">
//         <img 
//           src="/10603705_42828 2.png" 
//           alt="Medal Icon" 
//           className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
//         />
//       </div>

//       {/* Background section with content */}
//       <section className="w-full min-h-screen relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible mb-16 sm:mb-20 lg:mb-24" style={{background: 'linear-gradient(135deg, rgba(230,230,230,0.3), rgba(255,255,255,0.3), rgba(219,219,219,0.3))', borderRadius: '120px'}}>
        
//         {/* Background Image */}
//         <div className="absolute -top-80 right-0 w-3/4 h-full z-10 hidden sm:flex items-center">
//           <img
//             src="/Ellipse 64.png"
//             alt="Background"
//             className="w-full h-4/5 object-fill rounded-[70px]"
//           />
//         </div>
        
//         <div className="relative z-20 max-w-7xl mx-auto">
//           <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>

//           {/* Mobile: Swiper */}
//           <div className="block sm:hidden mb-8">
//             <Swiper
//               modules={[Autoplay]}
//               slidesPerView={1}
//               spaceBetween={16}
//               loop={true}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               centeredSlides={true}
//               className="w-full"
//             >
//               {loading ? null : certifications.map((cert, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="bg-white rounded-2xl p-4 border-4 border-gray-300 shadow-lg flex flex-col justify-between mx-2">
//                     <div>
//                       <h3 className="text-xs font-bold text-gray uppercase tracking-wider mb-1">{t('certifications.label')}</h3>
//                       <h4 className="text-base font-normal text-black mb-1">{cert.name || t('certifications.student')}</h4>
//                       <p className="text-sm text-gray-700 mb-3">{cert.achievement}</p>
//                       <p className="text-xs text-black mb-3 leading-relaxed">{cert.description}</p>
//                       <div className="flex gap-1 mb-3">
//                         {[...Array(5)].map((_, i) => (
//                           <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="w-full aspect-[391/441] mt-auto">
//                       <img src={cert.image} alt={cert.name} className="w-full h-full object-contain"
//                         onError={(e) => { e.target.src = certImages[index % certImages.length]; }} />
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Desktop: Grid - Motabaq tamamn lel-English */}
//           <div
//             ref={scrollRef}
//             className="hidden sm:grid pb-4 scrollbar-hide mb-8 sm:mb-12"
//             style={{
//               gridTemplateRows: 'repeat(2, auto)',
//               gridAutoFlow: 'column',
//               gridAutoColumns: 'clamp(280px, calc((100% - 3rem) / 3), 400px)',
//               gap: '1.5rem',
//               overflowX: 'auto',
//               overflowY: 'hidden',
//               direction: 'ltr',
//             }}
//           >
//           {loading ? (
//             <p className="text-gray-500 col-span-3 text-center">{t('certifications.loading')}</p>
//           ) : (
//             certifications.map((cert, index) => {
//               const isImageOnTop = index % 2 !== 0; 

//               return (
//                 <div 
//                   key={index}
//                   className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-3 lg:p-4 border-4 border-gray-300 shadow-lg flex flex-col justify-between text-right"
//                   style={{ direction: isAr ? 'rtl' : 'ltr' }}
//                 >
//                   {isImageOnTop ? (
//                     <>
//                       <div className="mb-4 rounded-lg p-2 flex items-center justify-center">
//                         <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
//                           <img
//                             src={cert.image}
//                             alt={cert.name}
//                             className="max-w-full max-h-full object-contain"
//                             onError={(e) => {
//                               e.target.src = certImages[index % certImages.length];
//                             }}
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-gray uppercase tracking-wider mb-1">
//                           {t('certifications.label')}
//                         </h3>
//                         <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
//                           {cert.name || t('certifications.student')}
//                         </h4>
//                         <p className="text-sm sm:text-base text-gray-700 font-normal">
//                           {cert.achievement}
//                         </p>
//                         {cert.certificateNumber && (
//                           <p className="text-xs text-gray-400 mt-1">#{cert.certificateNumber}</p>
//                         )}
//                         <p className="text-xs sm:text-sm text-black my-3 leading-relaxed">
//                           {cert.description}
//                         </p>
//                         <div className="flex gap-1">
//                           {[...Array(5)].map((_, i) => (
//                             <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                             </svg>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div>
//                         <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-gray uppercase tracking-wider mb-1">
//                           {t('certifications.label')}
//                         </h3>
//                         <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
//                           {cert.name || t('certifications.student')}
//                         </h4>
//                         <p className="text-sm sm:text-base text-gray-700 font-normal">
//                           {cert.achievement}
//                         </p>
//                         {cert.certificateNumber && (
//                           <p className="text-xs text-gray-400 mt-1">#{cert.certificateNumber}</p>
//                         )}
//                         <p className="text-xs sm:text-sm text-black my-3 leading-relaxed">
//                           {cert.description}
//                         </p>
//                         <div className="flex gap-1 mb-4">
//                           {[...Array(5)].map((_, i) => (
//                             <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                             </svg>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="mt-auto rounded-lg p-2 flex items-center justify-center">
//                         <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
//                           <img
//                             src={cert.image}
//                             alt={cert.name}
//                             className="max-w-full max-h-full object-contain"
//                             onError={(e) => {
//                               e.target.src = certImages[index % certImages.length];
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })
//           )}
//           </div>

//           <div className="flex justify-center">
//             <button
//               className="btn-wave px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full shadow-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center border-2 border-gray-300 bg-gradient-to-r from-gray-500 via-white to-gray-300 text-black transition-transform duration-200"
//             >
//               <span>{t('certifications.viewAll')}</span>
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CertificationsSection;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import { getCertificates } from '../api/certificates';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const certImages = [
//   "/Excellence-in-Graphic-Design 6.png",
//   "/Excellence-in-Graphic-Design 1.png",
//   "/Excellence-in-Graphic-Design 5.png",
//   "/Excellence-in-Graphic-Design 3.png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
// ];

// const CertificationsSection = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation('courses');
//   const { isAr } = useLanguage();
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getCertificates({ per_page: 6, search: '' })
//       .then((json) => {
//         const items = json.data || [];
//         setCertifications(
//           items.slice(0, 6).map((item, index) => ({
//             id: item.id,
//             name: item.holder?.name || '',
//             achievement: isAr 
//               ? (item.title_ar || item.course?.title_ar || item.course?.title || t('certifications.excellence', 'Excellence in Graphic Design'))
//               : (item.title_en || item.course?.title_en || item.course?.title || t('certifications.excellence', 'Excellence in Graphic Design')),
//             description: isAr 
//               ? (item.description_ar || item.description || t('certifications.defaultDesc', 'vision that fits my ambitions perfectly. I have new ideas and great that I know I will achieve here.'))
//               : (item.description_en || item.description || t('certifications.defaultDesc', 'vision that fits my ambitions perfectly. I have new ideas and great that I know I will achieve here.')),
//             image: item.image_url || certImages[index % certImages.length],
//             certificateNumber: item.certificate_number,
//           }))
//         );
//       })
//       .catch((err) => console.error('Failed to fetch certificates:', err))
//       .finally(() => setLoading(false));
//   }, [isAr, t]);

//   return (
//     <div className="w-full relative bg-black py-10" style={{ direction: 'ltr' }}>
      
//       {/* Medal Badge - Top Center */}
//       <div className="flex justify-center relative z-40 mb-[-45px]">
//         <img 
//           src="/10603705_42828 2.png" 
//           alt="Medal Icon" 
//           className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-2xl"
//         />
//       </div>

//       {/* Main Container - Dark Curved Box */}
//       <section 
//         className="w-full max-w-6xl mx-auto relative pt-16 pb-12 px-4 sm:px-8 overflow-hidden rounded-[50px] sm:rounded-[60px] border border-zinc-800 shadow-2xl" 
//         style={{
//           background: 'radial-gradient(circle at top, #1a160e 0%, #080808 100%)',
//         }}
//       >
        
//         {/* Title inside container */}
//         <div className="text-center mb-10">
//           <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
//             {t('certifications.title', 'شهاداتنا')}
//           </h2>
//         </div>

//         <div className="relative z-20">

//           {/* Mobile View - Swiper Carousel */}
//           <div className="block sm:hidden mb-8">
//             <Swiper
//               modules={[Autoplay]}
//               slidesPerView={1}
//               spaceBetween={16}
//               loop={true}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               centeredSlides={true}
//               className="w-full"
//             >
//               {loading ? null : certifications.map((cert, index) => (
//                 <SwiperSlide key={index}>
//                   <div 
//                     className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-lg flex flex-col justify-between text-left"
//                     style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
//                   >
//                     <div>
//                       <div className="flex justify-between items-center mb-1">
//                         <h3 className="text-xs font-black text-black uppercase tracking-wider">{t('certifications.label', 'CERTIFICATIONS')}</h3>
//                         <img src="/10603705_42828 2.png" alt="Badge" className="w-6 h-6 object-contain" />
//                       </div>
//                       <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">{cert.name || 'FATIMA YASSER'}</h4>
//                       <p className="text-xs font-bold text-black mb-2">{cert.achievement}</p>
//                       <div className="flex gap-1 mb-3">
//                         {[...Array(4)].map((_, i) => (
//                           <span key={i} className="text-amber-400 text-xs">★</span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mt-auto">
//                       <img 
//                         src={cert.image} 
//                         alt={cert.name} 
//                         className="w-full h-full object-cover"
//                         onError={(e) => { e.target.src = certImages[index % certImages.length]; }} 
//                       />
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Desktop View - Fixed 3 Columns x 2 Rows Grid (No Scroll) */}
//           <div
//             className="hidden sm:grid grid-cols-3 gap-5 mb-10"
//             style={{ direction: 'ltr' }}
//           >
//           {loading ? (
//             <p className="text-gray-400 col-span-3 text-center py-10">{t('certifications.loading', 'جاري التحميل...')}</p>
//           ) : (
//             certifications.map((cert, index) => {
//               // Checkerboard pattern calculation (Column 2 flips row 1 and 2)
//               const colIndex = index % 3;
//               const rowIndex = Math.floor(index / 3);
//               const isImageOnTop = colIndex === 1 ? rowIndex === 0 : rowIndex === 1;

//               return (
//                 <div 
//                   key={index}
//                   className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xl flex flex-col justify-between"
//                   style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
//                 >
//                   {isImageOnTop ? (
//                     <>
//                       {/* Top Image */}
//                       <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3">
//                         <img
//                           src={cert.image}
//                           alt={cert.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = certImages[index % certImages.length];
//                           }}
//                         />
//                       </div>

//                       {/* Bottom Info */}
//                       <div className="flex flex-col justify-between flex-1">
//                         <div>
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-sm font-black text-black tracking-tight uppercase">
//                                 {t('certifications.label', 'CERTIFICATIONS')}
//                               </h3>
//                               <h4 className="text-xs font-semibold text-gray-400 uppercase mt-0.5">
//                                 {cert.name || 'Yasser Gaber'}
//                               </h4>
//                             </div>
//                             <img src="/10603705_42828 2.png" alt="Badge" className="w-7 h-7 object-contain shrink-0" />
//                           </div>
//                           <p className="text-xs font-bold text-black mt-2 mb-1">
//                             {cert.achievement}
//                           </p>
//                           <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight">
//                             {cert.description}
//                           </p>
//                         </div>
//                         <div className="flex gap-0.5 mt-2">
//                           {[...Array(4)].map((_, i) => (
//                             <span key={i} className="text-amber-400 text-xs">★</span>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {/* Top Info */}
//                       <div className="mb-3">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="text-sm font-black text-black tracking-tight uppercase">
//                               {t('certifications.label', 'CERTIFICATIONS')}
//                             </h3>
//                             <h4 className="text-xs font-semibold text-gray-400 uppercase mt-0.5">
//                               {cert.name || 'FATIMA YASSER'}
//                             </h4>
//                           </div>
//                           <img src="/10603705_42828 2.png" alt="Badge" className="w-7 h-7 object-contain shrink-0" />
//                         </div>
//                         <p className="text-xs font-bold text-black mt-2 mb-1">
//                           {cert.achievement}
//                         </p>
//                         <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight">
//                           {cert.description}
//                         </p>
//                         <div className="flex gap-0.5 mt-2">
//                           {[...Array(4)].map((_, i) => (
//                             <span key={i} className="text-amber-400 text-xs">★</span>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Bottom Image */}
//                       <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mt-auto">
//                         <img
//                           src={cert.image}
//                           alt={cert.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = certImages[index % certImages.length];
//                           }}
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })
//           )}
//           </div>

//           {/* Bottom Button - "عرض جميع الشهادات" */}
//           <div className="flex justify-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
//             <button
//               onClick={() => navigate('/certifications')}
//               className="px-8 py-3 rounded-full font-bold text-sm text-black bg-gradient-to-r from-zinc-300 via-white to-zinc-300 border border-zinc-400 shadow-lg hover:scale-105 transition-transform flex items-center gap-3"
//             >
//               <span>{t('certifications.viewAll', 'عرض جميع الشهادات')}</span>
//               <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
//                 {isAr ? '←' : '→'}
//               </span>
//             </button>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default CertificationsSection;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import { getCertificates } from '../api/certificates';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const certImages = [
//   "/Excellence-in-Graphic-Design 6.png",
//   "/Excellence-in-Graphic-Design 1.png",
//   "/Excellence-in-Graphic-Design 5.png",
//   "/Excellence-in-Graphic-Design 3.png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
//   "/Excellence-in-Graphic-Design 2 (1).png",
// ];

// const CertificationsSection = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation('courses');
//   const { isAr } = useLanguage();
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getCertificates({ per_page: 6, search: '' })
//       .then((json) => {
//         const items = json.data || [];
//         setCertifications(
//           items.slice(0, 6).map((item, index) => ({
//             id: item.id,
//             name: item.holder?.name || '',
//             achievement: isAr 
//               ? (item.title_ar || item.course?.title_ar || item.course?.title || t('certifications.excellence', 'Excellence in Graphic Design'))
//               : (item.title_en || item.course?.title_en || item.course?.title || t('certifications.excellence', 'Excellence in Graphic Design')),
//             description: isAr 
//               ? (item.description_ar || item.description || t('certifications.defaultDesc', 'vision that fits my ambitions perfectly. I have new ideas and great that I know I will achieve here. It is a wonderful thing when you work in a healthy environment that always strives for success.'))
//               : (item.description_en || item.description || t('certifications.defaultDesc', 'vision that fits my ambitions perfectly. I have new ideas and great that I know I will achieve here. It is a wonderful thing when you work in a healthy environment that always strives for success.')),
//             image: item.image_url || certImages[index % certImages.length],
//             certificateNumber: item.certificate_number,
//           }))
//         );
//       })
//       .catch((err) => console.error('Failed to fetch certificates:', err))
//       .finally(() => setLoading(false));
//   }, [isAr, t]);

//   return (
//     <div className="w-full relative bg-black py-10" style={{ direction: 'ltr' }}>
      
//       {/* Medal Badge - Top Center */}
//       <div className="flex justify-center relative z-40 mb-[-45px]">
//         <img 
//           src="/10603705_42828 2.png" 
//           alt="Medal Icon" 
//           className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-2xl"
//         />
//       </div>

//       {/* Main Container - Dark Curved Box */}
//       <section 
//         className="w-full max-w-6xl mx-auto relative pt-16 pb-12 px-4 sm:px-8 overflow-hidden rounded-[50px] sm:rounded-[60px] border border-zinc-800 shadow-2xl" 
//         style={{
//           background: 'radial-gradient(circle at top, #1a160e 0%, #080808 100%)',
//         }}
//       >
        
//         {/* Title inside container */}
//         <div className="text-center mb-10">
//           <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
//             {t('certifications.title', 'شهاداتنا')}
//           </h2>
//         </div>

//         <div className="relative z-20">

//           {/* Mobile View - Swiper Carousel */}
//           <div className="block sm:hidden mb-8">
//             <Swiper
//               modules={[Autoplay]}
//               slidesPerView={1}
//               spaceBetween={16}
//               loop={true}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               centeredSlides={true}
//               className="w-full"
//             >
//               {loading ? null : certifications.map((cert, index) => (
//                 <SwiperSlide key={index}>
//                   <div 
//                     className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-lg flex flex-col justify-between text-left"
//                     style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
//                   >
//                     <div>
//                       <div className="flex justify-between items-center mb-1">
//                         <h3 className="text-xs font-black text-black uppercase tracking-wider">{t('certifications.label', 'CERTIFICATIONS')}</h3>
//                         <img src="/10603705_42828 2.png" alt="Badge" className="w-6 h-6 object-contain" />
//                       </div>
//                       <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">{cert.name || 'FATIMA YASSER'}</h4>
//                       <p className="text-xs font-bold text-black mb-2">{cert.achievement}</p>
//                       <div className="flex gap-1 mb-3">
//                         {[...Array(4)].map((_, i) => (
//                           <span key={i} className="text-amber-400 text-xs">★</span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mt-auto">
//                       <img 
//                         src={cert.image} 
//                         alt={cert.name} 
//                         className="w-full h-full object-cover"
//                         onError={(e) => { e.target.src = certImages[index % certImages.length]; }} 
//                       />
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Desktop View - Exact 3 Columns Grid (Card vs Inverted Card) */}
//           <div
//             className="hidden sm:grid grid-cols-3 gap-6 mb-10"
//             style={{ direction: 'ltr' }}
//           >
//           {loading ? (
//             <p className="text-gray-400 col-span-3 text-center py-10">{t('certifications.loading', 'جاري التحميل...')}</p>
//           ) : (
//             certifications.map((cert, index) => {
//               // العامود الأوسط (index 1 و index 4) تكون الصورة في الأعلى والجزء الأبيض في الأسفل
//               const colIndex = index % 3;
//               const isImageOnTop = colIndex === 1; 

//               return (
//                 <div 
//                   key={index}
//                   className="bg-white rounded-3xl p-3 sm:p-4 border border-zinc-200 shadow-2xl flex flex-col justify-between h-full"
//                   style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
//                 >
//                   {isImageOnTop ? (
//                     <>
//                       {/* Top Image (العمود الثاني: الصورة أولاً) */}
//                       <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-3">
//                         <img
//                           src={cert.image}
//                           alt={cert.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = certImages[index % certImages.length];
//                           }}
//                         />
//                       </div>

//                       {/* Bottom Info */}
//                       <div className="flex flex-col justify-between flex-1 px-1 pb-1">
//                         <div>
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-sm sm:text-base font-black text-black tracking-tight uppercase">
//                                 {t('certifications.label', 'CERTIFICATIONS')}
//                               </h3>
//                               <h4 className="text-xs font-semibold text-gray-400 uppercase mt-0.5">
//                                 {cert.name || 'Yasser Gaber'}
//                               </h4>
//                             </div>
//                             <img src="/10603705_42828 2.png" alt="Badge" className="w-8 h-8 object-contain shrink-0" />
//                           </div>
//                           <p className="text-xs font-bold text-black mt-2 mb-1">
//                             {cert.achievement}
//                           </p>
//                           <p className="text-[10px] text-gray-500 line-clamp-3 leading-tight">
//                             {cert.description}
//                           </p>
//                         </div>
//                         <div className="flex gap-0.5 mt-3">
//                           {[...Array(4)].map((_, i) => (
//                             <span key={i} className="text-amber-400 text-xs">★</span>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {/* Top Info (الأعمدة الأول والثالث: الكلام الأبيض أولاً) */}
//                       <div className="mb-3 px-1 pt-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="text-sm sm:text-base font-black text-black tracking-tight uppercase">
//                               {t('certifications.label', 'CERTIFICATIONS')}
//                             </h3>
//                             <h4 className="text-xs font-semibold text-gray-400 uppercase mt-0.5">
//                               {cert.name || 'FATIMA YASSER'}
//                             </h4>
//                           </div>
//                           <img src="/10603705_42828 2.png" alt="Badge" className="w-8 h-8 object-contain shrink-0" />
//                         </div>
//                         <p className="text-xs font-bold text-black mt-2 mb-1">
//                           {cert.achievement}
//                         </p>
//                         <p className="text-[10px] text-gray-500 line-clamp-3 leading-tight">
//                           {cert.description}
//                         </p>
//                         <div className="flex gap-0.5 mt-3">
//                           {[...Array(4)].map((_, i) => (
//                             <span key={i} className="text-amber-400 text-xs">★</span>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Bottom Image */}
//                       <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mt-auto">
//                         <img
//                           src={cert.image}
//                           alt={cert.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = certImages[index % certImages.length];
//                           }}
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })
//           )}
//           </div>

//           {/* Bottom Button - "عرض جميع الشهادات" */}
//           <div className="flex justify-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
//             <button
//               onClick={() => navigate('/certifications')}
//               className="px-8 py-3 rounded-full font-bold text-sm text-black bg-gradient-to-r from-zinc-300 via-white to-zinc-300 border border-zinc-400 shadow-lg hover:scale-105 transition-transform flex items-center gap-3"
//             >
//               <span>{t('certifications.viewAll', 'عرض جميع الشهادات')}</span>
//               <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
//                 {isAr ? '←' : '→'}
//               </span>
//             </button>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default CertificationsSection;




import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import TestimonialsSection from '../Home/Sections/TestimonialsSection';
import { getCertificates } from '../api/certificates';

const certImages = [
  "/Excellence-in-Graphic-Design 6.png",
  "/Excellence-in-Graphic-Design 1.png",
  "/Excellence-in-Graphic-Design 5.png",
  "/Excellence-in-Graphic-Design 3.png",
  "/Excellence-in-Graphic-Design 2 (1).png",
  "/Excellence-in-Graphic-Design 2 (1).png",
];

const Certifications = () => {
  const { t } = useTranslation('certifications');
  const { isAr } = useLanguage();
  const [certs, setCerts] = useState([]);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getCertificates({ per_page: 50 })
      .then(data => {
        setCerts(data?.data || []);
      })
      .catch(() => {});
  }, []);

  // Auto-scroll تلقائي
  useEffect(() => {
    if (certs.length === 0 || !scrollRef.current) return;

    const startScroll = setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        const container = scrollRef.current;
        if (!container) return;

        const colWidth = container.scrollWidth / Math.ceil(certs.length / 2);
        const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 2;

        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: isAr ? -colWidth : colWidth, behavior: 'smooth' });
        }
      }, 3000);
    }, 500);

    return () => {
      clearTimeout(startScroll);
      clearInterval(autoScrollRef.current);
    };
  }, [certs.length, isAr]);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full bg-black overflow-hidden" style={{ minHeight: 'clamp(550px, 75vw, 700px)' }}>
        <img src="/515 2.png" alt="Background" className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }} />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        
        {/* Images Group - Enlarged for mobile & centered */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-visible" style={{ zIndex: 2, pointerEvents: 'none', direction: 'ltr' }}>
          {/* Background ellipse behind persons */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
            width: '120vw',
            height: 'clamp(300px, 65vw, 800px)',
            background: 'radial-gradient(ellipse at bottom center, #4a2e1a 0%, #2a1508 35%, #0d0603 60%, transparent 80%)',
            zIndex: 0,
          }} />
          
          {/* Left Person Image - Kbeer wadem */}
          <img src="/b_عايزها_علي_خلفية_بيض 1.png" alt="Person Left" className="object-contain flex-shrink-0 w-[44vw] sm:w-[35vw] md:w-[420px] h-[340px] sm:h-[420px] md:h-[560px] opacity-40 -mr-16 sm:-mr-20 md:-mr-40 relative z-1" />
          
          {/* Center Person Image - Kbeer wadem */}
          <div className="relative w-[52vw] sm:w-[40vw] md:w-[420px] z-3 flex-shrink-0">
            <img src="/45565621 1 (1).png" alt="Person Center" className="object-contain w-full h-auto" style={{ opacity: 0.9 }} />
          </div>
          
          {/* Right Person Image - Kbeer wadem */}
          <img src="/b_عايز_الشخص_ده_يكون_ع-(1) 1.png" alt="Person Right" className="object-contain flex-shrink-0 w-[44vw] sm:w-[35vw] md:w-[420px] h-[340px] sm:h-[420px] md:h-[560px] opacity-60 -ml-16 sm:-ml-20 md:-ml-40 relative z-1" />
        </div>

        {/* Hero Title & Subtitle - Positioned correctly on mobile */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-6 md:justify-center md:pt-0 pointer-events-none px-4" style={{ zIndex: 4 }}>
          <h1 className="text-center leading-tight w-full" style={{ direction: 'ltr' }}>
            <span className="block text-white font-bold" style={{ fontSize: 'clamp(1.8rem, 6vw, 96px)' }}>{t('hero.our')}</span>
            <span className="block font-bold" style={{ fontSize: 'clamp(1.5rem, 5vw, 4.5rem)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.title')}</span>
            <span className="block text-white font-medium" style={{ fontSize: 'clamp(0.9rem, 3vw, 48px)', marginTop: '4px' }}>{t('hero.subtitle')}</span>
          </h1>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="w-full relative bg-black" style={{ zIndex: 20 }}>
        {/* Medal */}
        <div className="flex justify-center" style={{ position: 'absolute', top: '-60px', left: 0, right: 0, zIndex: 30 }}>
          <img src="/10603705_42828 2.png" alt="Medal Icon" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain" />
        </div>
        <div className="w-full relative overflow-hidden" style={{ borderRadius: 'clamp(40px, 10vw, 150px)', marginTop: 'clamp(-80px, -10vw, -160px)', position: 'relative', zIndex: 10, background: '#000' }}>
        <section className="w-full relative px-4 sm:px-6 lg:px-8 overflow-visible"
          style={{ background: '#000', paddingTop: 'clamp(80px, 12vw, 100px)', paddingBottom: '80px' }}>
          <div className="relative z-20 max-w-7xl mx-auto">
            <div className="text-center mb-12 mt-8">
              <span className="block font-bold" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.title')}</span>
            </div>

            {certs.length === 0 ? (
              <p className="text-center text-gray-400 py-12">{t('loading')}</p>
            ) : (
              <>
                <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
                {/* Cards grid - 2 rows × 3 cols with auto-scroll */}
                <div
                  ref={scrollRef}
                  className="pb-4 scrollbar-hide mb-8"
                  style={{
                    display: 'grid',
                    gridTemplateRows: isMobile ? 'repeat(1, auto)' : 'repeat(2, auto)',
                    gridAutoFlow: 'column',
                    gridAutoColumns: isMobile ? 'calc(100% - 1rem)' : 'clamp(280px, calc((100% - 3rem) / 3), 400px)',
                    gap: '1.5rem',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                  }}
                >
                  {certs.map((cert, index) => (
                    <div
                      key={cert.id}
                      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-3 lg:p-4 border-4 border-gray-300 shadow-lg overflow-visible flex flex-col"
                    >
                      {Math.floor(index / 2) % 2 === 1 ? (
                        <>
                          {/* Image Top */}
                          <div className="relative mb-6 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                            <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
                              <img
                                src={cert.image_url || certImages[index % certImages.length]}
                                alt={cert.holder?.name}
                                className="max-w-full max-h-full scale-110 object-contain"
                                onError={(e) => { e.target.src = certImages[index % certImages.length]; }}
                              />
                            </div>
                          </div>
                          <div className="mt-auto">
                            <div className="mb-4">
                              <div className="relative inline-flex items-center mb-2">
                                <h3 className="text-xs sm:text-lg lg:text-3xl font-bold text-gray uppercase tracking-wider">
                                  {t('card.label')}
                                </h3>
                                <img src="/10603705_42828 2.png" alt="Decoration"
                                  className="absolute top-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22 object-contain pointer-events-none"
                                  style={isAr ? { left: '-4.5rem' } : { right: '-4.5rem' }}
                                />
                              </div>
                              <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
                                {cert.holder?.name || t('card.student')}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-700 font-normal">
                                {isAr ? (cert.course?.title_ar || cert.course?.title) : (cert.course?.title_en || cert.course?.title) || t('card.excellence')}
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
                              {isAr ? (cert.description_ar || cert.description) : (cert.description_en || cert.description) || t('card.defaultDesc')}
                            </p>
                            <div className="flex gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Content Top */}
                          <div className="mb-4">
                            <div className="relative inline-flex items-center mb-2">
                              <h3 className="text-xs sm:text-lg lg:text-2xl font-bold text-gray uppercase tracking-wider">
                                {t('card.label')}
                              </h3>
                              <img src="/10603705_42828 2.png" alt="Decoration"
                                className="absolute top-[100%] -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 lg:w-22 lg:h-22 object-contain pointer-events-none"
                                style={isAr ? { left: '-5.5rem' } : { right: '-5.5rem' }}
                              />
                            </div>
                            <h4 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-1">
                              {cert.holder?.name || t('card.student')}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-700 font-normal">
                              {isAr ? (cert.course?.title_ar || cert.course?.title) : (cert.course?.title_en || cert.course?.title) || t('card.excellence')}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-black mb-4 leading-relaxed">
                            {isAr ? (cert.description_ar || cert.description) : (cert.description_en || cert.description) || t('card.defaultDesc')}
                          </p>
                          <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          {/* Image Bottom */}
                          <div className="relative mt-auto rounded-lg p-2 flex items-center justify-center">
                            <div className="relative rounded-lg flex items-center justify-center w-full aspect-[391/441]">
                              <img
                                src={cert.image_url || certImages[index % certImages.length]}
                                alt={cert.holder?.name}
                                className="max-w-full max-h-full scale-110 object-contain"
                                onError={(e) => { e.target.src = certImages[index % certImages.length]; }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
        </div>

        <section className="pt-4 pb-8 md:pb-28 px-4 bg-white mb-16 md:mb-56">
          <div className="max-w-6xl mx-auto">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-3xl">
                <img src="/Group (1).png" alt="Success Story" className="w-full object-contain" />
                <div className="absolute -right-4 md:-right-8 bottom-5 flex flex-col gap-2">
                  <img src="/encouragement 1.png" alt="Background" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                  <div className="flex gap-1">
                    <span className="text-gray-800">★</span>
                    <span className="text-gray-800">★</span>
                  </div>
                </div>
                <div className="absolute -bottom-20 md:-bottom-40 left-1/2 transform -translate-x-1/2 w-full text-center">
                  <div className="relative inline-block rounded-full px-4 md:px-8 py-3 md:py-4 mb-2 shadow-lg w-full md:w-auto" style={{ minHeight: '50px' }}>
                    <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
                      style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }} />
                    <h2 className="relative text-white font-bold" style={{ zIndex: 1, fontSize: 'clamp(14px, 4vw, 48px)' }}>{t('successStory.line1')}</h2>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900" style={{ fontSize: 'clamp(14px, 4vw, 48px)' }}>{t('successStory.line2')}</h3>
                    <h3 className="font-bold text-gray-900" style={{ fontSize: 'clamp(14px, 4vw, 48px)' }}>{t('successStory.line3')}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 48px)', color: '#000', lineHeight: 1.4, marginBottom: '40px', whiteSpace: 'pre-line' }}>
              {t('cta.ready')}
            </p>
            <p style={{ fontFamily: 'Lexend', fontWeight: 700, fontSize: 'clamp(20px, 4vw, 48px)', color: '#000', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
              {t('cta.join')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Certifications;