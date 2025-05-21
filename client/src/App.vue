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
    <Toaster position="top-center" richColors theme="light" :toast-options="{
      style: {
        background: '#ffffff',
        color: '#d00000',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        borderRadius: '16px',
        fontWeight: '600'
      },
      duration: 4000,
      actionButtonStyle: {
        backgroundColor: '#b66734',
        color: '#fff',
        fontWeight: 'bold',
        padding: '0.4rem 0.9rem',
        borderRadius: '8px'
      },
      cancelButtonStyle: {
        backgroundColor: '#fff',
        border: '1px solid #b66734',
        color: '#b66734',
        fontWeight: 'bold',
        padding: '0.4rem 0.9rem',
        borderRadius: '8px'
      }
    }" />
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
