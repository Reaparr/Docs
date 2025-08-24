<template>
  <Page align-items="center">
    <FlexContainer
      justify="center"
      align-items="center"
      column>
      <div class="my-4 text-center">
        <Logo :size="256" />
        <br>
        <LogoTitle :height="200" />
      </div>
      <Shields />
    </FlexContainer>
  </Page>
</template>
