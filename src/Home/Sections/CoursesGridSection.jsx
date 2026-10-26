// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { getCourses } from '../../api/courses';

// const splitLastWord = (text) => {
//   if (!text) return text;
//   const str = text.trim();
//   const i = str.lastIndexOf(' ');
//   if (i === -1) return str;
//   return (
//     <>
//       {str.slice(0, i)}
//       <br />
//       {str.slice(i + 1)}
//     </>
//   );
// };

// const CoursesGridSection = () => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation('home');
//   const isAr = i18n.language?.startsWith('ar');
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [current, setCurrent] = useState(0);
//   const autoRef = useRef(null);

//   useEffect(() => {
//     getCourses({ per_page: 20 })
//       .then((data) => setCourses(data?.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   const visibleCourses = courses.slice(0, 6);
//   const total = visibleCourses.length;

//   const goTo = (i) => {
//     clearInterval(autoRef.current);
//     setCurrent(i);
//     autoRef.current = setInterval(() => {
//       setCurrent(prev => (prev + 1) % total);
//     }, 3000);
//   };

//   useEffect(() => {
//     if (total === 0) return;
//     autoRef.current = setInterval(() => {
//       setCurrent(prev => (prev + 1) % total);
//     }, 3000);
//     return () => clearInterval(autoRef.current);
//   }, [total]);

//   return (
//     <>
//       <div className="relative">
//         <div className="absolute top-0 right-4 sm:right-6 lg:right-8 z-0">
//           <img src="/Ellipse 67.png" alt="Decoration" className="object-contain" />
//         </div>
//         <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 z-0">
//           <img src="/Ellipse 66.png" alt="Decoration" className="object-contain" />
//         </div>

//         <section className="w-full bg-gray-100/40 py-16 sm:py-20 lg:py-24 px-8 sm:px-12 lg:px-20 rounded-[80px] sm:rounded-[100px] lg:rounded-[120px] relative z-10 overflow-hidden">
//           <div className="max-w-7xl mx-auto">

//             <div className="text-center mb-12">
//               <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent',
//               }}>
//                 {t('coursesGrid.title')}
//               </h2>
//               <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">
//                 {isAr ? (
//                   <>
//                     <span className="hidden sm:block" style={{ lineHeight: '1.5' }}>{t('coursesGrid.subtitle1')}</span>
//                     <span className="hidden sm:block" style={{ lineHeight: '1.5' }}>{t('coursesGrid.subtitle2')}</span>
//                     <span className="hidden sm:block" style={{ lineHeight: '1.5' }}>{t('coursesGrid.subtitle3')}</span>
//                     <span className="sm:hidden">{t('coursesGrid.subtitle1')} {t('coursesGrid.subtitle2')} {t('coursesGrid.subtitle3')}</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="hidden sm:block">Carefully designed training pathways</span>
//                     <span className="hidden sm:block">to move you from the implementer</span>
//                     <span className="hidden sm:block">stage to the status of creative</span>
//                     <span className="hidden sm:block">partner</span>
//                     <span className="sm:hidden">Carefully designed training pathways to move you from the implementer stage to the status of creative partner</span>
//                   </>
//                 )}
//               </h3>
//             </div>

//             {loading ? (
//               <div className="flex justify-center py-12">
//                 <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <div>
//                 {/* ── Mobile auto-slide ── */}
//                 <div className="md:hidden overflow-hidden pb-6 mb-4 px-6 pt-4">
//                   <div
//                     className="flex transition-transform duration-500 ease-in-out"
//                     style={{ transform: isAr ? `translateX(${current * 100}%)` : `translateX(-${current * 100}%)` }}
//                   >
//                     {visibleCourses.map((course) => (
//                       <div
//                         key={course.id}
//                         className="w-full flex-shrink-0 flex justify-center px-3"
//                       >
//                         <div
//                           className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl w-full max-w-[85vw]"
//                           onClick={() => navigate(`/course/${course.id}`)}
//                         >
//                           <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
//                             <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
//                               <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
//                             </div>
//                           </div>
//                           <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
//                             <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
//                               <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
//                             </div>
//                           </div>
//                           <div className="relative z-10">
//                             <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
//                               <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }} />
//                               <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
//                                 <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
//                                   <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
//                               <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
//                                 <span>⏱ {course.duration_minutes ? `${course.duration_minutes} min` : 'N/A'}</span>
//                                 <span>👥 {course.enrollments_count} Students</span>
//                               </div>
//                             </div>
//                             <div className="px-4 sm:px-5 lg:px-6 pb-4">
//                               <h3 className="font-bold text-base sm:text-lg leading-snug">{splitLastWord(isAr ? (course.short_description_ar || course.short_description) : (course.short_description_en || course.short_description))}</h3>
//                               <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{isAr ? (course.long_description_ar?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, '')) : (course.long_description_en?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, ''))}</p>
//                               <div className="flex justify-between items-center mt-4">
//                                 <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<span key={i} className={`text-sm sm:text-base ${course.reviews_avg_rating && i < Math.round(course.reviews_avg_rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>))}<span className="text-gray-400 text-xs ml-1">(120 review)</span></div>
//                                 <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer"><span>{t('courseCard.enrollCourse')}</span><span>→</span></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Desktop grid ── */}
//                 <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:mb-12">
//                   {visibleCourses.map((course) => (
//                     <div
//                       key={course.id}
//                       className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//                       onClick={() => navigate(`/course/${course.id}`)}
//                     >
//                       <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
//                         <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
//                           <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
//                         </div>
//                       </div>
//                       <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
//                         <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
//                           <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
//                         </div>
//                       </div>
//                       <div className="relative z-10">
//                         <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
//                           <img
//                             src={course.thumbnail_url}
//                             alt={course.title}
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
//                             onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }}
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
//                             <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
//                               <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M8 5v14l11-7z"/>
//                               </svg>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
//                           <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
//                             <span>⏱ {course.duration_minutes ? `${course.duration_minutes} min` : 'N/A'}</span>
//                             <span>👥 {course.enrollments_count} Students</span>
//                           </div>
//                         </div>
//                         <div className="px-4 sm:px-5 lg:px-6 pb-4">
//                           <h3 className="font-bold text-base sm:text-lg leading-snug">
//                             {splitLastWord(isAr ? (course.short_description_ar || course.short_description) : (course.short_description_en || course.short_description))}
//                           </h3>
//                           <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
//                             {isAr ? (course.long_description_ar?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, '')) : (course.long_description_en?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, ''))}
//                           </p>
//                           <div className="flex justify-between items-center mt-4">
//                             <div className="flex items-center gap-1">
//                               {[...Array(5)].map((_, i) => (
//                                 <span key={i} className={`text-sm sm:text-base ${course.reviews_avg_rating && i < Math.round(course.reviews_avg_rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
//                               ))}
//                               <span className="text-gray-400 text-xs ml-1">(120 review)</span>
//                             </div>
//                             <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer">
//                               <span>{t('courseCard.enrollCourse')}</span>
//                               <span>→</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Dots (mobile only) */}
//                 {total > 1 && (
//                   <div className="md:hidden flex justify-center gap-2 mb-6">
//                     {visibleCourses.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => goTo(i)}
//                         className="transition-all duration-300 rounded-full"
//                         style={{
//                           width: i === current ? '28px' : '10px',
//                           height: '10px',
//                           background: i === current
//                             ? 'linear-gradient(to right, #F9BA01, #663010)'
//                             : '#D1D5DB',
//                         }}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex justify-center">
//                   <button
//                     onClick={() => navigate('/course-videos')}
//                     className="btn-wave bg-black text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-lg transition-colors shadow-lg font-semibold text-base sm:text-lg"
//                   >
//                     {t('coursesGrid.viewAll')}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default CoursesGridSection;


import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCourses } from '../../api/courses';

const splitLastWord = (text) => {
  if (!text) return text;
  const str = text.trim();
  const i = str.lastIndexOf(' ');
  if (i === -1) return str;
  return (
    <>
      {str.slice(0, i)}
      <br />
      {str.slice(i + 1)}
    </>
  );
};

