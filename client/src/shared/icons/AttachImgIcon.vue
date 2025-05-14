<script setup>
import { ImagePlus } from 'lucide-vue-next';

defineProps({
  active: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Number],
    default: 24
  }
});
</script>

<template>
  <ImagePlus :color="active ? '#B26B40' : '#999'" :size="size" />
</template>
