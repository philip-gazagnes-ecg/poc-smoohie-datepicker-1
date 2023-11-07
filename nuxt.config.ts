// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/device-desktop', '/device-mobile'],
    },
  },
})
