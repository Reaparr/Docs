<template>
  <UContainer>
    <UCarousel
      ref="carousel"
      arrows
      fade
      :items="screenshots"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="pt-6"
      @select="onSelect">
      <template #default="{ item }">
        <div
          class="relative w-full cursor-zoom-in"
          @click="openModal(item)">
          <NuxtImg
            :src="item.src"
            width="1280"
            height="720"
            class="w-full h-auto rounded-lg object-contain"
            :alt="item.text" />
          <div class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/50 px-4 py-2">
            <p class="text-white text-sm text-center">
              {{ item.text }}
            </p>
          </div>
        </div>
      </template>
    </UCarousel>

    <div class="flex gap-2 justify-center flex-wrap pt-4">
      <div
        v-for="(item, index) in screenshots"
        :key="index"
        class="size-14 cursor-pointer rounded-lg ring-2 ring-transparent transition-all hover:ring-red-500 hover:shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]"
        :class="activeIndex === index ? 'ring-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)] animate-pulse-ring' : ''"
        @click="select(index)">
        <NuxtImg
          :src="item.src"
          width="56"
          height="56"
          :alt="item.text"
          class="rounded-lg w-full h-full object-cover" />
      </div>
    </div>
    <UModal
      v-model:open="modalOpen"
      :title="selectedImage?.text"
      description="Screenshot preview"
      :ui="{ content: 'max-w-[80vw] z-[100]', overlay: 'z-[99]', header: 'sr-only', body: 'p-0' }">
      <template #body>
        <div class="relative">
          <NuxtImg
            :src="selectedImage?.src"
            :alt="selectedImage?.text"
            width="2560"
            height="1440"
            class="w-full h-auto rounded-lg object-contain" />
          <div class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/25 px-4 py-2">
            <p class="text-white text-sm text-center">
              {{ selectedImage?.text }}
            </p>
          </div>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import type { IScreenshot } from '@interfaces';
import { screenshots } from '~/composables';

const carousel = useTemplateRef('carousel');
const activeIndex = ref(0);
const modalOpen = ref(false);
const selectedImage = ref<IScreenshot | null>(null);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;
  carousel.value?.emblaApi?.scrollTo(index);
}

function openModal(item: IScreenshot) {
  selectedImage.value = item;
  modalOpen.value = true;
}
</script>

<style scoped>
@keyframes pulse-ring {
	0%,
	100% {
		box-shadow: 0 0 4px 4px rgba(239, 68, 68, 1);
	}
	50% {
		box-shadow: 0 0 4px 2px rgba(239, 68, 68, 0.6);
	}
}

.animate-pulse-ring {
	animation: pulse-ring 1.5s ease-in-out infinite;
}
</style>
