
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCourses } from '../api/courses';
// import BASE_URL from '../api/config';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

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

// const normalizeApiCourse = (c, isAr) => ({
//   id: c.id,
//   slug: c.slug,
//   image: c.thumbnail_url,
//   shortDesc: isAr ? (c.short_description_ar || c.short_description) : (c.short_description_en || c.short_description),
//   longDesc: isAr ? (c.long_description_ar?.replace(/<[^>]*>/g, '') || c.long_description?.replace(/<[^>]*>/g, '')) : (c.long_description_en?.replace(/<[^>]*>/g, '') || c.long_description?.replace(/<[^>]*>/g, '')),
//   duration: c.duration_minutes ? `${c.duration_minutes} min` : '—',
//   students: c.enrollments_count,
//   rating: Math.round(c.reviews_avg_rating) || 5,
// });

// function CourseVideos() {
//   const navigate = useNavigate();
//   const { t } = useTranslation('courseVideos');
//   const { isAr } = useLanguage();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [accessLoading, setAccessLoading] = useState(false);
//   const [accessError, setAccessError] = useState('');
//   const [subscribers, setSubscribers] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const [email, setEmail] = useState(user?.email || '');

//   useEffect(() => {
//     getCourses({ per_page: 20 })
//       .then((data) => { if (data?.data?.length > 0) setCourses(data.data.map(c => normalizeApiCourse(c, isAr))); })
//       .catch(() => {})
//       .finally(() => setLoading(false));

//     fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
//       headers: { 'Accept': 'application/json' },
//     })
//       .then(r => r.json())
//       .then(d => setSubscribers(d?.data || []))
//       .catch(() => {});
//   }, [isAr]);

//   const handleGetAccess = async () => {
//     const token = localStorage.getItem('token');
//     const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
//     if (!token || !currentUser) { navigate('/login'); return; }
//     setAccessLoading(true); setAccessError('');
//     try {
//       const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ email: email || currentUser.email }),
//       });
//       const data = await res.json();
//       if (data?.data?.is_subscribed) { navigate('/course-videos'); }
//       else { navigate('/subscribe'); }
//     } catch { setAccessError('Network error.'); }
//     finally { setAccessLoading(false); }
//   };
//   return (
//     <div className="min-h-screen" style={{ background: 'linear-gradient(120deg, #f8f8f8 0%, #e0e0e0 40%, #cccccc 100%)' }}>

//       {/* Hero Section */}
//       <section
//         className="w-full relative overflow-hidden pt-16 md:pt-20"
//         style={{ background: 'linear-gradient(120deg, #f8f8f8 0%, #e0e0e0 40%, #cccccc 100%)' }}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '320px' }}>
//           <div className="flex-1 py-8 md:py-12 flex flex-col items-center text-center px-4">
//             <h1 style={{ lineHeight: 1.2, marginBottom: '0.5rem' }}>
//               <span className="block font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 96px)', ...(isAr ? { color: '#000' } : { backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }) }}>{t('hero.our')}</span>
//               <span className="block" style={{ fontSize: 'clamp(2rem, 8vw, 96px)', fontWeight: 700, backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
//                 {t('hero.title')}
//               </span>
//             </h1>
            
//             <p style={{ fontSize: 'clamp(1.2rem, 4vw, 48px)', fontWeight: 700, lineHeight: 1.5, margin: 0, color: '#000' }}>
//               {isAr ? (
//                 <span className="inline-block px-2">
//                   {t('hero.choosePath')}{' '}
//                   <span style={{ backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.toSuccess')}</span>
//                 </span>
//               ) : (
//                 t('hero.choosePath')
//               )}
//             </p>

//             {!isAr && (
//               <p style={{ fontSize: 'clamp(1.2rem, 4vw, 48px)', fontWeight: 600, lineHeight: 1.5, margin: 0, color: '#000' }}>
//                 {t('hero.toSuccess')}
//               </p>
//             )}
//           </div>
//           <div className={`flex-1 flex justify-center md:justify-end items-end pb-0 ${!isAr ? 'translate-y-10' : 'translate-y-6'}`} style={{ maxWidth: '420px' }}>
//             <img src="/image_1.png" alt="Course Hero" className="object-contain" style={{ height: 'clamp(180px, 35vw, 370px)' }} />
//           </div>
//         </div>
//       </section>

//       {/* White section over hero */}
//       <div style={{ position: 'relative', zIndex: 10, marginTop: '-40px' }}>
//         <section className="bg-white px-6 lg:px-12 overflow-hidden" style={{ borderRadius: '60px 60px 0 0', paddingTop: '80px', paddingBottom: '80px' }}>

