<template>
    <div class="gallery">
        <img v-for="(url, i) in media" :key="i" :src="url" class="gallery-image" alt="gallery image" />
    </div>
</template>

<script setup>
defineProps({
    media: Array
});
</script>

<style scoped>
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.gallery-image {
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
}
</style>