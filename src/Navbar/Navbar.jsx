// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation('common');
//   const { toggleLanguage, currentLang } = useLanguage();

//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const token = localStorage.getItem('token');
//   const isLoggedIn = !!token;

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setDropdownOpen(false);
//     navigate('/login');
//   };

//   const navLinks = [
//     { name: t('nav.home'),          path: '/'              },
//     { name: t('nav.courses'),       path: '/courses'       },
//     { name: t('nav.about'),         path: '/AboutUs'       },
//     { name: t('nav.contact'),       path: '/contact'       },
//     { name: t('nav.instructor'),    path: '/instructor'    },
//     { name: t('nav.courseVideos'),  path: '/course-videos' },
//     { name: t('nav.certifications'),path: '/certifications'},
//     { name: t('nav.subscribe'),     path: '/subscribe'     },
//   ];

//   return (
//     <div className="w-full">
//       <style>{`
//         @keyframes authBorder {
//           0%   { background-position: 0%   50%; }
//           50%  { background-position: 100% 50%; }
//           100% { background-position: 0%   50%; }
//         }
//         .auth-btn-wrapper {
//           background: linear-gradient(135deg,#ff0080,#ff8c00,#40e0d0,#0080ff,#8000ff,#00ff80);
//           background-size: 300% 300%;
//           animation: authBorder 3s ease infinite;
//           padding: 2px;
//           border-radius: 9999px;
//         }
//       `}</style>

//       <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20">

//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center -ml-4 sm:-ml-6 lg:-ml-8">
//               <div className="h-13 md:h-20 w-24 md:w-32 relative">
//                 <div className="h-full w-full flex items-center justify-center">
//                   <img src="/Abdullah  el-Nasr.png" alt="Logo" className="h-12 md:h-16 object-contain" />
//                 </div>
//               </div>
//             </div>

//             {/* Nav links – desktop */}
//             <div className="hidden lg:flex items-center flex-1 justify-center ml-4 xl:ml-6" dir={currentLang === 'AR' ? 'rtl' : 'ltr'}>
//               <div className={`flex items-center ${currentLang === 'AR' ? 'gap-4 xl:gap-7' : 'gap-3 xl:gap-8'}`}>
//               {navLinks.map((link, i) =>
//                 link.path.startsWith('#') ? (
//                   <a key={i} href={link.path}
//                     className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link key={i} to={link.path}
//                     className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
//                     {link.name}
//                   </Link>
//                 )
//               )}
//               </div>
//             </div>

//             {/* Right side */}
//             <div className="flex items-center gap-2 md:gap-3 ml-4" dir="ltr">

//               {/* Language toggle */}
//               <button
//                 onClick={toggleLanguage}
//                 className="hidden sm:flex items-center space-x-1 text-white cursor-pointer hover:text-blue-400 transition-colors mr-1"
//               >
//                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                     d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 <span className="text-sm md:text-base font-medium">{currentLang}</span>
//               </button>

//               {/* Heart */}
//               <div className="hidden sm:block cursor-pointer hover:scale-110 transition-transform mr-1">
//                 <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round"
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
//                 </svg>
//               </div>

