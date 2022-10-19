import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineNuxtModule, addPlugin } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "my-module",
    configKey: "myModule"
  },
  defaults: {
    addPlugin: true
  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
      console.log("runtimeDir", runtimeDir);
      nuxt.options.build.transpile.push(runtimeDir);
      addPlugin(resolve(runtimeDir, "plugin"));
    }
  }
});

export { module as default };
