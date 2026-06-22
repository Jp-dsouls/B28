<template>
  <div class="card p-6">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md">
        <ClockIcon class="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-slate-900">Registro de Asistencia</h3>
        <p class="text-sm text-slate-500">Marca tu hora de ingreso y salida</p>
      </div>
    </div>

    <div class="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-4">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-slate-600">Estado hoy</span>
        <span :class="[
          'text-xs font-bold px-3 py-1 rounded-full',
          estado === 'ninguno' ? 'bg-slate-200 text-slate-600' :
          estado === 'ingreso' ? 'bg-emerald-100 text-emerald-700' :
          'bg-slate-200 text-slate-600'
        ]">
          {{ estado === 'ninguno' ? 'Sin registro' : estado === 'ingreso' ? 'En jornada' : 'Jornada completa' }}
        </span>
      </div>
      <div v-if="registrosHoy" class="grid grid-cols-2 gap-3">
        <div v-if="registrosHoy.ingreso" class="bg-white rounded-lg p-3 border border-slate-200">
          <div class="text-xs text-slate-500 mb-1">Ingreso</div>
          <div class="text-lg font-bold text-slate-900">{{ registrosHoy.ingreso }}</div>
        </div>
        <div v-if="registrosHoy.salida" class="bg-white rounded-lg p-3 border border-slate-200">
          <div class="text-xs text-slate-500 mb-1">Salida</div>
          <div class="text-lg font-bold text-slate-900">{{ registrosHoy.salida }}</div>
        </div>
      </div>
    </div>

    <button
      class="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2"
      :disabled="isBlocked"
      @click="marcarHora"
    >
      <component :is="isBlocked ? CheckCircleIcon : ClockIcon" class="w-5 h-5" />
      <span>{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, computed, onMounted } from 'vue'
import { ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const username = user?.username

const today = new Date().toISOString().slice(0, 10)
const registrosKey = `registros_${username}`
const registros = ref<{ fecha: string, ingreso?: string, salida?: string }[]>([])

const estado = ref<'ninguno' | 'ingreso' | 'salida' | 'bloqueado'>('ninguno')

const registrosHoy = computed(() => registros.value.find(r => r.fecha === today))

function cargarRegistros() {
  const data = localStorage.getItem(registrosKey)
  registros.value = data ? JSON.parse(data) : []
  const hoy = registros.value.find(r => r.fecha === today)
  if (!hoy) {
    estado.value = 'ninguno'
  } else if (hoy && hoy.ingreso && !hoy.salida) {
    estado.value = 'ingreso'
  } else if (hoy && hoy.ingreso && hoy.salida) {
    estado.value = 'bloqueado'
  }
}

onMounted(() => {
  cargarRegistros()
})

const isBlocked = computed(() => estado.value === 'bloqueado')
const buttonText = computed(() => {
  if (estado.value === 'ninguno') return 'Marcar hora de ingreso'
  if (estado.value === 'ingreso') return 'Marcar hora de salida'
  return 'Jornada completada'
})

function marcarHora() {
  if (!username) return
  const now = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  let hoy = registros.value.find(r => r.fecha === today)
  if (!hoy) {
    hoy = { fecha: today, ingreso: now }
    registros.value.push(hoy)
    localStorage.setItem(registrosKey, JSON.stringify(registros.value))
    estado.value = 'ingreso'
    Swal.fire({
      icon: 'success',
      title: '¡Ingreso registrado!',
      text: `Hora de ingreso: ${now}`,
      confirmButtonColor: '#DC2626'
    })
  } else if (hoy && hoy.ingreso && !hoy.salida) {
    hoy.salida = now
    localStorage.setItem(registrosKey, JSON.stringify(registros.value))
    estado.value = 'bloqueado'
    Swal.fire({
      icon: 'success',
      title: '¡Salida registrada!',
      text: `Hora de salida: ${now}`,
      confirmButtonColor: '#DC2626'
    })
  }
}
</script>
