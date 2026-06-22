<template>
  <div class="min-h-screen bg-slate-50">
    <header class="header-bar sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
              <UserIcon class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-lg font-bold text-white">Panel Bombero</h1>
              <p class="text-xs text-slate-300">B28 Asistencia</p>
            </div>
          </div>
          <button
            class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-white"
            @click="logout"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
            <span class="hidden sm:inline text-sm font-medium">Salir</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <div class="mb-6 animate-fade-in">
        <h2 class="text-2xl font-bold text-slate-900 mb-1">Mi Panel</h2>
        <p class="text-slate-500">Registra tu asistencia y consulta tu historial</p>
      </div>

      <RegistrarHoras class="mb-6 animate-slide-up" />
      <HistorialHoras class="animate-slide-up" style="animation-delay: 100ms" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
import RegistrarHoras from '../components/RegistrarHoras.vue'
import HistorialHoras from '../components/HistorialHoras.vue'

const router = useRouter()
const auth = useAuthStore()

function logout() {
  auth.logout()
  router.push({ name: 'login-usuario' })
}
</script>
