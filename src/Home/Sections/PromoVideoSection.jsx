// import { useState, useEffect } from 'react';
// import { getVideoGallery } from '../../api/videos';

// const PromoVideoSection = () => {
//   const [isVideoOpen, setIsVideoOpen] = useState(false);
//   const [videoUrl, setVideoUrl] = useState('');

//   useEffect(() => {
//     getVideoGallery({ placement: 'home' })
//       .then((data) => {
//         const sorted = (data?.data || []).sort((a, b) => a.sort_order - b.sort_order);
//         if (sorted.length > 0) setVideoUrl(sorted[0].video_url);
//       })
//       .catch(() => {});
//   }, []);

//   if (!videoUrl) return null;

//   return (
//     <section className="w-full py-10 bg-white px-4 sm:px-6 lg:px-10">
//       <div className="max-w-5xl mx-auto">
//         <style>{`@keyframes ping-out{0%,100%{transform:scale(1.25);opacity:0.5}50%{transform:scale(1.5);opacity:0}}.animate-ping-out{animation:ping-out 1.5s ease-in-out infinite}`}</style>
//         <div className="relative group">
//           {/* Glowing gradient border */}
//           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
//           {/* Video container */}
//           <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-gray-800">
//             {/* Video element */}
//             {videoUrl && (
//               <video
//                 className="absolute inset-0 w-full h-full object-cover"
//                 src={`${videoUrl}#t=0.1`}
//                 preload="metadata"
//                 muted
//                 playsInline
//               />
//             )}
            
//             {/* Play button */}
//             <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"
//               onClick={() => videoUrl && setIsVideoOpen(true)}
//             >
//               <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-50 scale-125 animate-ping-out"></div>
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
//                 <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
//               </svg>
//             </div>

//             {/* Bottom overlay */}
//             <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-1">
//               <div className="w-full h-0.5 bg-gray-600 rounded-full overflow-hidden">
//                 <div className="w-1/3 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
//               </div>
//               <div className="flex justify-between items-center text-white text-[10px] sm:text-xs opacity-80 mt-1">
//                 <div className="flex gap-4">
//                   <span>00:00 / 02:30</span>
//                 </div>
//                 <div className="font-mono">Academy Overview.mp4</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Video Modal */}
//         {isVideoOpen && (
//           <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsVideoOpen(false)}>
//             <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
//               <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                 </svg>
//               </button>
//               <video className="w-full h-full" controls autoPlay>
//                 <source src={videoUrl} type="video/mp4"/>
//               </video>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PromoVideoSection;


import { useState, useEffect } from 'react';
import { getVideoGallery } from '../../api/videos';

const PromoVideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    getVideoGallery({ placement: 'home' })
      .then((data) => {
        const sorted = (data?.data || []).sort((a, b) => a.sort_order - b.sort_order);
        if (sorted.length > 0) setVideoUrl(sorted[0].video_url);
      })
      .catch(() => {});
  }, []);

  if (!videoUrl) return null;

  return (
    <section className="w-full py-10 bg-white px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="relative group">
          {/* Glowing gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Video container */}
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-gray-800">
            {/* Video element */}
            {videoUrl && (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={`${videoUrl}#t=0.1`}
                preload="metadata"
                muted
                playsInline
              />
            )}
            
            {/* Dark Overlay (طبقة غامقة شفافة) */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 z-10 pointer-events-none"></div>

            {/* Play button (تصميم الزر الشفاف المماثل للصورة) */}
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-black/40 border border-white/80 rounded-full cursor-pointer hover:scale-110 hover:bg-black/60 transition-all duration-300 z-20 backdrop-blur-sm"
              onClick={() => videoUrl && setIsVideoOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-1 z-20">
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

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsVideoOpen(false)}>
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <video className="w-full h-full" controls autoPlay>
                <source src={videoUrl} type="video/mp4"/>
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoVideoSection;