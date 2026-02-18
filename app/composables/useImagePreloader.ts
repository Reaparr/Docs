import { screenshots } from '~/composables';

export function useImagePreloader() {
  onMounted(() => {
    screenshots.forEach(({ src }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  });
}
