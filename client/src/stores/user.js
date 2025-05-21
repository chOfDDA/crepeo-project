import { defineStore } from "pinia";
import api from "@/interceptors/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    profile: null,
    avatarUrl: "/assets/default-avatar.svg",
  }),
  persist: true,

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    clearToken() {
      this.token = null;
      this.user = null;
      this.avatarUrl = "/assets/default-avatar.svg";
      localStorage.removeItem("token");
    },

    setUser(user) {
      this.user = user;
      this.avatarUrl = user?.photoUrl || "/assets/default-avatar.svg";
    },

    logout() {
      this.clearToken();
    },

    async fetchProfile() {
      try {
        const res = await api.get("/api/profile");
        this.profile = res.data.profile;
        this.avatarUrl =
          res.data.profile?.photoUrl || "/assets/default-avatar.svg";
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    },

    async initialize() {
      if (!this.token) {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          this.setToken(savedToken);
        }
      }

      if (this.token && !this.user) {
        try {
          const { data } = await api.get("/api/users/me");
          this.setUser(data.user);
        } catch (e) {
          console.warn("Error fetching user data:", e);
          this.clearToken();
        }
      }
    },
  },
});
