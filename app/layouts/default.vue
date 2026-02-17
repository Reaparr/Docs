<template>
  <UApp>
    <Background />
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

    <UMain>
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
