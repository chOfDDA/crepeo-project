import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import GoogleAuth from "./views/GoogleAuth.vue";

export default [
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { title: "Crepeo Register", hideSidebar: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { title: "Crepeo Login", hideSidebar: true },
  },
  {
    path: "/google",
    name: "Google",
    component: GoogleAuth,
    meta: { title: "Google Login", hideSidebar: true },
  },
  // add /forgot-password
];
