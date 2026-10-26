// import AnimatedWords from "../../components/AnimatedWords/AnimatedWords";
// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "../../hooks/useLanguage";
// import BASE_URL from "../../api/config";

// const fallbackProjects = [
//   { id: 1, image: "/Excellence-in-Graphic-Design 12.png", name: "Brandin" },
//   { id: 2, image: "/Excellence-in-Graphic-Design 11.png", name: "Nescafe" },
//   { id: 3, image: "/Excellence-in-Graphic-Design 9.png", name: "DiDi" },
//   { id: 4, image: "/Excellence-in-Graphic-Design 8.png", name: "Project 4" },
//   { id: 5, image: "/Excellence-in-Graphic-Design 7.png", name: "Project 5" },
//   { id: 6, image: "/Excellence-in-Graphic-Design 10.png", name: "Project 6" },
//   { id: 7, image: "/Excellence-in-Graphic-Design 7.png", name: "Project 5 Copy" },
//   { id: 8, image: "/Excellence-in-Graphic-Design 10.png", name: "Project 6 Copy" }
// ];

// function ContactSection() {
//   const { t } = useTranslation('home');
//   const { isAr } = useLanguage();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [projects, setProjects] = useState(fallbackProjects);

//   useEffect(() => {
//     fetch(`${BASE_URL}/training-projects?per_page=15&featured=false&all_locales=false&search=`)
//       .then(r => r.json())
//       .then(data => {
//         const items = (data.data || []).map(p => ({
//           id: p.id,
//           image: p.thumbnail_url || p.cover_image_url,
//           name: p.title,
//         })).filter(p => p.image);
//         if (items.length > 0) setProjects(items);
//       })
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % projects.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [projects.length]);

//   return (
//     <section className="w-full py-16 bg-white font-lexend overflow-hidden">
//       {/* Title above image */}
//       <div className="w-full max-w-6xl mx-auto px-4 mb-16">
//         {/* Title */}
//         <div className="w-full flex items-center justify-center mb-8">
//           <h2
//             className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center"
//             style={{
//               backgroundImage: 'linear-gradient(90deg, #BD8800, #FFD100, #9C6B00)',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               color: 'transparent',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             {t('contact.title')}
//           </h2>
//         </div>

//         {/* Cover Image */}
//         <div className="w-full flex justify-center" style={{ marginTop: '50px' }}>
//           <img
//             src={isAr ? "/cover-websitebar2.png" : "/cover-websitebar.png"}
//             alt="Trainees"
//             className="w-[80%] h-auto object-contain"
//           />
//         </div>
//       </div>

//       {/* Scrolling Projects - 3D Carousel */}
//       <div className="w-full perspective-container py-6 sm:py-12">
//         <div className="flex justify-center items-center relative overflow-hidden" style={{ height: 'clamp(200px, 45vw, 450px)', width: '100%' }}>
//           {projects.map((project, index) => {
//             const position = (index - currentIndex + projects.length) % projects.length;
            
//             let styles = {
//               position: 'absolute',
//               transition: 'all 0.7s ease-in-out'
//             };
            
//             if (position === 0) {
//               styles = { ...styles, left: '50%', transform: 'translateX(-50%)', zIndex: 3, opacity: 1 };
//             } else if (position === projects.length - 1 || position === -1) {
//               styles = { ...styles, left: '-1%', transform: 'perspective(1000px) rotateY(-25deg) scaleX(1.3) translateZ(-100px)', zIndex: 1, opacity: 1 };
//             } else if (position === 1) {
//               styles = { ...styles, right: '-1%', transform: 'perspective(1000px) rotateY(25deg) scaleX(1.3) translateZ(-100px)', zIndex: 1, opacity: 1 };
//             } else if (position === 2) {
//               styles = { ...styles, right: '-30%', transform: 'perspective(1000px) rotateY(45deg) scaleX(1.5) translateZ(-200px)', zIndex: 0, opacity: 0 };
//             } else {
//               styles = { ...styles, left: '-30%', transform: 'perspective(1000px) rotateY(-45deg) scaleX(1.5) translateZ(-200px)', zIndex: 0, opacity: 0 };
//             }
            