//           {/* Email row */}
//           <div className="max-w-4xl mx-auto text-center mb-12">
//             <div className="flex flex-row gap-0 justify-center items-center mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg" style={{ maxWidth: '600px' }}>
//               <input type="email" placeholder={t('access.emailPlaceholder')}
//                 className="flex-1 px-5 py-3 bg-transparent border-none rounded-full text-black focus:outline-none text-sm min-w-0"
//                 value={email} onChange={e => setEmail(e.target.value)} />
//               <button onClick={handleGetAccess} disabled={accessLoading}
//                 className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm disabled:opacity-60">
//                 {accessLoading ? t('access.loading') : t('access.getAccess')}
//               </button>
//             </div>
//             {accessError && <p className="text-red-500 text-sm mt-2">{t('access.networkError')}</p>}
//             <div className="flex items-center justify-center gap-3 mt-4">
//               <div className="flex -space-x-2">
//                 {subscribers.length > 0 ? subscribers.slice(0, 3).map((sub, i) => (
//                   sub.avatar_url
//                     ? <img key={i} src={sub.avatar_url} alt={sub.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//                     : <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: `hsl(${i * 60}, 60%, 50%)` }}>{sub.name?.charAt(0)?.toUpperCase()}</div>
//                 )) : (
//                   <>
//                     <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
//                     <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
//                     <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
//                   </>
//                 )}
//               </div>
//               <p className="text-sm text-gray-700">{subscribers.length > 0 ? `${subscribers.length}+ ${t('access.studentsAccess')}` : `3 ${t('access.studentsAccess')}`}</p>
//             </div>
//           </div>

//           {/* Subscribe Now button + divider */}
//           <div className="flex items-center gap-3 sm:gap-6 max-w-9xl mx-auto mb-12 px-4">
//             <div className="flex-1 h-px bg-gray-200"></div>
//             <button onClick={() => navigate('/subscribe')} className="px-6 sm:px-20 py-3 sm:py-4 rounded-full bg-black text-white font-semibold text-sm sm:text-2xl whitespace-nowrap hover:bg-gray-800 transition-colors duration-200">
//               {t('subscribe')}
//             </button>
//             <div className="flex-1 h-px bg-gray-200"></div>
//           </div>

//           {/* Title */}
//           <h2 className="text-center font-bold mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 6rem)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
//             {t('ourCourse')}
//           </h2>

