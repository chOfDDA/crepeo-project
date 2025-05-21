<template>
  <div class="page-wrapper">
    <h1 class="page-title">{{ title }}</h1>
    <div class="page-card">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.page-card {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .page-card {
    max-width: 600px;
  }
}
</style>
