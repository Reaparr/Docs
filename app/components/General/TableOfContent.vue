<template>
  <div class="table-of-content">
    <span
      v-if="root"
      style="font-weight: bold">
      Table of Contents
    </span>
    <ul
      v-if="links"
      :class="['p-0', props.root ? 'ml-1' : '']"
      style="list-style-type: none">
      <li
        v-for="link in links"
        :key="link.text">
        <NuxtLink :to="`#${link.id}`">
          {{ link.text }}
        </NuxtLink>
        <TableOfContent
          v-if="link.children"
          :links="link.children" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
import type { PropType } from 'vue';

const props = defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => [],
  },
  root: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.table-of-content {
  position: fixed;
  margin-top: 1rem;
  height: 100%;
  right: 3rem;
}
</style>