//           {/* Grid */}
//           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loading ? (
//               <p className="col-span-3 text-center text-gray-400 py-12">{t('grid.loading')}</p>
//             ) : (
//             courses.map((course) => (
//               <div
//                 key={course.id}
//                 onClick={() => navigate(`/course/${course.id}`)}
//                 className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//               >
//                 <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
//                   <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
//                     <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
//                     <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
//                   </div>
//                 </div>
//                 <div className="relative z-10">
//                   <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
//                     <img src={course.image} alt={course.shortDesc} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }} />
//                     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
//                       <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
//                         <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
//                     <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
//                       <span>⏱ {course.duration}</span>
//                       <span>👥 {course.students} Students</span>
//                     </div>
//                   </div>
//                   <div className="px-4 sm:px-5 lg:px-6 pb-4">
//                     <h3 className="font-bold text-base sm:text-lg leading-snug">{splitLastWord(course.shortDesc)}</h3>
//                     <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{course.longDesc}</p>
//                     <div className="flex justify-between items-center mt-4">
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <span key={i} className={`text-sm sm:text-base ${course.rating && i < course.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
//                         ))}
//                         <span className="text-gray-400 text-xs ml-1">({course.students} review)</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer">
//                         <span>Enroll Course</span>
//                         <span>→</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//             )}
//           </div>

//         </section>
//       </div>

//     </div>
//   );
// }

// export default CourseVideos;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses';
import BASE_URL from '../api/config';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

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

const normalizeApiCourse = (c, isAr) => ({
  id: c.id,
  slug: c.slug,
  image: c.thumbnail_url,
  shortDesc: isAr ? (c.short_description_ar || c.short_description) : (c.short_description_en || c.short_description),
  longDesc: isAr ? (c.long_description_ar?.replace(/<[^>]*>/g, '') || c.long_description?.replace(/<[^>]*>/g, '')) : (c.long_description_en?.replace(/<[^>]*>/g, '') || c.long_description?.replace(/<[^>]*>/g, '')),
  duration: c.duration_minutes ? `${c.duration_minutes} min` : '—',
  students: c.enrollments_count,
  rating: Math.round(c.reviews_avg_rating) || 5,
});

function CourseVideos() {
  const navigate = useNavigate();
  const { t } = useTranslation('courseVideos');
  const { isAr } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessLoading, setAccessLoading] = useState(false);
  const [accessError, setAccessError] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    getCourses({ per_page: 20 })
      .then((data) => { if (data?.data?.length > 0) setCourses(data.data.map(c => normalizeApiCourse(c, isAr))); })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
      headers: { 'Accept': 'application/json' },
    })
      .then(r => r.json())
      .then(d => setSubscribers(d?.data || []))
      .catch(() => {});
  }, [isAr]);

  const handleGetAccess = async () => {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!token || !currentUser) { navigate('/login'); return; }
    setAccessLoading(true); setAccessError('');
    try {
      const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ email: email || currentUser.email }),
      });
      const data = await res.json();
      if (data?.data?.is_subscribed) { navigate('/course-videos'); }
      else { navigate('/subscribe'); }
    } catch { setAccessError('Network error.'); }
    finally { setAccessLoading(false); }
  };
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(120deg, #f8f8f8 0%, #e0e0e0 40%, #cccccc 100%)' }}>

      {/* Hero Section */}
      <section
        className="w-full relative overflow-hidden pt-16 md:pt-20"
        style={{ background: 'linear-gradient(120deg, #f8f8f8 0%, #e0e0e0 40%, #cccccc 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '320px' }}>
          <div className="flex-1 py-8 md:py-12 flex flex-col items-center md:items-start text-center md:text-left px-4">
            <h1 style={{ lineHeight: 1.2, marginBottom: '0.5rem' }}>
              <span className="block font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 96px)', ...(isAr ? { color: '#000' } : { backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }) }}>{t('hero.our')}</span>
              <span className="block" style={{ fontSize: 'clamp(2rem, 8vw, 96px)', fontWeight: 700, backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
                {t('hero.title')}
              </span>
            </h1>
            
            <p style={{ fontSize: 'clamp(1.2rem, 4vw, 48px)', fontWeight: 700, lineHeight: 1.5, margin: 0, color: '#000' }}>
              {isAr ? (
                <span className="inline-block px-2">
                  {t('hero.choosePath')}{' '}
                  <span style={{ backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.toSuccess')}</span>
                </span>
              ) : (
                t('hero.choosePath')
              )}
            </p>

            {!isAr && (
              <p style={{ fontSize: 'clamp(1.2rem, 4vw, 48px)', fontWeight: 600, lineHeight: 1.5, margin: 0, color: '#000' }}>
                {t('hero.toSuccess')}
              </p>
            )}
          </div>
          
          {/* Hero Image Original Position with Responsive Fix */}
          <div className={`flex-1 flex justify-center md:justify-end items-end pb-0 mt-4 md:mt-0 ${!isAr ? 'translate-y-0 md:translate-y-10' : 'translate-y-0 md:translate-y-6'}`} style={{ maxWidth: '420px', width: '100%' }}>
            <img src="/image_1.png" alt="Course Hero" className="w-[220px] sm:w-[280px] md:w-full object-contain" style={{ height: 'clamp(180px, 35vw, 370px)' }} />
          </div>
        </div>
      </section>

      {/* White section over hero */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-40px' }}>
        <section className="bg-white px-6 lg:px-12 overflow-hidden" style={{ borderRadius: '60px 60px 0 0', paddingTop: '80px', paddingBottom: '80px' }}>

          {/* Email row */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex flex-row gap-0 justify-center items-center mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg" style={{ maxWidth: '600px' }}>
              <input type="email" placeholder={t('access.emailPlaceholder')}
                className="flex-1 px-5 py-3 bg-transparent border-none rounded-full text-black focus:outline-none text-sm min-w-0"
                value={email} onChange={e => setEmail(e.target.value)} />
              <button onClick={handleGetAccess} disabled={accessLoading}
                className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm disabled:opacity-60 cursor-pointer">
                {accessLoading ? t('access.loading') : t('access.getAccess')}
              </button>
            </div>
            {accessError && <p className="text-red-500 text-sm mt-2">{t('access.networkError')}</p>}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex -space-x-2">
                {subscribers.length > 0 ? subscribers.slice(0, 3).map((sub, i) => (
                  sub.avatar_url
                    ? <img key={i} src={sub.avatar_url} alt={sub.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    : <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: `hsl(${i * 60}, 60%, 50%)` }}>{sub.name?.charAt(0)?.toUpperCase()}</div>
                )) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{subscribers.length > 0 ? `${subscribers.length}+ ${t('access.studentsAccess')}` : `3 ${t('access.studentsAccess')}`}</p>
            </div>
          </div>

          {/* Subscribe Now button + divider */}
          <div className="flex items-center gap-3 sm:gap-6 max-w-9xl mx-auto mb-12 px-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <button onClick={() => navigate('/subscribe')} className="px-6 sm:px-20 py-3 sm:py-4 rounded-full bg-black text-white font-semibold text-sm sm:text-2xl whitespace-nowrap hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              {t('subscribe')}
            </button>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Title */}
          <h2 className="text-center font-bold mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 6rem)', backgroundImage: 'url(/nzrzOfxWPwo-4.png)', backgroundSize: 'cover', backgroundPosition: 'center', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
            {t('ourCourse')}
          </h2>

          {/* Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="col-span-3 text-center text-gray-400 py-12">{t('grid.loading')}</p>
            ) : (
            courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
                    <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
                    <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
                    <img src={course.image} alt={course.shortDesc} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
                    <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
                      <span>⏱ {course.duration}</span>
                      <span>👥 {course.students} Students</span>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 lg:px-6 pb-4">
                    <h3 className="font-bold text-base sm:text-lg leading-snug">{splitLastWord(course.shortDesc)}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{course.longDesc}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm sm:text-base ${course.rating && i < course.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-gray-400 text-xs ml-1">({course.students} review)</span>
                      </div>
                      <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer">
                        <span>Enroll Course</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>

        </section>
      </div>

    </div>
  );
}

export default CourseVideos;