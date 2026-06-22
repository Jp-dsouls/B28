<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShieldCheckIcon, UserIcon, ClockIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import StatCard from '../components/StatCard.vue'
import BomberoCard from '../components/BomberoCard.vue'
import LogoHeader from '../components/LogoHeader.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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

const activeTab = ref('todos')

const mostrarModalBusqueda = ref(false)
const mostrarModalDetalle = ref(false)
const mostrarDropdown = ref(false)
const busqueda = ref('')
const bomberoSeleccionado = ref<Bombero | null>(null)

const bomberos = computed(() => {
  const rawBomberos = [
    {
      id: 1,
      nombre: 'Jorge Daniel Aguilar Díaz',
      rango: 'Subteniente',
      departamento: 'Rescate',
      horasTrabajadas: 33,
      horasRequeridas: 120,
      grupo: 'Oficiales',
    },
    {
      id: 2,
      nombre: 'Laura Fernández Castro',
      rango: 'Teniente',
      departamento: 'Emergencias',
      horasTrabajadas: 100,
      horasRequeridas: 100,
      grupo: 'Oficiales',
    },
    {
      id: 3,
      nombre: 'Ana García Morales',
      rango: 'Teniente',
      departamento: 'Emergencias',
      horasTrabajadas: 85,
      horasRequeridas: 100,
      grupo: 'Oficiales',
    },
    {
      id: 4,
      nombre: 'Cesar Junior Pezantes Silva',
      rango: 'Comandante',
      departamento: 'Emergencias',
      horasTrabajadas: 30,
      horasRequeridas: 120,
      grupo: 'Oficiales',
    },
  ]

  return rawBomberos.map(b => {
    const porcentaje = Math.round((b.horasTrabajadas / b.horasRequeridas) * 100 * 10) / 10
    const faltantes = b.horasRequeridas - b.horasTrabajadas
    let estado: 'Crítico' | 'Óptimo' | 'Regular'
    let colorEstado: string

    if (porcentaje >= 100) {
      estado = 'Óptimo'
      colorEstado = 'green'
    } else if (porcentaje >= 70) {
      estado = 'Regular'
      colorEstado = 'yellow'
    } else {
      estado = 'Crítico'
      colorEstado = 'red'
    }

    return {
      ...b,
      porcentaje,
      faltantes,
      estado,
      colorEstado
    }
  })
})

