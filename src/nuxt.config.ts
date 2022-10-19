import { defineNuxtConfig } from 'nuxt/config'
import MyModule from './module'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  myModule: {
    addPlugin: true
  }
})
