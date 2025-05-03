import api from '@/interceptors/axios'

export function register(data) {
  return api.post('/api/auth/register', {
    username: data.username,
    email: data.email,
    password: data.password,
  });
}

export async function login(data) {
  const response = await api.post('/api/auth/login', {
    email: data.email,
    password: data.password
  });

  const { token } = response.data;
  if (token) {
    localStorage.setItem('token', token);
  }

  return response;
}

export function googleSignIn() {
  window.location.href = '/api/auth/google';
}

