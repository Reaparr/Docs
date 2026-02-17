<template>
  <div id="vanta-bg" />
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/img/background/background.avif',
      type: 'image/avif',
    },
  ],
});

onBeforeMount(() => {
  setupBackgroundEffect();
});
</script>

<style>
/* Used to keep the vanta.js background in place and overwrite the built-in position: absolute; */
#vanta-bg {
  background: url("/img/background/background.avif") no-repeat center center
    fixed !important;
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
