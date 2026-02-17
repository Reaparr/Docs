<template>
  <div class="relative w-full h-[400px] bg-muted overflow-hidden">
    <UMarquee
      reverse
      orientation="vertical"
      :overlay="false"
      :ui="{
        root: '[--duration:40s] absolute w-[460px] -left-[100px] -top-[300px] h-[940px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
      }">
      <NuxtImg
        v-for="screenshot in col1"
        :key="screenshot.src"
        :src="screenshot.src"
        width="460"
        height="258"
        loading="eager"
        fetchpriority="high"
        :alt="screenshot.text"
        class="aspect-video border border-default rounded-lg bg-white" />
    </UMarquee>
    <UMarquee
      orientation="vertical"
      :overlay="false"
      :ui="{
        root: '[--duration:40s] absolute w-[460px] -top-[400px] left-[480px] h-[1160px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
      }">
      <NuxtImg
        v-for="screenshot in col2"
        :key="screenshot.src"
        :src="screenshot.src"
        width="460"
        height="258"
        loading="eager"
        fetchpriority="high"
        :alt="screenshot.text"
        class="aspect-video border border-default rounded-lg bg-white" />
    </UMarquee>
    <UMarquee
      reverse
      orientation="vertical"
      :overlay="false"
      :ui="{
        root: 'hidden md:flex [--duration:40s] absolute w-[460px] -top-[300px] left-[1020px] h-[1060px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
      }">
      <NuxtImg
        v-for="screenshot in col3"
        :key="screenshot.src"
        :src="screenshot.src"
        width="460"
        height="258"
        loading="eager"
        fetchpriority="high"
        :alt="screenshot.text"
        class="aspect-video border border-default rounded-lg bg-white" />
    </UMarquee>
  </div>
</template>

<script setup lang="ts">
import { screenshots } from '~/composables';

const third = Math.ceil(screenshots.length / 3);
const col1 = screenshots.slice(0, third);
const col2 = screenshots.slice(third, third * 2);
const col3 = screenshots.slice(third * 2);
</script>