//               {/* Login / User dropdown */}
//               {isLoggedIn ? (
//                 <div className="relative hidden sm:block">
//                   <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
//                     </svg>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                     </svg>
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
//                       <div className="px-4 py-3">
//                         <p className="text-sm font-bold text-black truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                       </div>
//                       <div className="border-t border-gray-100">
//                         <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
//                           </svg>
//                           {t('nav.logout')}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <div className="auth-btn-wrapper hidden sm:block">
//                     <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
//                       {t('nav.login')}
//                     </button>
//                   </div>
//                   <div className="auth-btn-wrapper hidden sm:block">
//                     <button onClick={() => navigate('/signup')} className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
//                       {t('nav.signUp')}
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Mobile hamburger */}
//               <button onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden text-white focus:outline-none rounded p-2" aria-label="Toggle menu">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   {isMenuOpen
//                     ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                     : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
//                   }
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-black border-t border-gray-800">
//             <div className="px-4 pt-2 pb-4 space-y-2">
//               {navLinks.map((link, i) =>
//                 link.path.startsWith('#') ? (
//                   <a key={i} href={link.path}
//                     className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link key={i} to={link.path}
//                     className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </Link>
//                 )
//               )}
//               <div className="flex gap-3 pt-4 border-t border-gray-800">
//                 <button onClick={() => { navigate('/login');  setIsMenuOpen(false); }}
//                   className="flex-1 py-2 bg-white text-black rounded-full font-semibold text-sm">{t('nav.login')}</button>
//                 <button onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
//                   className="flex-1 py-2 bg-white text-black rounded-full font-semibold text-sm">{t('nav.signUp')}</button>
//                 <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
//                   className="py-2 px-4 bg-gray-800 text-white rounded-full font-semibold text-sm">{currentLang}</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation('common');
//   const { toggleLanguage, currentLang } = useLanguage();

//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const token = localStorage.getItem('token');
//   const isLoggedIn = !!token;

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setDropdownOpen(false);
//     navigate('/login');
//   };

//   const navLinks = [
//     { name: t('nav.home'),         path: '/'             },
//     { name: t('nav.courses'),      path: '/courses'      },
//     { name: t('nav.about'),        path: '/AboutUs'      },
//     { name: t('nav.contact'),      path: '/contact'      },
//     { name: t('nav.instructor'),    path: '/instructor'    },
//     { name: t('nav.courseVideos'),  path: '/course-videos' },
//     { name: t('nav.certifications'),path: '/certifications'},
//     { name: t('nav.subscribe'),     path: '/subscribe'     },
//   ];

//   return (
//     <div className="w-full">
//       <style>{`
//         @keyframes authBorder {
//           0%   { background-position: 0%   50%; }
//           50%  { background-position: 100% 50%; }
//           100% { background-position: 0%   50%; }
//         }
//         .auth-btn-wrapper {
//           background: linear-gradient(135deg,#ff0080,#ff8c00,#40e0d0,#0080ff,#8000ff,#00ff80);
//           background-size: 300% 300%;
//           animation: authBorder 3s ease infinite;
//           padding: 2px;
//           border-radius: 8px;
//         }
//       `}</style>

//       <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
//         <div className="w-full px-2 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20" dir={currentLang === 'AR' ? 'rtl' : 'ltr'}>

//             {/* Logo - أقصى الطرف */}
//             <div className="flex-shrink-0 flex items-center">
//               <div className="h-13 md:h-20 w-28 md:w-36 relative">
//                 <div className="h-full w-full flex items-center justify-start">
//                   <img src="/Abdullah  el-Nasr.png" alt="Logo" className="h-12 md:h-16 object-contain" />
//                 </div>
//               </div>
//             </div>

//             {/* Nav links – Desktop */}
//             <div className="hidden lg:flex items-center flex-1 justify-center mx-4 xl:mx-6">
//               <div className={`flex items-center ${currentLang === 'AR' ? 'gap-4 xl:gap-7' : 'gap-3 xl:gap-8'}`}>
//               {navLinks.map((link, i) =>
//                 link.path.startsWith('#') ? (
//                   <a key={i} href={link.path}
//                     className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link key={i} to={link.path}
//                     className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
//                     {link.name}
//                   </Link>
//                 )
//               )}
//               </div>
//             </div>

//             {/* Controls - (اللغة ثم القلب ثم الأزرار المربعة) */}
//             <div className="flex items-center gap-2 md:gap-3">

//               {/* Language toggle */}
//               <button
//                 onClick={toggleLanguage}
//                 className="hidden sm:flex items-center space-x-1 text-white cursor-pointer hover:text-blue-400 transition-colors"
//               >
//                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                     d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 <span className="text-sm md:text-base font-medium">{currentLang}</span>
//               </button>

//               {/* Heart */}
//               <div className="hidden sm:block cursor-pointer hover:scale-110 transition-transform">
//                 <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round"
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
//                 </svg>
//               </div>

