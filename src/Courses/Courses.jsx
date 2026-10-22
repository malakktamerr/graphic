import Design from './Design';
import CoursesSection from './CoursesSection';
import PhSection from './PhSection';
import BenefitsSection from './BenefitsSection';
import InstructorProfile from './InstructorProfile';
import TestimonialsSection from '../Home/Sections/TestimonialsSection';
import CourseCardSection from '../Home/Sections/CourseCardSection';
import ValuePropositionSection from './ValuePropositionSection';
import SuccessStorySection from '../Home/Sections/SuccessStorySection';
import CertificationsSection from './CertificationsSection';
import FAQSection from './FAQSection';
import TraineesShowcase  from '../Home/Sections/TraineesShowcase';
function Courses() {
  return (
    <div className="min-h-screen bg-white py-4 md:py-12" style={{overflow: 'visible'}}>

      
      <Design />
       <PhSection />
      <BenefitsSection />
      <InstructorProfile />
      <CourseCardSection />
      <CoursesSection />
      <ValuePropositionSection />
      <SuccessStorySection/>
      <CertificationsSection />
      <TraineesShowcase/>
      <FAQSection />
      <TestimonialsSection />

    </div>
  );
}

export default Courses;



// import Design from './Design';
// import CoursesSection from './CoursesSection';
// import PhSection from './PhSection';
// import BenefitsSection from './BenefitsSection';
// import InstructorProfile from './InstructorProfile';
// import TestimonialsSection from '../Home/Sections/TestimonialsSection';
// import CourseCardSection from '../Home/Sections/CourseCardSection';
// import ValuePropositionSection from './ValuePropositionSection';
// import SuccessStorySection from '../Home/Sections/SuccessStorySection';
// import CertificationsSection from './CertificationsSection';
// import FAQSection from './FAQSection';
// import TraineesShowcase from '../Home/Sections/TraineesShowcase';

// function Courses() {
//   return (
//     <div className="min-h-screen bg-white py-4 md:py-12" style={{ overflow: 'visible' }}>
//       <div className="flex flex-col gap-4 md:gap-8 lg:gap-12">
//         <Design />
//         <PhSection />
//         <BenefitsSection />
//         <InstructorProfile />
//         <CourseCardSection />
//         <CoursesSection />
//         <ValuePropositionSection />
//         <SuccessStorySection />
//         <CertificationsSection />
//         <TraineesShowcase />
//         <FAQSection />
//         <TestimonialsSection />
//       </div>
//     </div>
//   );
// }

// export default Courses;