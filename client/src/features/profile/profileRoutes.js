import ProfileView from "./ProfileView.vue";

export default [
  {
    path: "/profile/:id",
    name: "profile",
    component: ProfileView,
    meta: { requiresAuth: false },
  },
];
