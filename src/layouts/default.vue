<template>
  <div id="layout-container">
    <AppBar />
    <SidebarDrawer />
    <div id="page-container">
      <slot />
    </div>
    <div
      v-if="editThisFile"
      id="footer">
      <EditThisPage :path="editThisFile" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNavigationStore } from 'store/navigationStore';
import { get, set, useDark } from '@vueuse/core';
import { queryContent, useHead, useRoute } from '#imports';

useHead({
  title: 'Reaparr Docs',
  meta: [{ name: 'description', content: 'Documentation website for the Reaparr project' }],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'https://raw.githubusercontent.com/Reaparr/Reaparr/refs/heads/dev/export/reaparr/logo/reaparr-single.svg' },
  ],
});

const route = useRoute();
const store = useNavigationStore();
await store.setup();

const editThisFile = ref<string | null>(null);

onMounted(() => {
  watch(
    () => route.path, // Watch the route path for changes
    async (newPath) => {
      try {
        if (!newPath) {
          editThisFile.value = null;
          return;
        }

        const currentPage = await queryContent(newPath).findOne();
        const file = currentPage?._file || null;
        console.log('Edit this file:', file);
        if (file === 'index.md') {
          editThisFile.value = null;
          return;
        }
        editThisFile.value = currentPage?._file || null;
      } catch (error) {
        console.error(error);
        editThisFile.value = null;
      }
    },
    { immediate: true }, // Run on initialization
  );
});

// Always set the dark mode
const isDark = useDark();
set(isDark, get(isDark));
</script>

<style lang="scss">
@use 'primeflex/primeflex.scss';
@import '@/assets/scss/style.scss';

#layout-container {
  @extend .background-overlay;

  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
        "header header"
        "side main"
        "side footer";
  grid-template-columns: auto 1fr;
  grid-template-rows: 64px auto 48px;
  -webkit-transition: all .4s;
  transition: all .4s;
}

#page-container {
  overflow: auto;
  height: 100%;
  grid-area: main;
}

#footer {
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
}

// Used to keep the vanta.js background in place and overwrite the built-in position: absolute;
.vanta-canvas {
  position: fixed !important;
}
</style>
