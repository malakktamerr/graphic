import BASE_URL, { getHeaders, withLang } from './config';

export const getVideoGallery = async ({ placement = '', custom_page = '' } = {}) => {
  const params = new URLSearchParams();
  if (placement) params.append('placement', placement);
  if (custom_page) params.append('custom_page', custom_page);

  const response = await fetch(withLang(`${BASE_URL}/video-gallery?${params.toString()}`), {
    method: 'GET',
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch videos');
  }

  return data;
};
