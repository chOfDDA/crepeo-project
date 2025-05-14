import api from '@/interceptors/axios';

// Отримати поточного авторизованого користувача (ім’я, пошта тощо)
export function getUser() {
  return api.get('/api/users/me');
}

export function getUserById(userId) {
  return api.get(`/api/users/${userId}`);
}
