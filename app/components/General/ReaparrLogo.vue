<template>
  <NuxtImg
    :height="size"
    :width="size"
    :src="'https://raw.githubusercontent.com/Reaparr/Reaparr/dev/export/reaparr/logo/reaparr-full.svg'"
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
