<template>
  <div>
    <div class="card">
      <h1>Login</h1>
      <p class="subtitle">Sign in to your account</p>

      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Your password"
            required
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="footer-text">
        Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, session } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

watch(() => session.data, (val) => {
  if (val?.user) {
    navigateTo('/dashboard')
  }
}, { immediate: true })

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const result = await signIn(email.value, password.value)
    if (result.error) {
      error.value = result.error.message || 'Invalid email or password'
    } else {
      navigateTo('/dashboard')
    }
  } catch (e: any) {
    error.value = e.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 2.5rem;
  max-width: 420px;
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
  margin-bottom: 1.5rem;
}

.error {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: #444;
}

input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #1a1a2e;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background: #1a1a2e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.btn:hover:not(:disabled) {
  background: #16213e;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer-text {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.footer-text a {
  color: #1a1a2e;
  font-weight: 500;
}
</style>
