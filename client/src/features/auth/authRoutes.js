import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';

export default [
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  // сюда же можно добавить /login, /forgot-password и т.п.
]
