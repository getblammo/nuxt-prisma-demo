<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-content">
        <NuxtLink to="/" class="brand">Prisma Demo</NuxtLink>
        <div class="nav-links">
          <template v-if="user">
            <span class="greeting">Hello, {{ user.name }}</span>
            <NuxtLink to="/dashboard" class="nav-link">Dashboard</NuxtLink>
            <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
            <NuxtLink to="/signup" class="nav-link">Sign Up</NuxtLink>
          </template>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const sessionData = await useServerSession()
const user = computed(() => (sessionData.value as any)?.user || null)

const { signOut } = useAuth()

const handleLogout = async () => {
  await signOut()
  navigateTo('/login')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #333;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
}

.navbar {
  background: #1a1a2e;
  padding: 0 1rem;
  height: 60px;
  display: flex;
  align-items: center;
}

.nav-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.greeting {
  color: #ccc;
  font-size: 0.9rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.nav-link:hover {
  opacity: 1;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
