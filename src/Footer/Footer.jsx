// import { useEffect, useState } from 'react';
// import {
//     FaPhoneAlt,
//     FaMapMarkerAlt,
//     FaEnvelope,
//     FaFacebookF,
//     FaInstagram,
//     FaLinkedinIn
//   } from "react-icons/fa";
//   import { FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";
//   import { BsLink45Deg } from "react-icons/bs";
//   import { useTranslation } from 'react-i18next';
//   import { useLanguage } from '../hooks/useLanguage';
//   import BASE_URL from '../api/config';

//   const Footer = () => {
//     const { t } = useTranslation('common');
//     const { isAr } = useLanguage();
//     const [contactInfo, setContactInfo] = useState(null);

//     useEffect(() => {
//       fetch(`${BASE_URL}/contact-info`)
//         .then(r => r.json())
//         .then(json => {
//           if (json.data) setContactInfo(json.data);
//         })
//         .catch(() => {});
//     }, []);

//     const langData = contactInfo ? (isAr ? contactInfo.ar : contactInfo.en) : null;
//     const email    = langData?.email;
//     const phone    = langData?.phone;
//     const address  = langData?.address;
//     const socials  = langData?.social_links || {};

//     return (
//       <footer className="bg-black text-white px-8 md:px-16 py-12">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
  
//         <div>
//   {/* Logo */}
//   <img
//     src="/Abdullah  el-Nasr.png"
//     alt="Logo"
//     className="w-28 mb-4"
//   />
// <h3 className="text-lg font-lexend mb-2">
//   {t('footer.contactInfo')}
// </h3>

// <div className="w-21 h-px bg-gradient-to-r from-white/70 via-white/30 to-transparent "></div>


  
// <div className="text-sm text-gray-300 space-y-8 mt-4">

// {/* Group 1 */}
// <div className="space-y-4">
//   {phone && (
//     <div className="flex items-center gap-3">
//       <FaPhoneAlt className="text-gray-400" />
//       <a href={`tel:${phone}`} className="hover:text-white transition-colors cursor-pointer">
//         {phone}
//       </a>
//     </div>
//   )}

//   {socials.telegram && (
//     <div className="flex items-center gap-3">
//       <BsLink45Deg className="text-gray-400" />
//       <a href={socials.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
//         {socials.telegram}
//       </a>
//     </div>
//   )}
// </div>

// {/* Group 2 */}
// <div className="space-y-4">
//   {address && (
//     <div className="flex items-center gap-3">
//       <FaMapMarkerAlt className="text-gray-400" />
//       <span>{address}</span>
//     </div>
//   )}

//   {email && (
//     <div className="flex items-center gap-3">
//       <FaEnvelope className="text-gray-400" />
//       <a href={`mailto:${email}`} className="hover:text-white transition-colors">
//         {email}
//       </a>
//     </div>
//   )}
// </div>

// </div>

//           </div>
  
//           {/* Social icons */}
//           <div className="flex gap-4 mt-60">
//             {socials.facebook && (
//               <a href={socials.facebook} target="_blank" rel="noopener noreferrer"
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-black transition">
//                 <FaFacebookF />
//               </a>
//             )}
//             {socials.instagram && (
//               <a href={socials.instagram} target="_blank" rel="noopener noreferrer"
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-black transition">
//                 <FaInstagram />
//               </a>
//             )}
//             {socials.twitter && (
//               <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-black transition">
//                 <FaXTwitter />
//               </a>
//             )}
//             {socials.linkedin && (
//               <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-black transition">
//                 <FaLinkedinIn />
//               </a>
//             )}
//             {socials.youtube && (
//               <a href={socials.youtube} target="_blank" rel="noopener noreferrer"
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-black transition">
//                 <FaYoutube />
//               </a>
//             )}
//             {socials.tiktok && (
//               <a href={socials.tiktok} target="_blank" rel="noopener noreferrer"
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-black transition">
//                 <FaTiktok />
//               </a>
//             )}
//           </div>
//         </div>
  
//         {/* Line */}
//         <div className="mt-10 border-t border-gray-700"></div>
//       </footer>
//     );
//   };
  
//   export default Footer;

