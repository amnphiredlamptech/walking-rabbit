import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/man/Desktop/workspace/microservice/vue-hello-world-simple-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}