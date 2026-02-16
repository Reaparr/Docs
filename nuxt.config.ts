// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Reaparr Docs',
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
        },
        { src: 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js' },
      ],
      noscript: [{ textContent: 'JavaScript is required' }],
      meta: [{ name: 'color-scheme', content: 'dark' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  devtools: {
    enabled: false,
  },
  /*
   ** Auto-import components
   *  Doc: https://github.com/nuxt/components
   */
  components: {
    loader: true,
    dirs: [
      {
        path: './components',
        pathPrefix: false,
        global: true,
        extensions: ['vue'],
      },
    ],
  },
  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false },
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    awsAmplify: {
      imageSettings: {
        dangerouslyAllowSVG: true,
      },
    },
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        arrowParens: true,
        blockSpacing: true,
        braceStyle: '1tbs',
        commaDangle: 'always-multiline',
        quotes: 'single',
        quoteProps: 'as-needed',
      },
    },
  },

  alias: {
    '@interfaces': fileURLToPath(
      new URL('./app/types/interfaces/', import.meta.url),
    ),
    '@components': fileURLToPath(new URL('./app/components/', import.meta.url)),
  },
});
