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
    grid-template-columns: 1fr;
    justify-items: center;
    margin-top: 0.5rem;
    max-width: 100%;
}

.gallery-image {
    width: 100%;
    max-width: 400px;
    max-height: 500px;
    height: auto;
    border-radius: 12px;
    object-fit: contain;
}

@media (max-width: 768px) {
    .gallery-image {
        max-height: 250px;
    }
}
</style>