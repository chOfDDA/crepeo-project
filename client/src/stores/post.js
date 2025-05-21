import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePostStore = defineStore("post", () => {
  const allPosts = ref([]);
  const userPosts = ref([]);

  async function fetchAllPosts() {
    try {
      const res = await axios.get("/api/posts");
      allPosts.value = res.data.posts;
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  }

  async function fetchUserPosts(userId) {
    try {
      const res = await axios.get(`/api/posts/user/${userId}`);
      userPosts.value = res.data.posts;
    } catch (err) {
      console.error("Failed to fetch user posts", err);
    }
  }

  return {
    allPosts,
    userPosts,
    fetchAllPosts,
    fetchUserPosts,
  };
});
