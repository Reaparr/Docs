<template>
  <NuxtImg
    :height="size"
    :width="size"
    src="/img/logo/reaparr-full-512.png"
    alt="Reaparr Docs Logo" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 128,
  },
);
</script>