//               {/* Auth Buttons (Square) / User Dropdown */}
//               {isLoggedIn ? (
//                 <div className="relative hidden sm:block">
//                   <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
//                     </svg>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                     </svg>
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100" dir={currentLang === 'AR' ? 'rtl' : 'ltr'}>
//                       <div className="px-4 py-3">
//                         <p className="text-sm font-bold text-black truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                       </div>
//                       <div className="border-t border-gray-100">
//                         <button onClick={handleLogout} className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
//                           </svg>
//                           {t('nav.logout')}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <div className="auth-btn-wrapper hidden sm:block">
//                     <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
//                       {t('nav.login')}
//                     </button>
//                   </div>
//                   <div className="auth-btn-wrapper hidden sm:block">
//                     <button onClick={() => navigate('/signup')} className="bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
//                       {t('nav.signUp')}
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Mobile hamburger */}
//               <button onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden text-white focus:outline-none rounded p-2" aria-label="Toggle menu">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   {isMenuOpen
//                     ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                     : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
//                   }
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-black border-t border-gray-800" dir={currentLang === 'AR' ? 'rtl' : 'ltr'}>
//             <div className="px-4 pt-2 pb-4 space-y-2">
//               {navLinks.map((link, i) =>
//                 link.path.startsWith('#') ? (
//                   <a key={i} href={link.path}
//                     className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link key={i} to={link.path}
//                     className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </Link>
//                 )
//               )}
//               <div className="flex gap-3 pt-4 border-t border-gray-800">
//                 <button onClick={() => { navigate('/login');  setIsMenuOpen(false); }}
//                   className="flex-1 py-2 bg-white text-black rounded-md font-semibold text-sm">{t('nav.login')}</button>
//                 <button onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
//                   className="flex-1 py-2 bg-white text-black rounded-md font-semibold text-sm">{t('nav.signUp')}</button>
//                 <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
//                   className="py-2 px-4 bg-gray-800 text-white rounded-md font-semibold text-sm">{currentLang}</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;



// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import BASE_URL from '../api/config';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();
//   const { t } = useTranslation('common');
//   const { toggleLanguage, currentLang } = useLanguage();

//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   const token = localStorage.getItem('token');
//   const isLoggedIn = !!token;

