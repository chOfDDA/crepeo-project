<script setup>
import { Toaster } from 'vue-sonner';
import Sidebar from '@/shared/Sidebar.vue';
import PostButton from '@/shared/PostButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const hideSidebarOnRoutes = ['/login', '/register', '/google'];
</script>

<template>
  <div class="app-layout">
    <Sidebar v-if="!hideSidebarOnRoutes.includes(route.path)" />
    <PostButton v-if="!hideSidebarOnRoutes.includes(route.path)" />
    <main :class="['main-content', { 'no-sidebar': hideSidebarOnRoutes.includes(route.path) }]">
      <router-view />
    </main>
    <Toaster position="top-right" richColors />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 80px;
  padding: 1rem;
}

.main-content.no-sidebar {
  margin-left: 0;
  padding: 0;
}
</style>
