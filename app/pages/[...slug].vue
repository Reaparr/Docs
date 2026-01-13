<template>
  <div v-if="page">
    <ReaparrLogo />
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.hero.links">
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <MDC
          :value="page.title"
          unwrap="p" />
      </template>

      <PromotionalVideo />
    </UPageHero>

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden">
      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('index', () =>
  queryCollection('index').first()
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>
