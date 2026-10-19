// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import BASE_URL from '../api/config';
// import { getCourses } from '../api/courses';

// function Subscribe() {
//   const navigate = useNavigate();
//   const { t } = useTranslation('subscribe');
//   const { isAr } = useLanguage();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [subscribers, setSubscribers] = useState([]);
//   const [firstCourseId, setFirstCourseId] = useState(null);
//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const [email, setEmail] = useState(user?.email || '');

//   useEffect(() => {
//     fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
//       headers: { 'Accept': 'application/json' },
//     })
//       .then(r => r.json())
//       .then(d => setSubscribers(d?.data || []))
//       .catch(() => {});

//     // get first course ID for checkout redirect
//     getCourses({ per_page: 1 })
//       .then(data => {
//         const id = data?.data?.[0]?.id;
//         if (id) setFirstCourseId(id);
//       })
//       .catch(() => {});
//   }, []);

//   const handleSubscribe = () => {
//     const token = localStorage.getItem('token');
//     if (!token) { navigate('/login'); return; }
//     if (firstCourseId) {
//       navigate(`/checkout/${firstCourseId}`);
//     } else {
//       navigate('/courses');
//     }
//   };

//   const handleGetAccess = async () => {
//     const token = localStorage.getItem('token');
//     const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
//     if (!token || !currentUser) { navigate('/login'); return; }
//     setLoading(true); setError('');
//     try {
//       const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ email: email || currentUser.email }),
//       });
//       const data = await res.json();
//       if (data?.data?.is_subscribed) { navigate('/course-videos'); }
//       else { setError(data.message || 'Not subscribed yet.'); }
//     } catch { setError('Network error.'); }
//     finally { setLoading(false); }
//   };
//   return (
//     <div className="min-h-screen pt-20">

//       {/* Hero Section */}
//       <section
//         className="w-full relative overflow-visible"
//         style={{ background: 'linear-gradient(120deg, #f8f8f8 0%, #e0e0e0 40%, #cccccc 100%)', minHeight: '320px', paddingBottom: '80px' }}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '320px' }}>
//           {/* Left Text */}
//           <div className="flex-1 py-8 md:py-12">
//             <h1 className="font-semibold text-black mb-4" style={{ fontSize: 'clamp(2rem, 8vw, 96px)', lineHeight: 1 }}>{t('title')}</h1>
//             <div className="relative inline-block rounded-full mb-4" style={{ minHeight: '40px', minWidth: '120px' }}>
//               <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
//                 style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//               <h2 className="relative px-4 py-2 font-bold text-white inline-block" style={{ zIndex: 10, fontSize: 'clamp(1rem, 4vw, 39px)' }}>
//                 {t('lifetime')}
//               </h2>
//             </div>
//             <p className="text-gray-600 text-sm md:text-lg">{t('subtitle')}</p>
//           </div>

//           {/* Right - Cards image overflowing */}
//           <div className="w-full md:flex-1 flex justify-center md:justify-end items-end" style={{ maxWidth: '480px', position: 'relative' }}>
//             <img
//               src="/b_عايز_كارد_زي_دول_بكو (1) 1.png"
//               alt="Payment Cards"
//               className="object-contain w-full md:w-auto"
//               style={{ height: 'clamp(200px, 50vw, 420px)', position: 'relative', zIndex: 20, marginBottom: '-75px' }}
//               onError={(e) => { e.target.style.display = 'none'; }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* White section over hero */}
//       <div style={{ position: 'relative', zIndex: 10, marginTop: '-60px' }}>
//         <section className="bg-white px-2 lg:px-4 overflow-hidden" style={{ borderRadius: '60px 60px 0 0', paddingTop: '80px', paddingBottom: '80px' }}>
//           <div className="max-w-7xl mx-auto">

//             <div className="text-center mb-16 mt-16">
//               <div className="flex flex-row gap-0 justify-center items-center mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg" style={{ maxWidth: '600px' }}>
//                 <input type="email" placeholder={t('emailPlaceholder')}
//                   className="flex-1 px-5 py-3 bg-transparent border-none rounded-full text-black focus:outline-none text-sm min-w-0"
//                   value={email} onChange={e => setEmail(e.target.value)} />
//                 <button onClick={handleGetAccess} disabled={loading}
//                   className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm disabled:opacity-60">
//                   {loading ? t('loading') : t('getAccess')}
//                 </button>
//               </div>
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//               <div className="flex items-center justify-center gap-3 mt-4">
//                 <div className="flex -space-x-2">
//                   {subscribers.length > 0 ? subscribers.slice(0, 3).map((sub, i) => (
//                     sub.avatar_url
//                       ? <img key={i} src={sub.avatar_url} alt={sub.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//                       : <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: `hsl(${i * 60}, 60%, 50%)` }}>{sub.name?.charAt(0)?.toUpperCase()}</div>
//                   )) : (
//                     <>
//                       <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
//                       <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
//                       <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
//                     </>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-700">{subscribers.length > 0 ? `${subscribers.length}+ ${t('studentsAccess')}` : `3 ${t('studentsAccess')}`}</p>
//               </div>
//             </div>

