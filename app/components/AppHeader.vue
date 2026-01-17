<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2">
        <ReaparrLogo :size="32" />
        <ReaparrLogoTitle :height="32" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link" />

    <template #right>
      <!-- Github Reaparr Link -->
      <UButton
        as="a"
        class="mx-2"
        href="https://discord.com/invite/Qa3BtxN77g"
        rel="noopener"
        variant="outline"
        icon=""
        target="_blank">
        <UIcon name="simple-icons:discord" />

        Discord
      </UButton>

      <UButton
        as="a"
        class="mx-2"
        href="https://github.com/Reaparr/Reaparr"
        icon=""
        rel="noopener"
        variant="outline"
        target="_blank">
        <UIcon name="mdi:github" />
        Reaparr
      </UButton>

      <!-- Github Docs Link -->
      <UButton
        as="a"
        class="mx-2"
        href="https://github.com/Reaparr/Docs"
        icon=""
        variant="outline"
        rel="noopener"
        target="_blank">
        <UIcon name="mdi:github" />
        Docs
      </UButton>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { headerItems: items } = useNavigation();
</script>
