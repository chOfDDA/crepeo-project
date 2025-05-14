<script setup>
import { Home } from 'lucide-vue-next';
defineProps({ active: Boolean });
</script>

<template>
  <Home :color="active ? 'black' : '#999'" size="28" />
</template>
