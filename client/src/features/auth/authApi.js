import api from "@/interceptors/axios";
import { useUserStore } from "@/stores/user";

export function register(data) {
  return api.post("/api/auth/register", {
    username: data.username,
    email: data.email,
    password: data.password,
  });
}

export async function login(data) {
  const response = await api.post("/api/auth/login", {
    email: data.email,
    password: data.password,
  });

  const { token, user } = response.data;
  if (token && user) {
    const userStore = useUserStore();
    userStore.setToken(token);
    userStore.setUser(user);
  }

  return response.data;
}

export function googleSignIn() {
  window.location.href = "/api/auth/google";
}
