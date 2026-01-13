<template>
  <Page>
    <PageRenderer :page="currentPage" />
  </Page>
</template>

<!-- Pages need a single root element to make page transition work -->
<script setup lang="ts">
const route = useRoute();
const currentPage = await queryCollection('content').path(route.path).first();

useHead({
  title: `Contributing - ${currentPage.title}`,
});
</script>
