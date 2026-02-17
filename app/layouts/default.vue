<template>
  <div>
    <div id="vanta-bg" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;" />
    <AppHeader />

    <UMain>
      <slot />
    </UMain>
  </div>
</template>
