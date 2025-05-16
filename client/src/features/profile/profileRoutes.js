import ProfileView from "./ProfileView.vue";

export default [
  {
    path: "/profile/:id",
    name: "profile",
    component: ProfileView,
    meta: { title: "Your Profile", requiresAuth: false },
  },
];
