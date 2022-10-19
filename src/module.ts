import { defineNuxtModule, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {
    addPlugin: true
  },
  setup(options, nuxt) {
    addComponent({
      name: 'MyComponent',
      filePath: 'my-module/src/.output/server/index.mjs'
    });
  }
})
