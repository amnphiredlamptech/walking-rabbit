
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['myModule']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['myModule']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
