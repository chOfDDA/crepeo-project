import axios from 'axios';
import { toast } from 'vue-sonner';
import router from '@/router';
import { handleUnauthorized } from '@/utils/authUtils'

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Випадок: сервер не відповів (мережа, CORS, таймаут)
    if (!error.response) {
      toast.error('Network error. Please check your internet connection.');
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        toast.error('Unauthorized. Please log in again.');
        handleUnauthorized();
        break;
      case 403:
        toast.error('Access denied.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 422:
        toast.error(error.response.data.message || 'Validation error.');
        break;
      case 500:
        toast.error('Server error. Try again later.');
        break;
      default:
        toast.error(error.response.data.message || 'An unexpected error occurred.');
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
