import BASE_URL, { getHeaders, withLang } from './config';

export const getBrands = async () => {
  const response = await fetch(withLang(`${BASE_URL}/brands`), {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch brands');
  const data = await response.json();
  return data.data;
};