import { useEffect, useState } from 'react';
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane
} from "react-icons/fa";
import { FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import BASE_URL from '../api/config';

const Footer = () => {
  const { t } = useTranslation('common');
  const { isAr } = useLanguage();
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/contact-info`)
      .then(r => r.json())
      .then(json => {
        if (json.data) setContactInfo(json.data);
      })
      .catch(() => {});
  }, []);

  const langData = contactInfo ? (isAr ? contactInfo.ar : contactInfo.en) : null;
  const email    = langData?.email || "abdullahelnasrabdullahelnasr@gmail.com";
  const address  = langData?.address || "Kingdom of Saudi Arabia";
  const socials  = langData?.social_links || {};

  return (
    <footer className="bg-[#09090b] text-white px-6 md:px-16 pt-12 pb-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Column: Contact Information */}
        <div className="space-y-6">
          {/* Logo */}
          <img
            src="/Abdullah  el-Nasr.png"
            alt="Logo"
            className="w-36 mb-6"
          />

          {/* Heading */}
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {t('footer.contactInfo', 'Contact information')}
            </h3>
            <div className="w-20 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-green-400"></div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-3 pt-2">
            {/* Telegram 1 */}
            <div className="flex items-center gap-4 p-3 bg-[#121215] border border-gray-800/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a20] flex items-center justify-center shrink-0">
                <FaTelegramPlane className="text-gray-300 text-lg" />
              </div>
              <span className="text-gray-300 text-sm">@alnaser224</span>
            </div>

            {/* Telegram 2 Link */}
            {socials.telegram && (
              <div className="flex items-center gap-4 p-3 bg-[#121215] border border-gray-800/60 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a20] flex items-center justify-center shrink-0">
                  <FaTelegramPlane className="text-gray-300 text-lg" />
                </div>
                <a href={socials.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-white transition truncate">
                  {socials.telegram}
                </a>
              </div>
            )}

            {/* Address */}
            <div className="flex items-center gap-4 p-3 bg-[#121215] border border-gray-800/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a20] flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-gray-300 text-lg" />
              </div>
              <span className="text-gray-300 text-sm">{address}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-3 bg-[#121215] border border-gray-800/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a20] flex items-center justify-center shrink-0">
                <FaEnvelope className="text-gray-300 text-lg" />
              </div>
              <a href={`mailto:${email}`} className="text-gray-300 text-sm hover:text-white transition truncate">
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Links & Buttons */}
        <div className="space-y-8 lg:pt-4">
          {/* Title & Description */}
          <div>
            <h2 className="text-xl font-bold text-[#df9b27] mb-2">
              Abdullah El-Nasr
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Professional design courses matching the quality of global agencies real projects, real skills.
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-2 text-sm text-gray-300">
            <Link to="/" className="py-2 border-b border-gray-800/60 hover:text-white transition">Home</Link>
            <Link to="/courses" className="py-2 border-b border-gray-800/60 hover:text-white transition">Courses</Link>
            <Link to="/AboutUs" className="py-2 border-b border-gray-800/60 hover:text-white transition">About</Link>
            <Link to="/contact" className="py-2 border-b border-gray-800/60 hover:text-white transition">Contact</Link>
            <Link to="/instructor" className="py-2 border-b border-gray-800/60 hover:text-white transition">Instructor</Link>
            <Link to="/certifications" className="py-2 border-b border-gray-800/60 hover:text-white transition">Certifications</Link>
            <Link to="/course-videos" className="py-2 border-b border-gray-800/60 hover:text-white transition">Videos Courses</Link>
            <Link to="/subscribe" className="py-2 border-b border-gray-800/60 hover:text-white transition">Subscribe</Link>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Link 
              to="/signup" 
              className="px-6 py-2.5 rounded-lg border border-emerald-500/60 text-white font-medium text-sm hover:bg-emerald-500/10 transition"
            >
              Create account
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-2.5 rounded-lg border border-rose-500/60 text-white font-medium text-sm hover:bg-rose-500/10 transition"
            >
              Sign in
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar / Copyright */}
      <div className="mt-16 pt-6 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>© 2026 Abdullah El-Nasr. All rights reserved.</p>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;