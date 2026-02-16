export const useBackgroundEffect = () => {
  const isAnimated = useState('backgroundAnimated', () => true);

  const toggle = () => {
    const nuxtApp = useNuxtApp();
    // @ts-ignore
    nuxtApp.$toggleBackground();
  };

  return { isAnimated, toggle };
};
