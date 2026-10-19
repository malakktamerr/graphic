import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses';
import { useLanguage } from '../hooks/useLanguage';

const splitLastWord = (text) => {
  if (!text) return text;
  const str = text.trim();
  const i = str.lastIndexOf(' ');
  if (i === -1) return str;
  return (
    <>
      {str.slice(0, i)}
      <br />
      {str.slice(i + 1)}
    </>
  );
};

const normalizeApiCourse = (c, isAr) => ({
  id: c.id,
  slug: c.slug,
  image: c.thumbnail_url,
  shortDesc: isAr ? (c.short_description_ar || c.short_description) : (c.short_description_en || c.short_description),
  longDesc: isAr ? (c.long_description_ar?.replace(/<[^>]*>/g, '') || c.long_description?.replace(/<[^>]*>/g, '')) : (c.long_description_en?.replace(/<[^>]*>/g, '') || c.long_description?.replace(/<[^>]*>/g, '')),
  duration: c.duration_minutes ? `${c.duration_minutes} min` : '—',
  students: c.enrollments_count,
  rating: Math.round(c.reviews_avg_rating) || 5,
});

const CourseCard = ({ course, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
  >
    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
        <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
      </div>
    </div>
    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-b from-transparent via-white to-transparent">
        <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
      </div>
    </div>
    <div className="relative z-10">
      <div className="relative mx-3 sm:mx-4 lg:mx-5 mt-3 aspect-[4/3] overflow-hidden shadow-2xl shadow-black/30 rounded-2xl sm:rounded-3xl group/img">
        <img src={course.image} alt={course.shortDesc} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" onError={(e) => { e.target.style.backgroundColor = '#1a1a1a'; }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center opacity-80 group-hover/img:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 border-2 border-white/80 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/img:scale-110 group-hover/img:bg-black/80">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-2">
        <div className="flex gap-4 text-gray-400 text-xs sm:text-sm mb-2">
          <span>⏱ {course.duration}</span>
          <span>👥 {course.students} Students</span>
        </div>
      </div>
      <div className="px-4 sm:px-5 lg:px-6 pb-4">
        <h3 className="font-bold text-base sm:text-lg leading-snug">{splitLastWord(course.shortDesc)}</h3>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{course.longDesc}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm sm:text-base ${course.rating && i < course.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="text-gray-400 text-xs ml-1">({course.students} review)</span>
          </div>
          <div className="flex items-center gap-1 text-black font-medium text-xs sm:text-sm cursor-pointer">
            <span>Enroll Course</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CoursesSection = () => {
  const navigate = useNavigate();
  const { isAr } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);

  useEffect(() => {
    getCourses({ per_page: 20 })
      .then((res) => {
        if (res?.data?.length) setCourses(res.data.map(c => normalizeApiCourse(c, isAr)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAr]);

  const displayCourses = courses.slice(0, 11);
  const total = displayCourses.length;

  const goTo = (i) => {
    clearInterval(autoRef.current);
    setCurrent(i);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3000);
  };

  useEffect(() => {
    if (total === 0) return;
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [total]);

  const handleClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="relative overflow-hidden">
      <section className="w-full bg-gray-100/40 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 rounded-[80px] sm:rounded-[100px] lg:rounded-[120px] relative z-10 mb-16 sm:mb-20 lg:mb-24 overflow-hidden">


        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{
              backgroundImage: 'url(/nzrzOfxWPwo-4.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {isAr ? 'محاضرات الدورة' : 'Our Course'}
            </h2>
            {isAr && (
              <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mt-4">
                <span className="block" style={{ lineHeight: '1.6' }}>مسارات تدريبية صُممت بعنايـــة</span>
                <span className="block" style={{ lineHeight: '1.6' }}>لتنقلك من مرحلة 'المُنفذ' إلى مكانة</span>
                <span className="block" style={{ lineHeight: '1.6' }}>الشريك الإبداعي</span>
              </h3>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* ── Mobile auto-slide ── */}
              <div className="md:hidden overflow-hidden pb-4 mb-6 -mx-4 px-4">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: isAr ? `translateX(${current * 100}%)` : `translateX(-${current * 100}%)` }}
                >
                  {displayCourses.map((course, i) => (
                    <div key={course.id || i} className="w-full flex-shrink-0 flex justify-center px-3">
                      <CourseCard course={course} onClick={() => handleClick(course)} className="w-full max-w-[85vw]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Desktop grid ── */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 pb-4 mb-6">
                {displayCourses.map((course, i) => (
                  <CourseCard key={course.id || i} course={course} onClick={() => handleClick(course)} />
                ))}
              </div>

              {/* Dots (mobile only) */}
              {total > 1 && (
                <div className="md:hidden flex justify-center gap-2 mb-8">
                  {displayCourses.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === current ? '28px' : '10px',
                        height: '10px',
                        background: i === current
                          ? 'linear-gradient(to right, #F9BA01, #663010)'
                          : '#D1D5DB',
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Subscribe button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/subscribe')}
              className="bg-black text-white px-12 sm:px-16 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl flex items-center gap-2 hover:bg-gray-900 transition-colors shadow-lg"
            >
              Subscribe to the course
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesSection;
