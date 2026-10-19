import { useEffect, useRef, useState } from 'react';

const AnimatedLetters = ({ 
  text, 
  className = '', 
  delay = 0.05, 
  as = 'span',
  animateOnView = true 
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(!animateOnView);

  useEffect(() => {
    if (!animateOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, [animateOnView]);

  const Tag = as;
  const letters = text.split('');

  return (
    <Tag ref={ref} className={className}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`animated-letter ${isVisible ? 'letter-visible' : ''}`}
          style={{
            animationDelay: `${index * delay}s`
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedLetters;
