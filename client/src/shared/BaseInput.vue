<template>
    <div class="input-field">
      <label :for="id" class="input-field__label">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="input-field__input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: [String, Number],
    label:      { type: String, required: true },
    id:         { type: String, required: true },
    type:       { type: String, default: 'text' },
    placeholder:{ type: String, default: '' }
  })
  </script>
  
  <style lang="scss" scoped>
  .input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  
    &__label {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    &__input {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 2rem;
      background: #f2f2f2;
      font-size: 1rem;
    }
  }
  </style>
  