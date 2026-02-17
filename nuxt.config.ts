// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/content', '@vueuse/nuxt', '@nuxtjs/sitemap'],
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
  devtools: {
    enabled: false,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Reaparr Docs',
      titleTemplate: '%s | Reaparr Docs',
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
          defer: true,
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js',
          defer: true,
        },
        {
          innerHTML: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vixss7ubk1");`,
        },
      ],
      noscript: [{ textContent: 'JavaScript is required' }],
      meta: [
        {
          name: 'description',
          content: 'Documentation website for the Reaparr project',
        },
        { name: 'color-scheme', content: 'dark only' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Reaparr Docs' },
        {
          property: 'og:description',
          content: 'Documentation website for the Reaparr project',
        },
        { property: 'og:image', content: 'https://reaparr.rocks/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:description',
          content: 'Documentation website for the Reaparr project',
        },
        {
          name: 'twitter:image',
          content: 'https://reaparr.rocks/og-image.png',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          as: 'image',
          href: '/img/background/background.avif',
          type: 'image/avif',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://reaparr.rocks',
    name: 'Reaparr Docs',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classPrefix: '',
    classSuffix: '',
  },

  alias: {
    '@interfaces': fileURLToPath(new URL('./app/types/interfaces/', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components/', import.meta.url)),
    '@composables': fileURLToPath(new URL('./app/composables/', import.meta.url)),
  },

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false },
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    preset: 'aws-amplify',
    awsAmplify: {
      runtime: 'nodejs20.x',
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

  icon: {
    serverBundle: {
      collections: ['lucide', 'mdi', 'simple-icons'],
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
    fallbackToApi: false,
    fetchTimeout: 0,
  },
  /*
	 ** Nuxt Image module configuration
	 */
  image: {
    quality: 80,
    format: ['avif', 'webp'],
    provider: process.env.NODE_ENV === 'production' ? 'ipxStatic' : 'ipx',
  },
  sitemap: {
    exclude: ['/_ipx/**'],
  },
});
