import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getVideoGallery } from '../api/videos';

function PhSection() {
  const { t } = useTranslation('courses');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [started, setStarted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const sectionRef = useRef(null);

  const fullText = t('ph.desc');
  const speed = 30;

  useEffect(() => {
    getVideoGallery({ placement: 'online_academy' })
      .then(data => {
        const sorted = (data?.data || []).sort((a, b) => a.sort_order - b.sort_order);
        if (sorted.length > 0) setVideoUrl(sorted[0].video_url);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, fullText, speed]);

  const handlePlayClick = () => {
    if (videoUrl) setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };
  
  return (
    <section ref={sectionRef} className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Video Section - PromoVideoSection style */}
        <div className="relative w-full mb-8 sm:mb-12 lg:mb-16">
          <style>{`@keyframes ping-out{0%,100%{transform:scale(1.25);opacity:0.5}50%{transform:scale(1.5);opacity:0}}.animate-ping-out{animation:ping-out 1.5s ease-in-out infinite}`}</style>
          <div className="relative group w-full max-w-[80%] mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-gray-800">
              {videoUrl && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`${videoUrl}#t=0.1`}
                  preload="metadata"
                  muted
                  playsInline
                />
              )}
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"
                onClick={handlePlayClick}
              >
                <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-50 scale-125 animate-ping-out"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-1">
                <div className="w-full h-0.5 bg-gray-600 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                </div>
                <div className="flex justify-between items-center text-white text-[10px] sm:text-xs opacity-80 mt-1">
                  <div className="flex gap-4">
                    <span>00:00 / 02:30</span>
                  </div>
                  <div className="font-mono">Academy Overview.mp4</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={handleCloseVideo}
          >
            <div 
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                className="w-full h-full"
                controls
                autoPlay
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
        
        {/* النص الجديد */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 max-w-5xl mx-auto overflow-visible">
          
        {/* Text Box with Animated Border */}
        <div className="relative w-full max-w-[1273px] mx-auto mb-8 sm:mb-12 lg:mb-16 group" style={{ minHeight: 'auto' }}>
          {/* Static Gradient Border */}
          <div className="absolute inset-0 rounded-[50px] pointer-events-none">
            <div className="absolute inset-0 rounded-[50px] p-[3px] bg-gradient-to-b from-[#FF0000] via-[#DDFF11] via-[#FF00FF] to-[#00F2FF]">
              <div className="w-full h-full rounded-[50px] bg-white"></div>
            </div>
          </div>

          {/* Animated Light on Hover */}
          <div className="absolute inset-0 rounded-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 rounded-[50px] p-[3px] bg-gradient-to-b from-transparent via-white to-transparent border-light-animate">
              <div className="w-full h-full rounded-[50px] bg-white"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-12 lg:px-16 py-6 sm:py-10 lg:py-12 flex items-center justify-center">
            <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-center leading-loose whitespace-pre-line" style={{ backgroundImage: 'linear-gradient(to right, #888, #000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="inline-block w-[2px] h-[1em] bg-black align-middle ml-0.5 animate-pulse" />
              )}
            </p>
          </div>
        </div>

        
        </div>
       
       </div>
     </section>
  );
}

export default PhSection;
