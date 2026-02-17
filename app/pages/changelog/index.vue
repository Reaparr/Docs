<template>
  <div class="min-h-screen xl:grid xl:grid-cols-2">
    <UPageSection
      title="Reaparr Changelog"
      description="Browse the latest Reaparr releases and updates."
      orientation="vertical"
      :links="[
        {
          label: 'Documentation',
          icon: 'i-lucide-book-open',
          variant: 'ghost',
          size: 'md',
          to: '/docs/getting-started',
        },
      ]"
      :ui="{
        root: 'border-b border-default xl:border-b-0 xl:sticky xl:inset-y-0 xl:h-screen overflow-hidden',
        container: 'h-full items-center justify-center',
        wrapper: 'flex flex-col',
        headline: 'mb-6',
        title: 'text-left text-4xl',
        description: 'text-left max-w-lg',
        links: 'gap-1 justify-start -ms-2.5',
      }">
      <template #title>
        <div class="flex items-center gap-2">
          <ReaparrLogo :size="32" />
          <span>Reaparr Changelog</span>
        </div>
      </template>
      <template #top>
        <ClientOnly>
          <SkyBg />
        </ClientOnly>

        <div
          class="absolute -right-1/2 z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-100 transform -translate-y-1/2 top-1/2" />
      </template>

      <template #headline />

      <template #default />
    </UPageSection>

    <section class="px-4 sm:px-6 xl:px-0 xl:-ms-30 xl:flex-1">
      <UChangelogVersions
        as="main"
        :indicator-motion="false"
        :ui="{
          root: 'py-16 sm:py-24 lg:py-32',
          indicator: 'inset-y-0',
        }">
        <UChangelogVersion
          v-for="version in versions"
          :key="version.tag"
          v-bind="version"
          :to="version.releaseUrl"
          :ui="{
            root: 'flex items-start',
            container: 'max-w-xl',
            header: 'border-b border-default pb-4',
            title: 'text-3xl',
            date: 'text-xs/9 text-highlighted font-mono',
            indicator:
              'sticky top-0 pt-16 -mt-16 sm:pt-24 sm:-mt-24 lg:pt-32 lg:-mt-32',
          }">
          <template #title>
            <NuxtLink
              :to="version.releaseUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:underline">
              {{ version.title }}
            </NuxtLink>
          </template>
          <template #body>
            <ClientOnly>
              <MDC
                v-if="version.markdown"
                :value="version.markdown" />
            </ClientOnly>
          </template>
        </UChangelogVersion>
      </UChangelogVersions>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Changelog',
  ogTitle: 'Changelog | Reaparr Docs',
  description: 'Browse the latest Reaparr releases and updates.',
  ogDescription: 'Browse the latest Reaparr releases and updates.',
  ogImage: 'https://reaparr.rocks/og-image.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://reaparr.rocks/og-image.png',
});

const { data: versions } = await useFetch(
  'https://api.github.com/repos/Reaparr/Reaparr/releases',
  {
    transform: (
      data: Array<{
        name?: string;
        tag_name: string;
        published_at: string;
        body: string;
        releaseUrl: string;
        release: string;
      }>,
    ) => {
      return data.map((release) => ({
        tag: release.tag_name,
        title: release.name || release.tag_name,
        date: release.published_at,
        markdown: release.body.replace(
          /^# \[[^\]]+\]\([^)]+\) \(\d{4}-\d{2}-\d{2}\)\n+/m,
          '',
        ),
        releaseUrl: release.html_url,
        release: release,
      }));
    },
  },
);
</script>
