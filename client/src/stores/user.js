import { defineStore } from "pinia";
import api from "@/interceptors/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    avatarUrl: null,
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
      this.avatarUrl = null;
      localStorage.removeItem("token");
    },
    setUser(user) {
      this.user = user;
      this.avatarUrl = user?.photoUrl || "/images/default-avatar.png";
    },
    updateAvatar(newUrl) {
      this.avatarUrl = newUrl;
      if (this.user) {
        this.user.photoUrl = newUrl;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.avatarUrl = null;
      localStorage.removeItem("token");
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
