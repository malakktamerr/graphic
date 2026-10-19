import { useEffect, useRef, useState } from 'react';

const AnimatedHeading = ({ children, className = '', style = {}, as = 'h2' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`
        ${className}
        ${!isVisible ? 'heading-hidden' : 'heading-animate'}
      `}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default AnimatedHeading;
