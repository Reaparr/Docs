<template>
  <UAccordion
    v-model="activeItems"
    :items="items"
    type="multiple"
    :unmount-on-hide="false"
    @update:model-value="onAccordionChange">
    <template
      v-if="isMounted"
      #default="{ item }">
      <div class="flex items-center justify-between w-full gap-2 pr-2">
        <span class="flex-1">{{ item.label }}</span>
        <UButton
          :icon="
            copiedItem === item.value ? 'i-heroicons-check' : 'i-heroicons-link'
          "
          color="neutral"
          variant="ghost"
          size="xs"
          class="copy-link-button"
          :title="
            copiedItem === item.value
              ? 'Link copied!'
              : 'Copy link to this question'
          "
          @click.stop="copyLink($event, item.value)" />
      </div>
    </template>
    <template
      v-for="(item, index) in items"
      :key="item.value || index"
      #[item.slot]>
      <div :id="item.value">
        <slot :name="item.slot" />
      </div>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import type { AccordionItem } from '#ui/types';

interface Props {
  items: AccordionItem[];
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const nuxtApp = useNuxtApp();

const activeItems = ref<string[]>([]);
const copiedItem = ref<string | null>(null);
const isMounted = ref(false);

const copyLink = async (event: Event, value?: string) => {
  event.stopPropagation();
  event.preventDefault();

  if (!value) return;

  const url = `${window.location.origin}${route.path}#${value}`;

  try {
    await navigator.clipboard.writeText(url);
    copiedItem.value = value;
    toast.add({
      title: 'Link copied!',
      description:
        'The link to this question has been copied to your clipboard.',
      icon: 'i-heroicons-check-circle',
      color: 'success',
    });

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      copiedItem.value = null;
    }, 2000);
  } catch (err) {
    toast.add({
      title: 'Failed to copy',
      description: 'Could not copy the link to your clipboard.' + err,
      icon: 'i-heroicons-x-circle',
      color: 'error',
    });
  }
};

// Check if this accordion contains the target hash item
const hasHashItem = (hash: string) => {
  const itemValue = hash.replace('#', '');
  return props.items.some((i) => i.value === itemValue);
};

// Handle accordion changes and update URL hash
function onAccordionChange(value: string | string[] | undefined) {
  if (value === undefined)
    return;
  // Convert to array if needed
  const values = Array.isArray(value) ? value : [value];

  // Find the last opened item that belongs to this accordion
  const lastOpenedItem = values[values.length - 1];

  if (lastOpenedItem && hasHashItem('#' + lastOpenedItem)) {
    router.replace({ hash: '#' + lastOpenedItem });
  }
}

// Handle initial hash on page load
onMounted(() => {
  isMounted.value = true;
});

// Handle hash navigation after page finishes loading
nuxtApp.hook('page:finish', () => {
  if (route.hash && hasHashItem(route.hash)) {
    const itemValue = route.hash.replace('#', '');

    // Add to active items (keep existing items open)
    if (!activeItems.value.includes(itemValue)) {
      activeItems.value = [...activeItems.value, itemValue];
    }

    // Scroll to the item after a delay to ensure accordion is expanded
    setTimeout(() => {
      const targetElement = document.getElementById(itemValue);
      if (!targetElement) return;

      // Calculate position relative to viewport
      const elementTop
        = targetElement.getBoundingClientRect().top + window.scrollY;
      const offset = 80; // Offset for header and spacing

      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    }, 500);
  }
});

// Watch for hash changes (back/forward navigation)
watch(
  () => route.hash,
  (newHash) => {
    if (newHash && hasHashItem(newHash)) {
      const itemValue = newHash.replace('#', '');

      // Add to active items (keep existing items open for back/forward)
      if (!activeItems.value.includes(itemValue)) {
        activeItems.value = [...activeItems.value, itemValue];
      }

      setTimeout(() => {
        const targetElement = document.getElementById(itemValue);
        if (!targetElement) return;

        const elementTop
          = targetElement.getBoundingClientRect().top + window.scrollY;
        const offset = 80;

        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
      }, 300);
    }
  },
);
</script>

<style scoped>
.copy-link-button {
  opacity: 0.6;
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.copy-link-button:hover {
  opacity: 1;
}
</style>
