import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },

  css: ["~/assets/css/tailwind.css", "~/assets/scss/main.scss"],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "vue3-perfect-scrollbar/nuxt",
    "@pinia/nuxt", // needed
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/icon",
    "nuxt-lodash",
    "@vueuse/nuxt",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    build: {
      target: ["es2020"],
    },
    optimizeDeps: {
      exclude: ["onnxruntime-web"],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  } as any,

  runtimeConfig: {
    public: {
      baseUrl1: "https://api.yunrobot.cn",
      baseUrl2: "https://api2.example.com",
    },
  },
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      title: "AIBOX",
    },
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    routeRules: {
      "/**/*.wasm": { headers: { "Content-Type": "application/wasm" } },
    },
    publicAssets: [
      {
        baseURL: "node_modules/onnxruntime-web/dist/",
        dir: "public",
      },
    ],
  },
});
