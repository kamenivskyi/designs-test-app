// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-vuefire'],
  vuefire: {
    config: {
      apiKey: process.env.FIRESTORE_API_KEY,
      authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
      projectId: process.env.FIRESTORE_PROJECT_ID,
      appId: process.env.APP_ID,
      storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID
    }
  }
})