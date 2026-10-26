// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { login } from '../api/auth';
// import { useToast } from '../components/Toast/ToastProvider';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation('auth');
//   const toast = useToast();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = await login(form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       toast.success(data.message);
//       setTimeout(() => navigate('/'), 1000);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="hidden lg:flex w-2/5 bg-black items-center justify-center" style={{ marginTop: '-96px', paddingTop: '96px' }}>
//         <img src="/Abdullah  el-Nasr.png" alt="ANS Logo" className="object-contain" style={{ width: 'clamp(200px, 30vw, 380px)' }} />
//       </div>

//       <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-9 py-12">
//         <div className="w-full" style={{ maxWidth: '600px' }}>
//           <h1 className="text-3xl font-bold text-black mb-8 text-center">{t('login.title')}</h1>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-5">
//               <label className="block text-black font-semibold mb-2">{t('login.email')}</label>
//               <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-3 focus-within:border-black transition-colors">
//                 <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                 </svg>
//                 <input name="email" type="email" placeholder={t('login.emailPlaceholder')} value={form.email} onChange={handleChange} required className="flex-1 outline-none text-black text-sm bg-transparent" />
//               </div>
//             </div>

//             <div className="mb-5">
//               <label className="block text-black font-semibold mb-2">{t('login.password')}</label>
//               <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-3 focus-within:border-black transition-colors">
//                 <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
//                 </svg>
//                 <input name="password" type={showPassword ? 'text' : 'password'} placeholder={t('login.passwordPlaceholder')} value={form.password} onChange={handleChange} required className="flex-1 outline-none text-black text-sm bg-transparent" />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-black">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showPassword
//                       ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
//                       : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
//                     }
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mb-6">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-black" />
//                 <span className="text-sm text-black font-medium">{t('login.rememberMe')}</span>
//               </label>
//               <button type="button" className="text-sm font-bold text-black underline hover:text-gray-600">{t('login.forgotPassword')}</button>
//             </div>

//             <button type="submit" disabled={loading} className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg mb-4 hover:bg-gray-900 transition-colors disabled:opacity-60">
//               {loading ? t('login.loggingIn') : t('login.loginBtn')}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-500 mb-4">
//             {t('login.noAccount')} <button onClick={() => navigate('/signup')} className="font-bold text-black hover:underline">{t('login.signUp')} .</button>
//           </p>

//           <button className="w-full py-4 bg-black text-white rounded-xl font-bold text-base mb-3 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
//             {t('login.continueApple')}
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//             </svg>
//           </button>

//           <button className="w-full py-4 bg-black text-white rounded-xl font-bold text-base mb-6 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
//             {t('login.continueGoogle')}
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//             </svg>
//           </button>

//           <p className="text-center text-xs text-gray-500">
//             {t('login.terms')}{' '}
//             <button className="text-blue-500 hover:underline">{t('login.termsLink')}</button>
//             {' '}{t('login.and')}{' '}
//             <button className="text-blue-500 hover:underline">{t('login.privacyLink')}</button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { login } from '../api/auth';
// import { useToast } from '../components/Toast/ToastProvider';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation('auth');
//   const toast = useToast();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = await login(form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       toast.success(data.message);
//       setTimeout(() => navigate('/'), 1000);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex bg-white overflow-hidden pt-16 md:pt-20">
      
//       {/* El-Goz' el-shemal: Aswad kamel m3a el-logo */}
//       <div className="hidden lg:flex w-2/5 bg-black items-center justify-center p-8 shrink-0 h-full">
//         <img 
//           src="/Abdullah  el-Nasr.png" 
//           alt="ANS Logo" 
//           className="object-contain max-h-[60vh]" 
//           style={{ width: 'clamp(200px, 28vw, 360px)' }} 
//         />
//       </div>

