<template>
  <form class="bg-white p-6 rounded-xl shadow-md w-80" @submit.prevent="handleLogin">
    <div class="mb-4">
      <label class="block text-gray-700">Usuario</label>
      <input v-model="username" type="text" class="w-full border rounded px-3 py-2 mt-1" required />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Contraseña</label>
      <input v-model="password" type="password" class="w-full border rounded px-3 py-2 mt-1" required />
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Ingresar</button>
    <div v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

function handleLogin() {
  if (username.value === 'admin' && password.value === 'admin123') {
    auth.login(username.value, 'admin')
    router.push('/panel-admin')
  } else if (username.value === 'bombero' && password.value === 'bombero123') {
    auth.login(username.value, 'bombero')
    router.push('/panel-bombero')
  } else {
    error.value = 'Credenciales incorrectas'
  }
}
</script>
