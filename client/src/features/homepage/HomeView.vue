<template>
  <PageCard title="Home">
    <PostField />
    <PostList :posts="posts" :user="user" :profile="profile" />
  </PageCard>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

import PageCard from '@/shared/PageCard.vue';
import PostField from '@/shared/PostField.vue';
import PostList from '@/features/posts/PostList.vue';

import { getProfile, getPosts } from '@/features/profile/profileApi.js';
import { getUser } from '@/features/user/userApi.js';

const posts = ref([]);
const user = ref({});
const profile = ref({});

onMounted(async () => {
  try {
    const [{ data: u }, { data: p }, { data: ps }] = await Promise.all([
      getUser(),
      getProfile(),
      getPosts()
    ]);
    user.value = u.user;
    profile.value = p.profile;
    posts.value = ps.posts;
  } catch (err) {
    console.error('Error initializing home view:', err);
  }
});
</script>

<style lang="scss" scoped>
@use './_homepage.scss' as *;
</style>