//             {/* Black pricing box */}
//             <div className="bg-black rounded-3xl px-8 py-10 text-white">

//               {/* Price */}
//               <div className="text-center mb-6">
//                 <div className="flex items-baseline justify-center gap-2">
//                   <span className="text-white text-3xl font-bold">SAR</span>
//                   <span className="font-black" style={{ fontSize: '72px', lineHeight: 1, background: 'linear-gradient(90deg, #c8960c, #f5c518)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>1000</span>
//                   <span className="text-gray-400 text-sm">{t('billedLifelong').split(' ')[0]}</span>
//                 </div>
//                 <p className="text-sm mt-1" style={{ color: '#A4FF00' }}>{t('internationalStandard')}</p>
//               </div>

//               {/* Subscribe Now button */}
//               <button
//                 onClick={handleSubscribe}
//                 className="w-full py-4 rounded-full font-bold text-black text-lg mb-3"
//                 style={{ background: 'linear-gradient(90deg, #00e5ff, #a4ff00, #f5c518)' }}
//               >
//                 {t('subscribeNow')}
//               </button>

//               {/* Try Free Lesson button */}
//               <button
//                 onClick={() => navigate('/course-videos')}
//                 className="w-full py-4 rounded-xl font-semibold text-white text-lg mb-6 border border-gray-600 hover:border-gray-400 transition-colors"
//               >
//                 {t('tryFree')}
//               </button>

//               {/* Plan row */}
//               <div className="flex items-center justify-between bg-gray-900 rounded-xl px-5 py-4 mb-6">
//                 <div>
//                   <p className="font-semibold text-white text-sm">{t('planName')}</p>
//                   <p className="text-gray-400 text-xs">{t('billedLifelong')}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <div className="w-10 h-5 bg-gray-600 rounded-full relative">
//                       <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
//                     </div>
//                     <span className="text-xs text-gray-400">{t('annualBilling')}</span>
//                   </div>
//                 </div>
//                 <span className="font-bold text-white">SAR 1000</span>
//               </div>

//               {/* Divider + Before discount */}
//               <div className="border-t border-gray-700 pt-4 mb-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400 text-sm">{t('beforeDiscount')}</span>
//                   <span className="font-bold text-lg" style={{ color: '#f5c518' }}>SAR <span className="text-2xl">1500</span></span>
//                 </div>
//               </div>

//               {/* Grand total */}
//               <div className="border-t border-gray-700 pt-4 mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-white font-semibold">{t('grandTotal')}</span>
//                   <span className="font-bold text-lg" style={{ color: '#f5c518' }}>SAR <span className="text-2xl">1000</span></span>
//                 </div>
//               </div>

//               {/* Payment methods */}
//               <div className="flex items-center gap-3 flex-wrap mb-6">
//                 {['Mastercard', 'PayPal', 'VISA', 'iDEAL', 'Vodafone', 'Etisalat', 'Bitcoin', 'Binance'].map((method, i) => (
//                   <div key={i} className="bg-white rounded-lg px-3 py-2 flex items-center justify-center" style={{ minWidth: '48px', height: '32px' }}>
//                     <span className="text-xs font-bold text-black">{method.slice(0, 4)}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Try Free Lesson again */}
//               <button
//                 onClick={() => navigate('/course-videos')}
//                 className="border border-gray-600 rounded-xl px-6 py-3 text-white font-semibold text-sm mb-6 hover:border-gray-400 transition-colors"
//               >
//                 {t('tryFree')}
//               </button>

//               {/* Reasons */}
//               <div className="border border-gray-700 rounded-xl p-5">
//                 <p className="text-gray-400 text-sm mb-4">{t('reasonsTitle')}</p>
//                 <ul className="space-y-3">
//                   {['r1', 'r2', 'r3', 'r4', 'r5'].map((key, i) => (
//                     <li key={i} className="flex items-center gap-3 text-white text-sm">
//                       <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A4FF00' }}>
//                         <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
//                         </svg>
//                       </span>
//                       {t(`reasons.${key}`)}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//             </div>

//             {/* Footer - outside black box */}
//             <div className="flex items-center justify-center gap-6 mt-6 px-2">
//               <p className="text-gray-500 text-lg">{t('rights')}</p>
//               <button className="text-gray-400 text-xs underline hover:text-black">{t('refundPolicy')}</button>
//             </div>
//           </div>
//         </section>
//       </div>

//     </div>
//   );
// }

// export default Subscribe;


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import BASE_URL from '../api/config';
// import { getCourses } from '../api/courses';

