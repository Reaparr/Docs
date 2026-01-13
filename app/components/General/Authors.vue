<template>
  <FlexContainer
    v-for="(avatar, j) in authors"
    :key="j"
    align-items="center"
    class="ma-0">
    <NuxtLink
      :href="avatar.link"
      external
      target="_blank">
      <Avatar
        :image="avatar.avatarUrl"
        class="mr-2 cursor-pointer"
        shape="circle"
        size="large" />
    </NuxtLink>

    <div>
      <NuxtLink
        :href="avatar.link"
        class="white-link"
        external
        target="_blank">
        <span>{{ avatar.name }}</span><br>
        <span class="subtitle">{{ format(Date.parse(date), 'PPP') }}</span>
      </NuxtLink>
    </div>
  </FlexContainer>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import type { IAuthor } from '~/common/types/IAnnouncement';

withDefaults(defineProps<{
  authors: IAuthor[];
  date: string;
}>(), {
  authors: () => [],
  date: '',
});
</script>
