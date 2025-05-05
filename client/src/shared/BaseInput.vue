<template>
  <div class="base-input-wrapper" v-if="isPassword">
    <input
      :id="id"
      :type="isVisible ? 'text' : 'password'"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <button type="button" class="eye-toggle" @click="toggleVisibility">
      <component :is="isVisible ? EyeOff : Eye" size="20" />
    </button>
  </div>

  <div class="base-input-wrapper" v-else>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref, watch, computed } from 'vue'
  import { Eye, EyeOff } from 'lucide-vue-next'

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
  const isVisible = ref(false)
  const isPassword = computed(() => props.type === 'password')

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value
  }

  watch(() => props.modelValue, (newVal) => {
    inputValue.value = newVal
  })
  watch(inputValue, (newVal) => {
    emit('update:modelValue', newVal)
  })
</script>

<style scoped>
.base-input-wrapper {
  background-color: #e4e4e4;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.base-input-wrapper input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 1rem;
  outline: none;
}

.eye-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 0 0 0.5rem;
  display: flex;
  align-items: center;
}
</style>
