<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-12.5" />

    <UPageBody>
      <ContentRenderer
        v-if="page?.body"
        :value="page" />
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('credits', () => queryCollection('credits').first());

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

defineOgImageComponent('Saas');
</script>
