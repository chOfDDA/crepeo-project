<template>
    <button
      :class="['auth-button', `auth-button--${variant}`]"
      :type="type"
      @click="$emit('click', $event)"
    >
      <slot/>
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    variant: { type: String, default: 'primary' }, // primary | google | secondary
    type:    { type: String, default: 'button' }
  })
  </script>
  
  <style lang="scss" scoped>
  .auth-button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    cursor: pointer;
  
    &--primary   { background: #999;      color: #fff; }
    &--google    { background: #d14836;   color: #fff; }
    &--secondary { background: #777;      color: #fff; }
  }
  </style>
  