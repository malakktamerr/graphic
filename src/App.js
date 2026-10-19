// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import Navbar from './Navbar/Navbar';
// import Home from './Home/Home';
// import Courses from './Courses/Courses';
// import CourseOverview from './Courses/CourseOverview';
// import CourseDetails from './Courses/CourseDetails';import CourseVideos from './Courses/CourseVideos';
// import Footer from './Footer/Footer';
// import AboutUs from './components/AboutUs/AboutUs';
// import Instructor from './components/Instructor/Instructor';
// import Contact from './Contact/Contact';
// import Certifications from './Certifications/Certifications';
// import Subscribe from './Courses/Subscribe';
// import Login from './Auth/Login';
// import CreateAccount from './Auth/CreateAccount';

// import Checkout from './Courses/Checkout';
// import PaymentResult from './Courses/PaymentResult';
// import { useLanguage } from './hooks/useLanguage';
// import { ToastProvider } from './components/Toast/ToastProvider';

// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
//   return null;
// }

// function App() {
//   useLanguage(); // This will handle RTL/LTR direction automatically
  
//   return (
//     <Router>
//       <ScrollToTop />
//       <ToastProvider>
//       <div className="min-h-screen overflow-x-hidden">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/courses" element={<Courses />} />
//           <Route path="/course/:courseId" element={<CourseOverview />} />
//           <Route path="/lecture" element={<Home />} />
//           <Route path="/lecture/:lessonId" element={<CourseDetails />} />
//           <Route path="/course-videos" element={<CourseVideos />} />
//           <Route path="/checkout/:courseId" element={<Checkout />} />
//           <Route path="/payment/success/:paymentId" element={<PaymentResult type="success" />} />
//           <Route path="/payment/failed/:paymentId"  element={<PaymentResult type="failed" />} />
//           <Route path="/subscribe" element={<Subscribe />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<CreateAccount />} />
//           <Route path="/AboutUs" element={<AboutUs />} />
//           <Route path="/instructor" element={<Instructor />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/certifications" element={<Certifications />} />
//         </Routes>
//         <Footer />
//       </div>
//       </ToastProvider>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import CourseOverview from './Courses/CourseOverview';
import CourseDetails from './Courses/CourseDetails';
import CourseVideos from './Courses/CourseVideos';
import Footer from './Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';
import Instructor from './components/Instructor/Instructor';
import Contact from './Contact/Contact';
import Certifications from './Certifications/Certifications';
import Subscribe from './Courses/Subscribe';
import Login from './Auth/Login';
import CreateAccount from './Auth/CreateAccount';
import Checkout from './Courses/Checkout';
import PaymentResult from './Courses/PaymentResult';

import { useLanguage } from './hooks/useLanguage';
import { ToastProvider } from './components/Toast/ToastProvider';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  useLanguage();
  const location = useLocation();

  // التحقق مما إذا كان المسار الحالي هو صفحة Login أو Signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseOverview />} />
          <Route path="/lecture" element={<Home />} />
          <Route path="/lecture/:lessonId" element={<CourseDetails />} />
          <Route path="/course-videos" element={<CourseVideos />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />
          <Route path="/payment/success/:paymentId" element={<PaymentResult type="success" />} />
          <Route path="/payment/failed/:paymentId" element={<PaymentResult type="failed" />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certifications" element={<Certifications />} />
        </Routes>
      </div>

      {/* لن يتم عرض الفوتر إذا كان المستخدم في صفحة تسجيل الدخول أو إنشاء الحساب */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      {ToastProvider ? (
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

export default App;
