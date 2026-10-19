import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enHome from './locales/en/home.json';
import enCourses from './locales/en/courses.json';
import enContact from './locales/en/contact.json';
import enCheckout from './locales/en/checkout.json';
import enSubscribe from './locales/en/subscribe.json';
import enInstructor from './locales/en/instructor.json';
import enAboutUs from './locales/en/aboutus.json';
import enCourseVideos from './locales/en/courseVideos.json';
import enCertifications from './locales/en/certifications.json';
import enCourseDetails from './locales/en/courseDetails.json';
import enComments from './locales/en/comments.json';

import arCommon from './locales/ar/common.json';
import arAuth from './locales/ar/auth.json';
import arHome from './locales/ar/home.json';
import arCourses from './locales/ar/courses.json';
import arContact from './locales/ar/contact.json';
import arCheckout from './locales/ar/checkout.json';
import arSubscribe from './locales/ar/subscribe.json';
import arInstructor from './locales/ar/instructor.json';
import arAboutUs from './locales/ar/aboutus.json';
import arCourseVideos from './locales/ar/courseVideos.json';
import arCertifications from './locales/ar/certifications.json';
import arCourseDetails from './locales/ar/courseDetails.json';
import arComments from './locales/ar/comments.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        home: enHome,
        courses: enCourses,
        contact: enContact,
        checkout: enCheckout,
        subscribe: enSubscribe,
        instructor: enInstructor,
        aboutus: enAboutUs,
        courseVideos: enCourseVideos,
        certifications: enCertifications,
        courseDetails: enCourseDetails,
        comments: enComments,
      },
      ar: {
        common: arCommon,
        auth: arAuth,
        home: arHome,
        courses: arCourses,
        contact: arContact,
        checkout: arCheckout,
        subscribe: arSubscribe,
        instructor: arInstructor,
        aboutus: arAboutUs,
        courseVideos: arCourseVideos,
        certifications: arCertifications,
        courseDetails: arCourseDetails,
        comments: arComments,
      },
    },
    defaultNS: 'common',
    lng: localStorage.getItem('i18nextLng') || 'ar',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
