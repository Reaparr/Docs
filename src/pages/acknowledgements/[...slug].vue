<template>
  <Page>
    <PageRenderer :page="currentPage" />
  </Page>
</template>

<script setup lang="ts">
useHead({
  title: 'Acknowledgements',
});

const route = useRoute();

const currentPage = await queryCollection('content').path(route.path).first();
</script>
