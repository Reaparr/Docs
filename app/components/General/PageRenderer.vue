<template>
  <!-- Pages need a single root element to make page transition work -->
  <article>
    <ContentRenderer :value="page">
      <template #empty>
        <h3>No content found.</h3>
      </template>
    </ContentRenderer>
  </article>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';

defineProps<{ page: ParsedContent }>();
</script>
