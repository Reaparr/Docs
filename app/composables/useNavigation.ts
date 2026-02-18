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
      icon: 'i-lucide-book',
      to: '/docs',
      active: route.path.startsWith('/docs'),
    },
    {
      label: 'Screenshots',
      icon: 'i-lucide-image',
      to: '/screenshots',
      active: route.path.startsWith('/screenshots'),
    },
    {
      label: 'Changelog',
      icon: 'i-lucide-history',
      to: '/changelog',
      active: route.path.startsWith('/changelog'),
    },
    {
      label: 'Credits',
      icon: 'i-lucide-heart',
      to: '/credits',
      active: route.path.startsWith('/credits'),
    },
    {
      label: 'Donate',
      icon: 'i-lucide-hand-coins',
      to: '/donate',
      active: route.path.startsWith('/donate'),
    },
  ]);

  const footerLinks = [
    {
      label: 'Docs',
      icon: 'i-lucide-book',
      to: '/docs/getting-started',
    },
    {
      label: 'Screenshots',
      icon: 'i-lucide-image',
      to: '/screenshots',
    },
    {
      label: 'Changelog',
      icon: 'i-lucide-history',
      to: '/changelog',
    },
    {
      label: 'Credits',
      icon: 'i-lucide-heart',
      to: '/credits',
    },
    {
      label: 'Donate',
      icon: 'i-lucide-hand-coins',
      to: '/donate',
    },
  ];

  return {
    headerItems,
    footerLinks,
  };
};