// function Subscribe() {
//   const navigate = useNavigate();
//   const { t } = useTranslation('subscribe');
//   const { isAr } = useLanguage();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [subscribers, setSubscribers] = useState([]);
//   const [firstCourseId, setFirstCourseId] = useState(null);
//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const [email, setEmail] = useState(user?.email || '');

//   useEffect(() => {
//     fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
//       headers: { 'Accept': 'application/json' },
//     })
//       .then(r => r.json())
//       .then(d => setSubscribers(d?.data || []))
//       .catch(() => {});

//     // get first course ID for checkout redirect
//     getCourses({ per_page: 1 })
//       .then(data => {
//         const id = data?.data?.[0]?.id;
//         if (id) setFirstCourseId(id);
//       })
//       .catch(() => {});
//   }, []);

//   const handleSubscribe = () => {
//     const token = localStorage.getItem('token');
//     if (!token) { navigate('/login'); return; }
//     if (firstCourseId) {
//       navigate(`/checkout/${firstCourseId}`);
//     } else {
//       navigate('/courses');
//     }
//   };

//   const handleGetAccess = async () => {
//     const token = localStorage.getItem('token');
//     const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
//     if (!token || !currentUser) { navigate('/login'); return; }
//     setLoading(true); setError('');
//     try {
//       const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ email: email || currentUser.email }),
//       });
//       const data = await res.json();
//       if (data?.data?.is_subscribed) { navigate('/course-videos'); }
//       else { setError(data.message || 'Not subscribed yet.'); }
//     } catch { setError('Network error.'); }
//     finally { setLoading(false); }
//   };
//   return (
//     <div className="min-h-screen pt-20">

//       {/* Hero Section */}
//       <section
//         className="w-full relative overflow-visible"
//         style={{ background: 'linear-gradient(120deg, #f8f8f8 0%, #e0e0e0 40%, #cccccc 100%)', minHeight: '320px', paddingBottom: '80px' }}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '320px' }}>
//           {/* Left Text */}
//           <div className="flex-1 py-8 md:py-12">
//             <h1 className="font-semibold text-black mb-4" style={{ fontSize: 'clamp(2rem, 8vw, 96px)', lineHeight: 1 }}>{t('title')}</h1>
//             <div className="relative inline-block rounded-full mb-4" style={{ minHeight: '40px', minWidth: '120px' }}>
//               <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
//                 style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//               <h2 className="relative px-4 py-2 font-bold text-white inline-block" style={{ zIndex: 10, fontSize: 'clamp(1rem, 4vw, 39px)' }}>
//                 {t('lifetime')}
//               </h2>
//             </div>
//             <p className="text-gray-600 text-sm md:text-lg">{t('subtitle')}</p>
//           </div>

//           {/* Right - Cards image overflowing */}
//           <div className="w-full md:flex-1 flex justify-center md:justify-end items-end" style={{ maxWidth: '480px', position: 'relative' }}>
//             <img
//               src="/b_عايز_كارد_زي_دول_بكو (1) 1.png"
//               alt="Payment Cards"
//               className="object-contain w-full md:w-auto"
//               style={{ height: 'clamp(200px, 50vw, 420px)', position: 'relative', zIndex: 20, marginBottom: '-75px' }}
//               onError={(e) => { e.target.style.display = 'none'; }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* White section over hero */}
//       <div style={{ position: 'relative', zIndex: 10, marginTop: '-60px' }}>
//         <section className="bg-white px-2 lg:px-4 overflow-hidden" style={{ borderRadius: '60px 60px 0 0', paddingTop: '80px', paddingBottom: '80px' }}>
//           <div className="max-w-7xl mx-auto">

//             <div className="text-center mb-16 mt-16">
//               <div className="flex flex-row gap-0 justify-center items-center mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg" style={{ maxWidth: '600px' }}>
//                 <input type="email" placeholder={t('emailPlaceholder')}
//                   className="flex-1 px-5 py-3 bg-transparent border-none rounded-full text-black focus:outline-none text-sm min-w-0"
//                   value={email} onChange={e => setEmail(e.target.value)} />
//                 <button onClick={handleGetAccess} disabled={loading}
//                   className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm disabled:opacity-60">
//                   {loading ? t('loading') : t('getAccess')}
//                 </button>
//               </div>
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//               <div className="flex items-center justify-center gap-3 mt-4">
//                 <div className="flex -space-x-2">
//                   {subscribers.length > 0 ? subscribers.slice(0, 3).map((sub, i) => (
//                     sub.avatar_url
//                       ? <img key={i} src={sub.avatar_url} alt={sub.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//                       : <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: `hsl(${i * 60}, 60%, 50%)` }}>{sub.name?.charAt(0)?.toUpperCase()}</div>
//                   )) : (
//                     <>
//                       <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
//                       <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
//                       <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
//                     </>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-700">{subscribers.length > 0 ? `${subscribers.length}+ ${t('studentsAccess')}` : `3 ${t('studentsAccess')}`}</p>
//               </div>
//             </div>

