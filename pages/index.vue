<template>
  <Tutorial />
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      dataList: [],
    };
  },

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      await this.getData();
      console.log('xxx', this.dataList)
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    async getData() {
      const res = await this.$api.get("/hello");
      const resData = res.data;
      this.dataList = resData.data;
    },
  },
};
</script>
