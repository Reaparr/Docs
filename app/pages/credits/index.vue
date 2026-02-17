<template>
  <UContainer>
    <SponsorsMarquee />
    <ContentRenderer
      v-if="page?.body"
      class="py-12.5"
      :value="page" />
  </UContainer>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('credits', () =>
  queryCollection('credits').first(),
);

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>
