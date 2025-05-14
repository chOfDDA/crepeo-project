<template>
  <div>
    <button class="post-button" @click="openWindow">+</button>
    <PostWindow v-if="isOpen" @close="isOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PostWindow from '@/shared/PostWindow.vue';

const isOpen = ref(false);

function openWindow() {
  isOpen.value = true;
}
</script>

<style lang="scss" scoped>
@use './_variables' as *;

.post-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: $primary-color;
  color: $white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
}
</style>
