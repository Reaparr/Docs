<template>
  <NuxtImg
    :height="height"
    :style="{ 'max-height': `${height}px`, 'width': 'auto' }"
    class="logo object-contain"
    :quality="100"
    format="avif"
    src="/img/logo/reaparr-title-full.png"
    alt="Reaparr Title" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: number;
  }>(),
  {
    height: 128,
  },
);
</script>
