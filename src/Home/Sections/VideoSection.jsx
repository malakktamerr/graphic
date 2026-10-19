import { useState, useEffect } from 'react';
import { getVideoGallery } from '../../api/videos';

const VideoBlock = ({ video, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // منع الـ scroll لما الفيديو يفتح
      document.body.style.overflow = 'hidden';
    } else {
      // رجوع الـ scroll لما الفيديو يقفل
      document.body.style.overflow = 'unset';
    }

    // Cleanup: لو الـ component اتشال، رجع الـ scroll
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <style>{`@keyframes ping-out{0%,100%{transform:scale(1.25);opacity:0.5}50%{transform:scale(1.5);opacity:0}}.animate-ping-out{animation:ping-out 1.5s ease-in-out infinite}`}</style>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-gray-800">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={`${video.video_url}#t=0.1`}
                preload="metadata"
                muted
                playsInline
              />
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"
                onClick={() => setIsOpen(true)}
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
                  <div className="font-mono truncate max-w-[200px]">Video {index + 1}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <video className="w-full h-full" controls autoPlay>
              <source src={video.video_url} type="video/mp4"/>
            </video>
          </div>
        </div>
      )}
    </>
  );
};

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getVideoGallery({ placement: 'home' })
      .then((data) => {
        const sorted = (data?.data || [])
          .filter(v => v.sort_order >= 1)
          .sort((a, b) => a.sort_order - b.sort_order);
        setVideos(sorted);
      })
      .catch(() => {});
  }, []);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  if (videos.length === 0) return null;

  return (
    <div className="-mt-24 relative">
      <VideoBlock video={videos[currentIndex]} index={currentIndex} />
      
      {/* Navigation Arrows */}
      {videos.length > 1 && (
        <>
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
            aria-label="Previous video"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
            aria-label="Next video"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-yellow-400 to-orange-600'
                    : 'w-3 h-3 bg-gray-400'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoSection;
