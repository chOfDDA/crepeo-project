import api from "@/interceptors/axios";

// Отримати профіль поточного користувача (через токен)
export function getProfile() {
  return api.get("/api/profile");
}

// Отримати профіль за userId
export function getProfileByUserId(userId) {
  return api.get(`/api/profile/${userId}`);
}

// Оновити профіль користувача (біо, фото, професія
export function updateProfile(profileData) {
  return api.post("/api/profile", profileData);
}