//       {/* El-Goz' el-yemeen: El-Form */}
//       <div className="w-full lg:w-3/5 bg-white px-6 sm:px-12 h-full flex flex-col justify-center overflow-y-auto py-6">
//         <div className="w-full max-w-[480px] mx-auto my-auto">
//           <h1 className="text-2xl sm:text-3xl font-bold text-black mb-5 text-center">
//             {t('login.title')}
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-3.5">
//             <div>
//               <label className="block text-black font-semibold mb-1 text-xs sm:text-sm">
//                 {t('login.email')}
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-xl px-3.5 py-2.5 gap-3 focus-within:border-black transition-colors bg-white">
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                 </svg>
//                 <input name="email" type="email" placeholder={t('login.emailPlaceholder')} value={form.email} onChange={handleChange} required className="flex-1 outline-none text-black text-xs sm:text-sm bg-transparent" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-black font-semibold mb-1 text-xs sm:text-sm">
//                 {t('login.password')}
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-xl px-3.5 py-2.5 gap-3 focus-within:border-black transition-colors bg-white">
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
//                 </svg>
//                 <input name="password" type={showPassword ? 'text' : 'password'} placeholder={t('login.passwordPlaceholder')} value={form.password} onChange={handleChange} required className="flex-1 outline-none text-black text-xs sm:text-sm bg-transparent" />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-black">
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showPassword
//                       ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
//                       : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
//                     }
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between my-3">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-black" />
//                 <span className="text-xs sm:text-sm text-black font-medium">{t('login.rememberMe')}</span>
//               </label>
//               <button type="button" className="text-xs sm:text-sm font-bold text-black underline hover:text-gray-600">{t('login.forgotPassword')}</button>
//             </div>

//             <button type="submit" disabled={loading} className="w-full py-2.5 sm:py-3 bg-black text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-900 transition-colors disabled:opacity-60">
//               {loading ? t('login.loggingIn') : t('login.loginBtn')}
//             </button>
//           </form>

//           <p className="text-center text-xs sm:text-sm text-gray-500 my-3">
//             {t('login.noAccount')} <button onClick={() => navigate('/signup')} className="font-bold text-black hover:underline">{t('login.signUp')} .</button>
//           </p>

//           <div className="space-y-2">
//             <button className="w-full py-2 bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
//               {t('login.continueApple')}
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//               </svg>
//             </button>

//             <button className="w-full py-2 bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
//               {t('login.continueGoogle')}
//               <svg className="w-4 h-4" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//             </button>
//           </div>

//           <p className="text-center text-[11px] text-gray-500 mt-4">
//             {t('login.terms')}{' '}
//             <button className="text-blue-500 hover:underline">{t('login.termsLink')}</button>
//             {' '}{t('login.and')}{' '}
//             <button className="text-blue-500 hover:underline">{t('login.privacyLink')}</button>
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { login } from '../api/auth';
// import { useToast } from '../components/Toast/ToastProvider';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation('auth');
//   const toast = useToast();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = await login(form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       toast.success(data.message);
//       setTimeout(() => navigate('/'), 1000);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex bg-white overflow-hidden pt-16 md:pt-20">
      
//       {/* الجانب الأيسر (اللوجو والخلفية السوداء) */}
//       <div className="hidden lg:flex w-2/5 bg-black items-center justify-center p-8 shrink-0 h-full">
//         <img 
//           src="/Abdullah  el-Nasr.png" 
//           alt="ANS Logo" 
//           className="object-contain max-h-[60vh]" 
//           style={{ width: 'clamp(200px, 28vw, 360px)' }} 
//         />
//       </div>

//       {/* الجانب الأيمن (الفورم ممركّزة تماماً في المنتصف) */}
//       <div className="w-full lg:w-3/5 bg-white px-6 sm:px-12 h-full flex flex-col justify-center overflow-y-auto py-6">
//         <div className="w-full max-w-[480px] mx-auto my-auto">
//           <h1 className="text-2xl sm:text-3xl font-bold text-black mb-5 text-center">
//             {t('login.title')}
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-3.5">
//             <div>
//               <label className="block text-black font-semibold mb-1 text-xs sm:text-sm">
//                 {t('login.email')}
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-xl px-3.5 py-2.5 gap-3 focus-within:border-black transition-colors bg-white">
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                 </svg>
//                 <input name="email" type="email" placeholder={t('login.emailPlaceholder')} value={form.email} onChange={handleChange} required className="flex-1 outline-none text-black text-xs sm:text-sm bg-transparent" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-black font-semibold mb-1 text-xs sm:text-sm">
//                 {t('login.password')}
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-xl px-3.5 py-2.5 gap-3 focus-within:border-black transition-colors bg-white">
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
//                 </svg>
//                 <input name="password" type={showPassword ? 'text' : 'password'} placeholder={t('login.passwordPlaceholder')} value={form.password} onChange={handleChange} required className="flex-1 outline-none text-black text-xs sm:text-sm bg-transparent" />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-black">
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showPassword
//                       ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
//                       : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
//                     }
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between my-3">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-black" />
//                 <span className="text-xs sm:text-sm text-black font-medium">{t('login.rememberMe')}</span>
//               </label>
//               <button type="button" className="text-xs sm:text-sm font-bold text-black underline hover:text-gray-600">{t('login.forgotPassword')}</button>
//             </div>

