import api from "@/interceptors/axios";

export function getProfile() {
  return api.get("/api/profile");
}

export function getProfileByUserId(userId) {
  return api.get(`/api/profile/${userId}`);
}

export function updateProfile(profileData) {
  return api.post("/api/profile", profileData);
}
