<template>
  <div class="post-field">
    <img :src="userStore.avatarUrl" alt="Avatar" class="avatar" />
    <div class="field-content">
      <textarea v-model="postText" placeholder="What's new?" rows="3" class="field-textarea" readonly
        @click="openPostWindow"></textarea>
    </div>
    <BaseButton @click="openPostWindow">Publish</BaseButton>

    <PostWindow v-if="isPostWindowOpen" @submit="handleSubmit" @close="closePostWindow" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { getProfile } from '@/features/profile/profileApi';

import BaseButton from '@/shared/BaseButton.vue';
import PostWindow from '@/shared/PostWindow.vue';

const postText = ref('');
const isPostWindowOpen = ref(false);

const emit = defineEmits(['submit']);

const userStore = useUserStore();
const avatarUrl = computed(() => userStore.avatarUrl);

function openPostWindow() {
  isPostWindowOpen.value = true;
}

function closePostWindow() {
  console.log('closing modal');
  isPostWindowOpen.value = false;
}

function handleSubmit(postData) {
  emit('submit', postData);
  isPostWindowOpen.value = false;
}

</script>

<style scoped>
.post-field {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 16px;
  background-color: #ececec;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.field-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-textarea {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 0.75rem;
  resize: none;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
