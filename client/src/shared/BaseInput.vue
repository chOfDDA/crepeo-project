<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    v-model="inputValue"
    class="base-input"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

// Коли модель змінюється ззовні — оновлюємо локально
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// Коли вводимо щось — емітимо наверх
watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
.base-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #e4e4e4;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 2px #b26b40;
  }
}
</style>
