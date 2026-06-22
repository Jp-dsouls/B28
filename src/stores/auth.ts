import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const storedUser = localStorage.getItem('user')
  const user = ref<{ username: string; role: 'bombero' | 'admin' | null } | null>(storedUser ? JSON.parse(storedUser) : null)

  const isAuthenticated = computed(() => !!user.value)
  const isBombero = computed(() => user.value?.role === 'bombero')
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(username: string, role: 'bombero' | 'admin') {
    user.value = { username, role }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isAuthenticated, isBombero, isAdmin, login, logout }
})
