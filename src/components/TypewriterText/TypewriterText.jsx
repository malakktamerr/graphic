import { useEffect, useRef, useState } from 'react';

const TypewriterText = ({ text, className = '', style = {}, speed = 50, as = 'h2', delay = 0, onComplete }) => {
  const ref = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [hasStarted, text, speed, delay, onComplete]);

  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={style}>
      {displayedText}
      {hasStarted && !isComplete && (
        <span className="animate-pulse">|</span>
      )}
    </Tag>
  );
};

export default TypewriterText;
