import { useEffect, useRef, useState } from "react";

const AnimatedLines = ({ text, className = "", style = {}, as = "p", separator = "|" }) => {
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
  const hasGradient = style.backgroundImage || style.background;

  // تقسيم النص على أساس الفاصل (| أو أي فاصل آخر)
  const lines = text.split(separator).map(line => line.trim());

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`} style={hasGradient ? style : {}}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block"
          style={{
            ...(hasGradient ? style : {}),
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.8s ease-out ${i * 0.3}s, transform 0.8s ease-out ${i * 0.3}s`,
          }}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedLines;
