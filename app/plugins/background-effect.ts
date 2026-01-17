import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    setupBackgroundEffect();
  });
});

function setupBackgroundEffect() {
  if (!document) {
    return;
  }
  // Check if WebGL is available.
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  console.info('Wave effect created!');

  if (gl instanceof WebGLRenderingContext) {
    if (document.getElementsByClassName('vanta-canvas').length > 0) {
      return;
    }

    // @ts-ignore
    VANTA.WAVES({
      el: 'body',
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 800.0,
      minWidth: 800.0,
      scale: 1.0,
      scaleMobile: 0.5,
      color: 0x880000,
      shininess: 43.0,
      waveHeight: 4.0,
      waveSpeed: 0.5,
      zoom: 0.45,
    });
  }
}
