import { getProfile } from "@/features/profile/profileApi";
import { getAllPosts } from "@/features/posts/postApi";
import api from "@/interceptors/axios";
import { useUserStore } from "@/stores/user";

export async function getHomepageData() {
  const userStore = useUserStore();
  const userId = userStore.user?.id;

  if (!userId) throw new Error("User not found in Pinia");

  const [profileRes, postsRes] = await Promise.all([
    getProfile(),
    getAllPosts(),
  ]);

  return {
    user: userStore.user,
    profile: profileRes.data.profile,
    posts: postsRes.data.posts || [],
  };
}

export async function getGuestHomepageData() {
  try {
    const postsRes = await getAllPosts();
    return {
      posts: postsRes.data.posts || [],
    };
  } catch (err) {
    console.error("getGuestHomepageData error:", err);
    throw err;
  }
}
