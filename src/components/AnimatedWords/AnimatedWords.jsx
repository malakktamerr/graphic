// import { useEffect, useRef, useState } from "react";

// const AnimatedWords = ({ text, className = "", style = {}, as = "h2", byLine = false, gradientPerLine = false }) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   const [lines, setLines] = useState([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setVisible(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (byLine && ref.current && visible) {
//       const element = ref.current;
//       const words = text.split(" ");
//       const tempLines = [];
//       let currentLine = [];
//       let testElement = document.createElement('span');
//       testElement.style.visibility = 'hidden';
//       testElement.style.position = 'absolute';
//       testElement.style.whiteSpace = 'nowrap';
      
//       // نسخ الـ styles من العنصر الأصلي
//       const computedStyle = window.getComputedStyle(element);
//       testElement.style.font = computedStyle.font;
//       testElement.style.fontSize = computedStyle.fontSize;
//       testElement.style.fontWeight = computedStyle.fontWeight;
      
//       document.body.appendChild(testElement);
      
//       const maxWidth = element.offsetWidth;
      
//       words.forEach((word) => {
//         currentLine.push(word);
//         testElement.textContent = currentLine.join(' ');
        
//         if (testElement.offsetWidth > maxWidth && currentLine.length > 1) {
//           currentLine.pop();
//           tempLines.push(currentLine.join(' '));
//           currentLine = [word];
//         }
//       });
      
//       if (currentLine.length > 0) {
//         tempLines.push(currentLine.join(' '));
//       }
      
//       document.body.removeChild(testElement);
//       setLines(tempLines);
//     }
//   }, [text, visible, byLine]);

//   const Tag = as;
//   const hasGradient = style.backgroundImage || style.background;

//   // دالة لحساب اللون لكل سطر (من غامق لفاتح)
//   const getLineColor = (index, total) => {
//     const startColor = 0x3F; // #3F3F3F (غامق)
//     const endColor = 0xA5;   // #A5A5A5(فاتح)
//     const step = (endColor - startColor) / (total - 1);
//     const colorValue = Math.round(startColor + (step * index));
//     const hex = colorValue.toString(16).padStart(2, '0');
//     return `#${hex}${hex}${hex}`;
//   };

//   // إذا كان byLine = true، نعرض السطور
//   if (byLine && lines.length > 0) {
//     return (
//       <Tag ref={ref} className={`overflow-hidden ${className}`} style={style}>
//         {lines.map((line, i) => (
//           <span
//             key={i}
//             className="block mb-3"
//             style={{
//               color: gradientPerLine ? getLineColor(i, lines.length) : undefined,
//               ...(hasGradient && !gradientPerLine ? style : {}),
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(24px)",
//               transition: `opacity 0.8s ease-out ${i * 0.4}s, transform 0.8s ease-out ${i * 0.4}s`,
//             }}
//           >
//             {line}
//           </span>
//         ))}
//       </Tag>
//     );
//   }

//   // الوضع الافتراضي: كلمة كلمة
//   return (
//     <Tag ref={ref} className={`overflow-hidden ${className}`} style={style}>
//       {text.split(" ").map((word, i) => (
//         <span
//           key={i}
//           className="inline-block mr-2"
//           style={{
//             ...(hasGradient ? style : {}),
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(24px)",
//             transition: `opacity 0.8s ease-out ${i * 0.2}s, transform 0.8s ease-out ${i * 0.2}s`,
//           }}
//         >
//           {word}
//         </span>
//       ))}
//     </Tag>
//   );
// };

// export default AnimatedWords;

import { useEffect, useRef, useState } from "react";

const AnimatedWords = ({ text, className = "", style = {}, as = "h2", byLine = false, gradientPerLine = false }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (byLine && ref.current && visible) {
      const element = ref.current;
      const words = text.split(" ");
      const tempLines = [];
      let currentLine = [];
      let testElement = document.createElement('span');
      testElement.style.visibility = 'hidden';
      testElement.style.position = 'absolute';
      testElement.style.whiteSpace = 'nowrap';
      
      // نسخ الـ styles من العنصر الأصلي
      const computedStyle = window.getComputedStyle(element);
      testElement.style.font = computedStyle.font;
      testElement.style.fontSize = computedStyle.fontSize;
      testElement.style.fontWeight = computedStyle.fontWeight;
      testElement.style.fontFamily = computedStyle.fontFamily || 'Lexend';
      
      document.body.appendChild(testElement);
      
      const maxWidth = element.offsetWidth;
      
      words.forEach((word) => {
        currentLine.push(word);
        testElement.textContent = currentLine.join(' ');
        
        if (testElement.offsetWidth > maxWidth && currentLine.length > 1) {
          currentLine.pop();
          tempLines.push(currentLine.join(' '));
          currentLine = [word];
        }
      });
      
      if (currentLine.length > 0) {
        tempLines.push(currentLine.join(' '));
      }
      
      document.body.removeChild(testElement);
      setLines(tempLines);
    }
  }, [text, visible, byLine]);

  const Tag = as;
  const hasGradient = style.backgroundImage || style.background;

  // دالة لحساب اللون لكل سطر (من غامق لفاتح)
  const getLineColor = (index, total) => {
    const startColor = 0x3F; // #3F3F3F (غامق)
    const endColor = 0xA5;   // #A5A5A5 (فاتح)
    const step = (endColor - startColor) / (total - 1);
    const colorValue = Math.round(startColor + (step * index));
    const hex = colorValue.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
  };

  // إذا كان byLine = true، نعرض السطور
  if (byLine && lines.length > 0) {
    return (
      <Tag ref={ref} className={`overflow-hidden ${className}`} style={{ fontFamily: 'Lexend', ...style }}>
        {lines.map((line, i) => (
          <span
            key={i}
            className="block mb-3"
            style={{
              color: gradientPerLine ? getLineColor(i, lines.length) : undefined,
              ...(hasGradient && !gradientPerLine ? style : {}),
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.8s ease-out ${i * 0.4}s, transform 0.8s ease-out ${i * 0.4}s`,
            }}
          >
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // الوضع الافتراضي: كلمة كلمة
  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`} style={{ fontFamily: 'Lexend', ...style }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block mr-2"
          style={{
            ...(hasGradient ? style : {}),
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.8s ease-out ${i * 0.2}s, transform 0.8s ease-out ${i * 0.2}s`,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedWords;