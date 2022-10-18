
import { ModuleOptions, ModuleHooks, ModuleRuntimeConfig, ModulePublicRuntimeConfig } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['sample']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['sample']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
  interface RuntimeConfig extends ModuleRuntimeConfig {}
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}


export { default } from './module'
