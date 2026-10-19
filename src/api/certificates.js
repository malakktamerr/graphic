import BASE_URL, { getHeaders, withLang } from './config';

export const getCertificates = async ({ per_page = 6, search = '' } = {}) => {
  const params = new URLSearchParams();
  if (per_page) params.append('per_page', per_page);
  if (search) params.append('search', search);

  const response = await fetch(withLang(`${BASE_URL}/certificates?${params.toString()}`), {
    method: 'GET',
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch certificates');
  }

  return data;
};
