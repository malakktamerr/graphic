import BASE_URL, { getHeaders, withLang } from './config';

export const getComments = async ({ per_page = 20, page = 1 } = {}) => {
  const response = await fetch(withLang(`${BASE_URL}/comments?per_page=${per_page}&page=${page}`), {
    method: 'GET',
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch comments');
  }

  return data;
};