//             return (
//               <div 
//                 key={project.id}
//                 className={position === 0 
//                   ? "w-[55vw] sm:w-[450px] md:w-[500px] h-[32vw] sm:h-[300px] md:h-[350px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
//                   : "w-[55vw] sm:w-[450px] h-[32vw] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
//                 }
//                 style={styles}
//               >
//                 <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ContactSection;

import AnimatedWords from "../../components/AnimatedWords/AnimatedWords";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";
import BASE_URL from "../../api/config";

const fallbackProjects = [
  { id: 1, image: "/Excellence-in-Graphic-Design 12.png", name: "Brandin" },
  { id: 2, image: "/Excellence-in-Graphic-Design 11.png", name: "Nescafe" },
  { id: 3, image: "/Excellence-in-Graphic-Design 9.png", name: "DiDi" },
  { id: 4, image: "/Excellence-in-Graphic-Design 8.png", name: "Project 4" },
  { id: 5, image: "/Excellence-in-Graphic-Design 7.png", name: "Project 5" },
  { id: 6, image: "/Excellence-in-Graphic-Design 10.png", name: "Project 6" },
  { id: 7, image: "/Excellence-in-Graphic-Design 7.png", name: "Project 5 Copy" },
  { id: 8, image: "/Excellence-in-Graphic-Design 10.png", name: "Project 6 Copy" }
];

function ContactSection() {
  const { t } = useTranslation('home');
  const { isAr } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch(`${BASE_URL}/training-projects?per_page=15&featured=false&all_locales=false&search=`)
      .then(r => r.json())
      .then(data => {
        const items = (data.data || []).map(p => ({
          id: p.id,
          image: p.thumbnail_url || p.cover_image_url,
          name: p.title,
        })).filter(p => p.image);
        if (items.length > 0) setProjects(items);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section className="w-full py-16 bg-white font-lexend overflow-hidden">
      {/* <div className="w-full max-w-6xl mx-auto px-4 mb-16">
        <div className="w-full flex items-center justify-center mb-8">
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center py-4 leading-relaxed overflow-visible"
            style={{
              backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.4',
            }}
          >
            {t('contact.title')}
          </h2>
        </div>

        <div className="w-full flex justify-center" style={{ marginTop: '50px' }}>
          <img
            src={isAr ? "/cover-websitebar2.png" : "/cover-websitebar2.png"}
            alt="Trainees"
            className="w-[90%] h-auto object-contain "
          />
        </div>
      </div> */}













      {/* Scrolling Projects - 3D Carousel */}
      <div className="w-full perspective-container py-6 sm:py-12">
        <div className="flex justify-center items-center relative overflow-hidden" style={{ height: 'clamp(200px, 45vw, 450px)', width: '100%' }}>
          {projects.map((project, index) => {
            const position = (index - currentIndex + projects.length) % projects.length;
            
            let styles = {
              position: 'absolute',
              transition: 'all 0.7s ease-in-out'
            };
            
            if (position === 0) {
              styles = { ...styles, left: '50%', transform: 'translateX(-50%)', zIndex: 3, opacity: 1 };
            } else if (position === projects.length - 1 || position === -1) {
              styles = { ...styles, left: '-1%', transform: 'perspective(1000px) rotateY(-25deg) scaleX(1.3) translateZ(-100px)', zIndex: 1, opacity: 1 };
            } else if (position === 1) {
              styles = { ...styles, right: '-1%', transform: 'perspective(1000px) rotateY(25deg) scaleX(1.3) translateZ(-100px)', zIndex: 1, opacity: 1 };
            } else if (position === 2) {
              styles = { ...styles, right: '-30%', transform: 'perspective(1000px) rotateY(45deg) scaleX(1.5) translateZ(-200px)', zIndex: 0, opacity: 0 };
            } else {
              styles = { ...styles, left: '-30%', transform: 'perspective(1000px) rotateY(-45deg) scaleX(1.5) translateZ(-200px)', zIndex: 0, opacity: 0 };
            }
            
            return (
              <div 
                key={project.id}
                className={position === 0 
                  ? "w-[55vw] sm:w-[450px] md:w-[500px] h-[32vw] sm:h-[300px] md:h-[350px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  : "w-[55vw] sm:w-[450px] h-[32vw] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                }
                style={styles}
              >
                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
