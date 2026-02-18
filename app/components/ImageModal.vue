<template>
  <UModal
    v-model:open="modalOpen"
    :ui="{ content: 'max-w-[90vw] w-fit z-[100]', overlay: 'z-[99]', header: 'sr-only', body: 'p-0' }">
    <template #body>
      <div class="relative" :style="containerStyle">
        <NuxtImg
          :src="selectedImage?.src"
          :alt="selectedImage?.text"
          width="1280"
          height="720"
          densities="x1 x2"
          class="block w-full h-full object-contain rounded-lg"
          @load="onImageLoad" />
        <div class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/25 px-4 py-2">
          <p class="text-white text-sm text-center">
            {{ selectedImage?.text }}
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { modalOpen, selectedImage } = useImageModal();

const naturalRatio = ref<number | null>(null);

watch(selectedImage, () => {
  naturalRatio.value = null;
});

function onImageLoad(e: Event) {
  const img = e.target as HTMLImageElement;
  naturalRatio.value = img.naturalWidth / img.naturalHeight;
}

const containerStyle = computed(() => {
  if (!naturalRatio.value) return { width: '90vw', height: '85vh' };
  // Fit within 90vw × 85vh preserving ratio
  // Try width-first: height = 90vw / ratio
  const heightIfFullWidth = `${90 / naturalRatio.value}vw`;
  // If that height exceeds 85vh, go height-first: width = 85vh * ratio
  const widthIfFullHeight = `${85 * naturalRatio.value}vh`;
  return {
    width: `min(90vw, ${widthIfFullHeight})`,
    height: `min(85vh, ${heightIfFullWidth})`,
  };
});
</script>
