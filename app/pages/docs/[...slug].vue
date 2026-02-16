<template>
  <UPage v-if="page">
    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page" />

      <USeparator>
        <div class="flex items-center gap-2 text-sm text-muted py-3">
          <UButton
            :to="`https://github.com/Reaparr/Docs/edit/master/content/${page.stem}.md`"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-pen">
            Edit this page
          </UButton>
          <span>or</span>
          <UButton
            to="https://github.com/Reaparr/Docs/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-circle-alert">
            Report an issue
          </UButton>
        </div>
      </USeparator>

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs',
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first(),
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  });
});

const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

defineOgImageComponent('Saas');
</script>
