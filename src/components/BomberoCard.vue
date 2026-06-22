<script setup lang="ts">
import { UserIcon, ClockIcon } from '@heroicons/vue/24/solid'

interface Bombero {
  id: number
  nombre: string
  rango: string
  departamento: string
  estado: 'Crítico' | 'Óptimo' | 'Regular'
  horasTrabajadas: number
  horasRequeridas: number
  porcentaje: number
  faltantes: number
  grupo: string
  colorEstado: string
}

interface Props {
  bombero: Bombero
  delay?: number
}

const props = defineProps<Props>()

function getBadgeClass(estado: string) {
  if (estado === 'Crítico') return 'badge-critico'
  if (estado === 'Óptimo') return 'badge-optimo'
  return 'badge-regular'
}

function getProgressClass(estado: string) {
  if (estado === 'Crítico') return 'progress-fill-critico'
  if (estado === 'Óptimo') return 'progress-fill-optimo'
  return 'progress-fill-regular'
}

function getAccentColor(estado: string) {
  if (estado === 'Crítico') return 'from-red-500 to-red-600'
  if (estado === 'Óptimo') return 'from-emerald-500 to-emerald-600'
  return 'from-amber-500 to-amber-600'
}
</script>

<template>
  <div 
    class="card p-5 animate-slide-up group"
    :style="{ animationDelay: `${delay || 0}ms` }"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div :class="[
          'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md transition-all group-hover:scale-110',
          getAccentColor(bombero.estado)
        ]">
          <UserIcon class="w-6 h-6 text-white" />
        </div>
        <div class="min-w-0">
          <h3 class="font-bold text-slate-900 text-base truncate">{{ bombero.nombre }}</h3>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{{ bombero.grupo }}</span>
            <span class="text-xs text-slate-500">{{ bombero.rango }}</span>
          </div>
        </div>
      </div>
      <span :class="['text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0', getBadgeClass(bombero.estado)]">
        {{ bombero.estado }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
        <div class="flex items-center gap-2 mb-1">
          <ClockIcon class="w-4 h-4 text-slate-400" />
          <span class="text-xs text-slate-500 font-medium">Trabajadas</span>
        </div>
        <div class="text-xl font-bold text-slate-900">{{ bombero.horasTrabajadas }}h</div>
      </div>
      <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
        <div class="flex items-center gap-2 mb-1">
          <ClockIcon class="w-4 h-4 text-slate-400" />
          <span class="text-xs text-slate-500 font-medium">Requeridas</span>
        </div>
        <div class="text-xl font-bold text-slate-900">{{ bombero.horasRequeridas }}h</div>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-slate-500">Progreso</span>
        <span :class="[
          'text-sm font-bold',
          bombero.estado === 'Crítico' ? 'text-red-600' : bombero.estado === 'Óptimo' ? 'text-emerald-600' : 'text-amber-600'
        ]">{{ bombero.porcentaje }}%</span>
      </div>
      <div class="progress-bar">
        <div 
          :class="['progress-fill', getProgressClass(bombero.estado)]" 
          :style="{ width: Math.min(bombero.porcentaje, 100) + '%' }"
        ></div>
      </div>
      <div :class="[
        'text-xs font-semibold mt-2',
        bombero.estado === 'Crítico' ? 'text-red-600' : bombero.estado === 'Óptimo' ? 'text-emerald-600' : 'text-amber-600'
      ]">
        {{ bombero.faltantes > 0 ? bombero.faltantes + 'h faltantes' : 'Meta cumplida' }}
      </div>
    </div>
  </div>
</template>