//             {/* Black pricing box */}
//             <div className="bg-black rounded-3xl px-8 py-10 text-white">

//               {/* Price */}
//               <div className="text-center mb-6">
//                 <div className="flex items-baseline justify-center gap-2">
//                   <span className="text-white text-3xl font-bold">{t('SAR', 'ريال')}</span>
//                   <span className="font-black" style={{ fontSize: '72px', lineHeight: 1, background: 'linear-gradient(90deg, #c8960c, #f5c518)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>1000</span>
//                   <span className="text-gray-400 text-sm">{t('billedLifelong').split(' ')[0]}</span>
//                 </div>
//                 <p className="text-sm mt-1" style={{ color: '#A4FF00' }}>{t('internationalStandard')}</p>
//               </div>

//               {/* Subscribe Now button */}
//               <button
//                 onClick={handleSubscribe}
//                 className="w-full py-4 rounded-full font-bold text-black text-lg mb-3"
//                 style={{ background: 'linear-gradient(90deg, #00e5ff, #a4ff00, #f5c518)' }}
//               >
//                 {t('subscribeNow')}
//               </button>

//               {/* Try Free Lesson button */}
//               <button
//                 onClick={() => navigate('/course-videos')}
//                 className="w-full py-4 rounded-xl font-semibold text-white text-lg mb-6 border border-gray-600 hover:border-gray-400 transition-colors"
//               >
//                 {t('tryFree')}
//               </button>

//               {/* Plan row */}
//               <div className="flex items-center justify-between bg-gray-900 rounded-xl px-5 py-4 mb-6">
//                 <div>
//                   <p className="font-semibold text-white text-sm">{t('planName')}</p>
//                   <p className="text-gray-400 text-xs">{t('billedLifelong')}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <div className="w-10 h-5 bg-gray-600 rounded-full relative">
//                       <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
//                     </div>
//                     <span className="text-xs text-gray-400">{t('annualBilling')}</span>
//                   </div>
//                 </div>
//                 <span className="font-bold text-white">{t('SAR', 'ريال')} 1000</span>
//               </div>

//               {/* Divider + Before discount */}
//               <div className="border-t border-gray-700 pt-4 mb-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400 text-sm">{t('beforeDiscount')}</span>
//                   <span className="font-bold text-lg" style={{ color: '#f5c518' }}>{t('SAR', 'ريال')} <span className="text-2xl">1500</span></span>
//                 </div>
//               </div>

//               {/* Grand total */}
//               <div className="border-t border-gray-700 pt-4 mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-white font-semibold">{t('grandTotal')}</span>
//                   <span className="font-bold text-lg" style={{ color: '#f5c518' }}>{t('SAR', 'ريال')} <span className="text-2xl">1000</span></span>
//                 </div>
//               </div>

//               {/* Payment methods */}
//               <div className="flex items-center gap-3 flex-wrap mb-6">
//                 {['ماستركارد', 'بايبال', 'فيزا', 'فودافون', 'اتصالات', 'بيتكوين', 'بينانس'].map((method, i) => (
//                   <div key={i} className="bg-white rounded-lg px-3 py-2 flex items-center justify-center" style={{ minWidth: '48px', height: '32px' }}>
//                     <span className="text-xs font-bold text-black">{method}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Try Free Lesson again */}
//               <button
//                 onClick={() => navigate('/course-videos')}
//                 className="border border-gray-600 rounded-xl px-6 py-3 text-white font-semibold text-sm mb-6 hover:border-gray-400 transition-colors"
//               >
//                 {t('tryFree')}
//               </button>

//               {/* Reasons */}
//               <div className="border border-gray-700 rounded-xl p-5">
//                 <p className="text-gray-400 text-sm mb-4">{t('reasonsTitle')}</p>
//                 <ul className="space-y-3">
//                   {['r1', 'r2', 'r3', 'r4', 'r5'].map((key, i) => (
//                     <li key={i} className="flex items-center gap-3 text-white text-sm">
//                       <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A4FF00' }}>
//                         <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
//                         </svg>
//                       </span>
//                       {t(`reasons.${key}`)}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//             </div>

//             {/* Footer - outside black box */}
//             <div className="flex items-center justify-center gap-6 mt-6 px-2">
//               <p className="text-gray-500 text-lg">{t('rights')}</p>
//               <button className="text-gray-400 text-xs underline hover:text-black">{t('refundPolicy')}</button>
//             </div>
//           </div>
//         </section>
//       </div>

//     </div>
//   );
// }

// export default Subscribe;




// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import BASE_URL from '../api/config';
// import { getCourses } from '../api/courses';

// function Subscribe() {
//   const navigate = useNavigate();
//   const { t } = useTranslation('subscribe');
//   const { isAr } = useLanguage();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [subscribers, setSubscribers] = useState([]);
//   const [firstCourseId, setFirstCourseId] = useState(null);
//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const [email, setEmail] = useState(user?.email || '');

