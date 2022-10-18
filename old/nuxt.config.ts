import MyModule from './src/module'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    [MyModule, { token: '123' }],
  ],
  myModule: {
    addPlugin: true
  }
})
