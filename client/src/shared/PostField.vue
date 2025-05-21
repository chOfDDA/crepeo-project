<template>
  <div class="post-field">
    <img :src="getAvatar(avatarUrl)" alt="Avatar" class="avatar" />
    <div class="field-content">
      <textarea v-model="postText" placeholder="What's new?" rows="3" class="field-textarea" readonly
        @click="openPostWindow"></textarea>
    </div>
    <BaseButton @click="openPostWindow">Publish</BaseButton>

    <PostWindow v-if="isPostWindowOpen" @submit="handleSubmit" @close="closePostWindow" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import api from '@/interceptors/axios';
const avatarUrl = ref('/assets/default-avatar.svg');
import { getAvatar } from '@/utils/avatarHelper';

onMounted(async () => {
  try {
    const { data } = await api.get('/api/profile');
    avatarUrl.value = data?.profile?.photoUrl || '/assets/default-avatar.svg';
  } catch (err) {
    console.warn('Could not load avatar');
  }
});

import BaseButton from '@/shared/BaseButton.vue';
import PostWindow from '@/shared/PostWindow.vue';

const postText = ref('');
const isPostWindowOpen = ref(false);

const emit = defineEmits(['submit']);

function openPostWindow() {
  isPostWindowOpen.value = true;
}

function closePostWindow() {
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
