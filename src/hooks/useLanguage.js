import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLanguage() {
  const { i18n } = useTranslation();

  // normalize: 'ar', 'ar-EG', 'ar-SA' → all treated as Arabic
  const isAr = i18n.language?.startsWith('ar');

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  const toggleLanguage = () => {
    const next = isAr ? 'en' : 'ar';
    i18n.changeLanguage(next);
  };

  return { isAr, toggleLanguage, currentLang: isAr ? 'AR' : 'EN' };
}
