<template>
  <PanelMenu
    :dt="styling"
    :expanded-keys="store.getSidebarState(sidebarKey)"
    :model="items"
    multiple
    @update:expanded-keys="store.setSidebarState(sidebarKey, $event)">
    <template #item="{ item, active }">
      <NuxtLink
        v-if="item.items?.length"
        class="navigation-link">
        <FlexContainer
          justify="between"
          align-items="center">
          <span class="ml-2">{{ item.label }}</span>
          <span class="mx-2 pt-1">
            <svg
              v-if="active"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="p-icon p-accordionheader-toggle-icon"
              aria-hidden="true"
              data-pc-section="toggleicon"><path
                d="M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z"
                fill="currentColor" /></svg>

            <svg
              v-else
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="p-icon p-accordionheader-toggle-icon"
              aria-hidden="true"
              data-pc-section="toggleicon"><path
                d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z"
                fill="currentColor" />
            </svg>
          </span>
        </FlexContainer>
      </NuxtLink>
      <NuxtLink
        v-else
        :to="item.route"
        class="navigation-link">
        <FlexContainer align-items="center">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </FlexContainer>
      </NuxtLink>
    </template>
  </PanelMenu>
</template>

<script lang="ts" setup>
import { useNavigationStore } from 'store';
import type { MenuItem } from 'primevue/menuitem';
import { get } from '@vueuse/core';
import { computed } from '#imports';

const store = useNavigationStore();

const props = withDefaults(defineProps<{ sidebarKey?: string }>(), {
  sidebarKey: '',
});

const items = computed((): MenuItem[] => {
  const navItems = store.getNavItems(props.sidebarKey);
  if (!navItems) {
    return [];
  }
  let index = 0;
  return navItems.map((x): MenuItem => ({
    label: x.title,
    key: 'key_' + index++,
    route: x.path,
    items: x.children?.map((x): MenuItem => ({
      key: 'key_' + index++,
      label: x.title,
      icon: x.icon,
      route: x.path,
      url: x.url,
      target: x.target,
      items: [],
    })) ?? undefined,
  }));
});

const styling = ref({
  colorScheme: {
    light: {
      root: {
        panelBackground: 'transparent',
        itemColor: 'black',
        gap: '0rem',
        panelBorderWidth: '0',
        panelBorderRadius: '0',
        panelFirstBorderWidth: '0',
        panelLastBorderWidth: '0',
        itemBorderRadius: '0',
      },
    },
    dark: {
      root: {
        itemColor: 'white',
        gap: '0rem',
        panelBorderWidth: '0',
        panelBorderRadius: '0',
        panelFirstBorderWidth: '0',
        panelLastBorderWidth: '0',
        itemBorderRadius: '0',
        submenuIndent: '0',
        panelBackground: '{transparent}',
        itemFocusBackground: '{transparent}',
        itemFocusColor: '{red.50}',
        panelPadding: '0',
      },
    },
  },
});

onMounted(() => {
  // By default, expand all items
  store.setSidebarState(props.sidebarKey, get(items).reduce((acc, x) => {
    // @ts-expect-error key is always defined
    acc[x.key] = true;
    return acc;
  }, {}));
});
</script>

<style lang="scss">
@use '@/assets/scss/style.scss' as *;

.p-panelmenu-panel {
  padding: 0;
  line-height: 1.5rem;
  background: transparent !important;
  border-color: transparent !important;
}

.navigation-link {
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: inherit !important;
  &:hover {
    color: inherit !important;
  }
}

.p-panelmenu-item-content a{
  margin-left: 0.75rem;
}

.p-panelmenu-header:hover, .p-panelmenu-item:hover {
  box-shadow: 0 2px 0 rgba(255, 0, 0, 0.60);
  transition: all 0.1s;
}

.p-panelmenu-header-content, .p-panelmenu-item-content {
  font-size: 1.125rem;
  line-height: 1.5rem;
}

.p-panelmenu-item-content {
  transition: none !important;
}
</style>
