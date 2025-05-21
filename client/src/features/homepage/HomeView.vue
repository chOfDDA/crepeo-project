<template>
  <PageCard title="Home" class="homepage">
    <div class="post-field-wrapper">
      <PostField @submit="addPost" />
    </div>
    <div class="post-list">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </PageCard>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue-sonner';

import PageCard from '@/shared/PageCard.vue';
import PostField from '@/shared/PostField.vue';
import PostCard from '@/shared/PostCard.vue';
import { getHomepageData } from './homeApi';

const posts = ref([]);

async function fetchPosts() {
  try {
    const { posts: ps } = await getHomepageData();
    posts.value = ps;
  } catch (err) {
    console.error('Homepage error:', err);
    toast.error('Failed to load homepage');
  }
}

function addPost(newPost) {
  posts.value = [newPost, ...posts.value];
}

onMounted(fetchPosts);
</script>

<style lang="scss" scoped>
@use './_homepage.scss' as *;
</style>
