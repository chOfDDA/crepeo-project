<script setup>
import { Menu } from 'lucide-vue-next';
defineProps({ active: Boolean });
</script>

<template>
  <Menu :color="active ? 'black' : '#999'" size="28" />
</template>
