<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description">
      <template #links>
        <UButton
          to="https://github.com/sponsors/Reaparr"
          target="_blank"
          icon="i-simple-icons-github"
          size="xl"
          color="primary"
          variant="solid">
          Sponsor on GitHub
        </UButton>
      </template>
    </UPageHero>

    <UContainer>
      <UPageBody>
        <ContentRenderer
          v-if="page?.body"
          :value="page"
          class="prose prose-lg" />
      </UPageBody>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('donate', () => queryCollection('donate').first());

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
