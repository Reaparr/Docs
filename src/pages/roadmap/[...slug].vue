<template>
  <Page>
    <PageRenderer :page="currentPage" />
  </Page>
</template>

<script setup lang="ts">
import { queryCollection, useHead, useRoute } from '#imports';

useHead({
  title: 'Roadmap',
});

const route = useRoute();

const currentPage = await queryCollection('content').path(route.path).first();
</script>
