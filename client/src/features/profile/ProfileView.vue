<template>
  <PageCard title="Profile">
    <div class="profile-header">
      <img :src="userStore.avatarUrl" alt="Avatar" class="avatar" />
      <div class="profile-info">
        <h2 v-if="userStore.user">{{ userStore.user.username }}</h2>
        <p class="profession">{{ profile.profession }}</p>
        <p class="bio">{{ profile.bio }}</p>
      </div>
    </div>

    <div class="edit-button-wrapper" v-if="isOwnProfile">
      <BaseButton class="edit-button" @click="editMode = true">
        Edit profile
      </BaseButton>
    </div>

    <PostField v-if="isOwnProfile" />
    <UserPostView v-for="post in userPosts" :key="post.id" :post="post" />

    <EditProfileWindow v-if="editMode" :key="'edit-profile'" :profile="profile" @saved="onProfileSaved"
      @cancel="() => (editMode = false)" />
  </PageCard>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import {
  getProfile,
  getProfileByUserId
} from '@/features/profile/profileApi.js';
import { getPostsByUserId } from '@/features/posts/postApi';

import PageCard from '@/shared/PageCard.vue';
import EditProfileWindow from '@/shared/EditProfileWindow.vue';
import BaseButton from '@/shared/BaseButton.vue';
import PostField from '@/shared/PostField.vue';
import UserPostView from '@/shared/UserPostView.vue';

export default {
  components: {
    PageCard,
    EditProfileWindow,
    BaseButton,
    PostField,
    UserPostView
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const profile = ref({});
    const posts = ref([]);
    const editMode = ref(false);

    const userId = computed(() => {
      const id = route.params.id;
      return id && id !== 'undefined' ? id : userStore.user?.id;
    });

    const isOwnProfile = computed(() =>
      userId.value?.toString() === userStore.user?.id?.toString()
    );

    const fetchProfile = async () => {
      try {
        const pResp = userId.value
          ? await getProfileByUserId(userId.value)
          : await getProfile();
        profile.value = pResp.data.profile || {};

        const postsResp = await getPostsByUserId(userId.value);
        posts.value = postsResp.data.posts;
      } catch (err) {
        console.error('Помилка при завантаженні даних профілю:', err);
      }
    };
    const userPosts = computed(() =>
      posts.value.filter(p => p.user?.id === userStore.user?.id)
    );

    watch(() => route.params.id, fetchProfile);

    onMounted(() => {
      if (!userId.value) {
        return router.push('/login');
      }
      fetchProfile();
    });

    const onProfileSaved = updated => {
      profile.value = updated;
      userStore.setUser({ ...userStore.user, ...updated });
      editMode.value = false;
    };

    return {
      profile,
      posts,
      editMode,
      isOwnProfile,
      onProfileSaved,
      userStore,
      userPosts
    };
  }
};
</script>

<style lang="scss" scoped>
@use './profile.scss' as *;
</style>
