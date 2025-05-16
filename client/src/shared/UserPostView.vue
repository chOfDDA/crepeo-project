<template>
    <div class="user-post">
        <div class="top-line">
            <span class="date">{{ formatDate(post.createdAt) }}</span>
        </div>

        <p class="text" v-if="post.content">{{ post.content }}</p>

        <img v-if="post.imageUrl" :src="post.imageUrl" class="post-image" alt="image" />
    </div>
</template>

<script setup>
import { formatDate } from '@/utils/dateUtils';

defineProps({
    post: Object
});
</script>

<style scoped>
.user-post {
    padding: 1rem 0;
    border-bottom: 1px solid #e0e0e0;
}

.top-line {
    display: flex;
    justify-content: flex-end;
    color: #aaa;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
}

.text {
    margin-bottom: 0.5rem;
    white-space: pre-wrap;
}

.post-image {
    max-width: 100%;
    border-radius: 6px;
    margin-top: 0.5rem;
}
</style>