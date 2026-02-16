<template>
  <UAlert
    color="warning"
    variant="subtle"
    :title="title"
    :description="description"
    icon="i-lucide-triangle-alert"
  />
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>
