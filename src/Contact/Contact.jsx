// import { useEffect, useRef, useState } from 'react';
// import BASE_URL from '../api/config';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

// const parseStatNumber = (str) => {
//   const clean = str.replace(/,/g, '');
//   const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
//   const suffix = str.includes('+') ? (str.startsWith('+') ? '+' : '+') : '';
//   return { num, suffix };
// };

// const CountUp = ({ value, style }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const { num, suffix } = parseStatNumber(value);
//   const animated = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCount(0);
//     animated.current = false;
//     const obs = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !animated.current) {
//         animated.current = true;
//         const duration = 10000;
//         const startTime = performance.now();
//         const frame = (now) => {
//           const elapsed = now - startTime;
//           const progress = Math.min(elapsed / duration, 1);
//           setCount(Math.floor(progress * num));
//           if (progress < 1) requestAnimationFrame(frame);
//         };
//         requestAnimationFrame(frame);
//       } else if (!entry.isIntersecting) {
//         setCount(0);
//         animated.current = false;
//       }
//     }, { threshold: 0.3 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [num]);

//   const display = num >= 1000 ? count.toLocaleString() : count;

//   return <span ref={ref} style={style}>{display}{suffix}</span>;
// };

// const consultationItemsEn = [
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['Analysis of', 'your current', 'situation'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['A comprehensive answer to all your', 'questions about', 'the job market'] },
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['Develop a clear', 'business plan', 'to generate', 'profits.'] },
// ];

// const consultationItemsAr = [
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['قم بوضع خطة عمل', 'واضحة لتحقيق', 'الأرباح.'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['إجابة شامله لجميع أسئلتك حول سوق', 'العمل', ''] },
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['تحليل', 'وضعك الحالي', 'من مستواك'] },
// ];

// const ConsultationCarousel = ({ items }) => {
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
//     <div ref={scrollRef} className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
//       {items.map((item, i) => (
//         <div key={i} className="flex-shrink-0 w-[75vw] max-w-[260px] flex flex-col items-center gap-3 snap-center">
//           <div style={{
//             background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//             borderRadius: '20px', padding: '3px',
//             width: '160px', height: '160px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <div style={{
//               background: 'white', borderRadius: '18px',
//               width: '100%', height: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <img src={item.gif} alt={item.lines[0]} style={{ width: '130px', height: '130px', objectFit: 'contain' }} />
//             </div>
//           </div>
//           <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '16px', color: '#000', textAlign: 'center', lineHeight: '1.4' }}>
//             {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const ContactCardsCarousel = ({ items }) => {
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
//     <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 mb-6">
//       {items.map((item, i) => (
//         <div key={i} className="flex-shrink-0 w-[80vw] max-w-[280px] snap-center" style={{ border: '2px solid #D8A10F', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
//           <div style={{ background: '#111', padding: '20px 16px', borderRadius: '16px 16px 24px 24px', boxShadow: '0 8px 16px 2px rgba(0,0,0,0.15)', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
//             <div className="flex items-center gap-2 mb-2">
//               <span style={{ color: '#fff', fontSize: '18px' }}>{item.icon}</span>
//               <span style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: '16px', backgroundImage: 'linear-gradient(to right, #D8A10F, #EEC62D, #D3990C)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{item.title}</span>
//             </div>
//             <p style={{ fontFamily: 'Lexend', fontSize: '12px', color: '#fff', wordBreak: 'break-all' }}>{item.value}</p>
//           </div>
//           <div style={{ background: '#fff', padding: '28px 16px 14px 16px' }}>
//             <p style={{ fontFamily: 'Lexend', fontSize: '14px', fontWeight: 700, color: '#111', whiteSpace: 'pre-line' }}>{item.desc}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Contact() {
//   const { t } = useTranslation('contact');
//   const { isAr } = useLanguage();
//   const [faqs, setFaqs] = useState([]);
//   const [openQuestion, setOpenQuestion] = useState(null);
//   const [contactInfo, setContactInfo] = useState(null);
//   const [contactCards, setContactCards] = useState([]);
//   const consultationItems = isAr ? consultationItemsAr : consultationItemsEn;

//   useEffect(() => {
//     fetch(`${BASE_URL}/contact-info`)
//       .then(r => r.json())
//       .then(json => {
//         if (json.data) {
//           setContactInfo(json.data);
//           const cards = [
//             { 
//               icon: '✉', 
//               title: isAr ? 'البريد الإلكتروني' : 'Email', 
//               value: json.data.email, 
//               desc: t('social.emailDesc') 
//             },
//             { 
//               icon: '✈', 
//               title: isAr ? 'تيليجرام' : 'Telegram', 
//               value: json.data.telegram_username, 
//               desc: t('social.telegramDesc') 
//             },
//             { 
//               icon: 'B', 
//               title: isAr ? 'واتساب للأعمال' : 'WhatsApp Business', 
//               value: json.data.whatsapp_url, 
//               desc: t('social.whatsappDesc') 
//             },
//           ];
//           setContactCards(cards);
//         }
//       })
//       .catch(() => {});
//   }, [isAr, t]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/faqs?placement=contact`)
//       .then(r => r.json())
//       .then(json => {
//         const items = (json.data || []).sort((a, b) => a.display_order - b.display_order);
//         const mapped = items.map(item => ({
//           id: item.id,
//           question: isAr ? (item.question_ar || item.question) : (item.question_en || item.question),
//           answer: isAr ? (item.answer_ar || item.answer) : (item.answer_en || item.answer),
//         }));
//         setFaqs(mapped);
//         if (mapped.length > 0) setOpenQuestion(mapped[0].id);
//       })
//       .catch(() => {});
//   }, [isAr]);

//   const toggleQuestion = (id) => {
//     setOpenQuestion(openQuestion === id ? null : id);
//   };

//   return (
//     <div style={{ backgroundColor: '#000000C9' }}>
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/cover-websitebar2 2.png"
//             alt="Courses Cover"
//             style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
//           />
//           <div className="absolute inset-0 flex items-center px-10 md:px-20">
//             <div className="flex flex-col gap-2">
//               <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(48px, 9vw, 128px)', lineHeight: 1 }}>
//                 {isAr ? (
//                   <img src="/جاهزين في الوطن العربي 1.png" alt="جاهزين في الوطن العربي" style={{ height: 'clamp(100px, 14vw, 220px)', width: 'auto' }} />
//                 ) : (
//                   <span style={{ 
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                     WebkitTextFillColor: 'transparent',
//                   }}>{t('hero.readyTo')}</span>
//                 )}
//               </div>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 70px)', color: '#000000', lineHeight: 1 }}>{t('hero.connect')}</p>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(14px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.letsTalk')}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="w-full py-8 md:py-12 bg-white">
//         <div className="w-full max-w-[1031px] mx-auto px-6 sm:px-8 lg:px-12">
//           <style>{`
//             @keyframes secureSpotBorder {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .secure-spot-border {
//               background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: secureSpotBorder 3s ease infinite;
//               padding: 1px;
//               border-radius: 9999px;
//             }
//             .feedback-border {
//               background: linear-gradient(90deg, #FF0AD2 0%, #FF0AD2 50%, #0AFFFF 75%, #0AFF26 70%, #0AD20A 70%, #FF0004 100%);
//               padding: 2px;
//               border-radius: 16px;
//             }
//             .form-input {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               transition: border-color 0.2s;
//             }
//             .form-input:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//             .form-textarea {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               resize: none;
//               height: 180px;
//               transition: border-color 0.2s;
//             }
//             .form-textarea:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//           `}</style>
//           <div className="secure-spot-border mb-8">
//             <div className="rounded-full bg-white" style={{ padding: '6px' }}>
//               <div className="rounded-full" style={{
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}>
//                 <div className="rounded-full px-4 sm:px-8 py-2 flex items-center justify-center">
//                   <p className="text-center" style={{
//                     fontFamily: 'Lexend',
//                     fontWeight: 600,
//                     fontSize: 'clamp(11px, 3vw, 45px)',
//                     color: 'white',
//                   }}>{t('form.title')}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="feedback-border">
//             <div className="bg-white rounded-[14px] p-8">
//               <form className="space-y-5">
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.name')} <span className="text-yellow-500">*</span></label>
//                   <input type="text" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.phone')} <span className="text-yellow-500">*</span></label>
//                   <input type="tel" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.email')} <span className="text-yellow-500">*</span></label>
//                   <input type="email" placeholder={t('form.emailPlaceholder')} className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2" style={{ fontFamily: 'Lexend' }}>{t('form.faqLabel')} <span className="text-yellow-500">*</span></label>
//                   <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.levelQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.beginner'), t('form.intermediate'), t('form.professional')].map(level => (
//                           <label key={level} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="level" value={level} className="accent-yellow-500" />
//                             {level}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.goalQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.goal1'), t('form.goal2'), t('form.goal3')].map(goal => (
//                           <label key={goal} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="goal" value={goal} className="accent-yellow-500" />
//                             {goal}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.message')} <span className="text-yellow-500">*</span></label>
//                   <textarea className="form-textarea"></textarea>
//                 </div>
//                 <button type="submit" className="border border-black px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Lexend' }}>
//                   {t('form.sendBtn')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section className="w-full py-16 bg-white">
//         <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <h2 className="font-bold mb-12" style={{
//             fontFamily: 'Lexend',
//             fontSize: 'clamp(20px, 5vw, 64px)',
//             lineHeight: '1.2',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bottom',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             {t('consultation.title').split('\n').map((line, i, arr) => (
//               <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//             ))}
//           </h2>
//           <ConsultationCarousel items={consultationItems} />
//           <div className="hidden md:grid grid-cols-3 gap-6 justify-items-center">
//             {consultationItems.map((item, i) => (
//               <div key={i} className="flex flex-col items-center gap-4">
//                 <div style={{
//                   background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//                   borderRadius: '20px', padding: '3px',
//                   width: '221px', height: '221px',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <div style={{
//                     background: 'white', borderRadius: '18px',
//                     width: '100%', height: '100%',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}>
//                     <img src={item.gif} alt={item.lines[0]} style={{ width: '190px', height: '190px', objectFit: 'contain' }} />
//                   </div>
//                 </div>
//                 <p style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '32px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
//                   {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
     







//       {/* FAQ Section */}
//       <section className="w-full relative bg-white pt-8 lg:pt-32 h-700px">
//         <div className="relative overflow-hidden" dir="rtl" style={{ minHeight: '1400px' }}>
//           {/* q1.png as full background - less zoom */}
//           <img
//             src="/q1.png"
//             alt="FAQ Background"
//             className="absolute inset-0 w-full h-full"
//             style={{ zIndex: 0, objectFit: 'cover', objectPosition: 'center', transform: 'scale(1)', transformOrigin: 'center' }}
//           />
//           {/* dark overlay */}
//           <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />

//           <div className="relative z-10 w-full max-w-2xl mr-0 ml-auto px-6 lg:px-12 py-16 lg:py-24" style={{ marginRight: 0 }}>
//             {/* Title - gold, top right */}
//             <h2 className="font-bold mb-10 text-right" style={{
//               fontFamily: 'Lexend',
//               fontSize: 'clamp(28px, 5vw, 70px)',
//               lineHeight: '1.2',
//               backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'top',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               color: 'transparent',
//               WebkitTextFillColor: 'transparent',
//             }}>{t('faq.title')}</h2>

//             <div className="w-full space-y-0 text-right">
//               {faqs.length === 0 ? (
//                 <p className="text-gray-400">No questions available.</p>
//               ) : faqs.map((faq, idx) => (
//                 <div key={faq.id}>
//                   <div className="py-8 px-4">
//                     <div
//                       className="flex items-center justify-between cursor-pointer mb-4"
//                       onClick={() => toggleQuestion(faq.id)}
//                     >
//                       <span className="text-2xl text-yellow-500 ml-4 flex-shrink-0">
//                         {openQuestion === faq.id ? '−' : '+'}
//                       </span>
//                       <h4 className="text-lg font-medium text-white leading-relaxed flex-1 text-right">{faq.question}</h4>
//                     </div>
//                     {openQuestion === faq.id && (
//                       <div className="mb-2 text-right">
//                         <div className="text-green-400 font-semibold mb-3 text-lg">{t('faq.answer')}</div>
//                         <p className="text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
//                       </div>
//                     )}
//                   </div>
//                   {/* 2 divider lines same size */}
//                   <div className="w-full h-px bg-orange-400 opacity-80" />
//                   <div className="w-full h-px bg-orange-300 opacity-40 mt-1" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//               {faqs.length === 0 ? (
//                 <p className="text-gray-400">No questions available.</p>
//               ) : faqs.map((faq, idx) => (
//                 <div key={faq.id}>
//                   <div className="py-8 px-4">
//                     <div
//                       className="flex items-center justify-between cursor-pointer mb-4"
//                       onClick={() => toggleQuestion(faq.id)}
//                     >
//                       <span className="text-2xl text-yellow-500 ml-4 flex-shrink-0">
//                         {openQuestion === faq.id ? '−' : '+'}
//                       </span>
//                       <h4 className="text-lg font-medium text-white leading-relaxed flex-1 text-right">{faq.question}</h4>
//                     </div>
//                     {openQuestion === faq.id && (
//                       <div className="mb-2 text-right">
//                         <div className="text-green-400 font-semibold mb-3 text-lg">{t('faq.answer')}</div>
//                         <p className="text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="w-full h-px bg-orange-400 opacity-80" />
//                   <div className="w-full h-px bg-orange-300 opacity-40 mt-1" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Contact Section */}
//       <section className="w-full py-12 bg-white">
//         {/* El-sora Mask group.png fe el-nos - akbar, awdah, we marfo'a le-fok */}
// <div className="w-full -mt-6 lg:-mt-10 mb-6 flex justify-center items-center px-2 z-20 relative">
//   <img 
//     src="/Mask group.png" 
//     alt="Banner Decoration" 
//     className="w-full max-w-6xl h-auto min-h-[200px] md:min-h-[300px] max-h-[500px] object-contain mx-auto drop-shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden"
//   />
// </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;



// import { useEffect, useRef, useState } from 'react';
// import BASE_URL from '../api/config';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

// const parseStatNumber = (str) => {
//   const clean = str.replace(/,/g, '');
//   const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
//   const suffix = str.includes('+') ? (str.startsWith('+') ? '+' : '+') : '';
//   return { num, suffix };
// };

// const CountUp = ({ value, style }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const { num, suffix } = parseStatNumber(value);
//   const animated = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCount(0);
//     animated.current = false;
//     const obs = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !animated.current) {
//         animated.current = true;
//         const duration = 10000;
//         const startTime = performance.now();
//         const frame = (now) => {
//           const elapsed = now - startTime;
//           const progress = Math.min(elapsed / duration, 1);
//           setCount(Math.floor(progress * num));
//           if (progress < 1) requestAnimationFrame(frame);
//         };
//         requestAnimationFrame(frame);
//       } else if (!entry.isIntersecting) {
//         setCount(0);
//         animated.current = false;
//       }
//     }, { threshold: 0.3 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [num]);

//   const display = num >= 1000 ? count.toLocaleString() : count;

//   return <span ref={ref} style={style}>{display}{suffix}</span>;
// };

// const consultationItemsEn = [
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['Analysis of', 'your current', 'situation'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['A comprehensive answer to all your', 'questions about', 'the job market'] },
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['Develop a clear', 'business plan', 'to generate', 'profits.'] },
// ];

// const consultationItemsAr = [
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['قم بوضع خطة عمل', 'واضحة لتحقيق', 'الأرباح.'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['إجابة شامله لجميع أسئلتك حول سوق', 'العمل', ''] },
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['تحليل', 'وضعك الحالي', 'من مستواك'] },
// ];

// const ConsultationCarousel = ({ items }) => {
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
//     <div ref={scrollRef} className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
//       {items.map((item, i) => (
//         <div key={i} className="flex-shrink-0 w-[75vw] max-w-[260px] flex flex-col items-center gap-3 snap-center">
//           <div style={{
//             background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//             borderRadius: '20px', padding: '3px',
//             width: '160px', height: '160px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <div style={{
//               background: 'white', borderRadius: '18px',
//               width: '100%', height: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <img src={item.gif} alt={item.lines[0]} style={{ width: '130px', height: '130px', objectFit: 'contain' }} />
//             </div>
//           </div>
//           <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '16px', color: '#000', textAlign: 'center', lineHeight: '1.4' }}>
//             {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Contact() {
//   const { t } = useTranslation('contact');
//   const { isAr } = useLanguage();
//   const [faqs, setFaqs] = useState([]);
//   const [openQuestion, setOpenQuestion] = useState(null);
//   const [contactInfo, setContactInfo] = useState(null);
//   const [contactCards, setContactCards] = useState([]);
//   const consultationItems = isAr ? consultationItemsAr : consultationItemsEn;

//   useEffect(() => {
//     fetch(`${BASE_URL}/contact-info`)
//       .then(r => r.json())
//       .then(json => {
//         if (json.data) {
//           setContactInfo(json.data);
//           const cards = [
//             { 
//               icon: '✉', 
//               title: isAr ? 'البريد الإلكتروني' : 'Email', 
//               value: json.data.email, 
//               desc: t('social.emailDesc') 
//             },
//             { 
//               icon: '✈', 
//               title: isAr ? 'تيليجرام' : 'Telegram', 
//               value: json.data.telegram_username, 
//               desc: t('social.telegramDesc') 
//             },
//             { 
//               icon: 'B', 
//               title: isAr ? 'واتساب للأعمال' : 'WhatsApp Business', 
//               value: json.data.whatsapp_url, 
//               desc: t('social.whatsappDesc') 
//             },
//           ];
//           setContactCards(cards);
//         }
//       })
//       .catch(() => {});
//   }, [isAr, t]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/faqs?placement=contact`)
//       .then(r => r.json())
//       .then(json => {
//         const items = (json.data || []).sort((a, b) => a.display_order - b.display_order);
//         const mapped = items.map(item => ({
//           id: item.id,
//           question: isAr ? (item.question_ar || item.question) : (item.question_en || item.question),
//           answer: isAr ? (item.answer_ar || item.answer) : (item.answer_en || item.answer),
//         }));
//         setFaqs(mapped);
//         if (mapped.length > 0) setOpenQuestion(mapped[0].id);
//       })
//       .catch(() => {});
//   }, [isAr]);

//   const toggleQuestion = (id) => {
//     setOpenQuestion(openQuestion === id ? null : id);
//   };

//   return (
//     <div style={{ backgroundColor: '#000000C9' }}>
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/cover-websitebar2 2.png"
//             alt="Courses Cover"
//             style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
//           />
//           <div className="absolute inset-0 flex items-center px-10 md:px-20">
//             <div className="flex flex-col gap-2">
//               <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(48px, 9vw, 128px)', lineHeight: 1 }}>
//                 {isAr ? (
//                   <img src="/جاهزين في الوطن العربي 1.png" alt="جاهزين في الوطن العربي" style={{ height: 'clamp(100px, 14vw, 220px)', width: 'auto' }} />
//                 ) : (
//                   <span style={{ 
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                     WebkitTextFillColor: 'transparent',
//                   }}>{t('hero.readyTo')}</span>
//                 )}
//               </div>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 70px)', color: '#000000', lineHeight: 1 }}>{t('hero.connect')}</p>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(14px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.letsTalk')}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="w-full py-8 md:py-12 bg-white">
//         <div className="w-full max-w-[1031px] mx-auto px-6 sm:px-8 lg:px-12">
//           <style>{`
//             @keyframes secureSpotBorder {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .secure-spot-border {
//               background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: secureSpotBorder 3s ease infinite;
//               padding: 1px;
//               border-radius: 9999px;
//             }
//             .feedback-border {
//               background: linear-gradient(90deg, #FF0AD2 0%, #FF0AD2 50%, #0AFFFF 75%, #0AFF26 70%, #0AD20A 70%, #FF0004 100%);
//               padding: 2px;
//               border-radius: 16px;
//             }
//             .form-input {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               transition: border-color 0.2s;
//             }
//             .form-input:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//             .form-textarea {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               resize: none;
//               height: 180px;
//               transition: border-color 0.2s;
//             }
//             .form-textarea:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//           `}</style>
//           <div className="secure-spot-border mb-8">
//             <div className="rounded-full bg-white" style={{ padding: '6px' }}>
//               <div className="rounded-full" style={{
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}>
//                 <div className="rounded-full px-4 sm:px-8 py-2 flex items-center justify-center">
//                   <p className="text-center" style={{
//                     fontFamily: 'Lexend',
//                     fontWeight: 600,
//                     fontSize: 'clamp(11px, 3vw, 45px)',
//                     color: 'white',
//                   }}>{t('form.title')}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="feedback-border">
//             <div className="bg-white rounded-[14px] p-8">
//               <form className="space-y-5">
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.name')} <span className="text-yellow-500">*</span></label>
//                   <input type="text" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.phone')} <span className="text-yellow-500">*</span></label>
//                   <input type="tel" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.email')} <span className="text-yellow-500">*</span></label>
//                   <input type="email" placeholder={t('form.emailPlaceholder')} className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2" style={{ fontFamily: 'Lexend' }}>{t('form.faqLabel')} <span className="text-yellow-500">*</span></label>
//                   <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.levelQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.beginner'), t('form.intermediate'), t('form.professional')].map(level => (
//                           <label key={level} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="level" value={level} className="accent-yellow-500" />
//                             {level}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.goalQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.goal1'), t('form.goal2'), t('form.goal3')].map(goal => (
//                           <label key={goal} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="goal" value={goal} className="accent-yellow-500" />
//                             {goal}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.message')} <span className="text-yellow-500">*</span></label>
//                   <textarea className="form-textarea"></textarea>
//                 </div>
//                 <button type="submit" className="border border-black px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Lexend' }}>
//                   {t('form.sendBtn')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section className="w-full py-16 bg-white">
//         <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <h2 className="font-bold mb-12" style={{
//             fontFamily: 'Lexend',
//             fontSize: 'clamp(20px, 5vw, 64px)',
//             lineHeight: '1.2',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bottom',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             {t('consultation.title').split('\n').map((line, i, arr) => (
//               <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//             ))}
//           </h2>
//           <ConsultationCarousel items={consultationItems} />
//           <div className="hidden md:grid grid-cols-3 gap-6 justify-items-center">
//             {consultationItems.map((item, i) => (
//               <div key={i} className="flex flex-col items-center gap-4">
//                 <div style={{
//                   background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//                   borderRadius: '20px', padding: '3px',
//                   width: '221px', height: '221px',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <div style={{
//                     background: 'white', borderRadius: '18px',
//                     width: '100%', height: '100%',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}>
//                     <img src={item.gif} alt={item.lines[0]} style={{ width: '190px', height: '190px', objectFit: 'contain' }} />
//                   </div>
//                 </div>
//                 <p style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '32px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
//                   {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
      