//   useEffect(() => {
//     fetch(`${BASE_URL}/categories` || `${BASE_URL}/courses/categories`, {
//       headers: {
//         'Accept': 'application/json',
//       },
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json?.data || Array.isArray(json)) {
//           setCategories(json.data || json);
//         }
//       })
//       .catch(() => {
//         setCategories([
//           {
//             id: 1,
//             name_ar: 'تسويق رقمي',
//             name_en: 'Digital Marketing',
//             description_ar: 'استراتيجيات التسويق الرقمي وبناء الحملات الإعلانية المؤثرة',
//             description_en: 'Digital marketing strategies and building impactful ad campaigns',
//             tags: ['Ads', 'Content', 'Analytics']
//           },
//           {
//             id: 2,
//             name_ar: 'جرافيك',
//             name_en: 'Graphic Design',
//             description_ar: 'أتقن التصميم الجرافيكي وبناء الهويات البصرية باحترافية عالية',
//             description_en: 'Master graphic design and build visual identities professionally',
//             tags: ['Figma', 'Photoshop', 'Illustrator', 'Branding']
//           },
//           {
//             id: 3,
//             name_ar: 'برمجة',
//             name_en: 'Programming',
//             description_ar: 'تعلم أساسيات وتقنيات البرمجة الحديثة من الصفر حتى الاحتراف',
//             description_en: 'Learn modern programming fundamentals and tech from scratch',
//             tags: ['Python', 'JavaScript', 'React', 'Node.js']
//           }
//         ]);
//       });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setDropdownOpen(false);
//     navigate('/login');
//   };

//   const navLinks = [
//     { name: t('nav.home'),        path: '/'            },
//     { name: t('nav.courses'),     path: '/courses', isDropdown: true },
//     { name: t('nav.about'),       path: '/AboutUs'     },
//     { name: t('nav.contact'),     path: '/contact'     },
//     { name: t('nav.instructor'),    path: '/instructor'    },
//     { name: t('nav.courseVideos'),  path: '/course-videos' },
//     { name: t('nav.certifications'),path: '/certifications'},
//     { name: t('nav.subscribe'),     path: '/subscribe'     },
//   ];

//   const isAr = currentLang === 'AR' || currentLang === 'ar';

//   return (
//     <div className="w-full">
//       <style>{`
//         @keyframes authBorder {
//           0%   { background-position: 0%   50%; }
//           50%  { background-position: 100% 50%; }
//           100% { background-position: 0%   50%; }
//         }
//         .auth-btn-wrapper {
//           background: linear-gradient(135deg,#ff0080,#ff8c00,#40e0d0,#0080ff,#8000ff,#00ff80);
//           background-size: 300% 300%;
//           animation: authBorder 3s ease infinite;
//           padding: 2px;
//           border-radius: 8px;
//         }
//       `}</style>

//       <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
//         <div className="w-full px-2 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20" dir={isAr ? 'rtl' : 'ltr'}>

//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center">
//               <div className="h-13 md:h-20 w-28 md:w-36 relative">
//                 <div className="h-full w-full flex items-center justify-start">
//                   <img src="/Abdullah  el-Nasr.png" alt="Logo" className="h-12 md:h-16 object-contain" />
//                 </div>
//               </div>
//             </div>

//             {/* Nav links – Desktop */}
//             <div className="hidden lg:flex items-center flex-1 justify-center mx-4 xl:mx-6">
//               <div className={`flex items-center ${isAr ? 'gap-4 xl:gap-7' : 'gap-3 xl:gap-8'}`}>
//                 {navLinks.map((link, i) =>
//                   link.isDropdown ? (
//                     <div key={i} className="relative">
//                       <button 
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setCoursesDropdownOpen(!coursesDropdownOpen);
//                         }}
//                         className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap flex items-center gap-1 py-4 cursor-pointer focus:outline-none"
//                       >
//                         {link.name}
//                         <svg className={`w-4 h-4 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                         </svg>
//                       </button>

//                       {/* Mega Menu with higher transparency */}
//                       {coursesDropdownOpen && (
//                         <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 z-50 text-white" dir={isAr ? 'rtl' : 'ltr'}>
//                           <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10">
//                             <h3 className="text-xl font-bold">{isAr ? 'الكورسات' : 'Courses'}</h3>
//                             <Link 
//                               to="/courses" 
//                               onClick={() => setCoursesDropdownOpen(false)} 
//                               className="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
//                             >
//                               {isAr ? 'عرض الكل ←' : 'View All →'}
//                             </Link>
//                           </div>

//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {(categories.length > 0 ? categories : [
//                               { id: 1, name_ar: 'تسويق رقمي', name_en: 'Digital Marketing', description_ar: 'استراتيجيات التسويق الرقمي وبناء الحملات الإعلانية المؤثرة', description_en: 'Digital marketing strategies and building campaigns', tags: ['Ads', 'Content', 'Analytics'] },
//                               { id: 2, name_ar: 'جرافيك', name_en: 'Graphic Design', description_ar: 'أتقن التصميم الجرافيكي وبناء الهويات البصرية باحترافية عالية', description_en: 'Master graphic design and build visual identities', tags: ['Figma', 'Photoshop', 'Illustrator', 'Branding'] },
//                               { id: 3, name_ar: 'برمجة', name_en: 'Programming', description_ar: 'تعلم أساسيات وتقنيات البرمجة الحديثة من الصفر حتى الاحتراف', description_en: 'Learn modern programming fundamentals from scratch', tags: ['Python', 'JavaScript', 'React', 'Node.js'] }
//                             ]).map((cat) => (
//                               <div 
//                                 key={cat.id || cat.name_ar}
//                                 onClick={() => { navigate('/courses'); setCoursesDropdownOpen(false); }}
//                                 className="bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-md"
//                               >
//                                 <div>
//                                   <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
//                                     {isAr ? (cat.name_ar || cat.name) : (cat.name_en || cat.name)}
//                                   </h4>
//                                   <p className="text-xs text-gray-300 mb-4 leading-relaxed">
//                                     {isAr ? (cat.description_ar || cat.description) : (cat.description_en || cat.description)}
//                                   </p>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2 pt-2">
//                                   {(cat.tags || cat.skills || []).map((tag, idx) => (
//                                     <span key={idx} className="text-xs bg-white/10 text-gray-200 px-3 py-1 rounded-full border border-white/10">
//                                       {tag}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ) : link.path.startsWith('#') ? (
//                     <a key={i} href={link.path}
//                       className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
//                       {link.name}
//                     </a>
//                   ) : (
//                     <Link key={i} to={link.path}
//                       className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
//                       {link.name}
//                     </Link>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={toggleLanguage}
//                 className="hidden sm:flex items-center space-x-1 text-white cursor-pointer hover:text-blue-400 transition-colors"
//               >
//                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                     d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 <span className="text-sm md:text-base font-medium">{currentLang}</span>
//               </button>

//               {isLoggedIn ? (
//                 <div className="relative hidden sm:block">
//                   <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
//                     </svg>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                     </svg>
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100" dir={isAr ? 'rtl' : 'ltr'}>
//                       <div className="px-4 py-3">
//                         <p className="text-sm font-bold text-black truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                       </div>
//                       <div className="border-t border-gray-100">
//                         <button onClick={handleLogout} className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
//                           </svg>
//                           {t('nav.logout')}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <div className="auth-btn-wrapper hidden sm:block">
//                     <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
//                       {t('nav.login')}
//                     </button>
//                   </div>
//                   <div className="auth-btn-wrapper hidden sm:block">
//                     <button onClick={() => navigate('/signup')} className="bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
//                       {t('nav.signUp')}
//                     </button>
//                   </div>
//                 </>
//               )}

//               <button onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden text-white focus:outline-none rounded p-2" aria-label="Toggle menu">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   {isMenuOpen
//                     ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                     : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
//                   }
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-black/80 backdrop-blur-md border-t border-white/10" dir={isAr ? 'rtl' : 'ltr'}>
//             <div className="px-4 pt-2 pb-4 space-y-2">
//               {navLinks.map((link, i) =>
//                 link.isDropdown ? (
//                   <div key={i} className="py-2">
//                     <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="block text-white font-bold mb-2">
//                       {link.name}
//                     </Link>
//                     <div className="grid grid-cols-1 gap-2 pl-4">
//                       {categories.map((cat, idx) => (
//                         <Link key={idx} to="/courses" onClick={() => setIsMenuOpen(false)} className="text-gray-300 text-sm py-1">
//                           • {isAr ? (cat.name_ar || cat.name) : (cat.name_en || cat.name)}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 ) : link.path.startsWith('#') ? (
//                   <a key={i} href={link.path}
//                     className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </a>
//                 ) : (
//                   <Link key={i} to={link.path}
//                     className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </Link>
//                 )
//               )}
//               <div className="flex gap-3 pt-4 border-t border-white/10">
//                 <button onClick={() => { navigate('/login');  setIsMenuOpen(false); }}
//                   className="flex-1 py-2 bg-white text-black rounded-md font-semibold text-sm">{t('nav.login')}</button>
//                 <button onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
//                   className="flex-1 py-2 bg-white text-black rounded-md font-semibold text-sm">{t('nav.signUp')}</button>
//                 <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
//                   className="py-2 px-4 bg-gray-800 text-white rounded-md font-semibold text-sm">{currentLang}</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import BASE_URL from '../api/config';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const { toggleLanguage, currentLang } = useLanguage();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch(`${BASE_URL}/categories` || `${BASE_URL}/courses/categories`, {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json?.data || Array.isArray(json)) {
          setCategories(json.data || json);
        }
      })
      .catch(() => {
        setCategories([
          {
            id: 1,
            name_ar: 'تسويق رقمي',
            name_en: 'Digital Marketing',
            description_ar: 'استراتيجيات التسويق الرقمي وبناء الحملات الإعلانية المؤثرة',
            description_en: 'Digital marketing strategies and building impactful ad campaigns',
            tags: ['Ads', 'Content', 'Analytics']
          },
          {
            id: 2,
            name_ar: 'جرافيك',
            name_en: 'Graphic Design',
            description_ar: 'أتقن التصميم الجرافيكي وبناء الهويات البصرية باحترافية عالية',
            description_en: 'Master graphic design and build visual identities professionally',
            tags: ['Figma', 'Photoshop', 'Illustrator', 'Branding']
          },
          {
            id: 3,
            name_ar: 'برمجة',
            name_en: 'Programming',
            description_ar: 'تعلم أساسيات وتقنيات البرمجة الحديثة من الصفر حتى الاحتراف',
            description_en: 'Learn modern programming fundamentals and tech from scratch',
            tags: ['Python', 'JavaScript', 'React', 'Node.js']
          }
        ]);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDropdownOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: t('nav.home'),      path: '/'            },
    { name: t('nav.courses'),    path: '/courses', isDropdown: true },
    { name: t('nav.about'),      path: '/AboutUs'     },
    { name: t('nav.contact'),    path: '/contact'     },
    { name: t('nav.instructor'),    path: '/instructor'    },
    { name: t('nav.courseVideos'),  path: '/course-videos' },
    { name: t('nav.certifications'),path: '/certifications'},
    { name: t('nav.subscribe'),     path: '/subscribe'     },
  ];

  const isAr = currentLang === 'AR' || currentLang === 'ar';

  return (
    <div className="w-full">
      <style>{`
        @keyframes authBorder {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .auth-btn-wrapper {
          background: linear-gradient(135deg,#ff0080,#ff8c00,#40e0d0,#0080ff,#8000ff,#00ff80);
          background-size: 300% 300%;
          animation: authBorder 3s ease infinite;
          padding: 2px;
          border-radius: 8px;
        }
      `}</style>

      <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="w-full px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20" dir={isAr ? 'rtl' : 'ltr'}>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="h-13 md:h-20 w-28 md:w-36 relative">
                <div className="h-full w-full flex items-center justify-start">
                  <img src="/loogo.png" alt="Logo" className="h-12 md:h-16 object-contain" />
                </div>
              </div>
            </div>

            {/* Nav links – Desktop */}
            <div className="hidden lg:flex items-center flex-1 justify-center mx-4 xl:mx-6">
              <div className={`flex items-center ${isAr ? 'gap-4 xl:gap-7' : 'gap-3 xl:gap-8'}`}>
                {navLinks.map((link, i) =>
                  link.isDropdown ? (
                    <div 
                      key={i} 
                      className="relative flex items-center"
                      onMouseEnter={() => setCoursesDropdownOpen(true)}
                      onMouseLeave={() => setCoursesDropdownOpen(false)}
                    >
                      <Link 
                        to="/courses"
                        onClick={() => setCoursesDropdownOpen(false)}
                        className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap py-4"
                      >
                        {link.name}
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setCoursesDropdownOpen(!coursesDropdownOpen);
                        }}
                        className="text-white hover:text-blue-400 p-1 focus:outline-none cursor-pointer flex items-center"
                      >
                        <svg className={`w-4 h-4 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>

                      {/* Mega Menu with higher transparency */}
                      {coursesDropdownOpen && (
                        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 z-50 text-white" dir={isAr ? 'rtl' : 'ltr'}>
                          <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10">
                            <h3 className="text-xl font-bold">{isAr ? 'الكورسات' : 'Courses'}</h3>
                            <Link 
                              to="/courses" 
                              onClick={() => setCoursesDropdownOpen(false)} 
                              className="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
                            >
                              {isAr ? 'عرض الكل ←' : 'View All →'}
                            </Link>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(categories.length > 0 ? categories : [
                              { id: 1, name_ar: 'تسويق رقمي', name_en: 'Digital Marketing', description_ar: 'استراتيجيات التسويق الرقمي وبناء الحملات الإعلانية المؤثرة', description_en: 'Digital marketing strategies and building campaigns', tags: ['Ads', 'Content', 'Analytics'] },
                              { id: 2, name_ar: 'جرافيك', name_en: 'Graphic Design', description_ar: 'أتقن التصميم الجرافيكي وبناء الهويات البصرية باحترافية عالية', description_en: 'Master graphic design and build visual identities', tags: ['Figma', 'Photoshop', 'Illustrator', 'Branding'] },
                              { id: 3, name_ar: 'برمجة', name_en: 'Programming', description_ar: 'تعلم أساسيات وتقنيات البرمجة الحديثة من الصفر حتى الاحتراف', description_en: 'Learn modern programming fundamentals from scratch', tags: ['Python', 'JavaScript', 'React', 'Node.js'] }
                            ]).map((cat) => (
                              <div 
                                key={cat.id || cat.name_ar}
                                onClick={() => { navigate('/courses'); setCoursesDropdownOpen(false); }}
                                className="bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-md"
                              >
                                <div>
                                  <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                    {isAr ? (cat.name_ar || cat.name) : (cat.name_en || cat.name)}
                                  </h4>
                                  <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                                    {isAr ? (cat.description_ar || cat.description) : (cat.description_en || cat.description)}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {(cat.tags || cat.skills || []).map((tag, idx) => (
                                    <span key={idx} className="text-xs bg-white/10 text-gray-200 px-3 py-1 rounded-full border border-white/10">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : link.path.startsWith('#') ? (
                    <a key={i} href={link.path}
                      className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
                      {link.name}
                    </a>
                  ) : (
                    <Link key={i} to={link.path}
                      className="text-white hover:text-blue-400 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap">
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center space-x-1 text-white cursor-pointer hover:text-blue-400 transition-colors"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm md:text-base font-medium">{currentLang}</span>
              </button>

              {isLoggedIn ? (
                <div className="relative hidden sm:block">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100" dir={isAr ? 'rtl' : 'ltr'}>
                      <div className="px-4 py-3">
                        <p className="text-sm font-bold text-black truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <div className="border-t border-gray-100">
                        <button onClick={handleLogout} className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                          </svg>
                          {t('nav.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="auth-btn-wrapper hidden sm:block">
                    <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
                      {t('nav.login')}
                    </button>
                  </div>
                  <div className="auth-btn-wrapper hidden sm:block">
                    <button onClick={() => navigate('/signup')} className="bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-900 transition-colors min-w-[7rem] text-center whitespace-nowrap">
                      {t('nav.signUp')}
                    </button>
                  </div>
                </>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white focus:outline-none rounded p-2" aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-md border-t border-white/10" dir={isAr ? 'rtl' : 'ltr'}>
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link, i) =>
                link.isDropdown ? (
                  <div key={i} className="py-2">
                    <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="block text-white font-bold mb-2">
                      {link.name}
                    </Link>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {categories.map((cat, idx) => (
                        <Link key={idx} to="/courses" onClick={() => setIsMenuOpen(false)} className="text-gray-300 text-sm py-1">
                          • {isAr ? (cat.name_ar || cat.name) : (cat.name_en || cat.name)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : link.path.startsWith('#') ? (
                  <a key={i} href={link.path}
                    className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>
                ) : (
                  <Link key={i} to={link.path}
                    className="block text-white hover:text-blue-400 transition-colors py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link>
                )
              )}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button onClick={() => { navigate('/login');  setIsMenuOpen(false); }}
                  className="flex-1 py-2 bg-white text-black rounded-md font-semibold text-sm">{t('nav.login')}</button>
                <button onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                  className="flex-1 py-2 bg-white text-black rounded-md font-semibold text-sm">{t('nav.signUp')}</button>
                <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                  className="py-2 px-4 bg-gray-800 text-white rounded-md font-semibold text-sm">{currentLang}</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;