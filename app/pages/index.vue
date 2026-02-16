<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.hero.links">
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <div class="flex flex-col items-center justify-center">
          <ReaparrLogo :size="256" />
          <ReaparrLogoTitle :height="200" />
        </div>
      </template>
      <USeparator />

      <ScreenshotsMarquee />

      <LazyStarsBg />
    </UPageHero>
  </div>

  <USeparator label="Features" />

  <div>
    <UPageSection
      orientation="horizontal"
      headline="Integration"
      title="Sonarr & Radarr Support"
      description="Reaparr connects directly with your *arr suite. Trigger downloads automatically when Sonarr or Radarr adds new media to your watchlist."
      :features="[
        {
          title: 'Automatic sync',
          description:
            'Picks up new requests from Sonarr and Radarr instantly.',
          icon: 'i-lucide-refresh-cw',
        },
        {
          title: 'No manual effort',
          description: 'Set it up once and let Reaparr handle the rest.',
          icon: 'i-lucide-sparkles',
        },
      ]">
      <NuxtImg
        src="/img/screenshots/demo-5-settings-integration-overview.png"
        class="rounded-xl border border-default w-full cursor-zoom-in"
        alt="Integration settings"
        @click="
          openModal({
            src: '/img/screenshots/demo-5-settings-integration-overview.png',
            text: 'Integration settings',
          })
        " />
    </UPageSection>

    <UPageSection
      reverse
      orientation="horizontal"
      headline="Performance"
      title="Scalable, Multi-Threaded Downloads"
      description="A resilient download manager built to handle massive libraries. Multiple threads work in parallel so your queue never stalls."
      :features="[
        {
          title: 'Parallel downloads',
          description: 'Multiple threads process your queue simultaneously.',
          icon: 'i-lucide-layers',
        },
        {
          title: 'Resilient & resumable',
          description: 'Downloads recover automatically from interruptions.',
          icon: 'i-lucide-shield-check',
        },
      ]">
      <NuxtImg
        src="/img/screenshots/demo-7-download-screen.png"
        class="rounded-xl border border-default w-full cursor-zoom-in"
        alt="Download screen"
        @click="
          openModal({
            src: '/img/screenshots/demo-7-download-screen.png',
            text: 'Download screen',
          })
        " />
    </UPageSection>

    <UPageSection
      orientation="horizontal"
      headline="Deployment"
      title="Works Anywhere Docker Runs"
      description="Deploy on your PC, home server, NAS, Unraid, or Synology. If Docker runs on it, Reaparr runs on it."
      :features="[
        {
          title: 'One-command setup',
          description: 'Up and running with a single Docker command.',
          icon: 'i-lucide-terminal',
        },
        {
          title: 'Platform agnostic',
          description:
            'Windows, Linux, macOS, Unraid, Synology — all supported.',
          icon: 'i-lucide-globe',
        },
      ]">
      <NuxtImg
        src="/img/screenshots/demo-2-setup-1.png"
        class="rounded-xl border border-default w-full cursor-zoom-in"
        alt="Setup screen"
        @click="
          openModal({
            src: '/img/screenshots/demo-2-setup-1.png',
            text: 'Setup screen',
          })
        " />
    </UPageSection>

    <UPageSection
      reverse
      orientation="horizontal"
      headline="Accounts"
      title="Multi-Account Management"
      description="Connect multiple Plex accounts and servers. Organize and download content from any accessible source into your personal library."
      :features="[
        {
          title: 'Multiple servers',
          description: 'Pull from any Plex server you have access to.',
          icon: 'i-lucide-server',
        },
        {
          title: 'Organized library',
          description: 'Downloads land exactly where you want them.',
          icon: 'i-lucide-folder-open',
        },
      ]">
      <NuxtImg
        src="/img/screenshots/demo-5-settings-account-overview.png"
        class="rounded-xl border border-default w-full cursor-zoom-in"
        alt="Account settings"
        @click="
          openModal({
            src: '/img/screenshots/demo-5-settings-account-overview.png',
            text: 'Account settings',
          })
        " />
    </UPageSection>

    <UPageSection
      orientation="horizontal"
      headline="Accessibility"
      title="Multi-Language Support"
      description="Reaparr speaks your language. The interface is available in English, French, German, Polish, and more languages are on the way."
      :features="[
        {
          title: 'Growing language support',
          description: 'New languages added regularly by the community.',
          icon: 'i-lucide-languages',
        },
        {
          title: 'Full UI translation',
          description: 'Every screen, dialog, and label is fully localised.',
          icon: 'i-lucide-type',
        },
      ]">
      <NuxtImg
        src="/img/screenshots/demo-5-settings-ui-overview.png"
        class="rounded-xl border border-default w-full cursor-zoom-in"
        alt="UI language settings"
        @click="
          openModal({
            src: '/img/screenshots/demo-5-settings-ui-overview.png',
            text: 'UI language settings',
          })
        " />
    </UPageSection>

    <UPageSection
      reverse
      orientation="horizontal"
      headline="Library"
      title="Your Library, Your Way"
      description="Browse your entire media collection in a rich poster grid or a compact table view. Filter and sort by any attribute, then choose exactly what to download and where it goes."
      :features="[
        {
          title: 'Poster & table views',
          description:
            'Switch between a visual poster grid and a detailed table layout instantly.',
          icon: 'i-lucide-layout-grid',
        },
        {
          title: 'Powerful filter & sort',
          description: 'Slice your library by genre, year, status, rating and more.',
          icon: 'i-lucide-list-filter',
        },
        {
          title: 'Download to anywhere',
          description:
            'Pick the destination folder per item — full control over where files land.',
          icon: 'i-lucide-hard-drive-download',
        },
      ]">
      <NuxtImg
        src="/img/screenshots/demo-3-movies-library-1-poster-table.png"
        class="rounded-xl border border-default w-full cursor-zoom-in"
        alt="Movies library poster view"
        @click="
          openModal({
            src: '/img/screenshots/demo-3-movies-library-1-poster-table.png',
            text: 'Movies library poster view',
          })
        " />
    </UPageSection>

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

    <UPageCTA
      title="Ready to get started?"
      description="Set up Reaparr in minutes and take control of your media library."
      :links="[
        {
          label: 'Get Started',
          to: '/docs/getting-started',
          color: 'primary',
          size: 'xl',
        },
        {
          label: 'View Screenshots',
          to: '/screenshots',
          color: 'neutral',
          variant: 'subtle',
          size: 'xl',
        },
      ]" />
  </div>
</template>

<script setup lang="ts">
import type { IScreenshot } from '@interfaces';

const { data: page } = await useAsyncData('index', () =>
  queryCollection('index').first(),
);

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

const modalOpen = ref(false);
const selectedImage = ref<IScreenshot | null>(null);

function openModal(item: IScreenshot) {
  selectedImage.value = item;
  modalOpen.value = true;
}
</script>