// <section className="w-full relative overflow-hidden">
//       {/* Subtract Background Image - Outside all containers */}
//       <img
//         src="/Subtract.png"
//         alt="Background"
//         className={`absolute -top-[100px] w-full sm:w-[280%] h-[180vh] object-contain opacity-50 z-40 pointer-events-none ${isAr ? 'left-0 sm:-left-[300px]' : 'right-0 sm:-right-[500px]'}`}
//         style={{ overflow: 'visible', transform: isAr ? 'scaleX(-1)' : 'none' }}
//       />
      
//       {/* Black Background Section */}
//       <div className="bg-black py-8 relative z-10 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
//           {/* Left Side - FAQ List */}
//           <div className="w-full lg:w-1/2 space-y-8 mt-16">
//             <h3
//               className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${isAr ? 'text-right' : 'text-left'}`}
//               style={{
//                 backgroundImage: 'linear-gradient(90deg, #BD8800, #FFD100, #9C6B00)',
//                 WebkitBackgroundClip: 'text',
//                 backgroundClip: 'text',
//                 color: 'transparent'
//               }}
//             >
//               {t('faq.title')}
//             </h3>
            
//             {loading ? (
//               <p className="text-gray-400">Loading...</p>
//             ) : null}
//             {faqs.map((faq) => (
//               <div key={faq.id} className="pb-6">
//                 {/* Clickable Question */}
//                 <div
//                   className="flex items-center justify-between cursor-pointer mb-4"
//                   onClick={() => toggleQuestion(faq.id)}
//                 >
//                   <h4 className="text-lg font-medium text-white leading-relaxed flex-1">
//                     {faq.question}
//                   </h4>
//                   <span className="text-2xl text-yellow-500 ml-4 flex-shrink-0">
//                     {openQuestion === faq.id ? '−' : '+'}
//                   </span>
//                 </div>
                
//                 {/* Two orange lines under each question */}
//                 <div className="w-full mb-4">
//                   <div className="w-full h-1 bg-orange-400"></div>
//                   <div className="w-full h-0.5 bg-orange-300 opacity-60 mt-1"></div>
//                 </div>
                
//                 {/* Answer - Toggle visibility */}
//                 {openQuestion === faq.id && (
//                   <div className="mb-4">
//                     <div className="text-green-400 font-semibold mb-3 text-lg">{t('faq.answer')}</div>
//                     <p className="text-gray-300 leading-relaxed text-sm">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Side - Image */}
//           <div className="hidden lg:flex w-full lg:w-1/2 relative self-start">
//             <div className="relative p-4 sm:p-8 overflow-visible">
//               {/* Background Icons */}
//               <div className="absolute top-4 right-4 opacity-20">
//                 <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                 </svg>
//               </div>

//               {/* Images */}
//               <div className="relative z-10 flex flex-col justify-center items-center w-full overflow-visible lg:ml-24">
//                 {/* First image */}
//                 <img
//                   src="/Mask group (7).png"
//                   alt="Abdullah Al-Nasr"
//                   className="w-full max-w-xs sm:max-w-sm lg:max-w-4xl h-auto object-contain relative z-80"
//                 />
                
//                 {/* Second image */}
//                 <img
//                   src="/2 post 1.png"
//                   alt="Abdullah Al-Nasr"
//                   className="w-full h-auto object-contain -mt-16 sm:-mt-40 lg:-mt-80 lg:min-h-[800px] lg:scale-125 relative z-90"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>





//       {/* Stats Section */}
//       <section className="w-full py-20 bg-white">
//         <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">
//           <div className="flex flex-col items-center gap-8">
//             <div className="flex flex-wrap justify-center gap-12 lg:gap-20" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
//               {(isAr ? [
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//               ] : [
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//               ]).map((stat, i) => (
//                 <div key={i} className="flex flex-col items-start gap-1">
//                   <div className="flex items-center gap-3">
//                     <CountUp value={stat.number} style={{
//                       fontFamily: 'Lexend', fontWeight: 300,
//                       fontSize: 'clamp(48px, 6vw, 96px)',
//                       backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                       backgroundSize: 'cover', backgroundPosition: 'bottom',
//                       WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                       color: 'transparent', WebkitTextFillColor: 'transparent',
//                       lineHeight: 1,
//                     }} />
//                     <span style={{
//                       fontFamily: 'Lexend', fontWeight: 400,
//                       fontSize: 'clamp(14px, 1.5vw, 20px)',
//                       color: '#333', whiteSpace: 'pre-line', lineHeight: 1.3,
//                     }}>{stat.desc}</span>
//                   </div>
//                   <div style={{ height: '2px', width: '80%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col items-center gap-1">
//               <span style={{ visibility: 'hidden', fontSize: 'clamp(60px, 10vw, 160px)', fontWeight: 500, lineHeight: 1, display: 'block' }}>{t('stats.s3Number')}</span>
//               <CountUp value={t('stats.s3Number')} style={{
//                 fontFamily: 'Lexend', fontWeight: 500,
//                 fontSize: 'clamp(60px, 10vw, 160px)',
//                 backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                 backgroundSize: 'cover', backgroundPosition: 'bottom',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 color: 'transparent', WebkitTextFillColor: 'transparent',
//                 lineHeight: 1, display: 'block', textAlign: 'center', width: '100%',
//               }} />
//               <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//               <span style={{
//                 fontFamily: 'Lexend', fontWeight: 400,
//                 fontSize: 'clamp(14px, 1.5vw, 20px)',
//                 color: '#333', textAlign: 'center', width: '100%', display: 'block',
//                 whiteSpace: 'pre-line',
//               }}>{t('stats.s3Desc')}</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Contact Section */}
//       <section className="w-full py-12 bg-white">
//         {/* El-sora Mask group.png fe el-nos - akbar, awdah, we marfo'a le-fok */}
//         <div className="w-full -mt-6 lg:-mt-10 mb-6 flex justify-center items-center px-2 z-20 relative">
//           <img 
//             src="/Mask group.png" 
//             alt="Banner Decoration" 
//             className="w-full max-w-6xl h-auto min-h-[200px] md:min-h-[300px] max-h-[500px] object-contain mx-auto drop-shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;

// import { useEffect, useRef, useState } from 'react';
// import BASE_URL from '../api/config';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

// const parseStatNumber = (str) => {
//   const clean = str.replace(/,/g, '');
//   const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
//   const suffix = str.includes('+') ? (str.startsWith('+') ? '+' : '+') : '';
//   return { num, suffix };
// };

// const CountUp = ({ value, style }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const { num, suffix } = parseStatNumber(value);
//   const animated = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCount(0);
//     animated.current = false;
//     const obs = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !animated.current) {
//         animated.current = true;
//         const duration = 10000;
//         const startTime = performance.now();
//         const frame = (now) => {
//           const elapsed = now - startTime;
//           const progress = Math.min(elapsed / duration, 1);
//           setCount(Math.floor(progress * num));
//           if (progress < 1) requestAnimationFrame(frame);
//         };
//         requestAnimationFrame(frame);
//       } else if (!entry.isIntersecting) {
//         setCount(0);
//         animated.current = false;
//       }
//     }, { threshold: 0.3 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [num]);

//   const display = num >= 1000 ? count.toLocaleString() : count;

//   return <span ref={ref} style={style}>{display}{suffix}</span>;
// };

// const consultationItemsEn = [
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['Analysis of', 'your current', 'situation'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['A comprehensive answer to all your', 'questions about', 'the job market'] },
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['Develop a clear', 'business plan', 'to generate', 'profits.'] },
// ];

// const consultationItemsAr = [
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['قم بوضع خطة عمل', 'واضحة لتحقيق', 'الأرباح.'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['إجابة شامله لجميع أسئلتك حول سوق', 'العمل', ''] },
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['تحليل', 'وضعك الحالي', 'من مستواك'] },
// ];

// const ConsultationCarousel = ({ items }) => {
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
//     <div ref={scrollRef} className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
//       {items.map((item, i) => (
//         <div key={i} className="flex-shrink-0 w-[75vw] max-w-[260px] flex flex-col items-center gap-3 snap-center">
//           <div style={{
//             background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//             borderRadius: '20px', padding: '3px',
//             width: '160px', height: '160px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <div style={{
//               background: 'white', borderRadius: '18px',
//               width: '100%', height: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <img src={item.gif} alt={item.lines[0]} style={{ width: '130px', height: '130px', objectFit: 'contain' }} />
//             </div>
//           </div>
//           <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '16px', color: '#000', textAlign: 'center', lineHeight: '1.4' }}>
//             {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Contact() {
//   const { t } = useTranslation('contact');
//   const { isAr } = useLanguage();
//   const [faqs, setFaqs] = useState([]);
//   const [openQuestion, setOpenQuestion] = useState(null);
//   const [contactInfo, setContactInfo] = useState(null);
//   const [contactCards, setContactCards] = useState([]);
//   const consultationItems = isAr ? consultationItemsAr : consultationItemsEn;

