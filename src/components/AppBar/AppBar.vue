<template>
  <Toolbar id="app-bar">
    <template #start>
      <Button
        as="router-link"
        text
        to="/">
        <Logo :size="36" />
        <LogoTitle :height="36" />
      </Button>
    </template>

    <template #center>
      <FlexContainer>
        <Button
          v-for="(link, index) in store.getPageNavItems"
          :key="index"
          :to="link.path"
          as="router-link"
          severity="contrast"
          size="large"
          text>
          {{ link.label }}
        </Button>
      </FlexContainer>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { useNavigationStore } from 'store';

const store = useNavigationStore();
</script>

<style lang="scss">
html {
  &.dark {
    #app-bar {
      color: white !important;
    }
  }

  #app-bar {
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    width: 100%;
    height: 4rem;
    border-radius: 0;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;

    background-color: var(--p-surface-400);

    grid-area: header;

   a, a:visited, a:focus, a:active {
      color: white !important;
    }
  }
}
</style>
