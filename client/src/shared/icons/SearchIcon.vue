<script setup>
import { Search } from 'lucide-vue-next';
defineProps({ active: Boolean });
</script>

<template>
  <Search :color="active ? 'black' : '#999'" size="28" />
</template>
