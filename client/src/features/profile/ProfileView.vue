<template>
  <PageCard title="Profile">
    <div class="profile-header">
      <img :src="getAvatar(profile.photoUrl)" alt="Avatar" class="avatar" />
      <div class="profile-info">
        <h2 class="username" v-if="profile">@{{ profile.username }}</h2>

        <div class="info-block" v-if="profile.role">
          <span class="label"></span>
          <span class="value">{{ profile.role }}</span>
        </div>

        <div class="info-block" v-if="profile.offerType">
          <span class="label"></span>
          <span class="value">{{ profile.offerType }}</span>
        </div>

        <div class="tags right-align"
          v-if="profile.professions?.length && (profile.role === 'Professional' || profile.role === 'Amateur')">
          <span class="tag" v-for="profession in profile.professions" :key="profession">
            {{ profession }}
          </span>
        </div>

        <p class="bio" v-if="profile.bio">{{ profile.bio }}</p>
      </div>
    </div>

    <div class="edit-button-wrapper" v-if="isOwnProfile">
      <BaseButton class="edit-button" @click="editMode = true">
        Edit profile
      </BaseButton>
    </div>

    <div class="profile-postfield-wrapper">
      <PostField v-if="isOwnProfile" @submit="addPost" />
    </div>

    <div v-if="posts.length === 0" class="no-posts">
      <p>This user hasn’t posted anything yet.</p>
    </div>

    <PostCard v-for="post in posts" :key="post._id" :post="post" :showActions="true" @delete="fetchProfile"
      @edit="fetchProfile" />

    <EditProfileWindow v-if="editMode" :key="'edit-profile'" :profile="profile" @saved="onProfileSaved"
      @cancel="editMode = false" />
  </PageCard>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { getAvatar } from '@/utils/avatarHelper';
import { getProfile, getProfileByUserId } from '@/features/profile/profileApi.js';
import { getPostsByUserId } from '@/features/posts/postApi';
import { toast } from 'vue-sonner';

import PageCard from '@/shared/PageCard.vue';
import EditProfileWindow from '@/shared/EditProfileWindow.vue';
import BaseButton from '@/shared/BaseButton.vue';
import PostField from '@/shared/PostField.vue';
import PostCard from '@/shared/PostCard.vue';

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
  } catch (err) {
    toast.error('Error loading profile.');
    return;
  }

  try {
    const postsResp = await getPostsByUserId(userId.value);
    posts.value = postsResp.data.posts;
  } catch (err) {
    toast.error('Error loading posts.');
  }
};

watch(() => route.params.id, fetchProfile);

onMounted(async () => {
  if (!userId.value) {
    return router.push('/login');
  }
  await fetchProfile();

  if (
    isOwnProfile.value &&
    (!profile.value ||
      !profile.value.role ||
      ((profile.value.role === 'Professional' || profile.value.role === 'Amateur') &&
        (!profile.value.professions || profile.value.professions.length === 0)))
  ) {
    editMode.value = true;
  }
});

function onProfileSaved(updated) {
  profile.value = updated;
  userStore.setUser({ ...userStore.user, ...updated });
  editMode.value = false;
}

function addPost(newPost) {
  posts.value = [newPost, ...posts.value];
}
</script>

<style scoped src="./profile.scss"></style>
