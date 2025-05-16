<template>
    <div class="post-window-backdrop" @click.self="closeWindow">
        <div class="post-window">
            <div class="header">
                <button class="cancel-btn" @click="closeWindow">Cancel</button>
                <span class="title">New Post</span>
            </div>

            <div class="scrollable-content">
                <div class="content">
                    <img :src="userStore.avatarUrl" alt="Avatar" class="avatar" />
                    <textarea v-model="postText" placeholder="What's new?" rows="4" />
                </div>

                <div v-if="imageUrl" class="image-preview">
                    <img :src="imageUrl" alt="Attached" />
                </div>
            </div>

            <div class="actions">
                <AttachImgIcon :active="true" size="24" @click="attachImage" />
                <BaseButton @click="submitPost" :disabled="!postText.trim() && !imageUrl">
                    Publish
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';
import BaseButton from '@/shared/BaseButton.vue';
import { openUploadWidget } from '@/services/cloudinary.js';
import AttachImgIcon from './icons/AttachImgIcon.vue';
import { useUserStore } from '@/stores/user';
import { createPost } from '@/features/posts/postApi';

const postText = ref('');
const imageUrl = ref('');
const emit = defineEmits(['submit', 'close']);
const userStore = useUserStore();
const avatarUrl = computed(() => userStore.avatarUrl);

function closeWindow() {
    emit('close');
}

function handleUploadComplete(error, result) {
    if (!error && result.event === 'success') {
        imageUrl.value = result.info.secure_url;
    }
}

async function attachImage() {
    try {
        const widget = await openUploadWidget('post', handleUploadComplete);
        widget.open();
    } catch (err) {
        console.error('Cloudinary upload failed:', err);
    }
}

async function submitPost() {
    try {
        const { data } = await createPost({
            content: postText.value,
            imageUrl: imageUrl.value
        });
        toast.success('Post published');
        emit('submit', data.post);
    } catch (err) {
        console.error('Post creation failed:', err);
        toast.error('Failed to publish post');
    } finally {
        postText.value = '';
        imageUrl.value = '';
        closeWindow();
    }
}
</script>

<style lang="scss" scoped>
@use './_variables' as *;

.post-window-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.post-window {
    background: #fff;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 80vh;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
}

.scrollable-content {
    overflow-y: auto;
    padding: 1rem;
    flex: 1;
}

.cancel-btn {
    background: none;
    border: none;
    color: $main-text-color;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0;
}

.title {
    font-weight: 600;
    font-size: 1.2rem;
    color: $main-text-color;
}

.content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

textarea {
    flex: 1;
    width: 100%;
    padding: 0.75rem;
    border-radius: 12px;
    border: 1px solid #ddd;
    resize: none;
    font-size: 1rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.image-preview {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}

.image-preview img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid #ddd;
}

.attach-button {
    background: none;
    border: none;
    color: #3797f0;
    cursor: pointer;
    font-size: 0.9rem;
}
</style>