//   useEffect(() => {
//     fetch(`${BASE_URL}/contact-info`)
//       .then(r => r.json())
//       .then(json => {
//         if (json.data) {
//           setContactInfo(json.data);
//           const cards = [
//             { 
//               icon: '✉', 
//               title: isAr ? 'البريد الإلكتروني' : 'Email', 
//               value: json.data.email, 
//               desc: t('social.emailDesc') 
//             },
//             { 
//               icon: '✈', 
//               title: isAr ? 'تيليجرام' : 'Telegram', 
//               value: json.data.telegram_username, 
//               desc: t('social.telegramDesc') 
//             },
//             { 
//               icon: 'B', 
//               title: isAr ? 'واتساب للأعمال' : 'WhatsApp Business', 
//               value: json.data.whatsapp_url, 
//               desc: t('social.whatsappDesc') 
//             },
//           ];
//           setContactCards(cards);
//         }
//       })
//       .catch(() => {});
//   }, [isAr, t]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/faqs?placement=contact`)
//       .then(r => r.json())
//       .then(json => {
//         const items = (json.data || []).sort((a, b) => a.display_order - b.display_order);
//         const mapped = items.map(item => ({
//           id: item.id,
//           question: isAr ? (item.question_ar || item.question) : (item.question_en || item.question),
//           answer: isAr ? (item.answer_ar || item.answer) : (item.answer_en || item.answer),
//         }));
//         setFaqs(mapped);
//         if (mapped.length > 0) setOpenQuestion(mapped[0].id);
//       })
//       .catch(() => {});
//   }, [isAr]);

//   const toggleQuestion = (id) => {
//     setOpenQuestion(openQuestion === id ? null : id);
//   };

//   return (
//     <div style={{ backgroundColor: '#000000C9' }}>
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/cover-websitebar2 2.png"
//             alt="Courses Cover"
//             style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
//           />
//           <div className="absolute inset-0 flex items-center px-10 md:px-20">
//             <div className="flex flex-col gap-2">
//               <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(48px, 9vw, 128px)', lineHeight: 1 }}>
//                 {isAr ? (
//                   <img src="/جاهزين في الوطن العربي 1.png" alt="جاهزين في الوطن العربي" style={{ height: 'clamp(100px, 14vw, 220px)', width: 'auto' }} />
//                 ) : (
//                   <span style={{ 
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                     WebkitTextFillColor: 'transparent',
//                   }}>{t('hero.readyTo')}</span>
//                 )}
//               </div>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 70px)', color: '#000000', lineHeight: 1 }}>{t('hero.connect')}</p>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(14px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.letsTalk')}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="w-full py-8 md:py-12 bg-white">
//         <div className="w-full max-w-[1031px] mx-auto px-6 sm:px-8 lg:px-12">
//           <style>{`
//             @keyframes secureSpotBorder {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .secure-spot-border {
//               background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: secureSpotBorder 3s ease infinite;
//               padding: 1px;
//               border-radius: 9999px;
//             }
//             .feedback-border {
//               background: linear-gradient(90deg, #FF0AD2 0%, #FF0AD2 50%, #0AFFFF 75%, #0AFF26 70%, #0AD20A 70%, #FF0004 100%);
//               padding: 2px;
//               border-radius: 16px;
//             }
//             .form-input {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               transition: border-color 0.2s;
//             }
//             .form-input:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//             .form-textarea {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               resize: none;
//               height: 180px;
//               transition: border-color 0.2s;
//             }
//             .form-textarea:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//           `}</style>
//           <div className="secure-spot-border mb-8">
//             <div className="rounded-full bg-white" style={{ padding: '6px' }}>
//               <div className="rounded-full" style={{
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}>
//                 <div className="rounded-full px-4 sm:px-8 py-2 flex items-center justify-center">
//                   <p className="text-center" style={{
//                     fontFamily: 'Lexend',
//                     fontWeight: 600,
//                     fontSize: 'clamp(11px, 3vw, 45px)',
//                     color: 'white',
//                   }}>{t('form.title')}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="feedback-border">
//             <div className="bg-white rounded-[14px] p-8">
//               <form className="space-y-5">
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.name')} <span className="text-yellow-500">*</span></label>
//                   <input type="text" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.phone')} <span className="text-yellow-500">*</span></label>
//                   <input type="tel" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.email')} <span className="text-yellow-500">*</span></label>
//                   <input type="email" placeholder={t('form.emailPlaceholder')} className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2" style={{ fontFamily: 'Lexend' }}>{t('form.faqLabel')} <span className="text-yellow-500">*</span></label>
//                   <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.levelQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.beginner'), t('form.intermediate'), t('form.professional')].map(level => (
//                           <label key={level} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="level" value={level} className="accent-yellow-500" />
//                             {level}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.goalQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.goal1'), t('form.goal2'), t('form.goal3')].map(goal => (
//                           <label key={goal} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="goal" value={goal} className="accent-yellow-500" />
//                             {goal}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.message')} <span className="text-yellow-500">*</span></label>
//                   <textarea className="form-textarea"></textarea>
//                 </div>
//                 <button type="submit" className="border border-black px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Lexend' }}>
//                   {t('form.sendBtn')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section className="w-full py-16 bg-white">
//         <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <h2 className="font-bold mb-12" style={{
//             fontFamily: 'Lexend',
//             fontSize: 'clamp(20px, 5vw, 64px)',
//             lineHeight: '1.2',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bottom',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             {t('consultation.title').split('\n').map((line, i, arr) => (
//               <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//             ))}
//           </h2>
//           <ConsultationCarousel items={consultationItems} />
//           <div className="hidden md:grid grid-cols-3 gap-6 justify-items-center">
//             {consultationItems.map((item, i) => (
//               <div key={i} className="flex flex-col items-center gap-4">
//                 <div style={{
//                   background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//                   borderRadius: '20px', padding: '3px',
//                   width: '221px', height: '221px',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <div style={{
//                     background: 'white', borderRadius: '18px',
//                     width: '100%', height: '100%',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}>
//                     <img src={item.gif} alt={item.lines[0]} style={{ width: '190px', height: '190px', objectFit: 'contain' }} />
//                   </div>
//                 </div>
//                 <p style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '32px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
//                   {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       {/* <section className="w-full relative overflow-hidden dir-rtl"> */}
//       <section  className="w-full relative overflow-hidden">
//         {/* Subtract Background Image - Outside all containers */}
//         <img
//           src="/Subtract.png"
//           alt="Background"
//           dir="rtl" 
//           className={`absolute -top-[100px] w-full sm:w-[280%] h-[180vh] object-contain opacity-50 z-40 pointer-events-none ${isAr ? 'left-0 sm:-left-[300px]' : 'right-0 sm:-right-[500px]'}`}
//           style={{ overflow: 'visible', transform: isAr ? 'scaleX(-1)' : 'none' }}
//         />
        
//         {/* Black Background Section */}
//         <div  dir="rtl" className="bg-black py-8 relative z-10 overflow-hidden">
//           <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
//             {/* Left Side - FAQ List */}
//             <div className="w-full lg:w-1/2 space-y-8 mt-16">
//               <h3
//                 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${isAr ? 'text-right' : 'text-left'}`}
//                 style={{
//                   backgroundImage: 'linear-gradient(90deg, #BD8800, #FFD100, #9C6B00)',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent'
//                 }}
//               >
//                 {t('faq.title')}
//               </h3>
              
//               {faqs.map((faq) => (
//                 <div key={faq.id} className="pb-6">
//                   {/* Clickable Question */}
//                   <div
//                     className="flex items-center justify-between cursor-pointer mb-4"
//                     onClick={() => toggleQuestion(faq.id)}
//                   >
//                     <h4 className="text-lg font-medium text-white leading-relaxed flex-1">
//                       {faq.question}
//                     </h4>
//                     <span className="text-2xl text-yellow-500 ml-4 flex-shrink-0">
//                       {openQuestion === faq.id ? '−' : '+'}
//                     </span>
//                   </div>
                  
//                   {/* Two orange lines under each question */}
//                   <div className="w-full mb-4">
//                     <div className="w-full h-1 bg-orange-400"></div>
//                     <div className="w-full h-0.5 bg-orange-300 opacity-60 mt-1"></div>
//                   </div>
                  
//                   {/* Answer - Toggle visibility */}
//                   {openQuestion === faq.id && (
//                     <div className="mb-4">
//                       <div className="text-green-400 font-semibold mb-3 text-lg">{t('faq.answer')}</div>
//                       <p className="text-gray-300 leading-relaxed text-sm">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Right Side - Image */}
//             <div className="hidden lg:flex w-full lg:w-1/2 relative self-start">
//               <div className="relative p-4 sm:p-8 overflow-visible">
//                 {/* Background Icons */}
//                 <div className="absolute top-4 right-4 opacity-20">
//                   <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                   </svg>
//                 </div>

//                 {/* Images */}
//                 <div className="relative z-10 flex flex-col justify-center items-center w-full overflow-visible lg:ml-24">
//                   {/* First image */}
//                   <img
//                     src="/Mask group (7).png"
//                     alt="Abdullah Al-Nasr"
//                     className="w-full max-w-xs sm:max-w-sm lg:max-w-4xl h-auto object-contain relative z-80"
//                   />
                  
