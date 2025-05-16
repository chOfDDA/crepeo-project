import { getProfile } from "@/features/profile/profileApi";
import { getAllPosts } from "@/features/posts/postApi";
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
