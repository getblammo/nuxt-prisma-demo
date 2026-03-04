export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET || 'change-me-in-production',
    betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/app',
  },
})
