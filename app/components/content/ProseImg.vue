<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    sizes="100vw sm:100vw md:100vw lg:1280px xl:2560px"
    class="cursor-pointer rounded-lg"
    @click="openModal({ src, text: alt })" />
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const { src, alt } = toRefs(props);
const { openModal } = useImageModal();
</script>
