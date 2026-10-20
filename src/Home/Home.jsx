// import React from 'react';
// import HeroSection from './Sections/HeroSection';
// import EarlyAccessSection from './Sections/EarlyAccessSection';
// import PromoVideoSection from './Sections/PromoVideoSection';
// import AboutSection from './Sections/AboutSection';
// import OfferSection from './Sections/OfferSection';
// import WhyChooseSection from './Sections/WhyChooseSection';
// import VideoSection from './Sections/VideoSection';
// import DesignToolsSection from './Sections/DesignToolsSection';
// import CourseCardSection from './Sections/CourseCardSection';
// import CourseProjectsSection from './Sections/CourseProjectsSection';
// import CoursesGridSection from './Sections/CoursesGridSection';
// import TestimonialsSection from './Sections/TestimonialsSection';
// import CertificationsSection from './Sections/CertificationsSection';
// import ServicesSection from './Sections/ServicesSection';
// import PortfolioSection from './Sections/PortfolioSection';
// import ContactSection from './Sections/ContactSection';
// import SupportSection from './Sections/SupportSection';
// import InstructorAbout from './Sections/InstructorAbout';
// import TraineesShowcase from './Sections/TraineesShowcase';

// import ScrollAnimation from '../components/ScrollAnimation/ScrollAnimation';

// const Home = () => {
//   return (
//     <div className="w-full pt-16 md:pt-20 relative">
//       <HeroSection />
//       <ScrollAnimation><EarlyAccessSection /></ScrollAnimation>
//       <ScrollAnimation><PromoVideoSection /></ScrollAnimation>
//       <ScrollAnimation><AboutSection /></ScrollAnimation>
//       <ScrollAnimation><OfferSection /></ScrollAnimation>
//       <ScrollAnimation><WhyChooseSection /></ScrollAnimation>
//        <ScrollAnimation><TraineesShowcase /></ScrollAnimation>
 
//    <ScrollAnimation><InstructorAbout/></ScrollAnimation>
//    <ScrollAnimation><ServicesSection /></ScrollAnimation>
//       <ScrollAnimation><PortfolioSection /></ScrollAnimation>
//       <ScrollAnimation><CoursesGridSection /></ScrollAnimation>
//       <ScrollAnimation><CourseProjectsSection /></ScrollAnimation>
//       <ScrollAnimation><DesignToolsSection /></ScrollAnimation>
//       <ScrollAnimation><VideoSection /></ScrollAnimation>
//       <ScrollAnimation><CourseCardSection /></ScrollAnimation>
//       <ScrollAnimation><TestimonialsSection /></ScrollAnimation>
//       <ScrollAnimation><CertificationsSection /></ScrollAnimation>
//       <ScrollAnimation><ContactSection /></ScrollAnimation>
//       <ScrollAnimation><div className="hidden md:block"><SupportSection/></div></ScrollAnimation>
//     </div>
    
//   );
// };

// export default Home;

import React from 'react';
import HeroSection from './Sections/HeroSection';
import EarlyAccessSection from './Sections/EarlyAccessSection';
import PromoVideoSection from './Sections/PromoVideoSection';
import AboutSection from './Sections/AboutSection';
import OfferSection from './Sections/OfferSection';
import WhyChooseSection from './Sections/WhyChooseSection';
import VideoSection from './Sections/VideoSection';
import DesignToolsSection from './Sections/DesignToolsSection';
import CourseCardSection from './Sections/CourseCardSection';
import CourseProjectsSection from './Sections/CourseProjectsSection';
import CoursesGridSection from './Sections/CoursesGridSection';
import TestimonialsSection from './Sections/TestimonialsSection';
import CertificationsSection from './Sections/CertificationsSection';
import ServicesSection from './Sections/ServicesSection';
import PortfolioSection from './Sections/PortfolioSection';
import ContactSection from './Sections/ContactSection';
import SupportSection from './Sections/SupportSection';
import InstructorAbout from './Sections/InstructorAbout';
import TraineesShowcase from './Sections/TraineesShowcase';

import ScrollAnimation from '../components/ScrollAnimation/ScrollAnimation';

const Home = () => {
  return (
    <div className="w-full pt-16 md:pt-20 relative">
      <HeroSection />
      <ScrollAnimation><EarlyAccessSection /></ScrollAnimation>
      <ScrollAnimation><PromoVideoSection /></ScrollAnimation>
      <ScrollAnimation><AboutSection /></ScrollAnimation>
      <ScrollAnimation><OfferSection /></ScrollAnimation>
      <ScrollAnimation><WhyChooseSection /></ScrollAnimation>
      
      {/* قسم السكرول الجانبي للبطاقات */}
      <ScrollAnimation><TraineesShowcase /></ScrollAnimation>

      <ScrollAnimation><InstructorAbout /></ScrollAnimation>
      <ScrollAnimation><ServicesSection /></ScrollAnimation>
      <ScrollAnimation><PortfolioSection /></ScrollAnimation>
      <ScrollAnimation><CoursesGridSection /></ScrollAnimation>
      <ScrollAnimation><CourseProjectsSection /></ScrollAnimation>
      <ScrollAnimation><DesignToolsSection /></ScrollAnimation>
      <ScrollAnimation><VideoSection /></ScrollAnimation>
      <ScrollAnimation><CourseCardSection /></ScrollAnimation>
      <ScrollAnimation><TestimonialsSection /></ScrollAnimation>
      <ScrollAnimation><CertificationsSection /></ScrollAnimation>
      <ScrollAnimation><ContactSection /></ScrollAnimation>
      <ScrollAnimation>
        <div className="hidden md:block">
          <SupportSection />
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Home;