//   useEffect(() => {
//     fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
//       headers: { 'Accept': 'application/json' },
//     })
//       .then(r => r.json())
//       .then(d => setSubscribers(d?.data || []))
//       .catch(() => {});

//     getCourses({ per_page: 1 })
//       .then(data => {
//         const id = data?.data?.[0]?.id;
//         if (id) setFirstCourseId(id);
//       })
//       .catch(() => {});
//   }, []);

//   const handleSubscribe = () => {
//     const token = localStorage.getItem('token');
//     if (!token) { navigate('/login'); return; }
//     if (firstCourseId) {
//       navigate(`/checkout/${firstCourseId}`);
//     } else {
//       navigate('/courses');
//     }
//   };

//   const handleGetAccess = async () => {
//     const token = localStorage.getItem('token');
//     const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
//     if (!token || !currentUser) { navigate('/login'); return; }
//     setLoading(true); setError('');
//     try {
//       const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ email: email || currentUser.email }),
//       });
//       const data = await res.json();
//       if (data?.data?.is_subscribed) { navigate('/course-videos'); }
//       else { setError(data.message || 'Not subscribed yet.'); }
//     } catch { setError('Network error.'); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="min-h-screen pt-20 bg-[#e8e8e8]">

//       {/* Hero Section */}
//       <section
//         className="w-full relative overflow-visible"
//         style={{ background: 'linear-gradient(135deg, #f5f5f7 0%, #e1e1e3 50%, #d5d5d8 100%)', minHeight: '340px', paddingBottom: '100px' }}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '340px' }}>
          
//           {/* Right - الكروت بحجم كبير ومبروزة فوق الحافة البيضاء */}
//           <div className="w-full md:flex-1 flex justify-center md:justify-start items-end order-1 md:order-2" style={{ maxWidth: '600px', position: 'relative' }}>
//             <img
//               src="/b_عايز_كارد_زي_دول_بكو (1) 1.png"
//               alt="Payment Cards"
//               className="object-contain w-full md:w-auto drop-shadow-2xl scale-110 md:scale-125"
//               style={{ 
//                 height: 'clamp(320px, 70vw, 560px)', 
//                 position: 'relative', 
//                 zIndex: 30, 
//                 marginBottom: '-160px', 
//                 transform: 'translateY(25px)' 
//               }}
//               onError={(e) => { e.target.style.display = 'none'; }}
//             />
//           </div>

//           {/* Left Text */}
//           <div className="flex-1 py-8 md:py-12 order-2 md:order-1 text-center md:text-right">
//             <h1 className="font-semibold text-black mb-4" style={{ fontSize: 'clamp(2.2rem, 8vw, 96px)', lineHeight: 1 }}>{t('title')}</h1>
//             <div className="relative inline-block rounded-full mb-4" style={{ minHeight: '40px', minWidth: '120px' }}>
//               <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
//                 style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//               <h2 className="relative px-4 py-2 font-bold text-white inline-block" style={{ zIndex: 10, fontSize: 'clamp(1rem, 4vw, 39px)' }}>
//                 {t('lifetime')}
//               </h2>
//             </div>
//             <p className="text-gray-600 text-sm md:text-lg">{t('subtitle')}</p>
//           </div>

//         </div>
//       </section>

//       {/* White section over hero */}
//       <div style={{ position: 'relative', zIndex: 20, marginTop: '-80px' }}>
//         <section 
//           className="bg-white px-2 lg:px-4 overflow-hidden rounded-t-[50px] md:rounded-t-[80px] shadow-2xl" 
//           style={{ paddingTop: '100px', paddingBottom: '80px' }}
//         >
//           <div className="max-w-7xl mx-auto">

//             <div className="text-center mb-16 mt-8">
//               <div className="flex flex-row gap-0 justify-center items-center mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg" style={{ maxWidth: '600px' }}>
//                 <input type="email" placeholder={t('emailPlaceholder')}
//                   className="flex-1 px-5 py-3 bg-transparent border-none rounded-full text-black focus:outline-none text-sm min-w-0 text-right"
//                   value={email} onChange={e => setEmail(e.target.value)} />
//                 <button onClick={handleGetAccess} disabled={loading}
//                   className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm disabled:opacity-60">
//                   {loading ? t('loading') : t('getAccess')}
//                 </button>
//               </div>
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//               <div className="flex items-center justify-center gap-3 mt-4">
//                 <div className="flex -space-x-2">
//                   {subscribers.length > 0 ? subscribers.slice(0, 3).map((sub, i) => (
//                     sub.avatar_url
//                       ? <img key={i} src={sub.avatar_url} alt={sub.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//                       : <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: `hsl(${i * 60}, 60%, 50%)` }}>{sub.name?.charAt(0)?.toUpperCase()}</div>
//                   )) : (
//                     <>
//                       <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
//                       <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
//                       <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
//                     </>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-700">{subscribers.length > 0 ? `${subscribers.length}+ ${t('studentsAccess')}` : `3 ${t('studentsAccess')}`}</p>
//               </div>
//             </div>

//             {/* Black pricing box - مطابق للصورة تماماً */}
//             <div className="bg-black rounded-3xl px-6 sm:px-10 py-10 text-white max-w-4xl mx-auto shadow-2xl">

//               {/* Price */}
//               <div className="text-center mb-8">
//                 <div className="flex items-baseline justify-center gap-2">
//                   <span className="font-black text-6xl sm:text-7xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">1000</span>
//                   <span className="text-white text-2xl font-bold">{t('SAR', 'ريال')}</span>
//                 </div>
//                 <p className="text-xs text-emerald-400 font-semibold mt-1">مدي الحياة</p>
//                 <p className="text-xs text-gray-400 mt-0.5">{t('internationalStandard', 'الاشتراك في المعيار الدولي')}</p>
//               </div>

//               {/* Subscribe Now button */}
//               <button
//                 onClick={handleSubscribe}
//                 className="w-full py-4 rounded-full font-extrabold text-black text-lg mb-3 flex items-center justify-center gap-2 shadow-lg"
//                 style={{ background: 'linear-gradient(90deg, #00e5ff, #a4ff00, #f5c518)' }}
//               >
//                 <span>←</span> {t('subscribeNow', 'إشترك الآن')}
//               </button>

//               {/* Try Free Lesson button */}
//               <button
//                 onClick={() => navigate('/course-videos')}
//                 className="w-full py-3.5 rounded-xl font-semibold text-white text-base mb-8 border border-zinc-800 hover:border-zinc-600 transition-colors flex items-center justify-center gap-2 bg-zinc-950"
//               >
//                 <span>👁</span> {t('tryFree', 'جرب المحاضرة المجانية')}
//               </button>

//               {/* White Box inside Black Box (Plan row) */}
//               <div className="bg-white text-black rounded-2xl p-4 mb-6 shadow-md">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="text-right">
//                     <p className="font-extrabold text-black text-sm">معيار البديل</p>
//                     <p className="text-gray-500 text-xs">مدي الحياة</p>
//                   </div>
//                   <span className="font-black text-black text-lg">1000 <span className="text-sm font-bold">{t('SAR', 'ريال')}</span></span>
//                 </div>
//                 <div className="flex items-center justify-between border-t border-gray-200 pt-3">
//                   <div className="flex items-center gap-2">
//                     <div className="w-9 h-5 bg-black rounded-full relative flex items-center px-0.5">
//                       <div className="w-4 h-4 bg-white rounded-full"></div>
//                     </div>
//                     <span className="text-xs font-bold text-black bg-gray-200 px-2 py-0.5 rounded">خصم 20%</span>
//                   </div>
//                   <span className="text-xs font-bold text-gray-700">أحصل علي الخصم</span>
//                 </div>
//               </div>

//               {/* Before discount */}
//               <div className="border-t border-zinc-900 pt-4 mb-4 ">
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="font-bold text-white text-base">قبل الخصم</span>
//                   <span className="font-bold text-lg text-amber-400">1500 <span className="text-xs">{t('SAR', 'ريال')}</span></span>
//                 </div>
//               </div>

//               {/* Grand total */}
//               <div className="border-t border-zinc-900 pt-4 mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="font-bold text-white text-base">المجموع الإجمالي</span>
//                   <span className="font-extrabold text-xl text-amber-400">1000 <span className="text-xs">{t('SAR', 'ريال')}</span></span>
//                 </div>
//               </div>

//               {/* Payment methods icons row */}
//               <div className="flex items-center justify-center gap-2 flex-wrap mb-6 bg-zinc-950 p-3 rounded-xl border border-zinc-900">
//                 {['binance', 'bitcoin', 'etisalat', 'vodafone', 'ideal', 'visa', 'paypal', 'mastercard'].map((method, i) => (
//                   <div key={i} className="bg-white rounded px-2.5 py-1.5 flex items-center justify-center h-7 shadow-sm">
//                     <span className="text-[10px] font-black text-black uppercase">{method.slice(0, 4)}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Try Free Lesson button repeated */}
//               <button
//                 onClick={() => navigate('/course-videos')}
//                 className="w-full py-3.5 rounded-xl font-semibold text-white text-base mb-8 border border-zinc-800 hover:border-zinc-600 transition-colors flex items-center justify-center gap-2 bg-zinc-950"
//               >
//                 <span>👁</span> {t('tryFree', 'جرب المحاضرة المجانية')}
//               </button>

