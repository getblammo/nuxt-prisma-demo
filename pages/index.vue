<template>
  <div>
    <div class="card">
      <h1>Welcome to Prisma Demo</h1>
      <p class="subtitle">A Nuxt 3 application with Prisma ORM and Better Auth</p>

      <div v-if="user" class="user-info">
        <p>You are logged in as <strong>{{ user.name }}</strong> ({{ user.email }})</p>
        <NuxtLink to="/dashboard" class="btn">Go to Dashboard</NuxtLink>
      </div>

      <div v-else class="actions">
        <p>Get started by creating an account or signing in.</p>
        <div class="btn-group">
          <NuxtLink to="/signup" class="btn">Sign Up</NuxtLink>
          <NuxtLink to="/login" class="btn btn-outline">Login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sessionData = await useServerSession()
const user = computed(() => (sessionData.value as any)?.user || null)
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 2.5rem;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.user-info {
  margin-top: 1.5rem;
}

.user-info p {
  margin-bottom: 1rem;
}

.actions p {
  margin-bottom: 1.5rem;
  color: #666;
}

.btn-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 0.625rem 1.5rem;
  background: #1a1a2e;
  color: #fff;
  border: 2px solid #1a1a2e;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn:hover {
  background: #16213e;
  border-color: #16213e;
}

.btn-outline {
  background: transparent;
  color: #1a1a2e;
}

.btn-outline:hover {
  background: #1a1a2e;
  color: #fff;
}
</style>