//                   {/* Second image */}
//                   <img
//                     src="/2 post 1.png"
//                     alt="Abdullah Al-Nasr"
//                     className="w-full h-auto object-contain -mt-16 sm:-mt-40 lg:-mt-80 lg:min-h-[800px] lg:scale-125 relative z-90"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="w-full py-20 bg-white">
//         <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">
//           <div className="flex flex-col items-center gap-8">
//             <div className="flex flex-wrap justify-center gap-12 lg:gap-20" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
//               {(isAr ? [
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//               ] : [
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//               ]).map((stat, i) => (
//                 <div key={i} className="flex flex-col items-start gap-1">
//                   <div className="flex items-center gap-3">
//                     <CountUp value={stat.number} style={{
//                       fontFamily: 'Lexend', fontWeight: 300,
//                       fontSize: 'clamp(48px, 6vw, 96px)',
//                       backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                       backgroundSize: 'cover', backgroundPosition: 'bottom',
//                       WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                       color: 'transparent', WebkitTextFillColor: 'transparent',
//                       lineHeight: 1,
//                     }} />
//                     <span style={{
//                       fontFamily: 'Lexend', fontWeight: 400,
//                       fontSize: 'clamp(14px, 1.5vw, 20px)',
//                       color: '#333', whiteSpace: 'pre-line', lineHeight: 1.3,
//                     }}>{stat.desc}</span>
//                   </div>
//                   <div style={{ height: '2px', width: '80%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col items-center gap-1">
//               <span style={{ visibility: 'hidden', fontSize: 'clamp(60px, 10vw, 160px)', fontWeight: 500, lineHeight: 1, display: 'block' }}>{t('stats.s3Number')}</span>
//               <CountUp value={t('stats.s3Number')} style={{
//                 fontFamily: 'Lexend', fontWeight: 500,
//                 fontSize: 'clamp(60px, 10vw, 160px)',
//                 backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                 backgroundSize: 'cover', backgroundPosition: 'bottom',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 color: 'transparent', WebkitTextFillColor: 'transparent',
//                 lineHeight: 1, display: 'block', textAlign: 'center', width: '100%',
//               }} />
//               <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//               <span style={{
//                 fontFamily: 'Lexend', fontWeight: 400,
//                 fontSize: 'clamp(14px, 1.5vw, 20px)',
//                 color: '#333', textAlign: 'center', width: '100%', display: 'block',
//                 whiteSpace: 'pre-line',
//               }}>{t('stats.s3Desc')}</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Contact Section */}
//       <section className="w-full py-12 bg-white">
//         <div className="w-full -mt-6 lg:-mt-10 mb-6 flex justify-center items-center px-2 z-20 relative">
//           <img 
//             src="/Mask group.png" 
//             alt="Banner Decoration" 
//             className="w-full max-w-6xl h-auto min-h-[200px] md:min-h-[300px] max-h-[500px] object-contain mx-auto drop-shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;



// import { useEffect, useRef, useState } from 'react';
// import BASE_URL from '../api/config';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';

// const parseStatNumber = (str) => {
//   const clean = str.replace(/,/g, '');
//   const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
//   const suffix = str.includes('+') ? (str.startsWith('+') ? '+' : '+') : '';
//   return { num, suffix };
// };

// const CountUp = ({ value, style }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const { num, suffix } = parseStatNumber(value);
//   const animated = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCount(0);
//     animated.current = false;
//     const obs = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !animated.current) {
//         animated.current = true;
//         const duration = 10000;
//         const startTime = performance.now();
//         const frame = (now) => {
//           const elapsed = now - startTime;
//           const progress = Math.min(elapsed / duration, 1);
//           setCount(Math.floor(progress * num));
//           if (progress < 1) requestAnimationFrame(frame);
//         };
//         requestAnimationFrame(frame);
//       } else if (!entry.isIntersecting) {
//         setCount(0);
//         animated.current = false;
//       }
//     }, { threshold: 0.3 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [num]);

//   const display = num >= 1000 ? count.toLocaleString() : count;

//   return <span ref={ref} style={style}>{display}{suffix}</span>;
// };

// const consultationItemsEn = [
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['Analysis of', 'your current', 'situation'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['A comprehensive answer to all your', 'questions about', 'the job market'] },
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['Develop a clear', 'business plan', 'to generate', 'profits.'] },
// ];

// const consultationItemsAr = [
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['قم بوضع خطة عمل', 'واضحة لتحقيق', 'الأرباح.'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['إجابة شامله لجميع أسئلتك حول سوق', 'العمل', ''] },
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['تحليل', 'وضعك الحالي', 'من مستواك'] },
// ];

// const ConsultationCarousel = ({ items }) => {
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
//     <div ref={scrollRef} className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
//       {items.map((item, i) => (
//         <div key={i} className="flex-shrink-0 w-[75vw] max-w-[260px] flex flex-col items-center gap-3 snap-center">
//           <div style={{
//             background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//             borderRadius: '20px', padding: '3px',
//             width: '160px', height: '160px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <div style={{
//               background: 'white', borderRadius: '18px',
//               width: '100%', height: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <img src={item.gif} alt={item.lines[0]} style={{ width: '130px', height: '130px', objectFit: 'contain' }} />
//             </div>
//           </div>
//           <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '16px', color: '#000', textAlign: 'center', lineHeight: '1.4' }}>
//             {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Contact() {
//   const { t } = useTranslation('contact');
//   const { isAr } = useLanguage();
//   const [faqs, setFaqs] = useState([]);
//   const [openQuestion, setOpenQuestion] = useState(null);
//   const [contactInfo, setContactInfo] = useState(null);
//   const [contactCards, setContactCards] = useState([]);
//   const consultationItems = isAr ? consultationItemsAr : consultationItemsEn;

//   useEffect(() => {
//     fetch(`${BASE_URL}/contact-info`)
//       .then(r => r.json())
//       .then(json => {
//         if (json.data) {
//           setContactInfo(json.data);
//           const cards = [
//             { 
//               icon: '✉', 
//               title: isAr ? 'البريد الإلكتروني' : 'Email', 
//               value: json.data.email, 
//               desc: t('social.emailDesc') 
//             },
//             { 
//               icon: '✈', 
//               title: isAr ? 'تيليجرام' : 'Telegram', 
//               value: json.data.telegram_username, 
//               desc: t('social.telegramDesc') 
//             },
//             { 
//               icon: 'B', 
//               title: isAr ? 'واتساب للأعمال' : 'WhatsApp Business', 
//               value: json.data.whatsapp_url, 
//               desc: t('social.whatsappDesc') 
//             },
//           ];
//           setContactCards(cards);
//         }
//       })
//       .catch(() => {});
//   }, [isAr, t]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/faqs?placement=contact`)
//       .then(r => r.json())
//       .then(json => {
//         const items = (json.data || []).sort((a, b) => a.display_order - b.display_order);
//         const mapped = items.map(item => ({
//           id: item.id,
//           question: isAr ? (item.question_ar || item.question) : (item.question_en || item.question),
//           answer: isAr ? (item.answer_ar || item.answer) : (item.answer_en || item.answer),
//         }));
//         setFaqs(mapped);
//         if (mapped.length > 0) setOpenQuestion(mapped[0].id);
//       })
//       .catch(() => {});
//   }, [isAr]);

//   const toggleQuestion = (id) => {
//     setOpenQuestion(openQuestion === id ? null : id);
//   };

//   return (
//     <div style={{ backgroundColor: '#000000C9' }}>
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/cover-websitebar2 2.png"
//             alt="Courses Cover"
//             style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
//           />
//           <div className="absolute inset-0 flex items-center px-10 md:px-20">
//             <div className="flex flex-col gap-2">
//               <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(48px, 9vw, 128px)', lineHeight: 1 }}>
//                 {isAr ? (
//                   <img src="/جاهزين في الوطن العربي 1.png" alt="جاهزين في الوطن العربي" style={{ height: 'clamp(100px, 14vw, 220px)', width: 'auto' }} />
//                 ) : (
//                   <span style={{ 
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                     WebkitTextFillColor: 'transparent',
//                   }}>{t('hero.readyTo')}</span>
//                 )}
//               </div>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 70px)', color: '#000000', lineHeight: 1 }}>{t('hero.connect')}</p>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(14px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.letsTalk')}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="w-full py-8 md:py-12 bg-white">
//         <div className="w-full max-w-[1031px] mx-auto px-6 sm:px-8 lg:px-12">
//           <style>{`
//             @keyframes secureSpotBorder {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .secure-spot-border {
//               background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: secureSpotBorder 3s ease infinite;
//               padding: 1px;
//               border-radius: 9999px;
//             }
//             .feedback-border {
//               background: linear-gradient(90deg, #FF0AD2 0%, #FF0AD2 50%, #0AFFFF 75%, #0AFF26 70%, #0AD20A 70%, #FF0004 100%);
//               padding: 2px;
//               border-radius: 16px;
//             }
//             .form-input {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               transition: border-color 0.2s;
//             }
//             .form-input:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//             .form-textarea {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               resize: none;
//               height: 180px;
//               transition: border-color 0.2s;
//             }
//             .form-textarea:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//           `}</style>
//           <div className="secure-spot-border mb-8">
//             <div className="rounded-full bg-white" style={{ padding: '6px' }}>
//               <div className="rounded-full" style={{
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}>
//                 <div className="rounded-full px-4 sm:px-8 py-2 flex items-center justify-center">
//                   <p className="text-center" style={{
//                     fontFamily: 'Lexend',
//                     fontWeight: 600,
//                     fontSize: 'clamp(11px, 3vw, 45px)',
//                     color: 'white',
//                   }}>{t('form.title')}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="feedback-border">
//             <div className="bg-white rounded-[14px] p-8">
//               <form className="space-y-5">
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.name')} <span className="text-yellow-500">*</span></label>
//                   <input type="text" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.phone')} <span className="text-yellow-500">*</span></label>
//                   <input type="tel" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.email')} <span className="text-yellow-500">*</span></label>
//                   <input type="email" placeholder={t('form.emailPlaceholder')} className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2" style={{ fontFamily: 'Lexend' }}>{t('form.faqLabel')} <span className="text-yellow-500">*</span></label>
//                   <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.levelQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.beginner'), t('form.intermediate'), t('form.professional')].map(level => (
//                           <label key={level} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="level" value={level} className="accent-yellow-500" />
//                             {level}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.goalQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.goal1'), t('form.goal2'), t('form.goal3')].map(goal => (
//                           <label key={goal} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="goal" value={goal} className="accent-yellow-500" />
//                             {goal}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.message')} <span className="text-yellow-500">*</span></label>
//                   <textarea className="form-textarea"></textarea>
//                 </div>
//                 <button type="submit" className="border border-black px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Lexend' }}>
//                   {t('form.sendBtn')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section className="w-full py-16 bg-white">
//         <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <h2 className="font-bold mb-12" style={{
//             fontFamily: 'Lexend',
//             fontSize: 'clamp(20px, 5vw, 64px)',
//             lineHeight: '1.2',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bottom',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             {t('consultation.title').split('\n').map((line, i, arr) => (
//               <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//             ))}
//           </h2>
//           <ConsultationCarousel items={consultationItems} />
//           <div className="hidden md:grid grid-cols-3 gap-6 justify-items-center">
//             {consultationItems.map((item, i) => (
//               <div key={i} className="flex flex-col items-center gap-4">
//                 <div style={{
//                   background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//                   borderRadius: '20px', padding: '3px',
//                   width: '221px', height: '221px',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <div style={{
//                     background: 'white', borderRadius: '18px',
//                     width: '100%', height: '100%',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}>
//                     <img src={item.gif} alt={item.lines[0]} style={{ width: '190px', height: '190px', objectFit: 'contain' }} />
//                   </div>
//                 </div>
//                 <p style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '32px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
//                   {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="w-full relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
//         {/* Subtract Background Image */}
//         <img
//           src="/Subtract.png"
//           alt="Background"
//           className={`absolute -top-[50px] md:-top-[100px] w-full sm:w-[280%] h-[120vh] md:h-[180vh] object-contain opacity-50 z-40 pointer-events-none ${isAr ? 'left-0 sm:-left-[300px]' : 'right-0 sm:-right-[500px]'}`}
//           style={{ overflow: 'visible', transform: isAr ? 'scaleX(-1)' : 'none' }}
//         />
        
