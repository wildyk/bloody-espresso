import { verifyToken } from './jwt';

export function getTokenFromStorage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function isAuthenticated() {
  const token = getTokenFromStorage();
  if (!token) return false;
  
  try {
    verifyToken(token);
    return true;
  } catch {
    // Token tidak valid, hapus dari storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    return false;
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
}