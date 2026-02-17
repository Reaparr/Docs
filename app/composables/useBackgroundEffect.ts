import { ref } from 'vue';

declare global {
  interface Window {
    __vantaEffect?: { destroy: () => void } | null;
    VANTA?: never;
  }
}

const _isAnimated = ref(false);

export function useBackgroundEffect() {
  const isAnimated = _isAnimated;

  const toggle = () => {
    try {
      if (window.__vantaEffect) {
        log('Toggle → destroying effect');
        destroyBackgroundEffect();
      } else {
        log('Toggle → creating effect');
        activateBackgroundEffect();
      }
    } catch (err) {
      logError('Toggle failed', err);
    }
  };

  return { isAnimated, toggle };
}

export function activateBackgroundEffect(): void {
  if (_isAnimated.value) {
    log('Activate skipped (effect already active)');
  }

  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      log('Setup skipped (SSR environment)');
      return;
    }

    if (window.__vantaEffect) {
      log('Setup skipped (effect already exists)');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      log('Setup aborted (prefers-reduced-motion)');
      return;
    }

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!(gl instanceof WebGLRenderingContext)) {
      log('Setup aborted (WebGL not supported)');
      return;
    }

    const el = document.getElementById('vanta-bg');
    if (!el) {
      log('Setup aborted (#vanta-bg element not found)');
      return;
    }

    // @ts-expect-error - VANTA is loaded via script tag, so we need to ignore TypeScript checks
    if (!window.VANTA?.WAVES) {
      log('Setup aborted (VANTA.WAVES not available)');
      return;
    }

    log('Creating Vanta WAVES effect');

    // @ts-expect-error - VANTA is loaded via script tag, so we need to ignore TypeScript checks
    window.__vantaEffect = window.VANTA.WAVES({
      el,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 1000,
      minWidth: 1200,
      scale: 1,
      scaleMobile: 1,
      color: 0x880000,
      shininess: 43,
      waveHeight: 4,
      waveSpeed: 1.25,
      zoom: 0.65,
    });

    _isAnimated.value = true;
    log('Effect created successfully');
  } catch (err) {
    logError('Setup failed', err);
  }
}

export function destroyBackgroundEffect(): void {
  try {
    if (typeof window === 'undefined') {
      log('Destroy skipped (SSR environment)');
      return;
    }

    if (!window.__vantaEffect) {
      log('Destroy skipped (no active effect)');
      return;
    }

    log('Destroying Vanta effect');

    window.__vantaEffect.destroy();
    window.__vantaEffect = null;
    _isAnimated.value = false;

    log('Effect destroyed successfully');
  } catch (err) {
    logError('Destroy failed', err);
  }
}

function log(message: string, ...args: unknown[]) {
  console.info(`[BackgroundEffect] ${message}`, ...args);
}

function logError(message: string, error?: unknown) {
  console.error(`[BackgroundEffect] ${message}`, error);
}
