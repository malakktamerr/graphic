import BASE_URL, { getHeaders, withLang } from './config';

// Register
export const register = async ({ name, email, password, password_confirmation }) => {
  const response = await fetch(withLang(`${BASE_URL}/auth/register`), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

// Login
export const login = async ({ email, password }) => {
  const response = await fetch(withLang(`${BASE_URL}/auth/login`), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

// Logout
export const logout = async (token) => {
  const response = await fetch(withLang(`${BASE_URL}/auth/logout`), {
    method: 'POST',
    headers: getHeaders({ 'Authorization': `Bearer ${token}` }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
};

// Get current user
export const getUser = async (token) => {
  const response = await fetch(withLang(`${BASE_URL}/auth/user`), {
    method: 'GET',
    headers: getHeaders({ 'Authorization': `Bearer ${token}` }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user');
  }

  return data;
};
