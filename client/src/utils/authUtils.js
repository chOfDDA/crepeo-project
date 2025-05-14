import { useUserStore } from '@/stores/user';
import router from '@/router';

export function handleUnauthorized() {
  useUserStore().logout();
  router.push('/login');
}

export function getToken() {
  return useUserStore().token;
}
