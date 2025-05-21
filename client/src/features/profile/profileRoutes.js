import ProfileView from "./ProfileView.vue";
import EditProfileWindow from "./../../shared/EditProfileWindow.vue";

export default [
  {
    path: "/profile/:id",
    name: "profile",
    component: ProfileView,
    meta: { title: "Your Profile", requiresAuth: false },
  },
  {
    path: "/profile/edit",
    component: EditProfileWindow,
  },
];
