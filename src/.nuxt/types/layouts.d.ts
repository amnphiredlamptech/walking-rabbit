import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/man/Desktop/workspace/microservice/vue-hello-world-simple-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}