<template>
  <UApp>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none">
      Skip to content
    </a>

    <BackGround />
    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :color-mode="false"
        :fuse="{ resultLimit: 42 }" />
    </ClientOnly>

    <AppHeader />

    <UMain id="main-content">
      <slot />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
const { data: navigation } = await useAsyncData(
  'navigation',
  () => queryCollectionNavigation('docs'),
  {
    transform: (data) =>
      data.find((item) => item.path === '/docs')?.children || [],
  },
);
const { data: files } = useLazyAsyncData(
  'search',
  () => queryCollectionSearchSections('docs'),
  {
    server: false,
  },
);

const { footerLinks: links } = useNavigation();
</script>
