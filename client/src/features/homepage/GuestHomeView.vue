<template>
    <PageCard title="Main Page" class="homepage">
        <!-- Поле публікації для неавторизованого -->
        <div class="post-field-wrapper" @click="redirectToLogin">
            <PostField :disabled="true" />
        </div>

        <!-- Список постів -->
        <div class="post-list">
            <PostCard v-for="post in posts" :key="post._id" :post="post" :disableInteractions="true" />
        </div>
    </PageCard>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import PageCard from '@/shared/PageCard.vue';
import PostField from '@/shared/PostField.vue';
import PostCard from '@/shared/PostCard.vue';
import { getGuestHomepageData } from './homeApi';

const posts = ref([]);
const router = useRouter();

async function fetchPosts() {
    try {
        const { posts: ps } = await getGuestHomepageData();
        posts.value = ps;
    } catch (err) {
        console.error('Failed to load guest homepage:', err);
        toast.error('Error loading posts');
    }
}


onMounted(fetchPosts);
</script>

<style lang="scss" scoped>
@use './_homepage.scss' as *;
</style>
