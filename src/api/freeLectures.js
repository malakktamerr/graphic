import BASE_URL, { getHeaders, withLang } from './config';

export const getFreeLectures = async () => {
  const response = await fetch(withLang(`${BASE_URL}/free-lectures`), {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch free lectures');
  const data = await response.json();
  return data.data;
};
