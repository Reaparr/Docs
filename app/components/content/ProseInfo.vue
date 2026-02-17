<template>
  <UAlert
    color="info"
    variant="subtle"
    :title="title"
    :description="description"
    icon="i-lucide-info" />
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>
