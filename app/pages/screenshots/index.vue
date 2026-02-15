<template>
  <UContainer>
    <UCarousel
      ref="carousel"
      arrows
      fade
      :items="images"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="pt-6"
      @select="onSelect">
      <template #default="{ item }">
        <div
          class="relative w-full cursor-zoom-in"
          @click="openModal(item as Screenshot)">
          <img
            :src="(item as Screenshot).src"
            class="w-full h-auto rounded-lg object-contain"
            :alt="(item as Screenshot).text">
          <div
            class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/50 px-4 py-2">
            <p class="text-white text-sm text-center">
              {{ (item as Screenshot).text }}
            </p>
          </div>
        </div>
      </template>
    </UCarousel>

    <div class="flex gap-2 justify-center flex-wrap pt-4">
      <div
        v-for="(item, index) in images"
        :key="index"
        class="size-14 cursor-pointer rounded-lg ring-2 ring-transparent transition-all hover:ring-red-500 hover:shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]"
        :class="
          activeIndex === index
            ? 'ring-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)] animate-pulse-ring'
            : ''
        "
        @click="select(index)">
        <img
          :src="item.src"
          width="56"
          height="56"
          :alt="(item as Screenshot).text"
          class="rounded-lg w-full h-full object-cover">
      </div>
    </div>
    <UModal
      v-model:open="modalOpen"
      :ui="{ content: 'max-w-[80vw] z-[100]', overlay: 'z-[99]' }">
      <template #content>
        <div class="relative">
          <img
            :src="selectedImage?.src"
            :alt="selectedImage?.text"
            class="w-full h-auto rounded-lg object-contain">
          <div
            class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/25 px-4 py-2">
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
interface Screenshot {
  src: string;
  text: string;
}

const images: Screenshot[] = [
  {
    text: 'Login screen with authentication form and branding',
    src: '/img/screenshots/demo-1-login-screen.png',
  },
  {
    text: 'Initial setup step 1 – introduction or welcome configuration screen',
    src: '/img/screenshots/demo-2-setup-1.png',
  },
  {
    text: 'Initial setup step 2 – server or connection configuration',
    src: '/img/screenshots/demo-2-setup-2.png',
  },
  {
    text: 'Initial setup step 3 – account or authentication setup',
    src: '/img/screenshots/demo-2-setup-3.png',
  },
  {
    text: 'Initial setup step 4 – folder or storage configuration',
    src: '/img/screenshots/demo-2-setup-4.png',
  },
  {
    text: 'Initial setup step 5 – integration or service configuration',
    src: '/img/screenshots/demo-2-setup-5.png',
  },
  {
    text: 'Initial setup step 6 – final review and confirmation',
    src: '/img/screenshots/demo-2-setup-6.png',
  },
  {
    text: 'Movies library – poster table view with grid layout',
    src: '/img/screenshots/demo-3-movies-library-1-poster-table.png',
  },
  {
    text: 'Movies library – filter menu with filtering options',
    src: '/img/screenshots/demo-3-movies-library-2-filter-menu.png',
  },
  {
    text: 'Movies library – sorting menu with sort options',
    src: '/img/screenshots/demo-3-movies-library-2-sort-menu.png',
  },
  {
    text: 'Movies library – full detailed view of selected movie',
    src: '/img/screenshots/demo-3-movies-library-2-full-view.png',
  },
  {
    text: 'TV show library – download confirmation dialog',
    src: '/img/screenshots/demo-4-tv-show-library-1-download-confirmation.png',
  },
  {
    text: 'Movies library – table view with list layout',
    src: '/img/screenshots/demo-3-movies-library-2-table-view.png',
  },
  {
    text: 'TV show library – detail view with episode information',
    src: '/img/screenshots/demo-4-tv-show-library-1-detail-view.png',
  },
  {
    text: 'Movies library – refresh progress and status overview',
    src: '/img/screenshots/demo-5-movies-library-refresh.png',
  },
  {
    text: 'TV show library – refresh progress and status overview',
    src: '/img/screenshots/demo-6-tv-show-library-refresh.png',
  },
  {
    text: 'Download overview – All downloads will show here with progress and status',
    src: '/img/screenshots/demo-7-download-screen.png',
  },
  {
    text: 'Settings – account overview and management screen',
    src: '/img/screenshots/demo-5-settings-account-overview.png',
  },
  {
    text: 'Settings – create or add new account screen',
    src: '/img/screenshots/demo-5-settings-new-account.png',
  },
  {
    text: 'Settings – advanced configuration overview',
    src: '/img/screenshots/demo-5-settings-advanced-overview.png',
  },
  {
    text: 'Settings – folder configuration overview',
    src: '/img/screenshots/demo-5-settings-folder-overview.png',
  },
  {
    text: 'Settings – integration configuration overview',
    src: '/img/screenshots/demo-5-settings-integration-overview.png',
  },
  {
    text: 'Settings – user interface customization overview',
    src: '/img/screenshots/demo-5-settings-ui-overview.png',
  },
];

const carousel = useTemplateRef('carousel');
const activeIndex = ref(0);
const modalOpen = ref(false);
const selectedImage = ref<Screenshot | null>(null);

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

function openModal(item: Screenshot) {
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
