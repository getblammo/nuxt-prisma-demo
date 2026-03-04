<template>
  <div>
    <div class="card">
      <h1>Dashboard</h1>
      <p class="subtitle">Your account overview</p>

      <div v-if="user" class="user-details">
        <div class="detail-row">
          <span class="label">Name</span>
          <span class="value">{{ user.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Email</span>
          <span class="value">{{ user.email }}</span>
        </div>
      </div>

      <div v-else class="loading">
        Not authenticated. <NuxtLink to="/login">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sessionData = await useServerSession()
const user = computed(() => (sessionData.value as any)?.user || null)

if (!user.value) {
  navigateTo('/login')
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 2.5rem;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: #1a1a2e;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.user-details {
  border-top: 1px solid #eee;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.label {
  font-weight: 500;
  color: #555;
}

.value {
  color: #333;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #999;
}
</style>
