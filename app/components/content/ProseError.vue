<template>
  <UAlert
    color="error"
    variant="subtle"
    :title="title"
    :description="description"
    icon="i-lucide-circle-x" />
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>
