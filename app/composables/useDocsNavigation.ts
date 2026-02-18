import type { ContentNavigationItem } from '@nuxt/content';

export const useDocsNavigation = () => useState<ContentNavigationItem[] | null>('docs-navigation', () => null);
