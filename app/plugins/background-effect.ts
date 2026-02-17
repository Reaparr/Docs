import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    setupBackgroundEffect();
  });

  nuxtApp.provide('toggleBackground', () => {
    const isAnimated = useState('backgroundAnimated');
    isAnimated.value = !isAnimated.value;

    if (isAnimated.value) {
      const bg = document.getElementById('vanta-bg');
      if (bg) bg.style.backgroundImage = '';
      setupBackgroundEffect();
    } else {
      // Destroy Vanta effect if present
      const vantaCanvas = document.querySelector('.vanta-canvas');
      if (vantaCanvas) {
        // @ts-ignore
        const effect = (window as any).__vantaEffect;
        if (effect) {
          effect.destroy();
          (window as any).__vantaEffect = null;
        } else {
          vantaCanvas.remove();
        }
      }
      const bg = document.getElementById('vanta-bg');
      if (bg) {
        bg.style.backgroundImage = 'url(/img/background/background.png)';
        bg.style.backgroundSize = 'cover';
        bg.style.backgroundPosition = 'center';
      }
    }
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
    if ((window as any).__vantaEffect) {
      return;
    }

    // @ts-expect-error - imported in nuxt.config.ts
    const effect = VANTA.WAVES({
      el: '#vanta-bg',
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 1000.0,
      minWidth: 1200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x880000,
      shininess: 43.0,
      waveHeight: 4.0,
      waveSpeed: 1.25,
      zoom: 0.65,
    });
    (window as any).__vantaEffect = effect;
  }
}
