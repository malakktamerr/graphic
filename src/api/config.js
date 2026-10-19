const BASE_URL = 'https://elnasrcourses.com/api/v1';

export default BASE_URL;

// Helper: returns default headers including Accept-Language based on current i18n language
export const getHeaders = (extra = {}) => {
  const lang = localStorage.getItem('i18nextLng') || 'ar';
  const normalizedLang = lang.startsWith('ar') ? 'ar' : 'en';
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': normalizedLang,
    ...extra,
  };
};

// Helper: adds lang as a path segment to a URL (before any query string)
export const withLang = (url) => {
  const lang = localStorage.getItem('i18nextLng') || 'ar';
  const normalizedLang = lang.startsWith('ar') ? 'ar' : 'en';
  const [path, query] = url.split('?');
  const langPath = `${path}/${normalizedLang}`;
  return query ? `${langPath}?${query}` : langPath;
};
