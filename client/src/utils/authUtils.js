import router from '@/router'

export function handleUnauthorized() {
  localStorage.removeItem('token');
  router.push('/login');
}