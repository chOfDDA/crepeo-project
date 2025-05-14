<template>
    <button class="base-button" :disabled="disabled" @click="handleClick">
        <slot></slot>
    </button>
</template>
  
<script setup>
    const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
    });

    const emit = defineEmits(['click']);

    function handleClick(event) {
        if (!props.disabled) emit('click', event);
    }
</script>
  
<style scoped>
  .base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 9999px;
    background-color: #b66a3c;
    color: #fff;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  
    &:hover:not(:disabled) {
      background-color: #9a552f;
    }
  
    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }
  }
</style>
  