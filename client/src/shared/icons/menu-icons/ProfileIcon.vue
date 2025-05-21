<script setup>
import { User } from 'lucide-vue-next';
defineProps({ active: Boolean });
</script>

<template>
  <User :color="active ? 'black' : '#999'" size="28" />
</template>