//         {/* Black Background Section with q1 background */}
//         <div className="bg-black py-8 md:py-16 relative z-10 overflow-hidden">
//           {/* Background Image q1 */}
//           <div className="absolute inset-0 z-0">
//             <img 
//               src="/q1.png" 
//               alt="FAQ Background" 
//               className="w-full h-full object-cover opacity-30"
//             />
//           </div>

//           <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-8 lg:gap-12 relative z-10">
//             {/* Left Side - FAQ List */}
//             <div className="w-full lg:w-1/2 space-y-4 md:space-y-8 mt-4 md:mt-12">
//               <h3
//                 className={`text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 md:mb-8 ${isAr ? 'text-right' : 'text-left'}`}
//                 style={{
//                   backgroundImage: 'linear-gradient(90deg, #BD8800, #FFD100, #9C6B00)',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent'
//                 }}
//               >
//                 {t('faq.title')}
//               </h3>
              
//               {faqs.map((faq) => (
//                 <div key={faq.id} className="pb-4 md:pb-6 bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10">
//                   {/* Clickable Question */}
//                   <div
//                     className="flex items-center justify-between cursor-pointer mb-2 md:mb-4"
//                     onClick={() => toggleQuestion(faq.id)}
//                   >
//                     <h4 className="text-base md:text-lg font-medium text-white leading-relaxed flex-1">
//                       {faq.question}
//                     </h4>
//                     <span className="text-xl md:text-2xl text-yellow-500 ml-2 md:ml-4 flex-shrink-0">
//                       {openQuestion === faq.id ? '−' : '+'}
//                     </span>
//                   </div>
                  
//                   {/* Two orange lines under each question */}
//                   <div className="w-full mb-3 md:mb-4">
//                     <div className="w-full h-1 bg-orange-400"></div>
//                     <div className="w-full h-0.5 bg-orange-300 opacity-60 mt-1"></div>
//                   </div>
                  
//                   {/* Answer - Toggle visibility */}
//                   {openQuestion === faq.id && (
//                     <div className="mb-2 md:mb-4">
//                       <div className="text-green-400 font-semibold mb-2 text-sm md:text-lg">{t('faq.answer')}</div>
//                       <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Right Side - Image */}
//             <div className="hidden lg:flex w-full lg:w-1/2 relative self-start">
//               <div className="relative p-4 sm:p-8 overflow-visible">
//                 {/* Background Icons */}
//                 <div className="absolute top-4 right-4 opacity-20">
//                   <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                   </svg>
//                 </div>

//                 {/* Images */}
//                 <div className="relative z-10 flex flex-col justify-center items-center w-full overflow-visible lg:ml-24">
//                   {/* First image */}
//                   <img
//                     src="/Mask group (7).png"
//                     alt="Abdullah Al-Nasr"
//                     className="w-full max-w-xs sm:max-w-sm lg:max-w-4xl h-auto object-contain relative z-80"
//                   />
                  
//                   {/* Second image */}
//                   <img
//                     src="/2 post 1.png"
//                     alt="Abdullah Al-Nasr"
//                     className="w-full h-auto object-contain -mt-16 sm:-mt-40 lg:-mt-80 lg:min-h-[800px] lg:scale-125 relative z-90"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section - Desktop layout preserved with clamp sizing for mobile */}
//       <section className="w-full py-12 md:py-20 bg-white">
//         <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">
//           <div className="flex flex-col items-center gap-8">
//             <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
//               {(isAr ? [
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//               ] : [
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//               ]).map((stat, i) => (
//                 <div key={i} className="flex flex-col items-start gap-1">
//                   <div className="flex items-center gap-3">
//                     <CountUp value={stat.number} style={{
//                       fontFamily: 'Lexend', fontWeight: 300,
//                       fontSize: 'clamp(36px, 6vw, 96px)',
//                       backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                       backgroundSize: 'cover', backgroundPosition: 'bottom',
//                       WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                       color: 'transparent', WebkitTextFillColor: 'transparent',
//                       lineHeight: 1,
//                     }} />
//                     <span style={{
//                       fontFamily: 'Lexend', fontWeight: 400,
//                       fontSize: 'clamp(12px, 1.5vw, 20px)',
//                       color: '#333', whiteSpace: 'pre-line', lineHeight: 1.3,
//                     }}>{stat.desc}</span>
//                   </div>
//                   <div style={{ height: '2px', width: '80%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col items-center gap-1 w-full max-w-xl mx-auto">
//               <span style={{ visibility: 'hidden', fontSize: 'clamp(48px, 10vw, 160px)', fontWeight: 500, lineHeight: 1, display: 'block' }}>{t('stats.s3Number')}</span>
//               <CountUp value={t('stats.s3Number')} style={{
//                 fontFamily: 'Lexend', fontWeight: 500,
//                 fontSize: 'clamp(48px, 10vw, 160px)',
//                 backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                 backgroundSize: 'cover', backgroundPosition: 'bottom',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 color: 'transparent', WebkitTextFillColor: 'transparent',
//                 lineHeight: 1, display: 'block', textAlign: 'center', width: '100%',
//               }} />
//               <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//               <span style={{
//                 fontFamily: 'Lexend', fontWeight: 400,
//                 fontSize: 'clamp(12px, 1.5vw, 20px)',
//                 color: '#333', textAlign: 'center', width: '100%', display: 'block',
//                 whiteSpace: 'pre-line',
//               }}>{t('stats.s3Desc')}</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Contact Section */}
//       <section className="w-full py-12 bg-white">
//         <div className="w-full -mt-6 lg:-mt-10 mb-6 flex justify-center items-center px-2 z-20 relative">
//           <img 
//             src="/Mask group.png" 
//             alt="Banner Decoration" 
//             className="w-full max-w-6xl h-auto min-h-[200px] md:min-h-[300px] max-h-[500px] object-contain mx-auto drop-shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;


// import { useEffect, useRef, useState } from 'react';
// import BASE_URL from '../api/config';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../hooks/useLanguage';
// import FAQSection from '../Courses/FAQSection';

// const parseStatNumber = (str) => {
//   const clean = str.replace(/,/g, '');
//   const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
//   const suffix = str.includes('+') ? '+' : '';
//   return { num, suffix };
// };

// const CountUp = ({ value, style }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const { num, suffix } = parseStatNumber(value);
//   const animated = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCount(0);
//     animated.current = false;
//     const obs = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !animated.current) {
//         animated.current = true;
//         const duration = 10000;
//         const startTime = performance.now();
//         const frame = (now) => {
//           const elapsed = now - startTime;
//           const progress = Math.min(elapsed / duration, 1);
//           setCount(Math.floor(progress * num));
//           if (progress < 1) requestAnimationFrame(frame);
//         };
//         requestAnimationFrame(frame);
//       } else if (!entry.isIntersecting) {
//         setCount(0);
//         animated.current = false;
//       }
//     }, { threshold: 0.3 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [num]);

//   const display = num >= 1000 ? count.toLocaleString() : count;

//   return <span ref={ref} style={style}>{display}{suffix}</span>;
// };

// const consultationItemsEn = [
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['Analysis of', 'your current', 'situation'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['A comprehensive answer to all your', 'questions about', 'the job market'] },
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['Develop a clear', 'business plan', 'to generate', 'profits.'] },
// ];

// const consultationItemsAr = [
//   { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['قم بوضع خطة عمل', 'واضحة لتحقيق', 'الأرباح.'] },
//   { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['إجابة شامله لجميع أسئلتك حول سوق', 'العمل', ''] },
//   { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['تحليل', 'وضعك الحالي', 'من مستواك'] },
// ];

// const ConsultationCarousel = ({ items }) => {
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
//     <div ref={scrollRef} className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
//       {items.map((item, i) => (
//         <div key={i} className="flex-shrink-0 w-[75vw] max-w-[260px] flex flex-col items-center gap-3 snap-center">
//           <div style={{
//             background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//             borderRadius: '20px', padding: '3px',
//             width: '160px', height: '160px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <div style={{
//               background: 'white', borderRadius: '18px',
//               width: '100%', height: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <img src={item.gif} alt={item.lines[0]} style={{ width: '130px', height: '130px', objectFit: 'contain' }} />
//             </div>
//           </div>
//           <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '16px', color: '#000', textAlign: 'center', lineHeight: '1.4' }}>
//             {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Contact() {
//   const { t } = useTranslation('contact');
//   const { isAr } = useLanguage();
//   const [contactInfo, setContactInfo] = useState(null);
//   const [contactCards, setContactCards] = useState([]);
//   const consultationItems = isAr ? consultationItemsAr : consultationItemsEn;

//   useEffect(() => {
//     fetch(`${BASE_URL}/contact-info`)
//       .then(r => r.json())
//       .then(json => {
//         if (json.data) {
//           setContactInfo(json.data);
//           const cards = [
//             { 
//               icon: '✉', 
//               title: isAr ? 'البريد الإلكتروني' : 'Email', 
//               value: json.data.email, 
//               desc: t('social.emailDesc') 
//             },
//             { 
//               icon: '✈', 
//               title: isAr ? 'تيليجرام' : 'Telegram', 
//               value: json.data.telegram_username, 
//               desc: t('social.telegramDesc') 
//             },
//             { 
//               icon: 'B', 
//               title: isAr ? 'واتساب للأعمال' : 'WhatsApp Business', 
//               value: json.data.whatsapp_url, 
//               desc: t('social.whatsappDesc') 
//             },
//           ];
//           setContactCards(cards);
//         }
//       })
//       .catch(() => {});
//   }, [isAr, t]);

