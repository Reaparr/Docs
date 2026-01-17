<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.hero.links">
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <div class="flex flex-col items-center justify-center">
          <ReaparrLogo :size="256" />
          <ReaparrLogoTitle :height="200" />
        </div>
      </template>
      <USeparator />

      <PromotionalVideo />
      <LazyStarsBg />
    </UPageHero>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('index', () =>
  queryCollection('index').first(),
);

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>
