
import type { LoginForm } from '../../pages/Login/ui/Login';

export const loginUser = async (credentials: LoginForm) => {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Incorrect email or password');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Login failed: ${response.status}`);
  }

  return response.json();
};

export const checkAuthStatus = async () => {
  console.log('Checking auth status...');
  const response = await fetch('/api/v1/auth/me', {
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Log in to the system');
    }
    console.error(`Auth check failed: ${response.status}`);
    throw new Error(`Auth check failed: ${response.status}`);
  }

  const data = await response.json();
  console.log('Auth check response:', data);
  return data;
};

export const logoutUser = async () => {
  const response = await fetch('/api/v1/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }

  return null;
};