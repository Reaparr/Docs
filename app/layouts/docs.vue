<template>
  <UApp>
    <Background />
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <template #top>
                <UContentSearchButton :collapsed="false" />
              </template>

              <UContentNavigation
                :navigation="navigation"
                highlight />
            </UPageAside>
          </template>

          <slot />
        </UPage>
      </UContainer>
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
</script>
