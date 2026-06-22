<template>
  <div class="card p-6">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-md">
        <CalendarDaysIcon class="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-slate-900">Historial de Horas</h3>
        <p class="text-sm text-slate-500">Tus registros recientes</p>
      </div>
    </div>

    <div class="space-y-3">
      <div 
        v-for="(registro, idx) in registrosRecientes" 
        :key="idx"
        class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
      >
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
          <CalendarDaysIcon class="w-5 h-5 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-slate-900 text-sm">{{ formatDate(registro.fecha) }}</div>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-xs text-slate-500 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Ingreso: {{ registro.ingreso || '--:--' }}
            </span>
            <span class="text-xs text-slate-500 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              Salida: {{ registro.salida || '--:--' }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold text-slate-900">{{ calcularHoras(registro) }}</div>
          <div class="text-xs text-slate-500">horas</div>
        </div>
      </div>
      
      <div v-if="registrosRecientes.length === 0" class="text-center py-8">
        <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
          <CalendarDaysIcon class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-slate-500 text-sm">No hay registros aún</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const username = user?.username
const registrosKey = `registros_${username}`

const registros = ref<{ fecha: string, ingreso?: string, salida?: string }[]>([])

const registrosRecientes = computed(() => {
  return [...registros.value]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 7)
})

function cargarRegistros() {
  const data = localStorage.getItem(registrosKey)
  registros.value = data ? JSON.parse(data) : []
}

onMounted(() => {
  cargarRegistros()
})

function formatDate(fecha: string): string {
  const date = new Date(fecha + 'T00:00:00')
  return date.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function calcularHoras(registro: { fecha: string, ingreso?: string, salida?: string }): string {
  if (!registro.ingreso || !registro.salida) return '0h'
  
  const [hIng, mIng] = registro.ingreso.split(':').map(Number)
  const [hSal, mSal] = registro.salida.split(':').map(Number)
  
  const minutosIng = hIng * 60 + mIng
  const minutosSal = hSal * 60 + mSal
  const diff = minutosSal - minutosIng
  
  if (diff <= 0) return '0h'
  
  const horas = Math.floor(diff / 60)
  const mins = diff % 60
  
  return mins > 0 ? `${horas}h ${mins}m` : `${horas}h`
}
</script>