const CoursesGridSection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('home');
  const isAr = i18n.language?.startsWith('ar');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);

  useEffect(() => {
    // تم ضبطه ليقبل عدد كبير من الكروت من الباك اند (مثلاً 30)
    getCourses({ per_page: 30 })
      .then((data) => setCourses(data?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = courses.length;

  const goTo = (i) => {
    clearInterval(autoRef.current);
    setCurrent(i);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3000);
  };

  useEffect(() => {
    if (total === 0) return;
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [total]);

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-4 sm:right-6 lg:right-8 z-0">
          <img src="/Ellipse 67.png" alt="Decoration" className="object-contain" />
        </div>
        <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 z-0">
          <img src="/Ellipse 66.png" alt="Decoration" className="object-contain" />
        </div>

        <section className="w-full bg-gray-100/40 py-16 sm:py-20 lg:py-24 px-8 sm:px-12 lg:px-20 rounded-[80px] sm:rounded-[100px] lg:rounded-[120px] relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{
                backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                {t('coursesGrid.title')}
              </h2>
              <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                {isAr ? (
                  <>
                    <span className="hidden sm:block" style={{ lineHeight: '1.5' }}>{t('coursesGrid.subtitle1')}</span>
                    <span className="hidden sm:block" style={{ lineHeight: '1.5' }}>{t('coursesGrid.subtitle2')}</span>
                    <span className="hidden sm:block" style={{ lineHeight: '1.5' }}>{t('coursesGrid.subtitle3')}</span>
                    <span className="sm:hidden">{t('coursesGrid.subtitle1')} {t('coursesGrid.subtitle2')} {t('coursesGrid.subtitle3')}</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:block">Carefully designed training pathways</span>
                    <span className="hidden sm:block">to move you from the implementer</span>
                    <span className="hidden sm:block">stage to the status of creative</span>
                    <span className="hidden sm:block">partner</span>
                    <span className="sm:hidden">Carefully designed training pathways to move you from the implementer stage to the status of creative partner</span>
                  </>
                )}
              </h3>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div>
                {/* ── Mobile auto-slide ── */}
                <div className="md:hidden overflow-hidden pb-6 mb-4 px-6 pt-4">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: isAr ? `translateX(${current * 100}%)` : `translateX(-${current * 100}%)` }}
                  >
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="w-full flex-shrink-0 flex justify-center px-3"
                      >
                        <div
                          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl w-full max-w-[85vw]"
                          onClick={() => navigate(`/course/${course.id}`)}
                        >
                          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
                              <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
                              <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
                            </div>
                          </div>
                          <div className="relative z-10">
                            <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
                              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }} />
                              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
                                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                              </div>
                            </div>
                            <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
                              <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
                                <span>⏱ {course.duration_minutes ? `${course.duration_minutes} min` : 'N/A'}</span>
                                <span>👥 {course.enrollments_count} Students</span>
                              </div>
                            </div>
                            <div className="px-4 sm:px-5 lg:px-6 pb-4">
                              <h3 className="font-bold text-base sm:text-lg leading-snug">{splitLastWord(isAr ? (course.short_description_ar || course.short_description) : (course.short_description_en || course.short_description))}</h3>
                              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{isAr ? (course.long_description_ar?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, '')) : (course.long_description_en?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, ''))}</p>
                              <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<span key={i} className={`text-sm sm:text-base ${course.reviews_avg_rating && i < Math.round(course.reviews_avg_rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>))}<span className="text-gray-400 text-xs ml-1">(120 review)</span></div>
                                <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer"><span>{t('courseCard.enrollCourse')}</span><span>→</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Desktop grid (التصميم الأصلي تماماً مع عرض كل الكروت) ── */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:mb-12">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
                          <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
                          <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
                        </div>
                      </div>
                      <div className="relative z-10">
                        <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
                          <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                            onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
                              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
                          <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
                            <span>⏱ {course.duration_minutes ? `${course.duration_minutes} min` : 'N/A'}</span>
                            <span>👥 {course.enrollments_count} Students</span>
                          </div>
                        </div>
                        <div className="px-4 sm:px-5 lg:px-6 pb-4">
                          <h3 className="font-bold text-base sm:text-lg leading-snug">
                            {splitLastWord(isAr ? (course.short_description_ar || course.short_description) : (course.short_description_en || course.short_description))}
                          </h3>
                          <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
                            {isAr ? (course.long_description_ar?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, '')) : (course.long_description_en?.replace(/<[^>]*>/g, '') || course.long_description?.replace(/<[^>]*>/g, ''))}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm sm:text-base ${course.reviews_avg_rating && i < Math.round(course.reviews_avg_rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                              ))}
                              <span className="text-gray-400 text-xs ml-1">(120 review)</span>
                            </div>
                            <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer">
                              <span>{t('courseCard.enrollCourse')}</span>
                              <span>→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots (mobile only) */}
                {total > 1 && (
                  <div className="md:hidden flex justify-center gap-2 mb-6">
                    {courses.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: i === current ? '28px' : '10px',
                          height: '10px',
                          background: i === current
                            ? 'linear-gradient(to right, #F9BA01, #663010)'
                            : '#D1D5DB',
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={() => navigate('/course-videos')}
                    className="btn-wave bg-black text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-lg transition-colors shadow-lg font-semibold text-base sm:text-lg"
                  >
                    {t('coursesGrid.viewAll')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CoursesGridSection;