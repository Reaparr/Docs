<template>
  <NuxtImg
    :height="height"
    :style="{ height: `${height}px`, width: 'auto' }"
    class="logo object-contain"
    :src="'https://raw.githubusercontent.com/Reaparr/Reaparr/dev/export/reaparr/title/reaparr-title.svg'"
    alt="Reaparr Title" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  height?: number;
}>(), {
  height: 128,
});
</script>
