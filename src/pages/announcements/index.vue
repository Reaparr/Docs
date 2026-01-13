<template>
  <Page align-items="start">
    <FlexContainer justify="center">
      <h1>Announcements</h1>
    </FlexContainer>
    <FlexContainer grow="1">
      <!-- Blog Items -->
      <NuxtLink
        v-for="(item, i) in currentPage"
        :key="i"
        :to="item.path">
        <Card
          :dt="styling"
          class="max-w-24rem">
          <template #content>
            <FlexContainer justify="center">
              <Logo class="mb-4" />
            </FlexContainer>
            <FlexContainer column>
              <span class="p-card-title">
                {{ item.title }}
              </span>
              <div class="p-card-subtitle my-2">
                {{ item.description }}
              </div>
            </FlexContainer>
          </template>
          <template
            v-if="item.authors"
            #footer>
            <Authors
              :authors="item.authors"
              :date="item.date" />
          </template>
        </Card>
      </NuxtLink>
    </FlexContainer>
  </Page>
</template>

<script setup lang="ts">
import { queryCollection, useHead, useRoute } from '#imports';
import type { IAnnouncement } from '~/common/types/IAnnouncement';

useHead({
  title: 'Announcements',
});

const route = useRoute();
const currentPage: IAnnouncement[] = await queryCollection('content').path(route.path).all() as IAnnouncement[];

const styling = ref({
  colorScheme: {
    light: {
      root: {
        panelBackground: 'transparent',
      },
    },
    dark: {
      root: {
        background: '{surface.400}',
      },
    },
  },
});
</script>
