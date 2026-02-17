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
      variant="pill"
      class="hidden lg:flex" />

    <template #right>
      <!-- Discord Link -->
      <UButton
        as="a"
        class="mx-1 hidden sm:inline-flex"
        href="https://discord.com/invite/Qa3BtxN77g"
        rel="noopener"
        variant="outline"
        icon=""
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
        rel="noopener"
        target="_blank">
        <UIcon name="mdi:github" />
        <span class="hidden xl:inline">Docs</span>
      </UButton>

      <!-- Background Toggle -->
      <ClientOnly>
        <UTooltip
          :delay-duration="0"
          :text="
            isAnimated
              ? 'Switch to static background'
              : 'Switch to animated background'
          ">
          <UButton
            class="mx-1"
            variant="outline"
            :icon="isAnimated ? 'mdi:image-off' : 'mdi:image'"
            @click="toggle" />
        </UTooltip>
      </ClientOnly>
    </template>

    <!-- Mobile menu body (shown when hamburger is open) -->
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5" />

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
</script>
