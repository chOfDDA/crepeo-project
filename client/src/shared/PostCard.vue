<template>
    <div class="post-card">
        <div class="header">
            <router-link :to="`/profile/${post.author?._id}`" class="avatar-link">
                <img :src="getAvatar(userProfile?.photoUrl)" alt="avatar" class="avatar" />
            </router-link>
            <div class="user-info">
                <router-link :to="`/profile/${post.author?._id}`" class="username">
                    <strong>{{ post.author?.username || 'Unknown user' }}</strong>
                </router-link>
                <span class="timestamp">{{ formatDate(post.createdAt) }}</span>
            </div>
            <div v-if="showActions && isOwnPost" class="post-actions">
                <button class="action" @click="$emit('edit', post)">✏️</button>
                <button class="action" @click="handleDelete">🗑️</button>
            </div>
        </div>

        <p class="text" v-if="post.content">{{ post.content }}</p>

        <PostGallery v-if="post.imageUrl" :media="[post.imageUrl]" />

        <div class="meta-actions">
            <button class="icon-button">
                <HeartIcon />
            </button>
            <button class="icon-button">
                <CommentIcon />
            </button>
            <button class="icon-button">
                <RepostIcon />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, h } from 'vue';
import api from '@/interceptors/axios';
import { toast } from 'vue-sonner';
import PostGallery from './PostGallery.vue';
import { formatDate } from '@/utils/dateUtils';
import { useUserStore } from '@/stores/user';

import { getAvatar } from '@/utils/avatarHelper';
import { deletePost } from '@/features/posts/postApi';

import HeartIcon from '@/shared/icons/post-icons/HeartIcon.vue';
import CommentIcon from '@/shared/icons/post-icons/CommentIcon.vue';
import RepostIcon from '@/shared/icons/post-icons/RepostIcon.vue';
import DeleteToast from '@/shared/DeleteToast.vue';

const { post } = defineProps({
    post: Object,
    showActions: {
        type: Boolean,
        default: false
    }
});

const userStore = useUserStore();
const isOwnPost = computed(() => post?.author?._id === userStore.user?.id);

const emit = defineEmits(['delete', 'edit']);

const userProfile = ref(null);
onMounted(async () => {
    try {
        const res = await api.get(`/api/profile/${post.author._id}`)
        userProfile.value = res.data.profile;
    } catch (err) {
        console.warn('Error:', err);
    }
});

async function handleDelete() {
    const toastId = toast.custom(() =>
        h(DeleteToast, {
            onConfirm: async () => {
                try {
                    await deletePost(post._id);
                    toast.success("Post deleted");
                    emit("delete", post._id);
                } catch (err) {
                    toast.error("Failed to delete post");
                } finally {
                    toast.dismiss(toastId);
                }
            },
            onCancel: () => toast.dismiss(toastId)
        })
    );
}
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

.meta-actions {
    display: flex;
    gap: 0.6rem;
    padding-top: 0.75rem;
    padding-bottom: 0.5rem;
}

.icon-button {
    background: none;
    border: none;
    padding: 0.35rem;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease;

    svg {
        width: 16px;
        height: 16px;
        color: #555;
        transition: color 0.2s ease;
    }

    &:hover {
        background-color: #f0f0f0;
        transform: scale(1.1);
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    }

    &:hover svg {
        color: #222;
    }
}
</style>
