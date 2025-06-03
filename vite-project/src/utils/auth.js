const TOKEN_KEY = 'auth_token';

// Save token to localStorage
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token from localStorage (logout)
export const clearToken = () => {
  localStorage.removeItem('token');
};

// Check if user is authenticated (token exists and is valid)
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
}