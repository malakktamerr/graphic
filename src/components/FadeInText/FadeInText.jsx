import { useEffect, useRef, useState } from "react";

const FadeInText = ({ text, className = "", style = {}, as = "p", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag 
      ref={ref} 
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 1.2s ease-out ${delay}s, transform 1.2s ease-out ${delay}s`,
      }}
    >
      {text}
    </Tag>
  );
};

export default FadeInText;
