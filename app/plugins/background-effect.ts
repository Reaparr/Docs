import { defineNuxtPlugin } from '#app';
import { activateBackgroundEffect } from '@composables';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    activateBackgroundEffect();
  });
});