//   return (
//     <div style={{ backgroundColor: '#000000C9' }}>
//       {/* Hero Section */}
//       <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
//         <div className="relative w-full max-w-full">
//           <img
//             className="w-full h-auto object-cover"
//             src="/cover-websitebar2 2.png"
//             alt="Courses Cover"
//             style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
//           />
//           <div className="absolute inset-0 flex items-center px-10 md:px-20">
//             <div className="flex flex-col gap-2">
//               <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(48px, 9vw, 128px)', lineHeight: 1 }}>
//                 {isAr ? (
//                   <img src="/جاهزين في الوطن العربي 1.png" alt="جاهزين في الوطن العربي" style={{ height: 'clamp(100px, 14vw, 220px)', width: 'auto' }} />
//                 ) : (
//                   <span style={{ 
//                     backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     WebkitBackgroundClip: 'text',
//                     backgroundClip: 'text',
//                     color: 'transparent',
//                     WebkitTextFillColor: 'transparent',
//                   }}>{t('hero.readyTo')}</span>
//                 )}
//               </div>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(20px, 4vw, 70px)', color: '#000000', lineHeight: 1 }}>{t('hero.connect')}</p>
//               <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(14px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('hero.letsTalk')}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="w-full py-8 md:py-12 bg-white">
//         <div className="w-full max-w-[1031px] mx-auto px-6 sm:px-8 lg:px-12">
//           <style>{`
//             @keyframes secureSpotBorder {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             .secure-spot-border {
//               background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
//               background-size: 300% 300%;
//               animation: secureSpotBorder 3s ease infinite;
//               padding: 1px;
//               border-radius: 9999px;
//             }
//             .feedback-border {
//               background: linear-gradient(90deg, #FF0AD2 0%, #FF0AD2 50%, #0AFFFF 75%, #0AFF26 70%, #0AD20A 70%, #FF0004 100%);
//               padding: 2px;
//               border-radius: 16px;
//             }
//             .form-input {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               transition: border-color 0.2s;
//             }
//             .form-input:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//             .form-textarea {
//               width: 100%;
//               padding: 12px 16px;
//               border: 1.5px solid #d1d5db;
//               border-radius: 10px;
//               background: #fff;
//               font-family: Lexend;
//               font-size: 15px;
//               outline: none;
//               resize: none;
//               height: 180px;
//               transition: border-color 0.2s;
//             }
//             .form-textarea:focus {
//               border-color: #FFC800;
//               box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
//             }
//           `}</style>
//           <div className="secure-spot-border mb-8">
//             <div className="rounded-full bg-white" style={{ padding: '6px' }}>
//               <div className="rounded-full" style={{
//                 backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}>
//                 <div className="rounded-full px-4 sm:px-8 py-2 flex items-center justify-center">
//                   <p className="text-center" style={{
//                     fontFamily: 'Lexend',
//                     fontWeight: 600,
//                     fontSize: 'clamp(11px, 3vw, 45px)',
//                     color: 'white',
//                   }}>{t('form.title')}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="feedback-border">
//             <div className="bg-white rounded-[14px] p-8">
//               <form className="space-y-5">
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.name')} <span className="text-yellow-500">*</span></label>
//                   <input type="text" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.phone')} <span className="text-yellow-500">*</span></label>
//                   <input type="tel" className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.email')} <span className="text-yellow-500">*</span></label>
//                   <input type="email" placeholder={t('form.emailPlaceholder')} className="form-input" />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2" style={{ fontFamily: 'Lexend' }}>{t('form.faqLabel')} <span className="text-yellow-500">*</span></label>
//                   <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.levelQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.beginner'), t('form.intermediate'), t('form.professional')].map(level => (
//                           <label key={level} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="level" value={level} className="accent-yellow-500" />
//                             {level}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.goalQ')}</p>
//                       <div className="flex flex-col gap-1">
//                         {[t('form.goal1'), t('form.goal2'), t('form.goal3')].map(goal => (
//                           <label key={goal} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
//                             <input type="radio" name="goal" value={goal} className="accent-yellow-500" />
//                             {goal}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.message')} <span className="text-yellow-500">*</span></label>
//                   <textarea className="form-textarea"></textarea>
//                 </div>
//                 <button type="submit" className="border border-black px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Lexend' }}>
//                   {t('form.sendBtn')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section className="w-full py-16 bg-white">
//         <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
//           <h2 className="font-bold mb-12" style={{
//             fontFamily: 'Lexend',
//             fontSize: 'clamp(20px, 5vw, 64px)',
//             lineHeight: '1.2',
//             backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'bottom',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             color: 'transparent',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             {t('consultation.title').split('\n').map((line, i, arr) => (
//               <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//             ))}
//           </h2>
//           <ConsultationCarousel items={consultationItems} />
//           <div className="hidden md:grid grid-cols-3 gap-6 justify-items-center">
//             {consultationItems.map((item, i) => (
//               <div key={i} className="flex flex-col items-center gap-4">
//                 <div style={{
//                   background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
//                   borderRadius: '20px', padding: '3px',
//                   width: '221px', height: '221px',
//                   display: 'flex', items: 'center', justifyContent: 'center',
//                 }}>
//                   <div style={{
//                     background: 'white', borderRadius: '18px',
//                     width: '100%', height: '100%',
//                     display: 'flex', items: 'center', justifyContent: 'center',
//                   }}>
//                     <img src={item.gif} alt={item.lines[0]} style={{ width: '190px', height: '190px', objectFit: 'contain' }} />
//                   </div>
//                 </div>
//                 <p style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '32px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
//                   {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Shared FAQ Section Component */}
//       <FAQSection />

//       {/* Stats Section */}
//       <section className="w-full py-12 md:py-20 bg-white">
//         <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">
//           <div className="flex flex-col items-center gap-8">
//             <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
//               {(isAr ? [
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//               ] : [
//                 { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
//                 { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
//               ]).map((stat, i) => (
//                 <div key={i} className="flex flex-col items-start gap-1">
//                   <div className="flex items-center gap-3">
//                     <CountUp value={stat.number} style={{
//                       fontFamily: 'Lexend', fontWeight: 300,
//                       fontSize: 'clamp(36px, 6vw, 96px)',
//                       backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                       backgroundSize: 'cover', backgroundPosition: 'bottom',
//                       WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                       color: 'transparent', WebkitTextFillColor: 'transparent',
//                       lineHeight: 1,
//                     }} />
//                     <span style={{
//                       fontFamily: 'Lexend', fontWeight: 400,
//                       fontSize: 'clamp(12px, 1.5vw, 20px)',
//                       color: '#333', whiteSpace: 'pre-line', lineHeight: 1.3,
//                     }}>{stat.desc}</span>
//                   </div>
//                   <div style={{ height: '2px', width: '80%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col items-center gap-1 w-full max-w-xl mx-auto">
//               <span style={{ visibility: 'hidden', fontSize: 'clamp(48px, 10vw, 160px)', fontWeight: 500, lineHeight: 1, display: 'block' }}>{t('stats.s3Number')}</span>
//               <CountUp value={t('stats.s3Number')} style={{
//                 fontFamily: 'Lexend', fontWeight: 500,
//                 fontSize: 'clamp(48px, 10vw, 160px)',
//                 backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
//                 backgroundSize: 'cover', backgroundPosition: 'bottom',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 color: 'transparent', WebkitTextFillColor: 'transparent',
//                 lineHeight: 1, display: 'block', textAlign: 'center', width: '100%',
//               }} />
//               <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
//               <span style={{
//                 fontFamily: 'Lexend', fontWeight: 400,
//                 fontSize: 'clamp(12px, 1.5vw, 20px)',
//                 color: '#333', textAlign: 'center', width: '100%', display: 'block',
//                 whiteSpace: 'pre-line',
//               }}>{t('stats.s3Desc')}</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Contact Section */}
//       <section className="w-full py-12 bg-white">
//         <div className="w-full -mt-6 lg:-mt-10 mb-6 flex justify-center items-center px-2 z-20 relative">
//           <img 
//             src="/Mask group.png" 
//             alt="Banner Decoration" 
//             className="w-full max-w-6xl h-auto min-h-[200px] md:min-h-[300px] max-h-[500px] object-contain mx-auto drop-shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;

import { useEffect, useRef, useState } from 'react';
import BASE_URL from '../api/config';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import FAQSection from '../Courses/FAQSection';

const parseStatNumber = (str) => {
  const clean = str.replace(/,/g, '');
  const num = parseInt(clean.replace(/\D/g, ''), 10) || 0;
  const suffix = str.includes('+') ? '+' : '';
  return { num, suffix };
};

const CountUp = ({ value, style }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const { num, suffix } = parseStatNumber(value);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setCount(0);
    animated.current = false;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 10000;
        const startTime = performance.now();
        const frame = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * num));
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      } else if (!entry.isIntersecting) {
        setCount(0);
        animated.current = false;
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  const display = num >= 1000 ? count.toLocaleString() : count;

  return <span ref={ref} style={style}>{display}{suffix}</span>;
};

const consultationItemsEn = [
  { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['Analysis of', 'your current', 'situation'] },
  { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['A comprehensive answer to all your', 'questions about', 'the job market'] },
  { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['Develop a clear', 'business plan', 'to generate', 'profits.'] },
];

const consultationItemsAr = [
  { gif: 'Screen Recording 2026-04-06 224656.gif', lines: ['قم بوضع خطة عمل', 'واضحة لتحقيق', 'الأرباح.'] },
  { gif: 'Screen Recording 2026-04-06 224608.gif', lines: ['إجابة شامله لجميع أسئلتك حول سوق', 'العمل', ''] },
  { gif: 'Screen Recording 2026-04-06 224507.gif', lines: ['تحليل', 'وضعك الحالي', 'من مستواك'] },
];

