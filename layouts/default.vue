<template>
  <div class="background">
    <img class="logo" src="~/assets/images/logo.svg" />
    <nuxt />
    <img class="img-background" src="~/assets/images/bg-rabbit.svg" />
  </div>
</template>

<script>
export default {
  name: "LayoutDefault",
};
</script>
<style scoped>
.background {
  background: linear-gradient(180deg, #000000 0%, #222222 100%);
  width: 100%;
  height: 100vh;
}

.logo {
  position: fixed;
  top: 24px;
  left: 24px;
}

.img-background {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

@font-face {
  font-family: 'IBM Plex Sans Thai';
  src: local('~/assets/fonts/IBMPlexSansThai-Regular.ttf')  format('truetype'),
}
</style>