const resultadosBusqueda = computed(() => {
  if (!busqueda.value) return []
  return bomberos.value.filter((b: Bombero) =>
    b.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    b.rango.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    b.departamento.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function abrirModalBusqueda() {
  mostrarModalBusqueda.value = true
  busqueda.value = ''
  bomberoSeleccionado.value = null
}

function cerrarModalBusqueda() {
  mostrarModalBusqueda.value = false
  mostrarModalDetalle.value = false
}

function seleccionarBombero(b: Bombero) {
  bomberoSeleccionado.value = b
  mostrarModalDetalle.value = true
}

function cerrarModalDetalle() {
  mostrarModalDetalle.value = false
  mostrarModalBusqueda.value = false
}

function cerrarDropdown() {
  mostrarDropdown.value = false
}

const tabs = [
  { key: 'todos', label: 'Todos', icon: '👥', color: 'slate' },
  { key: 'optimo', label: 'Óptimo', icon: '✅', color: 'green' },
  { key: 'regular', label: 'Regular', icon: '⚠️', color: 'amber' },
  { key: 'critico', label: 'Crítico', icon: '🚨', color: 'red' }
]

function getTabActiveClass(color: string) {
  const classes: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700 border-slate-300',
    green: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    amber: 'bg-amber-100 text-amber-700 border-amber-300',
    red: 'bg-red-100 text-red-700 border-red-300'
  }
  return classes[color] || classes.slate
}

const totalBomberos = computed(() => bomberos.value.length)
const totalOptimo = computed(() => bomberos.value.filter(b => b.estado === 'Óptimo').length)
const totalRegular = computed(() => bomberos.value.filter(b => b.estado === 'Regular').length)
const totalCritico = computed(() => bomberos.value.filter(b => b.estado === 'Crítico').length)

const bomberosOptimo = computed(() => bomberos.value.filter(b => b.estado === 'Óptimo'))
const bomberosRegular = computed(() => bomberos.value.filter(b => b.estado === 'Regular'))
const bomberosCritico = computed(() => bomberos.value.filter(b => b.estado === 'Crítico'))
</script>

<template>
  <div class="min-h-screen">
    <header class="header-bar sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <LogoHeader size="sm" :show-text="true" />
          <div class="flex items-center gap-3">
            <button @click="abrirModalBusqueda"
              class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-white">
              <MagnifyingGlassIcon class="w-5 h-5" />
              <span class="hidden sm:inline text-sm font-medium">Buscar</span>
            </button>
            <button @click="$router.push('/login-usuario')"
              class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-all text-white shadow-lg shadow-red-600/30">
              <UserIcon class="w-5 h-5" />
              <span class="hidden sm:inline text-sm font-medium">Ingresar</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-in">
        <StatCard title="Total Activos" :value="totalBomberos" :icon="UsersIcon" color="slate" />
        <StatCard title="Óptimo" :value="totalOptimo" color="green" />
        <StatCard title="Regular" :value="totalRegular" color="amber" />
        <StatCard title="Crítico" :value="totalCritico" color="red" />
      </div>

      <div class="mb-6 animate-slide-up">
        <div class="sm:hidden">
          <div class="relative">
            <button @click="mostrarDropdown = !mostrarDropdown"
              class="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl shadow-sm p-4 font-semibold flex items-center justify-between hover:shadow-md transition-all">
              <span class="flex items-center gap-2">
                <span>{{ tabs.find(t => t.key === activeTab)?.icon }}</span>
                <span>{{ tabs.find(t => t.key === activeTab)?.label }}</span>
              </span>
              <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': mostrarDropdown }" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <div v-if="mostrarDropdown"
              class="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
              <div v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key; mostrarDropdown = false" :class="[
                'p-4 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all border-l-4',
                activeTab === tab.key
                  ? getTabActiveClass(tab.color)
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-transparent'
              ]">
                <span>{{ tab.icon }}</span>
                <span>{{ tab.label }}</span>
              </div>
            </div>
          </div>

          <div v-if="mostrarDropdown" @click="cerrarDropdown" class="fixed inset-0 z-5 bg-transparent"></div>
        </div>

        <ul class="hidden sm:flex bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 gap-1">
          <li v-for="tab in tabs" :key="tab.key" class="flex-1">
            <button @click="activeTab = tab.key" :class="[
              'w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 border-2',
              activeTab === tab.key
                ? getTabActiveClass(tab.color)
                : 'text-slate-600 hover:bg-slate-100 border-transparent'
            ]">
              <span>{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <template v-if="activeTab === 'todos'">
          <BomberoCard v-for="(b, index) in bomberos" :key="b.id" :bombero="b" :delay="index * 100" />
        </template>
        <template v-else-if="activeTab === 'optimo'">
          <BomberoCard v-for="(b, index) in bomberosOptimo" :key="b.id" :bombero="b" :delay="index * 100" />
        </template>
        <template v-else-if="activeTab === 'regular'">
          <BomberoCard v-for="(b, index) in bomberosRegular" :key="b.id" :bombero="b" :delay="index * 100" />
        </template>
        <template v-else-if="activeTab === 'critico'">
          <BomberoCard v-for="(b, index) in bomberosCritico" :key="b.id" :bombero="b" :delay="index * 100" />
        </template>
      </div>
    </main>

    <Teleport to="body">
      <div v-if="mostrarModalBusqueda" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
        @click.self="cerrarModalBusqueda">
        <div :class="[
          'bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-scale-in',
          mostrarModalDetalle ? 'opacity-40 blur-sm pointer-events-none select-none' : ''
        ]">
          <button @click="cerrarModalBusqueda"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all">
            <XMarkIcon class="w-5 h-5" />
          </button>
          
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <MagnifyingGlassIcon class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="font-bold text-lg text-slate-900">Buscar Bombero</h3>
              <p class="text-sm text-slate-500">Nombre, rango o departamento</p>
            </div>
          </div>
          
          <div class="relative mb-4">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input v-model="busqueda" type="text" placeholder="Buscar bombero..."
              class="w-full pl-12 pr-10 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-sm" />
            <button v-if="busqueda" @click="busqueda = ''" 
              class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
          
          <div v-if="busqueda && resultadosBusqueda.length === 0" class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
              <MagnifyingGlassIcon class="w-8 h-8 text-slate-400" />
            </div>
            <p class="text-slate-500 text-sm">No se encontraron resultados</p>
          </div>
          
          <div v-if="busqueda && resultadosBusqueda.length > 0" class="space-y-2 max-h-80 overflow-y-auto">
            <div class="text-xs text-slate-500 font-medium px-1">
              {{ resultadosBusqueda.length }} resultado{{ resultadosBusqueda.length > 1 ? 's' : '' }}
            </div>
            <div v-for="b in resultadosBusqueda" :key="b.id" @click="seleccionarBombero(b)"
              class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/50 cursor-pointer transition-all group">
              <div class="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-all">
                <UserIcon class="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-all" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-slate-900 text-sm truncate">{{ b.nombre }}</div>
                <div class="text-xs text-slate-500">{{ b.rango }} · {{ b.horasTrabajadas }}h / {{ b.horasRequeridas }}h</div>
              </div>
              <span :class="[
                'text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0',
                b.estado === 'Crítico' ? 'badge-critico' : b.estado === 'Óptimo' ? 'badge-optimo' : 'badge-regular'
              ]">{{ b.estado }}</span>
            </div>
          </div>
          
          <div class="flex justify-end mt-5 pt-4 border-t border-slate-100">
            <button @click="cerrarModalBusqueda"
              class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all">
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <div v-if="mostrarModalDetalle && bomberoSeleccionado"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
        @click.self="cerrarModalDetalle">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-scale-in">
          <button @click="cerrarModalDetalle"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all">
            <XMarkIcon class="w-5 h-5" />
          </button>
          
          <div class="flex items-center gap-4 mb-5">
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <UserIcon class="w-7 h-7 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-lg text-slate-900 truncate">{{ bomberoSeleccionado.nombre }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{{ bomberoSeleccionado.grupo }}</span>
                <span class="text-sm text-slate-500">{{ bomberoSeleccionado.rango }}</span>
              </div>
            </div>
            <span :class="[
              'text-xs font-bold px-3 py-1.5 rounded-full',
              bomberoSeleccionado.estado === 'Crítico' ? 'badge-critico' : bomberoSeleccionado.estado === 'Óptimo' ? 'badge-optimo' : 'badge-regular'
            ]">{{ bomberoSeleccionado.estado }}</span>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mb-5">
            <div class="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <ClockIcon class="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <div class="text-xs text-slate-500 mb-1">Trabajadas</div>
              <div class="text-2xl font-bold text-slate-900">{{ bomberoSeleccionado.horasTrabajadas }}h</div>
            </div>
            <div class="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <ClockIcon class="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <div class="text-xs text-slate-500 mb-1">Requeridas</div>
              <div class="text-2xl font-bold text-slate-900">{{ bomberoSeleccionado.horasRequeridas }}h</div>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-slate-600">Progreso</span>
              <span :class="[
                'text-sm font-bold',
                bomberoSeleccionado.estado === 'Crítico' ? 'text-red-600' : bomberoSeleccionado.estado === 'Óptimo' ? 'text-emerald-600' : 'text-amber-600'
              ]">{{ bomberoSeleccionado.porcentaje }}%</span>
            </div>
            <div class="progress-bar">
              <div :class="[
                'progress-fill',
                bomberoSeleccionado.estado === 'Crítico' ? 'progress-fill-critico' : bomberoSeleccionado.estado === 'Óptimo' ? 'progress-fill-optimo' : 'progress-fill-regular'
              ]" :style="{ width: Math.min(bomberoSeleccionado.porcentaje, 100) + '%' }"></div>
            </div>
            <div :class="[
              'text-xs font-semibold mt-2',
              bomberoSeleccionado.estado === 'Crítico' ? 'text-red-600' : bomberoSeleccionado.estado === 'Óptimo' ? 'text-emerald-600' : 'text-amber-600'
            ]">
              {{ bomberoSeleccionado.faltantes > 0 ? bomberoSeleccionado.faltantes + 'h faltantes' : 'Meta cumplida' }}
            </div>
          </div>
          
          <div class="flex justify-end pt-4 border-t border-slate-100">
            <button @click="cerrarModalDetalle"
              class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
