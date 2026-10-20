import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import AnimatedWords from "../../components/AnimatedWords/AnimatedWords";
import BASE_URL from "../../api/config";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";

const personImages = [
  "/a_ (1) 15.png",
  "/a_(1) 16.png",
  "/a_عا (1) 14.png",
];

function TraineesShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('home');
  const { isAr } = useLanguage();

  useEffect(() => {
    fetch(`${BASE_URL}/student-projects?per_page=15`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="w-full py-16 bg-white flex justify-center">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mt-20"></div>
    </section>
  );

  if (projects.length === 0) return null;

  return (
    <section className="w-full py-16 bg-white overflow-visible">
      <div className="text-center mb-16 px-4 sm:px-8 lg:px-16 overflow-visible">
        {['line1', 'line2', 'line3', 'line4'].map((key) =>
          t(`trainees.${key}`) ? (
            <h2
              key={key}
              className="font-bold leading-tight mb-2 break-words"
              style={{
                fontSize: 'clamp(1.25rem, 5vw, 4.5rem)',
                backgroundImage: "url(/nzrzOfxWPwo-4.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {t(`trainees.${key}`)}
            </h2>
          ) : null
        )}
      </div>

      <style>{`
        .trainee-swiper.swiper { overflow: visible !important; }
        .trainee-swiper .swiper-slide { overflow: visible !important; }
        .trainee-swiper .swiper-slide > div {
          transition: all 0.7s ease;
          transform: scale(0.9);
          opacity: 0.6;
        }
        .trainee-swiper .swiper-slide-active > div {
          transform: scale(1.1);
          opacity: 1;
          z-index: 20;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
        }
      `}</style>

      <Swiper
        modules={[Autoplay]}
        centeredSlides={true}
        slidesPerView={1.1}
        spaceBetween={4}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        observer={true}
        observeParents={true}
        watchSlidesProgress={true}
        breakpoints={{
          480: { slidesPerView: 1.2, spaceBetween: 6 },
          768: { slidesPerView: 3, spaceBetween: 8 },
          1024: { slidesPerView: 3, spaceBetween: 8 },
        }}
        className="trainee-swiper w-full pb-10"
      >
        {projects.map((project, index) => {
          const personSrc = project.author?.avatar_url || personImages[index % personImages.length];

          return (
            <SwiperSlide key={project.id} className="!pt-[140px] sm:!pt-[180px]">
              <div className="relative w-[280px] sm:w-[330px] lg:w-[380px] h-[480px] sm:h-[530px] lg:h-[585px] mx-auto flex flex-col items-center justify-end pb-10">
                <div className="absolute -top-32 sm:-top-40 z-0 w-full flex justify-center">
                  <img
                    alt={project.author?.name || "Trainee"}
                    className="w-[220px] sm:w-[275px] lg:w-[320px] h-auto object-contain pointer-events-none"
                    src={personSrc}
                    style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
                  />
                </div>

                <div className="relative z-10 bg-black text-white rounded-[25px] overflow-hidden shadow-2xl w-full h-[330px] sm:h-[370px] lg:h-[410px] flex flex-col">
                  <div className="h-1/2 w-full overflow-hidden">
                    {project.cover_image_url ? (
                      <img
                        alt="Work"
                        className="w-full h-full object-cover"
                        src={project.cover_image_url}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-center flex-grow text-left">
                    <h3 className="text-sm font-bold truncate">
                      {project.author?.name}
                    </h3>
                    {project.category && (
                      <p className="text-[10px] text-gray-400 mb-1">{project.category}</p>
                    )}
                    {((isAr ? project.description_ar : project.description_en) || project.description) && (
                      <p className="text-[11px] text-gray-300 leading-snug line-clamp-3">
                        {isAr ? (project.description_ar || project.description) : (project.description_en || project.description)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default TraineesShowcase;
