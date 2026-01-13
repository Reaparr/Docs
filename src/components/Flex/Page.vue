<template>
  <FlexContainer
    id="page"
    :align-items="alignItems"
    :column="column && !row"
    :gap="gap"
    :justify="justify"
    :layout="layout"
    :row="row && !column"
    full-width
    :class="{ 'no-max-width': noMaxWidth }"
    grow="1">
    <slot />
  </FlexContainer>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    column?: boolean;
    row?: boolean;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
    layout?: '1' | 'auto' | 'initial' | 'none';
    noMaxWidth?: boolean;
  }>(),
  {
    column: true,
    row: false,
    gap: '0',
    layout: 'initial',
    alignItems: 'center',
    justify: 'start',
    noMaxWidth: false,
  },
);
</script>

<style lang="scss">
@use '@/assets/scss/style.scss' as *;

#page {
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;

  &.no-max-width {
    max-width: none !important;
  }
}

/* Media query for large screens */
@media (min-width: 1600px) {
  #page {
    max-width: 1200px;
  }
}

/* Media query for medium screens */
@media (max-width: 1200px) {
  #page {
    max-width: 1000px;
  }
}

/* Media query for small screens */
@media (max-width: 992px) {
  #page {
    max-width: 800px;
  }
}

/* Media query for very small screens */
@media (max-width: 768px) {
  #page {
    max-width: 600px;
  }
}

/* Media query for mobile devices */
@media (max-width: 576px) {
  #page {
    max-width: 100%;
    padding: 0 1.5rem; /* Increase padding for small screens */
  }
}
</style>
