import BASE_URL, { getHeaders, withLang } from './config';

export const getCheckout = async (courseId, countryId = '') => {
  const params = countryId ? `?country_id=${countryId}` : '';
  const token = localStorage.getItem('token');
  const response = await fetch(withLang(`${BASE_URL}/courses/${courseId}/checkout${params}`), {
    headers: getHeaders(token ? { 'Authorization': `Bearer ${token}` } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch checkout');
  return data.data;
};
