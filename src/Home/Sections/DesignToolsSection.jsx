import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const DesignToolsSection = () => {
  const { t } = useTranslation('home');
  const [lineTexts, setLineTexts] = useState(['', '', '', '']);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  const lines = [
    t('designTools.quote'),
    t('designTools.line1'),
    '(Photoshop & Illustrator & Indesign)',
    t('designTools.line2'),
  ];

  const speed = 35;
  const lineDelays = lines.reduce((acc, line, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + lines[i - 1].length * speed + 200;
    acc.push(prev);
    return acc;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers = [];
    lines.forEach((line, li) => {
      let i = 0;
      const start = setTimeout(() => {
        const interval = setInterval(() => {
          i++;
          setLineTexts(prev => {
            const next = [...prev];
            next[li] = line.slice(0, i);
            return next;
          });
          if (i >= line.length) clearInterval(interval);
        }, speed);
        timers.push(interval);
      }, lineDelays[li]);
      timers.push(start);
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, t('designTools.quote')]);

  const goldStyle = {
    backgroundImage: 'linear-gradient(to right, #D7AD01, #FADD64)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-2 sm:space-y-3">

          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black">
            {lineTexts[0]}
            {lineTexts[0].length < lines[0].length && (
              <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
            )}
          </p>

          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
            {lineTexts[1]}
            {lineTexts[1].length < lines[1].length && (
              <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
            )}
          </p>

          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            {lineTexts[2].split('&').map((part, i, arr) => (
              <span key={i}>
                {part.includes('Photoshop') && <span style={goldStyle}>Photoshop</span>}
                {part.includes('Illustrator') && <span style={goldStyle}>Illustrator</span>}
                {part.includes('Indesign') && <span style={goldStyle}>Indesign</span>}
                {!part.includes('Photoshop') && !part.includes('Illustrator') && !part.includes('Indesign') && part}
                {i < arr.length - 1 && <span className="text-black"> & </span>}
              </span>
            ))}
            {lineTexts[2].length < lines[2].length && (
              <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
            )}
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black leading-relaxed">
            {lineTexts[3]}
            {lineTexts[3].length < lines[3].length && (
              <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
            )}
          </p>

        </div>
      </div>
    </section>
  );
};

export default DesignToolsSection;

