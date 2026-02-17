<template>
  <UModal
    v-model:open="modalOpen"
    :ui="{ content: 'max-w-[90vw] w-fit z-[100]', overlay: 'z-[99]', header: 'sr-only', body: 'p-0' }">
    <template #body>
      <div class="relative w-fit">
        <NuxtImg
          :src="selectedImage?.src"
          :alt="selectedImage?.text"
          width="1280"
          height="720"
          class="block h-[85vh] max-w-[90vw] w-auto rounded-lg" />
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
</script>
