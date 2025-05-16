// src/features/posts/postApi.js
import api from "@/interceptors/axios";

export function getPostsByUserId(userId) {
  return api.get(`/api/posts/user/${userId}`);
}

export function createPost(data) {
  return api.post("/api/posts", data);
}

export function getAllPosts() {
  return api.get("/api/posts");
}
