import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineNuxtModule, addComponent, addPlugin } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "my-module",
    configKey: "myModule"
  },
  defaults: {
    addPlugin: true
  },
  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    console.log("runtimeDir", runtimeDir);
    addComponent({
      name: "MyComponent",
      filePath: resolve(runtimeDir, "pages", "index.vue")
    });
    if (options.addPlugin) {
      nuxt.options.build.transpile.push(runtimeDir);
      addPlugin(resolve(runtimeDir, "plugin"));
    }
  }
});

export { module as default };
