<script setup>
import { computed } from 'vue';
import { Toaster } from 'vue-sonner';
import Sidebar from '@/shared/Sidebar.vue';
import PostButton from '@/shared/PostButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const hideSidebar = computed(() => route.meta.hideSidebar);
</script>

<template>
  <div class="app-layout">
    <Sidebar v-if="!hideSidebar" />
    <PostButton v-if="!hideSidebar" />
    <main :class="['main-content', { 'no-sidebar': hideSidebar }]">
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

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 0.5rem;
  }
}
</style>
