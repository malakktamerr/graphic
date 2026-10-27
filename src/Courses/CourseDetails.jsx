

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaCircleCheck, FaEye, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import BASE_URL from '../api/config';
import { getComments } from '../api/comments';
import ComentSection from './ComentSection';

const avatarImages = ["/32 1.png", "/32 2.png", "/32 3.png", "/84 1.png"];

function CourseDetails() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('courseDetails');
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [loadingFreeLecture, setLoadingFreeLecture] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const videoRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'VIDEO') {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        navigator.clipboard.writeText('');
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'S') e.preventDefault();
      if (e.metaKey && e.shiftKey && e.key === 's') e.preventDefault();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.querySelectorAll('video').forEach(v => v.pause());
      }
    };

    const handleFullscreenChange = () => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl) {
        const old = fsEl.querySelector('.fs-watermark');
        if (old) old.remove();
        const wm = document.createElement('div');
        wm.className = 'fs-watermark';
        wm.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255,255,255,0.2);
          font-size: 48px;
          font-weight: bold;
          pointer-events: none;
          user-select: none;
          z-index: 99999;
          white-space: nowrap;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        `;
        wm.textContent = user?.email || user?.name || 'Protected';
        fsEl.appendChild(wm);

        const blockKeysInFs = (e) => {
          if (e.key === 'PrintScreen') {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard?.writeText('');
          }
          if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (e.metaKey && e.shiftKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (e.altKey && e.key === 'PrintScreen') {
            e.preventDefault();
            e.stopPropagation();
          }
        };

        fsEl.addEventListener('keydown', blockKeysInFs, true);
        fsEl._blockKeysInFs = blockKeysInFs;
      } else {
        document.querySelectorAll('.fs-watermark').forEach(el => el.remove());
        const allEls = document.querySelectorAll('[data-fs-listener]');
        allEls.forEach(el => {
          if (el._blockKeysInFs) {
            el.removeEventListener('keydown', el._blockKeysInFs, true);
            delete el._blockKeysInFs;
          }
        });
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      const s = document.getElementById('watermark-style');
      if (s) s.remove();
    };
  }, [user, isAr]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://elnasrcourses.com/api/v1/contact-info')
      .then(r => r.json())
      .then(json => {
        const links = json?.en?.social_links || json?.ar?.social_links || {};
        setSocialLinks(links);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!lessonData) return;
    const enrolled = lessonData?.is_enrolled
      ?? lessonData?.course?.is_enrolled
      ?? lessonData?.enrolled
      ?? false;
    if (enrolled) {
      setIsEnrolled(true);
      const stored = JSON.parse(localStorage.getItem('user') || 'null');
      if (stored) {
        stored.is_enrolled = true;
        localStorage.setItem('user', JSON.stringify(stored));
      }
    }
  }, [lessonData]);

  useEffect(() => {
    getComments({ per_page: 20 })
      .then((json) => setComments(json.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);
    setLoadingVideo(true);
    const token = localStorage.getItem('token');
    fetch(`${BASE_URL}/lectures/${lessonId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    })
      .then((r) => r.json())
      .then(async (json) => {
        setLessonData(json);
        const lessonObj = json?.lesson;
        const directVideoUrl = lessonObj?.video_url 
          || lessonObj?.video_file_url 
          || lessonObj?.stream_url
          || json?.video_url
          || json?.stream_url;

        if (lessonObj?.requires_token && token) {
          try {
            const tokenResponse = await fetch(`${BASE_URL}/videos/token`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({ lesson_id: lessonId })
            });
            const tokenData = await tokenResponse.json();
            
            if (tokenData?.data?.stream_url) {
              setActiveVideoUrl(tokenData.data.stream_url);
            } else if (tokenData?.stream_url) {
              setActiveVideoUrl(tokenData.stream_url);
            } else if (directVideoUrl) {
              setActiveVideoUrl(directVideoUrl);
            }
          } catch (error) {
            console.error('Error fetching video token:', error);
            if (directVideoUrl) setActiveVideoUrl(directVideoUrl);
          }
        } else if (directVideoUrl) {
          setActiveVideoUrl(directVideoUrl);
        }
        
        setLoadingVideo(false);
        
        const cId = json?.course?.id || json?.meta?.course_id || json?.lesson?.course_id;
        const token2 = localStorage.getItem('token');
        if (cId && token2) {
          fetch(`${BASE_URL}/courses/${cId}/checkout`, {
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token2}` },
          })
            .then(r => r.json())
            .then(cJson => {
              if (cJson?.data?.already_enrolled === true) {
                setIsEnrolled(true);
              }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setLoadingVideo(false);
      });
  }, [lessonId]);

  const lesson = lessonData?.lesson;
  const course = lessonData?.course;
  const meta = lessonData?.meta;
  const courseLessons = lessonData?.lessons_ordered || lessonData?.course_lessons || [];
  
  const currentLesson = courseLessons.find((l) => String(l.id) === String(lessonId))
    || lesson
    || (() => {
      const modules = lessonData?.data || [];
      for (const mod of modules) {
        const found = (mod.lessons || []).find((l) => String(l.id) === String(lessonId));
        if (found) return found;
      }
      return null;
    })();
  const freeLessons = courseLessons.filter((l) => l.is_free_preview);

  const courseData = {
    title: course?.title || meta?.course_title || lesson?.title_en || lesson?.title || t('breadcrumb.courses'),
    instructor: course?.instructor?.name || "Abdullah Elnasr",
    price: course?.price ? `${course.price} SAR` : "1000 SAR",
    lastUpdate: "11/2025",
    videoUrl: lesson?.video_url || course?.thumbnail_url || "/11 1.png",
    features: [
      t('sidebar.features.certificate'),
      t('sidebar.features.lifetime'),
      t('sidebar.features.download'),
      t('sidebar.features.access')
    ],
  };

  const tabs = [
    { id: 'all', label: t('tabs.all') },
    { id: 'overview', label: t('tabs.overview') },
    { id: 'content', label: t('tabs.content') },
    { id: 'details', label: t('tabs.details') },
    { id: 'instructor', label: t('tabs.instructor') },
    { id: 'reviews', label: t('tabs.reviews') }
  ];

  const testimonials = comments.map((c, index) => ({
    name: c.name,
    title: '',
    quote: c.message,
    rating: c.rating,
    image: avatarImages[index % avatarImages.length],
  }));

  const handleTryFreeLecture = async () => {
    setLoadingFreeLecture(true);
    try {
      const response = await fetch(`${BASE_URL}/free-lectures`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      const firstFreeLecture = data?.data?.[0];
      const videoUrl = firstFreeLecture?.video_file_url || firstFreeLecture?.video_url;
      if (videoUrl) {
        setActiveVideoUrl(videoUrl);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/course-videos');
      }
    } catch (error) {
      console.error('Error fetching free lecture:', error);
      navigate('/course-videos');
    } finally {
      setLoadingFreeLecture(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-25">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="mb-4">
              <nav className="text-lg text-black font-bold">
                <Link to="/" className="hover:text-gray-600 transition-colors">{t('breadcrumb.home')}</Link>
                <span> &gt; </span>
                <Link to="/course-videos" className="hover:text-gray-600 transition-colors">{t('breadcrumb.courses')}</Link>
                <span> &gt; </span>
                <span>{t('breadcrumb.subscribe')}</span>
              </nav>
            </div>

            <div className="flex items-center mb-6">
              <img
                src="/profile.png"
                alt="Instructor"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-black">{courseData.instructor}</h3>
                <p className="text-black">{t('instructor')}</p>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 whitespace-nowrap">
              {isAr ? (lesson?.title_ar || lesson?.title || courseData.title) : (lesson?.title_en || lesson?.title || courseData.title)}
            </h1>

            <p className="mb-10" style={{ color: '#9E9E9E' }}>
              {isAr ? (lesson?.description_ar || lesson?.description) : (lesson?.description_en || lesson?.description) || 'Master Python by building 100 projects in 100 days.'}<br />
              {isAr ? (course?.short_description_ar || course?.short_description) : (course?.short_description_en || course?.short_description) || 'Learn data science, automation, build websites games and apps!'}
            </p>

            <div className="flex items-center gap-6 mb-8 text-sm text-black">
              <div className="flex items-center">
                <span className="flex items-center" style={{ color: '#9E9E9E' }}>
                  <MdOutlineDateRange className="mr-1" style={{ color: '#9E9E9E' }} />
                  {t('lastUpdate')} {courseData.lastUpdate}
                </span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center" style={{ color: '#9E9E9E' }}>
                  <img src="/world-book-day_12133395 1.png" alt="Certified" className="w-4 h-4 mr-1" />
                  {t('certifiedCourse')}
                </span>
              </div>
            </div>

            <div className="video-wrapper relative mb-8 rounded-2xl bg-black" style={{ userSelect: 'none', WebkitUserSelect: 'none', overflow: 'hidden' }}>
              {loadingVideo ? (
                <div className="w-full h-80 sm:h-96 lg:h-[550px] flex items-center justify-center bg-black">
                  <p className="text-white">{t('loading')}</p>
                </div>
              ) : (activeVideoUrl || lesson?.video_url) ? (
                <>
                  <video
                    ref={videoRef}
                    key={activeVideoUrl || lesson?.video_url}
                    className="w-full h-80 sm:h-96 lg:h-[550px] object-cover"
                    controls
                    autoPlay
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                  >
                    <source src={activeVideoUrl || lesson?.video_url} type="video/mp4" />
                  </video>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'rgba(255,255,255,0.2)',
                      fontSize: 'clamp(14px, 2.5vw, 36px)',
                      fontWeight: 'bold',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      zIndex: 10,
                      whiteSpace: 'nowrap',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                    }}
                  >
                    {user?.email || user?.name || 'Protected'}
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={course?.thumbnail_url || "/11 1.png"}
                    alt="Course preview"
                    className="w-full h-80 sm:h-96 lg:h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Graphics</h3>
                    <p className="text-sm opacity-90">GRAPHIC EXPERIENCES</p>
                  </div>
                </>
              )}
            </div>

            <div className="mb-6 flex justify-center">
              <nav className="bg-black rounded-full p-1 flex space-x-1 w-full max-w-[705px] h-12 items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 h-10 rounded-full font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-black'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              {(activeTab === 'all' || activeTab === 'overview') && (
                <div className="rounded-lg p-6 border border-gray-300" style={{
                  background: 'linear-gradient(45deg, #FFFFFF 0%, #E8E6E6 100%)',
                  borderColor: '#D1D1D1'
                }}>
                  <h3 className="font-semibold mb-6 text-black border-b pb-3" style={{ borderColor: '#D1D1D1' }}>{t('overview.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div>
                      <h4 className="font-medium text-black mb-2 flex items-center gap-2">
                        <span>CUTTING</span>
                        <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      </h4>
                      <p className="font-medium text-black flex items-center gap-2 ml-0">
                        <span>brush too</span>
                        <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-2 flex items-center gap-2">
                        <span>MOCKUPS</span>
                        <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      </h4>
                    </div>
                  </div>
                  <button className="text-green-600 text-bold mt-6 hover:text-green-700 transition-colors">
                    {t('overview.showMore')}
                  </button>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'content') && (
                <div className="rounded-lg p-6 border border-gray-300" style={{
                  background: 'linear-gradient(45deg, #FFFFFF 0%, #E8E6E6 100%)',
                  borderColor: '#D1D1D1'
                }}>
                  <h3 className="font-semibold mb-4 text-black border-b pb-3" style={{ borderColor: '#D1D1D1' }}>
                    {t('content.title')} — {courseLessons.length} {t('content.lessons')}
                  </h3>
                  <div className="space-y-2">
                    {loading ? (
                      <p className="text-gray-400 text-sm">{t('content.loading')}</p>
                    ) : (
                      courseLessons.map((l) => (
                        <button
                          key={l.id}
                          onClick={async () => {
                            navigate(`/lecture/${l.id}`);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                            l.is_current ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100 text-black'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${l.is_current ? 'bg-white' : 'bg-gray-200'}`}>
                              <svg className={`w-3 h-3 ml-0.5 ${l.is_current ? 'text-black' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                            <span className="text-sm font-medium">{isAr ? (l.title_ar || l.title) : (l.title_en || l.title)}</span>
                            {l.is_free_preview && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{t('content.free')}</span>
                            )}
                          </div>
                          <span className="text-xs opacity-60 flex-shrink-0">
                            {l.duration_minutes ? `${l.duration_minutes} min` : ''}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                  <button className="text-green-600 text-bold mt-6 hover:text-green-700 transition-colors">
                    {t('content.showMore')}
                  </button>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'details') && (
                <div className="rounded-lg p-6 border border-gray-300" style={{
                  background: 'linear-gradient(45deg, #FFFFFF 0%, #E8E6E6 100%)',
                  borderColor: '#D1D1D1'
                }}>
                  <h3 className="font-semibold mb-4 text-black border-b pb-3" style={{ borderColor: '#D1D1D1' }}>{t('details.title')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm gap-2">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      <span>{t('details.level')} {course?.level || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      <span>{t('details.language')} {course?.language || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      <span>{t('details.duration')} {lesson?.duration_minutes ? `${lesson.duration_minutes} min` : 'N/A'}</span>
                    </div>
                  </div>
                  <button className="text-green-600 text-bold mt-6 hover:text-green-700 transition-colors">
                    {t('details.showMore')}
                  </button>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'instructor') && (
                <div className="rounded-lg p-6 border border-gray-300" style={{
                  background: 'linear-gradient(45deg, #FFFFFF 0%, #E8E6E6 100%)',
                  borderColor: '#D1D1D1'
                }}>
                  <h3 className="font-semibold mb-4 text-black border-b pb-3" style={{ borderColor: '#D1D1D1' }}>{t('instructorSection.title')}</h3>
                  <div className="flex items-center mb-4">
                    <img src="/profile.png" alt="Instructor" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold text-black">{courseData.instructor}</h4>
                      <p className="text-sm text-gray-600">{t('instructorSection.role')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-black">{t('instructorSection.bio')}</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[440px]">
              <div className="bg-black text-white rounded-2xl p-6 mb-6 w-full max-w-[450px] mx-auto border border-gray-800" style={{ height: '300px' }}>
                {isEnrolled ? (
                  <>
                    <h3 className="text-xl font-bold mb-6">{currentLesson?.title_en || currentLesson?.title || course?.title || meta?.course_title}</h3>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.play().catch(() => {});
                          videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="w-full h-[51px] rounded-lg font-bold text-black text-lg mb-3 flex items-center justify-center gap-2"
                      style={{ background: '#00FFFF' }}
                    >
                      {t('sidebar.play')}
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button
                      onClick={handleTryFreeLecture}
                      disabled={loadingFreeLecture}
                      className="w-full h-[51px] border border-white text-white rounded-lg flex items-center justify-center gap-2 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      {loadingFreeLecture ? t('loading') : t('sidebar.tryFree')}
                      {!loadingFreeLecture && <FaEye className="w-4 h-4" />}
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2">{currentLesson?.title_en || currentLesson?.title || course?.title || meta?.course_title}</h3>
                    <p className="text-2xl font-bold mb-4">{courseData.price}</p>
                    <button
                      onClick={() => navigate(`/checkout/${course?.id || lessonData?.course?.id}`)}
                      className="w-full max-w-[397px] h-[51px] mx-auto bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold rounded-lg mb-4 flex items-center justify-start pl-6"
                    >
                      {t('sidebar.subscribeNow')}
                    </button>
                    <button
                      onClick={handleTryFreeLecture}
                      disabled={loadingFreeLecture}
                      className="w-full max-w-[397px] h-[51px] mx-auto border border-white text-white rounded-lg flex items-center justify-start pl-6 disabled:opacity-50"
                    >
                      {loadingFreeLecture ? t('loading') : `${t('sidebar.tryFree')} ⟲`}
                    </button>
                  </>
                )}
              </div>

              <div className="bg-white border border-gray-300 rounded-2xl p-6 mb-6 shadow-lg shadow-black/20">
                <h3 className="font-semibold mb-4 text-black">{t('sidebar.includes')}</h3>
                <div className="space-y-3">
                  {courseData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-black gap-3">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-300 rounded-2xl p-6 mb-6 shadow-lg shadow-black/20">
                <h3 className="font-semibold mb-4 text-black">{t('sidebar.freeLessons', { count: freeLessons.length })}</h3>
                <div className="space-y-3">
                  {freeLessons.slice(0, 3).map((l, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center m-2 text-black gap-2">
                        <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span>{isAr ? (l.title_ar || l.title) : (l.title_en || l.title)}</span>
                      </div>
                      <div className="ml-5 flex items-center">
                        <FaCircleCheck className="text-green-600 mr-2 text-xs flex-shrink-0" />
                        <button
                          onClick={() => {
                            if (l.video_url) {
                              setActiveVideoUrl(l.video_url);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="bg-black text-white px-3 py-1 rounded-full flex items-center text-xs w-fit"
                          style={{ width: '120px', height: '15px' }}
                        >
                          <FaEye className="w-3 h-3 mr-1 flex-shrink-0" />
                          {t('sidebar.watch')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Share Box - Fixed gap & spacing */}
              <div
                className="bg-black text-white rounded-3xl p-6 mb-6 shadow-[0_25px_50px_rgba(0,0,0,0.6)] border border-gray-800"
                style={{ background: 'linear-gradient(180deg, #000000 0%, #1A1A1A 100%)' }}
              >
                <h3 className="font-bold mb-6 text-xl border-b border-white/20 pb-4 text-right">{t('sidebar.share')}</h3>
                <div className="flex justify-center items-center gap-4 flex-row-reverse">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                      <FaFacebookF className="text-white text-lg" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                      <FaInstagram className="text-white text-lg" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                      <FaTwitter className="text-white text-lg" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                      <FaLinkedinIn className="text-white text-lg" />
                    </a>
                  )}
                  {!socialLinks.facebook && !socialLinks.instagram && !socialLinks.twitter && !socialLinks.linkedin && (
                    <>
                      <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                        <FaFacebookF className="text-white text-lg" />
                      </button>
                      <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                        <FaInstagram className="text-white text-lg" />
                      </button>
                      <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                        <FaTwitter className="text-white text-lg" />
                      </button>
                      <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                        <FaLinkedinIn className="text-white text-lg" />
                      </button>
                      <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors">
                        <FaTiktok className="text-white text-lg" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {(activeTab === 'all' || activeTab === 'reviews') && (
          <div className="w-full bg-white py-12 mt-8 overflow-hidden">
            <div className="px-6">
              <h3 className="font-bold mb-8 text-[48px] text-black border-b border-gray-300 pb-3 pl-8">
                {t('reviews.title')}
              </h3>
              <div
                className="flex gap-6 overflow-x-auto pb-4 pl-8"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`.reviews-scroll::-webkit-scrollbar { display: none; }`}</style>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[320px] sm:w-[380px]"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div
                      className="rounded-[30px] sm:rounded-[40px] p-6 hover:shadow-2xl transition-shadow duration-200 flex flex-col border border-gray-800"
                      style={{
                        minHeight: '230px',
                        background: 'linear-gradient(45deg, #0A0A0A 0%, #1A1A1A 100%)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-700">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                            />
                          ) : null}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-gray-400"
                            style={{ display: testimonial.image ? 'none' : 'block' }}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{testimonial.name}</h4>
                          {testimonial.title && <p className="text-sm text-gray-400">{testimonial.title}</p>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed flex-1">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex gap-1 justify-start mt-3 ml-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ComentSection />
    </div>
  );
}

export default CourseDetails;

