interface NavigationItem {
  label: string;
  to: string;
  icon?: string;
  active?: boolean;
}

export const useNavigation = () => {
  const route = useRoute();

  const headerItems = computed<NavigationItem[]>(() => [
    {
      label: 'Docs',
      to: '/docs',
      active: route.path.startsWith('/docs'),
    },
    {
      label: 'Screenshots',
      to: '/screenshots',
      active: route.path.startsWith('/screenshots'),
    },
    {
      label: 'Changelog',
      to: '/changelog',
      active: route.path.startsWith('/changelog'),
    },
    {
      label: 'Credits',
      to: '/credits',
      active: route.path.startsWith('/credits'),
    },
    {
      label: 'Donate',
      to: '/donate',
      active: route.path.startsWith('/donate'),
    },
  ]);

  const footerLinks = computed<NavigationItem[]>(() => [
    {
      label: 'Docs',
      icon: 'i-lucide-book',
      to: '/docs/getting-started',
    },
    {
      label: 'Pricing',
      icon: 'i-lucide-credit-card',
      to: '/pricing',
    },
    {
      label: 'Changelog',
      icon: 'i-lucide-history',
      to: '/changelog',
    },
    {
      label: 'Credits',
      icon: 'i-lucide-history',
      to: '/credits',
    },
  ]);

  return {
    headerItems,
    footerLinks,
  };
};
