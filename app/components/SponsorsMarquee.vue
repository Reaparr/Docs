<template>
  <div class="w-full py-8">
    <UPageLogos
      class="mb-8"
      :ui="{ logos: 'flex-wrap' }"
      title="Reaparr is sponsored by">
      <a
        v-for="item in sponsors"
        :key="item.name"
        :href="item.url"
        target="_blank"
        :aria-label="item.name"
        class="flex flex-col items-center gap-1 w-20 py-2 rounded-md hover:bg-neutral-800 transition-colors">
        <UIcon
          :name="item.icon"
          class="size-6" />
        <span class="text-xs text-neutral-400 text-center leading-tight">{{ item.name }}</span>
      </a>
    </UPageLogos>

    <UPageLogos
      :ui="{ logos: 'flex-wrap' }"
      title="Reaparr makes use of the awesome work:">
      <a
        v-for="item in tools"
        :key="item.name"
        :href="item.url"
        target="_blank"
        :aria-label="item.name"
        class="flex flex-col items-center gap-1 w-20 py-2 rounded-md hover:bg-neutral-800 transition-colors">
        <UIcon
          :name="item.icon"
          class="size-6" />
        <span class="text-xs text-neutral-400 text-center leading-tight">{{ item.name }}</span>
      </a>
    </UPageLogos>
  </div>
</template>

<script setup lang="ts">
const sponsors = [
  {
    name: 'CodeRabbit',
    icon: 'i-simple-icons-coderabbit',
    url: 'https://www.coderabbit.ai/',
  },
  {
    name: 'WebStorm',
    icon: 'i-simple-icons-webstorm',
    url: 'https://www.jetbrains.com/webstorm/',
  },
  {
    name: 'Rider',
    icon: 'i-simple-icons-rider',
    url: 'https://www.jetbrains.com/rider/',
  },
  {
    name: 'ReSharper',
    icon: 'i-simple-icons-resharper',
    url: 'https://www.jetbrains.com/resharper/',
  },
];

const tools = [
  // Media apps
  { name: 'Plex', icon: 'i-simple-icons-plex', url: 'https://www.plex.tv/' },
  { name: 'Sonarr', icon: 'i-simple-icons-sonarr', url: 'https://sonarr.tv/' },
  {
    name: 'Radarr',
    icon: 'i-simple-icons-radarr',
    url: 'https://radarr.video/',
  },
  // Frontend
  { name: 'Vue', icon: 'i-simple-icons-vuedotjs', url: 'https://vuejs.org/' },
  { name: 'Nuxt', icon: 'i-simple-icons-nuxt', url: 'https://nuxt.com/' },
  { name: 'Quasar', icon: 'i-simple-icons-quasar', url: 'https://quasar.dev/' },
  {
    name: 'PrimeVue',
    icon: 'i-simple-icons-primevue',
    url: 'https://primevue.org/',
  },
  {
    name: 'Pinia',
    icon: 'i-simple-icons-pinia',
    url: 'https://pinia.vuejs.org/',
  },
  { name: 'VueUse', icon: 'i-simple-icons-vueuse', url: 'https://vueuse.org/' },
  { name: 'RxJS', icon: 'i-simple-icons-reactivex', url: 'https://rxjs.dev/' },
  {
    name: 'Axios',
    icon: 'i-simple-icons-axios',
    url: 'https://axios-http.com/',
  },
  {
    name: 'date-fns',
    icon: 'i-simple-icons-datefns',
    url: 'https://date-fns.org/',
  },
  { name: 'Lodash', icon: 'i-simple-icons-lodash', url: 'https://lodash.com/' },
  // Backend / .NET
  {
    name: '.NET',
    icon: 'i-simple-icons-dotnet',
    url: 'https://dotnet.microsoft.com/',
  },
  {
    name: 'SQLite',
    icon: 'i-simple-icons-sqlite',
    url: 'https://www.sqlite.org/',
  },
  {
    name: 'Swagger',
    icon: 'i-simple-icons-swagger',
    url: 'https://swagger.io/',
  },
  // Tooling
  {
    name: 'TypeScript',
    icon: 'i-simple-icons-typescript',
    url: 'https://www.typescriptlang.org/',
  },
  { name: 'Vite', icon: 'i-simple-icons-vite', url: 'https://vite.dev/' },
  { name: 'Vitest', icon: 'i-simple-icons-vitest', url: 'https://vitest.dev/' },
  {
    name: 'Cypress',
    icon: 'i-simple-icons-cypress',
    url: 'https://www.cypress.io/',
  },
  { name: 'Sass', icon: 'i-simple-icons-sass', url: 'https://sass-lang.com/' },
  {
    name: 'semantic-release',
    icon: 'i-simple-icons-semanticrelease',
    url: 'https://semantic-release.gitbook.io/',
  },
  {
    name: 'i18n',
    icon: 'i-simple-icons-i18next',
    url: 'https://vue-i18n.intlify.dev/',
  },
  // Platform
  { name: 'Linux', icon: 'i-simple-icons-linux', url: 'https://kernel.org/' },
];
</script>
