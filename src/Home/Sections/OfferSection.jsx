import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';

const cardsData = [
  {
    title: "Professionalism Guide",
    title_ar: "دليل الاحترافية",
    image: "/ChatGPT 4.png",
    desc: "We reveal to you the keys to dealing with elite clients and show you how to build a strong presence, price your services confidently, and manage your projects professionally—placing you at the forefront of the market.",
    desc_ar: "نكشف لك مفاتيح التعامل مع العملاء النخبة، ونعلمك كيف تبني حضوراً قوياً، وتُسعّر خدماتك بثقة، وتدير مشاريعك باحترافية لتكون في صدارة السوق."
  },
  {
    title: "Your essential guide to professionalism and building a presence in the Gulf market",
    title_ar: "علامة تجارية قوية",
    image: "/ChatGPT 2.png",
    desc: "We reveal to you the keys to dealing with elite clients and show you how to build a strong presence, price your services confidently, and manage your projects professionally—placing you at the forefront of the market.",
    desc_ar: "ستتعلم بناء هوية علامة تجارية متكاملة، وتحويل الشعار إلى قصة، واستخدام التصميم لتحقيق أهداف تجارية حقيقية."
  },
  {
    title: "Building a Strong Brand",
    title_ar: "خبرة حقيقية",
    image: "/ChatGPT 1.png",
    desc: "You will learn how to build a comprehensive brand identity, turn a logo into a story, and use design to achieve real business goals.",
    desc_ar: "نقدم لك خلاصة سنوات من الخبرة العملية: تنفيذ مشاريع حية، فهم عقليات ومتطلبات العملاء، وإنتاج أعمال تستحق أثماناً احترافية عالية."
  },
  {
    title: "Practical, Real-World Experience",
    title_ar: "عقلية احترافية",
    image: "/Mask group (2).png",
    desc: "We provide you with the essence of years of real-world experience: executing live projects, understanding client mindsets and requirements, and creating work that commands high professional fees..",
    desc_ar: "لن تتعلم برامج وأدوات فقط، بل ستتعلم كيف يفكر المصمم المحترف: كيف يحلل، يبتكر، ويقدم تصميماً يُباع ويُقدَّر."
  },
  {
    title: "Learning with a Professional Mindset",
    title_ar: "سوق العمل",
    image: "/Mask groupo.png",
    desc: "You won't just learn software and tools; you'll learn how a professional designer thinks: how to analyze, innovate, and present a design that sells and is valued.",
    desc_ar: "نكشف أسرار التعامل مع العملاء المميزين، كيفية التسعير بثقة، وإدارة المشاريع باحترافية دون توتر أو فوضى."
  },
  {
    title: "Continuous Support... More Than Just a Course",
    title_ar: "دعم مستمر",
    image: "/ChatGPT 4.png",
    desc: "You're not buying a course… you're building a professional foundation that grows with you for life.",
    desc_ar: "أنت لا تشتري كورساً… أنت تبني قاعدة احترافية تنمو معك مدى الحياة."
  },
  {
    title: "Continuous Support",
    title_ar: "دعم مستمر",
    image: "/Mask roup (12).png",
    desc: "You're not buying a course… you're building a professional foundation that grows with you for life.",
    desc_ar: "معنا لست وحدك؛ نقدم لك مراجعات مستمرة وبناءة لأعمالك، وإرشاداً مهنياً استراتيجياً، ونصائح عملية تميزك عن الآخرين."
  },
  {
    title: "Mastering the Job Market (Especially the Gulf)",
    title_ar: "دليل الاحترافية",
    image: "/Mask group (12).png",
    desc: "We reveal to you the keys to dealing with elite clients and show you how to build a strong presence, price your services confidently, and manage your projects professionally—placing you at the forefront of the market.",
    desc_ar: "نكشف لك مفاتيح التعامل مع العملاء النخبة، ونعلمك كيف تبني حضوراً قوياً، وتُسعّر خدماتك بثقة، وتدير مشاريعك باحترافية لتكون في صدارة السوق."
  }
];

const getCols = () => {
  if (typeof window !== 'undefined' && window.innerWidth < 640) return 1;
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return 2;
  return 4;
};

const OfferSection = () => {
  const { t } = useTranslation('home');
  const { isAr } = useLanguage();
  const [cols, setCols] = useState(getCols());
  const [page, setPage] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const handleResize = () => setCols(getCols());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const duplicated = [...cardsData, ...cardsData, ...cardsData, ...cardsData, ...cardsData];
  const pages = [];
  for (let i = 0; i < duplicated.length; i += cols) {
    pages.push(duplicated.slice(i, i + cols));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(prev => {
        if (prev >= pages.length - 2) {
          setTransition(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, [cols]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  const isMobile = cols === 1;
  const translateAmount = isMobile ? 85 : 100;

  return (
    <section className="w-full bg-whit py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="w-full overflow-hidden py-10 px-6">
        <div className={`flex ${transition ? 'transition-transform duration-500 ease-in-out' : ''}`} style={{ transform: isAr ? `translateX(${page * translateAmount}%)` : `translateX(-${page * translateAmount}%)` }}>
          {pages.map((pageCards, pi) => (
            <div key={pi} className="flex" style={{ minWidth: isMobile ? '85%' : '100%' }}>
              {pageCards.map((card, ci) => (
                <div key={`${pi}-${ci}`} className={isMobile ? 'w-full px-2.5' : cols === 2 ? 'w-1/2 px-2.5' : 'w-1/4 px-2.5'}>
                  <div className="bg-[#000] max-w-sm rounded-[30px] overflow-hidden flex flex-col h-full text-white shadow-2xl mx-auto">
                    <div className="p-[1.5px] rounded-t-[30px] bg-gradient-to-r from-blue-400 via-green-400 to-purple-500">
                      <div className="overflow-hidden rounded-t-[28px]">
                        <img className="w-full h-56 object-cover" alt={card.title} src={card.image} />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-black">
                      <h5 className="mb-3 text-xl font-bold text-center tracking-tight">
                        {isAr ? card.title_ar : card.title}
                      </h5>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-4 h-4 bg-lime-500 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {isAr ? card.desc_ar : card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
