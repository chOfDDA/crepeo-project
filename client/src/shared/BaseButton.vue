<template>
  <button :type="type" class="base-button">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  }
})
</script>

<style scoped>
.base-button {
  width: 100%;
  padding: 0.75rem 1.25rem;
  background-color: #b26b40;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8e5434; /* трохи темніший */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #d19c77;
  }
}
</style>
