<template>
  <Page align-items="start">
    <PageRenderer :page="currentPage" />
  </Page>
</template>

<!-- Pages need a single root element to make page transition work -->
<script setup lang="ts">
import { queryCollection, useHead, useRoute } from '#imports';

const route = useRoute();
const currentPage = await queryCollection('content').path(route.path).first();

useHead({
  title: `Guides - ${currentPage.title}`,
});
</script>