//             <button type="submit" disabled={loading} className="w-full py-2.5 sm:py-3 bg-black text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-900 transition-colors disabled:opacity-60">
//               {loading ? t('login.loggingIn') : t('login.loginBtn')}
//             </button>
//           </form>

//           <p className="text-center text-xs sm:text-sm text-gray-500 my-3">
//             {t('login.noAccount')} <button onClick={() => navigate('/signup')} className="font-bold text-black hover:underline">{t('login.signUp')} .</button>
//           </p>

//           <div className="space-y-2">
//             <button className="w-full py-2 bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
//               {t('login.continueApple')}
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//               </svg>
//             </button>

//             <button className="w-full py-2 bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
//               {t('login.continueGoogle')}
//               <svg className="w-4 h-4" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//             </button>
//           </div>

//           <p className="text-center text-[11px] text-gray-500 mt-4">
//             {t('login.terms')}{' '}
//             <button className="text-blue-500 hover:underline">{t('login.termsLink')}</button>
//             {' '}{t('login.and')}{' '}
//             <button className="text-blue-500 hover:underline">{t('login.privacyLink')}</button>
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth';
import { useToast } from '../components/Toast/ToastProvider';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(data.message);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex bg-white overflow-hidden pt-16 md:pt-20">
      
      {/* El-Goz' el-shemal */}
      <div className="hidden lg:flex w-2/5 bg-black items-center justify-center p-8 shrink-0 h-full">
        <img 
          src="/loogo.png" 
          alt="loogo" 
          className="object-contain max-h-[60vh]" 
          style={{ width: 'clamp(210px, 28vw, 360px)' }} 
        />
      </div>

      {/* El-Goz' el-yemeen (Size Mutawassit) */}
      <div className="w-full lg:w-3/5 bg-white px-6 sm:px-12 h-full flex flex-col justify-center overflow-y-auto py-6">
        <div className="w-full max-w-[480px] mx-auto my-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black mb-6 text-center">
            {t('login.title')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-black font-semibold mb-1.5 text-xs sm:text-sm">
                {t('login.email')}
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-3 focus-within:border-black transition-colors bg-white">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input name="email" type="email" placeholder={t('login.emailPlaceholder')} value={form.email} onChange={handleChange} required className="flex-1 outline-none text-black text-xs sm:text-sm bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-black font-semibold mb-1.5 text-xs sm:text-sm">
                {t('login.password')}
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-3 focus-within:border-black transition-colors bg-white">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder={t('login.passwordPlaceholder')} value={form.password} onChange={handleChange} required className="flex-1 outline-none text-black text-xs sm:text-sm bg-transparent" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-black">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    }
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between my-3.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-black" />
                <span className="text-xs sm:text-sm text-black font-semibold">{t('login.rememberMe')}</span>
              </label>
              <button type="button" className="text-xs sm:text-sm font-bold text-black underline hover:text-gray-600">{t('login.forgotPassword')}</button>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm sm:text-base hover:bg-gray-900 transition-colors disabled:opacity-60">
              {loading ? t('login.loggingIn') : t('login.loginBtn')}
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm text-gray-500 my-4">
            {t('login.noAccount')} <button onClick={() => navigate('/signup')} className="font-bold text-black hover:underline">{t('login.signUp')} .</button>
          </p>

          <div className="space-y-2.5">
            <button className="w-full py-2.5 bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
              {t('login.continueApple')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>

            <button className="w-full py-2.5 bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
              {t('login.continueGoogle')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>

          <p className="text-center text-[11px] text-gray-500 mt-4">
            {t('login.terms')}{' '}
            <button className="text-blue-500 hover:underline">{t('login.termsLink')}</button>
            {' '}{t('login.and')}{' '}
            <button className="text-blue-500 hover:underline">{t('login.privacyLink')}</button>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;