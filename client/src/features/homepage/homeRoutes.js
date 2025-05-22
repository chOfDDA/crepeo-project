import HomeView from "./HomeView.vue";
import GuestHomeView from "./GuestHomeView.vue";

export default [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home | Crepeo",
      requiresAuth: true,
    },
  },
  {
    path: "/guestpage",
    name: "GuestHome",
    component: GuestHomeView,
    meta: {
      title: "Guest | Crepeo",
      requiresAuth: false,
      hideSidebar: true
    },
  },
];
