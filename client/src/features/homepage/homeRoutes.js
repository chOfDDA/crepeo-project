import HomeView from "./HomeView.vue";

export default [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      title: "Homepage",
      requiresAuth: true,
    },
  },
];