//               {/* Reasons */}
//               <div className="text-right">
//                 <p className="text-white font-bold text-base mb-4">دواعم الأشتراك</p>
//                 <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950/60">
//                   <ul className="space-y-4">
//                     {[
//                       'اشتراك مدي الحياة',
//                       'تصدير الملفات في الدورة التدريبية',
//                       'متابعة مدي الحياة بعد الدورة',
//                       'عمل تاسكات علي الجروب',
//                       'محاضرات مجانا',
//                       'دعم بعد الكورس'
//                     ].map((reason, i) => (
//                       <li key={i} className="flex items-center justify-between text-white text-sm">
//                         <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
//                           <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
//                           </svg>
//                         </span>
//                         <span className="font-medium mr-3 flex-1 text-right">{reason}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//             </div>

//             {/* Footer - outside black box */}
//             <div className="flex items-center justify-center gap-6 mt-6 px-2">
//               <p className="text-gray-500 text-lg">{t('rights')}</p>
//               <button className="text-gray-400 text-xs underline hover:text-black">{t('refundPolicy')}</button>
//             </div>
//           </div>
//         </section>
//       </div>

//     </div>
//   );
// }

// export default Subscribe;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import BASE_URL from '../api/config';
import { getCourses } from '../api/courses';

function Subscribe() {
  const navigate = useNavigate();
  const { t } = useTranslation('subscribe');
  const { isAr } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [firstCourseId, setFirstCourseId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    fetch(`${BASE_URL}/lifetime-subscription/subscribers?limit=10`, {
      headers: { 'Accept': 'application/json' },
    })
      .then(r => r.json())
      .then(d => setSubscribers(d?.data || []))
      .catch(() => {});

    getCourses({ per_page: 1 })
      .then(data => {
        const id = data?.data?.[0]?.id;
        if (id) setFirstCourseId(id);
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    if (firstCourseId) {
      navigate(`/checkout/${firstCourseId}`);
    } else {
      navigate('/courses');
    }
  };

  const handleGetAccess = async () => {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!token || !currentUser) { navigate('/login'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BASE_URL}/lifetime-subscription/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ email: email || currentUser.email }),
      });
      const data = await res.json();
      if (data?.data?.is_subscribed) { navigate('/course-videos'); }
      else { setError(data.message || 'Not subscribed yet.'); }
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#e8e8e8]">

      {/* Hero Section */}
      <section
        className="w-full relative overflow-visible"
        style={{ background: 'linear-gradient(135deg, #f5f5f7 0%, #e1e1e3 50%, #d5d5d8 100%)', minHeight: '340px', paddingBottom: '100px' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '340px' }}>
          
          {/* Right - الكروت بحجم كبير ومبروزة فوق الحافة البيضاء مع الـ Flip */}
          <div className="w-full md:flex-1 flex justify-center md:justify-start items-end order-1 md:order-2" style={{ maxWidth: '600px', position: 'relative' }}>
            <img
              src="/b_عايز_كارد_زي_دول_بكو (1) 1.png"
              alt="Payment Cards"
              className="object-contain w-full md:w-auto drop-shadow-2xl scale-110 md:scale-125"
              style={{ 
                height: 'clamp(320px, 70vw, 560px)', 
                position: 'relative', 
                zIndex: 30, 
                marginBottom: '-160px', 
                transform: 'translateY(25px) scaleX(-1)' 
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          {/* Left Text */}
          <div className="flex-1 py-8 md:py-12 order-2 md:order-1 text-center md:text-right">
            <h1 className="font-semibold text-black mb-4" style={{ fontSize: 'clamp(2.2rem, 8vw, 96px)', lineHeight: 1 }}>{t('title')}</h1>
            <div className="relative inline-block rounded-full mb-4" style={{ minHeight: '40px', minWidth: '120px' }}>
              <img src="/nzrzOfxWPwo 1.png" alt="Background" className="absolute rounded-full"
                style={{ zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <h2 className="relative px-4 py-2 font-bold text-white inline-block" style={{ zIndex: 10, fontSize: 'clamp(1rem, 4vw, 39px)' }}>
                {t('lifetime')}
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-lg">{t('subtitle')}</p>
          </div>

        </div>
      </section>

      {/* White section over hero */}
      <div style={{ position: 'relative', zIndex: 20, marginTop: '-80px' }}>
        <section 
          className="bg-white px-2 lg:px-4 overflow-hidden rounded-t-[50px] md:rounded-t-[80px] shadow-2xl" 
          style={{ paddingTop: '100px', paddingBottom: '80px' }}
        >
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16 mt-8">
              <div className="flex flex-row gap-0 justify-center items-center mx-auto bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-lg" style={{ maxWidth: '600px' }}>
                <input type="email" placeholder={t('emailPlaceholder')}
                  className="flex-1 px-5 py-3 bg-transparent border-none rounded-full text-black focus:outline-none text-sm min-w-0 text-right"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={handleGetAccess} disabled={loading}
                  className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm disabled:opacity-60">
                  {loading ? t('loading') : t('getAccess')}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
                <p className="text-sm text-gray-700">{subscribers.length > 0 ? `${subscribers.length}+ ${t('studentsAccess')}` : `3 ${t('studentsAccess')}`}</p>
              </div>
            </div>

            {/* Black pricing box */}
            <div className="bg-black rounded-3xl px-6 sm:px-10 py-10 text-white max-w-4xl mx-auto shadow-2xl">

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-black text-6xl sm:text-7xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">1000</span>
                  <span className="text-white text-2xl font-bold">{t('SAR', 'ريال')}</span>
                </div>
                <p className="text-xs text-emerald-400 font-semibold mt-1">مدي الحياة</p>
                <p className="text-xs text-gray-400 mt-0.5">{t('internationalStandard', 'الاشتراك في المعيار الدولي')}</p>
              </div>

              {/* Subscribe Now button */}
              <button
                onClick={handleSubscribe}
                className="w-full py-4 rounded-full font-extrabold text-black text-lg mb-3 flex items-center justify-center gap-2 shadow-lg"
                style={{ background: 'linear-gradient(90deg, #00e5ff, #a4ff00, #f5c518)' }}
              >
                <span>←</span> {t('subscribeNow', 'إشترك الآن')}
              </button>

              {/* Try Free Lesson button */}
              <button
                onClick={() => navigate('/course-videos')}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-white text-base mb-8 border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center gap-2.5 bg-zinc-950 shadow-inner"
              >
                <span className="text-lg">👁</span> 
                <span>{t('tryFree', 'جرب المحاضرة المجانية')}</span>
              </button>

              {/* White Box inside Black Box (Plan row) */}
              <div className="bg-white text-black rounded-2xl overflow-hidden mb-6 shadow-md">
                <div className="flex items-center justify-between p-4">
                   <div className="text-left">
                    <p className="font-extrabold text-black text-sm">معيار البديل</p>
                    <p className="text-gray-500 text-xs">مدي الحياة</p>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-black text-2xl">1000</span>
                    <span className="text-sm font-bold text-black">{t('SAR', 'ريال')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end bg-zinc-300 px-4 py-3 border-t border-zinc-300 gap-3">
                  <span className="text-xs font-bold text-black">أحصل علي الخصم</span>
                  <span className="text-xs font-bold text-black bg-zinc-400/60 px-2.5 py-0.5 rounded">خصم 20%</span>
                  <div className="w-10 h-6 bg-black rounded-full relative flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Before discount */}
              <div className="border-t border-zinc-900 pt-4 mb-4 flex justify-center items-center">
                <div className="flex justify-center items-center text-sm">
                  <span className="font-bold text-white text-base">قبل الخصم</span>
                  <span className="font-bold text-lg text-amber-400">1500 <span className="text-xs">{t('SAR', 'ريال')}</span></span>
                </div>
              </div>

              {/* Grand total */}
              <div className="border-t border-zinc-900 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-base">المجموع الإجمالي</span>
                  <span className="font-extrabold text-xl text-amber-400">1000 <span className="text-xs">{t('SAR', 'ريال')}</span></span>
                </div>
              </div>

              {/* Payment methods icons row - تم تعديل المسافات والعرض لتظهر منسقة وواضحة */}
              <div className="flex items-center justify-center gap-3 flex-wrap mb-6 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                {['Mastercard', 'PayPal', 'Visa', 'Instapay', 'Vodafone', 'Etisalat', 'Bitcoin', 'Binance'].map((method, i) => (
                  <div key={i} className="bg-white rounded-lg px-3 py-2 flex items-center justify-center h-9 min-w-[70px] shadow-sm">
                    <span className="text-xs font-bold text-black">{method}</span>
                  </div>
                ))}
              </div>

              {/* Try Free Lesson button repeated */}
              <button
                onClick={() => navigate('/course-videos')}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-white text-base mb-8 border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center gap-2.5 bg-zinc-950 shadow-inner"
              >
                <span className="text-lg">👁</span> 
                <span>{t('tryFree', 'جرب المحاضرة المجانية')}</span>
              </button>

              {/* Reasons */}
              <div className="text-right">
                <p className="text-white font-bold text-base mb-4">دواعم الأشتراك</p>
                <div className="border border-zinc-600 rounded-3xl p-6 bg-black shadow-lg">
                  <ul className="space-y-4">
                    {[
                      'اشتراك مدي الحياة',
                      'تصدير الملفات في الدورة التدريبية',
                      'متابعة مدي الحياة بعد الدورة',
                      'عمل تاسكات علي الجروب',
                      'محاضرات مجانا',
                      'دعم بعد الكورس'
                    ].map((reason, i) => (
                      <li key={i} className="flex items-center justify-between text-white text-sm">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                        <span className="font-medium mr-3 flex-1 text-right">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Footer - outside black box */}
            <div className="flex items-center justify-center gap-6 mt-6 px-2">
              <p className="text-gray-500 text-lg">{t('rights')}</p>
              <button className="text-gray-400 text-xs underline hover:text-black">{t('refundPolicy')}</button>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

export default Subscribe;