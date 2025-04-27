import axios from 'axios'

export function register(data) {
  return axios.post('/api/auth/register', data)
}

export function googleSignIn() {
  // просто редирект на ваш бэкенд-OAuth
  window.location.href = '/api/auth/google'
}
