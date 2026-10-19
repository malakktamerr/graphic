import BASE_URL, { getHeaders, withLang } from './config';

export const getCourses = async ({ per_page = 20, category_slug = '', search = '' } = {}) => {
  const params = new URLSearchParams();
  if (per_page) params.append('per_page', per_page);
  if (category_slug) params.append('category_slug', category_slug);
  if (search) params.append('search', search);

  const response = await fetch(withLang(`${BASE_URL}/courses?${params.toString()}`), {
    method: 'GET',
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch courses');
  }

  return data;
};
