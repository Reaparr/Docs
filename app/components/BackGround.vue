<template>
  <div id="vanta-bg" />
</template>

<style>
/* Used to keep the vanta.js background in place and overwrite the built-in position: absolute; */
#vanta-bg {
  background: url("/img/background/background.avif") center center fixed
    no-repeat !important;
  background-size: cover;
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
