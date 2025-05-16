<template>
    <div class="post-card">
        <div class="header">
            <router-link :to="`/profile/${post.author?._id}`" class="avatar-link">
                <img :src="post.author?.photoUrl || defaultAvatar" class="avatar" alt="avatar"
                    @error="e => (e.target.src = defaultAvatar)" />
            </router-link>
            <div class="user-info">
                <router-link :to="`/profile/${post.author?._id}`" class="username">
                    <strong>{{ post.author?.username || 'Unknown user' }}</strong>
                </router-link>
                <span class="timestamp">{{ formatDate(post.createdAt) }}</span>
            </div>
            <div v-if="isOwnPost" class="post-actions">
                <button class="action" @click="$emit('edit', post)">✏️</button>
                <button class="action" @click="$emit('delete', post)">🗑️</button>
            </div>
        </div>

        <p class="text" v-if="post.content">{{ post.content }}</p>

        <PostGallery v-if="post.imageUrl" :media="[post.imageUrl]" />

        <div class="meta">
            <span>{{ post.likes }} ❤️</span>
            <span>{{ post.comments }} 💬</span>
            <span>{{ post.reposts }} 🔁</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import PostGallery from './PostGallery.vue';
import defaultAvatar from '@/assets/default-avatar.svg';
import { formatDate } from '@/utils/dateUtils';
import { useUserStore } from '@/stores/user';

const { post } = defineProps({
    post: Object
});

const userStore = useUserStore();
const isOwnPost = computed(() => post?.author?._id === userStore.user?.id);
</script>

<style scoped>
.post-card {
    padding: 1rem;
    border-bottom: 1px solid #eee;
}

.header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
}

.avatar-link {
    display: inline-block;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    color: inherit;
    text-decoration: none;
}

.username:hover {
    text-decoration: underline;
}

.timestamp {
    font-size: 0.8rem;
    color: #888;
}

.post-actions {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    gap: 0.25rem;
}

.action {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    color: #999;
}

.action:hover {
    color: #e74c3c;
}

.text {
    margin: 0.5rem 0;
}

.meta {
    display: flex;
    gap: 1rem;
    color: #999;
    font-size: 0.9rem;
}
</style>