const ConsultationCarousel = ({ items }) => {
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
    <div ref={scrollRef} className="md:hidden flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
      {items.map((item, i) => (
        <div key={i} className="flex-shrink-0 w-[70vw] max-w-[220px] flex flex-col items-center gap-2 snap-center">
          <div style={{
            background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
            borderRadius: '16px', padding: '2px',
            width: '130px', height: '130px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div className="overflow-hidden" style={{
              background: 'white', borderRadius: '14px',
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img 
                src={item.gif} 
                alt={item.lines[0]} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
          <p style={{ fontFamily: 'Lexend', fontWeight: 500, fontSize: '14px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
            {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
          </p>
        </div>
      ))}
    </div>
  );
};

function Contact() {
  const { t } = useTranslation('contact');
  const { isAr } = useLanguage();
  const [contactInfo, setContactInfo] = useState(null);
  const [contactCards, setContactCards] = useState([]);
  const consultationItems = isAr ? consultationItemsAr : consultationItemsEn;

  useEffect(() => {
    fetch(`${BASE_URL}/contact-info`)
      .then(r => r.json())
      .then(json => {
        if (json.data) {
          setContactInfo(json.data);
          const cards = [
            { 
              icon: '✉', 
              title: isAr ? 'البريد الإلكتروني' : 'Email', 
              value: json.data.email, 
              desc: t('social.emailDesc') 
            },
            { 
              icon: '✈', 
              title: isAr ? 'تيليجرام' : 'Telegram', 
              value: json.data.telegram_username, 
              desc: t('social.telegramDesc') 
            },
            { 
              icon: 'B', 
              title: isAr ? 'واتساب للأعمال' : 'WhatsApp Business', 
              value: json.data.whatsapp_url, 
              desc: t('social.whatsappDesc') 
            },
          ];
          setContactCards(cards);
        }
      })
      .catch(() => {});
  }, [isAr, t]);

  return (
    <div style={{ backgroundColor: '#000000C9' }}>
      {/* Hero Section */}
      {/* <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="relative w-full max-w-full">
          <img
            className="w-full h-auto object-cover"
            src="/cover-websitebar2 2.png"
            alt="Courses Cover"
            style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
          />
          <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-20">
            <div className={`flex flex-col gap-1 sm:gap-2 w-full max-w-xl ${isAr ? 'items-end text-right ml-auto' : 'items-start text-left'}`}>
              <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(32px, 8vw, 128px)', lineHeight: 1, width: '100%' }}>
                {isAr ? (
                  <div className="flex justify-end w-full">
                    <img 
                      src="/جاهزين في الوطن العربي 1.png" 
                      alt="جاهزين في الوطن العربي" 
                      className="max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain -mr-2 sm:-mr-4"
                    />
                  </div>
                ) : (
                  <span style={{ 
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}>{t('hero.readyTo')}</span>
                )}
              </div>
              <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(18px, 4vw, 70px)', color: '#000000', lineHeight: 1, textAlign: isAr ? 'right' : 'left', width: '100%' }}>
                {t('hero.connect')}
              </p>
              <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(12px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', textAlign: isAr ? 'right' : 'left', width: '100%' }}>
                {t('hero.letsTalk')}
              </p>
            </div>
          </div>
        </div>
      </section> */}


      {/* Hero Section */}
      <section className="w-full bg-white flex items-start justify-center pt-16 md:pt-20 relative" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="relative w-full max-w-full">
          <img
            className="w-full h-auto object-cover"
            src="/cover-websitebar2 2.png"
            alt="Courses Cover"
            style={{ transform: isAr ? 'scaleX(-1)' : 'none' }}
          />
          <div className="absolute inset-0 flex items-center px-4 sm:px-10 md:px-16">
            <div className={`flex flex-col gap-1 sm:gap-2 w-full max-w-xl ${isAr ? 'items-start text-right pr-0' : 'items-start text-left'}`}>
              <div style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(32px, 8vw, 128px)', lineHeight: 1, width: '100%' }}>
                {isAr ? (
                  <div className="flex justify-start w-full">
                    <img 
                      src="/جاهزين في الوطن العربي 1.png" 
                      alt="جاهزين في الوطن العربي" 
                      className="max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain -mr-8 sm:-mr-12 md:-mr-16"
                    />
                  </div>
                ) : (
                  <span style={{ 
                    backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}>{t('hero.readyTo')}</span>
                )}
              </div>
              <p style={{ fontFamily: 'Lexend', fontWeight: 600, fontSize: 'clamp(18px, 4vw, 70px)', color: '#000000', lineHeight: 1, textAlign: isAr ? 'right' : 'left', width: '100%' }}>
                {t('hero.connect')}
              </p>
              <p style={{ fontFamily: 'Lexend', fontWeight: 300, fontSize: 'clamp(12px, 2vw, 30px)', backgroundImage: 'linear-gradient(to right, #7300FF, #00D0FF, #FF0000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', textAlign: isAr ? 'right' : 'left', width: '100%' }}>
                {t('hero.letsTalk')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-6 md:py-10 bg-white">
        <div className="w-full max-w-[1031px] mx-auto px-4 sm:px-8 lg:px-12">
          <style>{`
            @keyframes secureSpotBorder {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .secure-spot-border {
              background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0080ff, #8000ff, #00ff80);
              background-size: 300% 300%;
              animation: secureSpotBorder 3s ease infinite;
              padding: 1px;
              border-radius: 9999px;
            }
            .feedback-border {
              background: linear-gradient(90deg, #FF0AD2 0%, #FF0AD2 50%, #0AFFFF 75%, #0AFF26 70%, #0AD20A 70%, #FF0004 100%);
              padding: 2px;
              border-radius: 16px;
            }
            .form-input {
              width: 100%;
              padding: 12px 16px;
              border: 1.5px solid #d1d5db;
              border-radius: 10px;
              background: #fff;
              font-family: Lexend;
              font-size: 15px;
              outline: none;
              transition: border-color 0.2s;
            }
            .form-input:focus {
              border-color: #FFC800;
              box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
            }
            .form-textarea {
              width: 100%;
              padding: 12px 16px;
              border: 1.5px solid #d1d5db;
              border-radius: 10px;
              background: #fff;
              font-family: Lexend;
              font-size: 15px;
              outline: none;
              resize: none;
              height: 140px;
              transition: border-color 0.2s;
            }
            .form-textarea:focus {
              border-color: #FFC800;
              box-shadow: 0 0 0 3px rgba(255,200,0,0.15);
            }
          `}</style>
          <div className="secure-spot-border mb-6">
            <div className="rounded-full bg-white" style={{ padding: '4px' }}>
              <div className="rounded-full" style={{
                backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <div className="rounded-full px-4 sm:px-8 py-2 flex items-center justify-center">
                  <p className="text-center" style={{
                    fontFamily: 'Lexend',
                    fontWeight: 600,
                    fontSize: 'clamp(11px, 3vw, 45px)',
                    color: 'white',
                  }}>{t('form.title')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="feedback-border">
            <div className="bg-white rounded-[14px] p-6 sm:p-8">
              <form className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.name')} <span className="text-yellow-500">*</span></label>
                  <input type="text" className="form-input" />
                </div>
                <div>
                  <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.phone')} <span className="text-yellow-500">*</span></label>
                  <input type="tel" className="form-input" />
                </div>
                <div>
                  <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.email')} <span className="text-yellow-500">*</span></label>
                  <input type="email" placeholder={t('form.emailPlaceholder')} className="form-input" />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{ fontFamily: 'Lexend' }}>{t('form.faqLabel')} <span className="text-yellow-500">*</span></label>
                  <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
                    <div>
                      <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.levelQ')}</p>
                      <div className="flex flex-col gap-1">
                        {[t('form.beginner'), t('form.intermediate'), t('form.professional')].map(level => (
                          <label key={level} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
                            <input type="radio" name="level" value={level} className="accent-yellow-500" />
                            {level}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2" style={{ fontFamily: 'Lexend', fontSize: 'clamp(14px, 1.5vw, 20px)', backgroundImage: 'linear-gradient(to right, #FFC800, #534100)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t('form.goalQ')}</p>
                      <div className="flex flex-col gap-1">
                        {[t('form.goal1'), t('form.goal2'), t('form.goal3')].map(goal => (
                          <label key={goal} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'Lexend' }}>
                            <input type="radio" name="goal" value={goal} className="accent-yellow-500" />
                            {goal}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1" style={{ fontFamily: 'Lexend' }}>{t('form.message')} <span className="text-yellow-500">*</span></label>
                  <textarea className="form-textarea"></textarea>
                </div>
                <button type="submit" className="border border-black px-8 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Lexend' }}>
                  {t('form.sendBtn')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="w-full py-8 sm:py-12 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="font-bold mb-6 sm:mb-8" style={{
            fontFamily: 'Lexend',
            fontSize: 'clamp(20px, 4vw, 52px)',
            lineHeight: '1.2',
            backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}>
            {t('consultation.title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <ConsultationCarousel items={consultationItems} />
          <div className="hidden md:grid grid-cols-3 gap-6 justify-items-center">
            {consultationItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div style={{
                  background: 'linear-gradient(135deg, #FEBE01 0%, #4E1912 100%)',
                  borderRadius: '18px', padding: '2px',
                  width: '160px', height: '160px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div className="overflow-hidden" style={{
                    background: 'white', borderRadius: '16px',
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img 
                      src={item.gif} 
                      alt={item.lines[0]} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                </div>
                <p style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '20px', color: '#000', textAlign: 'center', lineHeight: '1.3' }}>
                  {item.lines.map((line, j) => (<span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared FAQ Section Component */}
      <FAQSection />

      {/* Stats Section */}
      <section className="w-full py-8 md:py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              {(isAr ? [
                { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
                { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
              ] : [
                { number: t('stats.s1Number'), desc: t('stats.s1Desc') },
                { number: t('stats.s2Number'), desc: t('stats.s2Desc') },
              ]).map((stat, i) => (
                <div key={i} className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3">
                    <CountUp value={stat.number} style={{
                      fontFamily: 'Lexend', fontWeight: 300,
                      fontSize: 'clamp(32px, 5vw, 80px)',
                      backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
                      backgroundSize: 'cover', backgroundPosition: 'bottom',
                      WebkitBackgroundClip: 'text', backgroundClip: 'text',
                      color: 'transparent', WebkitTextFillColor: 'transparent',
                      lineHeight: 1,
                    }} />
                    <span style={{
                      fontFamily: 'Lexend', fontWeight: 400,
                      fontSize: 'clamp(12px, 1.5vw, 18px)',
                      color: '#333', whiteSpace: 'pre-line', lineHeight: 1.3,
                    }}>{stat.desc}</span>
                  </div>
                  <div style={{ height: '2px', width: '80%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-1 w-full max-w-xl mx-auto">
              <span style={{ visibility: 'hidden', fontSize: 'clamp(40px, 8vw, 130px)', fontWeight: 500, lineHeight: 1, display: 'block' }}>{t('stats.s3Number')}</span>
              <CountUp value={t('stats.s3Number')} style={{
                fontFamily: 'Lexend', fontWeight: 500,
                fontSize: 'clamp(40px, 8vw, 130px)',
                backgroundImage: 'linear-gradient(to bottom, #F9BA01, #663010)',
                backgroundSize: 'cover', backgroundPosition: 'bottom',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent',
                lineHeight: 1, display: 'block', textAlign: 'center', width: '100%',
              }} />
              <div style={{ height: '2px', width: '100%', background: 'linear-gradient(to right, #FEBE01, #4E1912)' }} />
              <span style={{
                fontFamily: 'Lexend', fontWeight: 400,
                fontSize: 'clamp(12px, 1.5vw, 18px)',
                color: '#333', textAlign: 'center', width: '100%', display: 'block',
                whiteSpace: 'pre-line',
              }}>{t('stats.s3Desc')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Contact Section */}
      <section className="w-full py-8 bg-white">
        <div className="w-full -mt-4 lg:-mt-8 mb-4 flex justify-center items-center px-2 z-20 relative">
          <img 
            src="/Mask group.png" 
            alt="Banner Decoration" 
            className="w-full max-w-6xl h-auto min-h-[180px] md:min-h-[260px] max-h-[450px] object-contain mx-auto drop-shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden"
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;