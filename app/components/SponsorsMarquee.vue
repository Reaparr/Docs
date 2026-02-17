<template>
  <div class="w-full py-8">
    <p
      class="text-center text-sm text-muted mb-4 uppercase tracking-widest font-semibold">
      Sponsored by
    </p>
    <UMarquee
      pause-on-hover
      :overlay="false">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.name"
        :href="sponsor.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-6 py-3 rounded-lg border border-default hover:border-primary transition-colors shrink-0">
        <UIcon
          :name="sponsor.icon"
          class="size-8" />
      </a>
    </UMarquee>
  </div>
</template>

<script setup lang="ts">
const sponsors = [
  // JetBrains tools
  { name: 'WebStorm', icon: 'i-simple-icons-webstorm', url: 'http://www.jetbrains.com/webstorm/' },
  { name: 'Rider', icon: 'i-simple-icons-rider', url: 'http://www.jetbrains.com/rider/' },
  { name: 'ReSharper', icon: 'i-simple-icons-resharper', url: 'http://www.jetbrains.com/resharper/' },
  // Media apps
  { name: 'Plex', icon: 'i-simple-icons-plex', url: 'https://www.plex.tv/' },
  { name: 'Sonarr', icon: 'i-simple-icons-sonarr', url: 'https://sonarr.tv/' },
  { name: 'Radarr', icon: 'i-simple-icons-radarr', url: 'https://radarr.video/' },
  // Frontend
  { name: 'Vue', icon: 'i-simple-icons-vuedotjs', url: 'https://vuejs.org/' },
  { name: 'Nuxt', icon: 'i-simple-icons-nuxt', url: 'https://nuxt.com/' },
  { name: 'Quasar', icon: 'i-simple-icons-quasar', url: 'https://quasar.dev/' },
  { name: 'PrimeVue', icon: 'i-simple-icons-primevue', url: 'https://primevue.org/' },
  { name: 'Pinia', icon: 'i-simple-icons-pinia', url: 'https://pinia.vuejs.org/' },
  { name: 'VueUse', icon: 'i-simple-icons-vueuse', url: 'https://vueuse.org/' },
  { name: 'RxJS', icon: 'i-simple-icons-reactivex', url: 'https://rxjs.dev/' },
  { name: 'Axios', icon: 'i-simple-icons-axios', url: 'https://axios-http.com/' },
  { name: 'date-fns', icon: 'i-simple-icons-datefns', url: 'https://date-fns.org/' },
  { name: 'Lodash', icon: 'i-simple-icons-lodash', url: 'https://lodash.com/' },
  // Backend / .NET
  { name: '.NET', icon: 'i-simple-icons-dotnet', url: 'https://dotnet.microsoft.com/' },
  { name: 'Entity Framework', icon: 'i-simple-icons-entityframework', url: 'https://learn.microsoft.com/en-us/ef/' },
  { name: 'SQLite', icon: 'i-simple-icons-sqlite', url: 'https://www.sqlite.org/' },
  { name: 'Swagger', icon: 'i-simple-icons-swagger', url: 'https://swagger.io/' },
  { name: 'Quartz', icon: 'i-simple-icons-quartz', url: 'https://www.quartz-scheduler.net/' },
  { name: 'Serilog', icon: 'i-simple-icons-serilog', url: 'https://serilog.net/' },
  // Tooling
  { name: 'TypeScript', icon: 'i-simple-icons-typescript', url: 'https://www.typescriptlang.org/' },
  { name: 'Vite', icon: 'i-simple-icons-vite', url: 'https://vite.dev/' },
  { name: 'Vitest', icon: 'i-simple-icons-vitest', url: 'https://vitest.dev/' },
  { name: 'Cypress', icon: 'i-simple-icons-cypress', url: 'https://www.cypress.io/' },
  { name: 'Sass', icon: 'i-simple-icons-sass', url: 'https://sass-lang.com/' },
  { name: 'semantic-release', icon: 'i-simple-icons-semanticrelease', url: 'https://semantic-release.gitbook.io/' },
  { name: 'i18n', icon: 'i-simple-icons-i18n', url: 'https://vue-i18n.intlify.dev/' },
  // Platform
  { name: 'Linux', icon: 'i-simple-icons-linux', url: 'https://kernel.org/' },
];
</script>
