<template>
  <UBanner
    :to="to"
    :title="title"
    :color="color" />
</template>

<script setup lang="ts">
defineProps<{
  to?: string;
  title?: string;
  color?: string;
}>();
</script>
