<template>
  <img
    :height="size"
    :width="size"
    :src="img('https://raw.githubusercontent.com/Reaparr/Reaparr/dev/export/reaparr/logo/reaparr-full.svg', { width: size, height: size })"
    alt="Reaparr Docs Logo">
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: number;
}>(), {
  size: 128,
});

const img = useImage();
</script>
