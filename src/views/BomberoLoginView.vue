<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
    <div class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
      <div class="grid md:grid-cols-2">
        <div class="p-8 md:p-12">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
              <ShieldCheckIcon class="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-900">B28</h1>
              <p class="text-xs text-slate-500">Sistema de Asistencia</p>
            </div>
          </div>

          <form @submit.prevent="onLogin" class="space-y-5">
            <div>
              <h2 class="text-3xl font-bold text-slate-900 mb-2">Bienvenido</h2>
              <p class="text-slate-500">Ingresa tus credenciales para continuar</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Usuario</label>
                <div class="relative">
                  <UserIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Ingresa tu usuario" 
                    v-model="loginForm.username"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
                <div class="relative">
                  <LockClosedIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="Ingresa tu contraseña" 
                    v-model="loginForm.password"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
                <span class="text-sm text-slate-600">Recordarme</span>
              </label>
              <a href="#" class="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button 
              type="submit"
              class="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div class="hidden md:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div class="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white rounded-full"></div>
          </div>
          
          <div class="relative z-10 text-center">
            <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ShieldCheckIcon class="w-12 h-12 text-white" />
            </div>
            <h3 class="text-3xl font-bold mb-4">¡Hola, amigo!</h3>
            <p class="text-red-100 text-lg leading-relaxed">
              Ingresa tus datos personales y comienza tu jornada con nosotros
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldCheckIcon, UserIcon, LockClosedIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: ''
})

const users = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: 'user', role: 'bombero' }
]

function onLogin() {
  const found = users.find(u => u.username === loginForm.value.username && u.password === loginForm.value.password)
  if (found) {
    localStorage.setItem('user', JSON.stringify({ username: found.username, role: found.role }))
    if (found.role === 'admin') {
      router.push({ name: 'panel-admin' })
    } else {
      router.push({ name: 'panel-bombero' })
    }
  } else {
    alert('Usuario o contraseña incorrectos')
  }
}
</script>
