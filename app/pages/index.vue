<template>
  <div>
    <UPageHero
      :title="title"
      :description="description"
      :links="[
        {
          label: 'Get Started',
          to: '/docs/getting-started',
          size: 'lg',
          icon: 'i-lucide-arrow-right',
          trailing: true,
        },
      ]"
      :ui="pageHeroUi">
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <div class="flex flex-col items-center justify-center">
          <ReaparrLogo
            :size="128"
            class="my-2" />
          <ReaparrLogoTitle :height="100" />
        </div>
      </template>
      <ScreenshotsMarquee />

      <LazyStarsBg />
    </UPageHero>

    <div>
      <!-- Library Feature -->
      <UPageSection
        v-bind="pageSectionUi"
        orientation="horizontal"
        headline="Library"
        title="Your Library, Your Way"
        description="Browse your entire media collection in a rich poster grid or a compact table view. Filter and sort by any attribute, then choose exactly what to download and where it goes."
        :features="[
          {
            title: 'Poster & table views',
            description: 'Switch between a visual poster grid and a detailed table layout instantly.',
            icon: 'i-lucide-layout-grid',
          },
          {
            title: 'Powerful filter & sort',
            description: 'Slice your library by genre, year, quality, country and more.',
            icon: 'i-lucide-list-filter',
          },
          {
            title: 'Download to anywhere',
            description: 'Pick the destination folder per item — full control over where files land.',
            icon: 'i-lucide-hard-drive-download',
          },
        ]">
        <NuxtImg
          src="/img/screenshots/demo-3-movies-library-1-poster-table.avif"
          width="800"
          height="450"
          class="rounded-xl border border-default w-full cursor-zoom-in"
          alt="Movies library poster view"
          @click="
            openModal({
              src: '/img/screenshots/demo-3-movies-library-1-poster-table.avif',
              text: 'Movies library poster view',
            })
          " />
      </UPageSection>

      <!-- Download Features -->
      <UPageSection
        v-bind="pageSectionUiReverse"
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
          src="/img/screenshots/demo-7-download-screen.avif"
          width="800"
          height="450"
          class="rounded-xl border border-default w-full cursor-zoom-in"
          alt="Download screen"
          @click="
            openModal({
              src: '/img/screenshots/demo-7-download-screen.avif',
              text: 'Download screen',
            })
          " />
      </UPageSection>

      <!-- Multi account support -->
      <UPageSection
        v-bind="pageSectionUi"
        orientation="horizontal"
        headline="Accounts"
        title="Multi-Account Management"
        description="Connect multiple Plex accounts and servers. Organize and download content from any accessible source into your personal Plex server."
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
          src="/img/screenshots/demo-5-settings-account-overview.avif"
          width="800"
          height="450"
          class="rounded-xl border border-default w-full cursor-zoom-in"
          alt="Account settings"
          @click="
            openModal({
              src: '/img/screenshots/demo-5-settings-account-overview.avif',
              text: 'Account settings',
            })
          " />
      </UPageSection>

      <!-- Sonarr/Radarr integration -->
      <UPageSection
        v-bind="pageSectionUiReverse"
        orientation="horizontal"
        headline="Integration"
        title="Sonarr & Radarr Support"
        description="Reaparr will act as an indexer and download client for Sonarr and Radarr. Add items to your Sonarr/Radarr queue and Reaparr will pick them up and process the downloads automatically."
        :features="[
          {
            title: 'Easy to setup',
            description: 'Point Reaparr to your Sonarr/Radarr instance and it will configure itself.',
            icon: 'i-lucide-sparkles',
          },
          {
            title: 'Media source for Sonarr/Radarr',
            description: 'Acts as a source for media in Sonarr/Radarr, no more needing Torrents or Usenet indexers.',
            icon: 'i-lucide-database',
          },
        ]">
        <NuxtImg
          src="/img/screenshots/demo-5-settings-integration-overview.avif"
          width="800"
          height="450"
          class="rounded-xl border border-default w-full cursor-zoom-in"
          alt="Integration settings"
          @click="
            openModal({
              src: '/img/screenshots/demo-5-settings-integration-overview.avif',
              text: 'Integration settings',
            })
          " />
      </UPageSection>

      <!-- Multi language support -->
      <UPageSection
        v-bind="pageSectionUi"
        orientation="horizontal"
        headline="Accessibility"
        title="Multi-Language Support"
        description="Reaparr speaks your language. The interface is available in English, French, German, Polish, and more languages are on the way!"
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
          src="/img/screenshots/demo-5-settings-ui-language-select.avif"
          width="800"
          height="450"
          class="rounded-xl border border-default w-full cursor-zoom-in"
          alt="UI language settings"
          @click="
            openModal({
              src: '/img/screenshots/demo-5-settings-ui-language-select.avif',
              text: 'UI language settings',
            })
          " />
      </UPageSection>

      <!-- Docker support -->
      <UPageSection
        v-bind="pageSectionUiReverse"
        orientation="horizontal"
        headline="Deployment"
        title="Works Anywhere Docker Runs"
        description="Deploy on your PC, home server, NAS, Unraid, or Synology. ARM or AMD CPU, if Docker runs on it, Reaparr runs on it."
        :features="[
          {
            title: 'Setup wizard',
            description: 'Easy setup wizard to get you up and running in minutes.',
            icon: 'i-lucide-terminal',
          },
          {
            title: 'Platform agnostic',
            description: 'Windows, Linux, macOS, Unraid, Synology — all supported.',
            icon: 'i-lucide-globe',
          },
        ]">
        <NuxtImg
          src="/img/screenshots/demo-2-setup-1.avif"
          width="800"
          height="450"
          class="rounded-xl border border-default w-full cursor-zoom-in"
          alt="Setup screen"
          @click="
            openModal({
              src: '/img/screenshots/demo-2-setup-1.avif',
              text: 'Setup screen',
            })
          " />
      </UPageSection>

      <UPageCTA
        title="Shut up and take my money!"
        description="Set up Reaparr in minutes and take control of your media library."
        :links="[
          {
            label: 'Donate',
            to: '/donate',
            color: 'neutral',
            variant: 'subtle',
            size: 'xl',
          },
          {
            label: 'Get Started',
            to: '/docs/getting-started',
            color: 'primary',
            size: 'xl',
          },
        ]" />
    </div>
  </div>
</template>

<script setup lang="ts">
const pageHeroUi = {
  container: 'flex flex-col lg:grid py-10 sm:py-14 lg:py-18 gap-8 sm:gap-y-12',
};

const pageSectionUi = {
  ui: {
    container: 'flex flex-col lg:grid py-8 sm:py-12 lg:py-16 gap-8 sm:gap-12',
  },
};

const pageSectionUiReverse = {
  ui: {
    container: 'flex flex-col lg:grid py-8 sm:py-12 lg:py-16 gap-8 sm:gap-12',
    wrapper: 'lg:order-last',
  },
};

const title = 'Reaparr';
const description = 'Plex downloader that brings content from any server to yours!';

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://reaparr.rocks/og-image.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://reaparr.rocks/og-image.png',
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Reaparr',
        url: 'https://reaparr.rocks',
        logo: 'https://reaparr.rocks/favicon.svg',
        sameAs: ['https://github.com/Reaparr/Reaparr', 'https://discord.com/invite/Qa3BtxN77g'],
      }),
    },
  ],
});

const { openModal } = useImageModal();
</script>
