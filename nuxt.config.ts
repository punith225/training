// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["@rds-vue-ui/rds-theme-base/style/rds-theme-base.scss"],
  components: [
    {
      path: "~/components",
    },
    {
      path: "~/node_modules/@rds-vue-ui/",
      ignore: ["**/index.ts", "**/index.js", "**/node_modules"],
    }
  ],
  resolve: {
    alias: {
      'bootstrap': 'path/to/bootstrap'
    }
  },

  build:{
    transpile: ["@rds-vue-ui"]
  },
})
