import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    setupBackgroundEffect();
  });

  nuxtApp.provide('toggleBackground', () => {
    const isAnimated = useState('backgroundAnimated');
    isAnimated.value = !isAnimated.value;

    if (isAnimated.value) {
      setupBackgroundEffect();
      document.body.style.backgroundImage = '';
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
      document.body.style.backgroundImage = 'url(/img/background/background.png)';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
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
    if (document.getElementsByClassName('body').length > 0) {
      return;
    }

    // @ts-ignore
    const effect = VANTA.WAVES({
      el: 'body',
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
