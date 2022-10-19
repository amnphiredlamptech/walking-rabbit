<template>
  <button @click="onClickCounter">Counter {{ x }}</button>
</template>

<script setup>
import { ref } from "#imports";
const x = ref(1);

const onClickCounter = () => {
  x.value = x.value + 1;
};
</script>
