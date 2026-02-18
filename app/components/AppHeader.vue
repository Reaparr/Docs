<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2">
        <ReaparrLogo :size="32" />
        <span class="hidden sm:block">
          <ReaparrLogoTitle :height="32" />
        </span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      orientation="horizontal"
      :color="scrolled ? 'primary' : 'neutral'"
      :ui="navUi"
      class="hidden lg:flex" />

    <template #right>
      <!-- Discord Link -->
      <UButton
        as="a"
        class="mx-1 hidden sm:inline-flex"
        href="https://discord.com/invite/Qa3BtxN77g"
        rel="noopener"
        variant="outline"
        :ui="btnUi"
        icon=""
        aria-label="Join our Discord"
        target="_blank">
        <UIcon name="simple-icons:discord" />
        <span class="hidden xl:inline">Discord</span>
      </UButton>

      <UButton
        as="a"
        class="mx-1 hidden sm:inline-flex"
        href="https://github.com/Reaparr/Reaparr"
        icon=""
        rel="noopener"
        variant="outline"
        :ui="btnUi"
        aria-label="Reaparr on GitHub"
        target="_blank">
        <UIcon name="mdi:github" />
        <span class="hidden xl:inline">Reaparr</span>
      </UButton>

      <!-- Github Docs Link -->
      <UButton
        as="a"
        class="mx-1 hidden sm:inline-flex"
        href="https://github.com/Reaparr/Docs"
        icon=""
        variant="outline"
        :ui="btnUi"
        rel="noopener"
        aria-label="Reaparr Docs on GitHub"
        target="_blank">
        <UIcon name="mdi:github" />
        <span class="hidden xl:inline">Docs</span>
      </UButton>

      <!-- Background Toggle -->
      <template v-if="mounted">
        <UTooltip
          :delay-duration="0"
          :text="
            isAnimated
              ? 'Switch to static background'
              : 'Switch to animated background'
          ">
          <UButton
            class="mx-1 cursor-pointer"
            variant="outline"
            :ui="btnUi"
            :icon="isAnimated ? 'mdi:image-off' : 'mdi:image'"
            :aria-label="isAnimated ? 'Switch to static background' : 'Switch to animated background'"
            @click="toggle" />
        </UTooltip>
      </template>
      <template v-else>
        <UButton
          class="mx-1 cursor-pointer"
          variant="outline"
          :ui="btnUi"
          icon="mdi:image"
          aria-label="Switch to animated background"
          @click="toggle" />
      </template>
    </template>

    <!-- Mobile menu body (shown when hamburger is open) -->
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{ linkLabel: 'text-white', linkLeadingIcon: 'text-white shrink-0 size-5' }"
        class="-mx-2.5" />

      <UContentNavigation
        v-if="docsNavigation"
        :navigation="docsNavigation"
        class="mt-4 border-t pt-4"
        highlight />

      <div class="flex flex-col gap-2 border-t mt-4 pt-4">
        <UButton
          as="a"
          href="https://discord.com/invite/Qa3BtxN77g"
          rel="noopener"
          variant="outline"
          target="_blank"
          class="w-full justify-start gap-2">
          <UIcon name="simple-icons:discord" />
          Discord
        </UButton>

        <UButton
          as="a"
          href="https://github.com/Reaparr/Reaparr"
          rel="noopener"
          variant="outline"
          target="_blank"
          class="w-full justify-start gap-2">
          <UIcon name="mdi:github" />
          Reaparr
        </UButton>

        <UButton
          as="a"
          href="https://github.com/Reaparr/Docs"
          rel="noopener"
          variant="outline"
          target="_blank"
          class="w-full justify-start gap-2">
          <UIcon name="mdi:github" />
          Docs
        </UButton>
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { headerItems: items } = useNavigation();
const { isAnimated, toggle } = useBackgroundEffect();
const docsNavigation = useDocsNavigation();

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 32);

const btnUi = computed(() => scrolled.value
  ? { base: 'ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 transition-colors duration-300' }
  : { base: 'ring ring-inset ring-white/50 text-white hover:bg-white/10 transition-colors duration-300' },
);

const navUi = computed(() => scrolled.value
  ? {
      link: 'group hover:before:bg-primary/10 data-[active]:before:bg-primary/15 data-[active]:before:ring-1 data-[active]:before:ring-primary/50',
      linkLabel: 'text-primary group-data-[active]:text-primary transition-colors duration-300',
      linkLeadingIcon: 'text-primary! group-data-[active]:text-primary! shrink-0 size-5 transition-colors duration-300',
    }
  : {
      linkLabel: 'text-white transition-colors duration-300',
      linkLeadingIcon: 'text-white shrink-0 size-5 transition-colors duration-300',
    },
);
</script>
