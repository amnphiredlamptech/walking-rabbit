<template>
  <div>
    ======
    <br />
    Nuxt module playground!
    <Counter />
    <br />
    {{ resUser }}
    <br />
    ======
  </div>
</template>

<script setup>
import { useFetch } from "#imports";
import Counter from "../components/Counter.vue";

const { data: resUser } = await useFetch(
  `https://gorest.co.in/public/v1/users`
);
</script>
