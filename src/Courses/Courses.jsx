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
    <div className="min-h-screen bg-white pt-16 md:pt-0" style={{overflow: 'visible'}}>

      
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
      <TestimonialsSection />
      <FAQSection />

    </div>
  );
}

export default Courses;