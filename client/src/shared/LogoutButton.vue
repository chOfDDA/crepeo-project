<template>
  <button @click="logout" class="logout-button">Log out</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();

const userStore = useUserStore();
function logout() {
  userStore.logout();
  router.push('/login');
}
</script>

<style scoped>
.logout-button {
  background-color: #eee;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>