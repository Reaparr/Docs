<template>
  <NuxtLink
    :href="link"
    class="no-underline"
    target="_blank"
    rel="noopener">
    <Icon name="mdi-open-in-new" />
    <span>Edit this page on GitHub</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from '#imports';

const props = withDefaults(defineProps<{
  path?: string;
}>(), {
  path: '',
});
const link = computed(() => {
  return `https://github.com/Reaparr/Docs/edit/master/src/content/${props.path}`;
});
</script>
