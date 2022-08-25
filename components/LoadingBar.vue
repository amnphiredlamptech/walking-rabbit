<template>
  <div v-if="loading" class="loading-page">
    <b-spinner variant="success" label="Spinning"></b-spinner>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.isLoading;
    },
  },

  methods: {
    start() {
      this.$store.commit("setIsLoading", true);
    },
    finish() {
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>