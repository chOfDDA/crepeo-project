import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { getToken } from "@/utils/authUtils";

import authRoutes from "@/features/auth/authRoutes";
import profileRoutes from "@/features/profile/profileRoutes";
import homeRoutes from "@/features/homepage/homeRoutes";
import searchRoutes from "@/features/search/searchRoutes";

const myProfileRedirect = {
  path: "/profile",
  redirect: () => {
    const store = useUserStore();
    return store.user ? `/profile/${store.user.id}` : "/login";
  },
};

const routes = [
  ...authRoutes,
  myProfileRedirect,
  ...profileRoutes,
  ...homeRoutes,
  ...searchRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const store = useUserStore();

  if (requiresAuth && !store.token) {
    return next({ path: "/login" });
  }

  next();
});

export default router;
