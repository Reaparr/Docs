<template>
  <img
    :height="height"
    :src="img('https://raw.githubusercontent.com/Reaparr/Reaparr/dev/export/reaparr/title/reaparr-title.svg', { height: height })"
    alt="Reaparr Title">
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  height?: number;
}>(), {
  height: 128,
});

const img = useImage();
</script>
