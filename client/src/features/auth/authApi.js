import api from "@/interceptors/axios";

export function register(data) {
  return api.post("/api/auth/register", {
    username: data.username,
    email: data.email,
    password: data.password,
  });
}

export async function login(data, userStore) {
  const response = await api.post("/api/auth/login", data);
  const { token, user } = response.data;
  if (token && user) {
    userStore.setToken(token);
    userStore.setUser(user);
  }
  return response.data;
}

export function googleSignIn() {
  window.location.href = "/api/auth/google";
}
