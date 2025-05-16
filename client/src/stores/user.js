import { defineStore } from "pinia";
import api from "@/interceptors/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  persist: true,

  getters: {
    avatarUrl: (state) =>
      state.user?.photoUrl || "/src/assets/default-avatar.svg",
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    clearToken() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },

    setUser(user) {
      this.user = user;
    },

    logout() {
      this.token = null;
      this.user = null;
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
