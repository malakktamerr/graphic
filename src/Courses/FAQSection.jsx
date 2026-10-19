import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import BASE_URL from '../api/config';

const FAQSection = () => {
  const { t } = useTranslation('courses');
  const { isAr } = useLanguage();
  const [openQuestion, setOpenQuestion] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/faqs?placement=courses`)
      .then(r => r.json())
      .then(json => {
        const items = (json.data || []).sort((a, b) => a.display_order - b.display_order);
        setFaqs(items.map(item => ({
          id: item.id,
          question: isAr ? (item.question_ar || item.question) : (item.question_en || item.question),
          answer: isAr ? (item.answer_ar || item.answer) : (item.answer_en || item.answer),
        })));
      })
      .catch((err) => console.error('Failed to fetch FAQs:', err))
      .finally(() => setLoading(false));
  }, [isAr]);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section className="w-full relative overflow-hidden">
      {/* Subtract Background Image - Outside all containers */}
      <img
        src="/Subtract.png"
        alt="Background"
        className={`absolute -top-[100px] w-full sm:w-[280%] h-[180vh] object-contain opacity-50 z-40 pointer-events-none ${isAr ? 'left-0 sm:-left-[300px]' : 'right-0 sm:-right-[500px]'}`}
        style={{ overflow: 'visible', transform: isAr ? 'scaleX(-1)' : 'none' }}
      />
      
      {/* Title - Above the black box, always visible */}
      <div className="text-center mb-8 px-4 py-8" style={{background: 'transparent'}}>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg"
          style={{
            backgroundImage: 'linear-gradient(90deg, #BD8800, #FFD100, #9C6B00)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {t('faq.title')}
        </h2>
      </div>

      {/* Black Background Section */}
      <div className="bg-black py-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
          {/* Left Side - FAQ List */}
          <div className="w-full lg:w-1/2 space-y-8 mt-16">
            <h3
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${isAr ? 'text-right' : 'text-left'}`}
              style={{
                backgroundImage: 'linear-gradient(90deg, #BD8800, #FFD100, #9C6B00)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {t('faq.title')}
            </h3>
            
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : null}
            {faqs.map((faq) => (
              <div key={faq.id} className="pb-6">
                {/* Clickable Question */}
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <h4 className="text-lg font-medium text-white leading-relaxed flex-1">
                    {faq.question}
                  </h4>
                  <span className="text-2xl text-yellow-500 ml-4 flex-shrink-0">
                    {openQuestion === faq.id ? '−' : '+'}
                  </span>
                </div>
                
                {/* Two orange lines under each question */}
                <div className="w-full mb-4">
                  <div className="w-full h-1 bg-orange-400"></div>
                  <div className="w-full h-0.5 bg-orange-300 opacity-60 mt-1"></div>
                </div>
                
                {/* Answer - Toggle visibility */}
                {openQuestion === faq.id && (
                  <div className="mb-4">
                    <div className="text-green-400 font-semibold mb-3 text-lg">{t('faq.answer')}</div>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex w-full lg:w-1/2 relative self-start">
            <div className="relative p-4 sm:p-8 overflow-visible">
              {/* Background Icons */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>

              {/* Images */}
              <div className="relative z-10 flex flex-col justify-center items-center w-full overflow-visible lg:ml-24">
                {/* First image */}
                <img
                  src="/Mask group (7).png"
                  alt="Abdullah Al-Nasr"
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-4xl h-auto object-contain relative z-80"
                />
                
                {/* Second image */}
                <img
                  src="/2 post 1.png"
                  alt="Abdullah Al-Nasr"
                  className="w-full h-auto object-contain -mt-16 sm:-mt-40 lg:-mt-80 lg:min-h-[800px] lg:scale-125 relative z-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;