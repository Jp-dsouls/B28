<template>
  <div class="min-h-screen bg-slate-50">
    <header class="header-bar sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
              <ShieldCheckIcon class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-lg font-bold text-white">Panel Admin</h1>
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

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="mb-6 animate-fade-in">
        <h2 class="text-2xl font-bold text-slate-900 mb-1">Bienvenido, administrador</h2>
        <p class="text-slate-500">Gestiona las horas y configuraciones del sistema</p>
      </div>

      <div class="card p-6 mb-6 animate-slide-up">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md">
            <ClockIcon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900">Horas Requeridas por Trimestre</h3>
            <p class="text-sm text-slate-500">Configura las metas por rango y período</p>
          </div>
        </div>
        
        <div class="flex flex-wrap items-center gap-3 mb-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div class="flex items-center gap-2">
            <label for="rango-select" class="text-sm font-semibold text-slate-700">Rango:</label>
            <select id="rango-select" v-model="rangoSeleccionado" class="input-field w-auto text-sm">
              <option v-for="r in rangos" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <label for="anio-select" class="text-sm font-semibold text-slate-700">Año:</label>
            <select id="anio-select" v-model="anioSeleccionado" class="input-field w-auto text-sm">
              <option v-for="a in anios" :key="a" :value="a">{{ a }}</option>
            </select>
          </div>
          <button 
            class="btn-primary text-sm flex items-center gap-2"
            @click="guardarCambiosQ"
          >
            <CheckIcon class="w-4 h-4" />
            Guardar
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trimestre</th>
                <th class="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Meses</th>
                <th class="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Horas</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(q, idx) in horasRequeridasPorQ" 
                :key="q.q" 
                :class="idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'"
                class="border-b border-slate-100 last:border-0"
              >
                <td class="py-3 px-4">
                  <span class="font-bold text-slate-900">{{ q.q }}</span>
                </td>
                <td class="py-3 px-4 text-sm text-slate-600">{{ q.meses.join(', ') }}</td>
                <td class="py-3 px-4">
                  <input
                    type="number"
                    min="0"
                    class="input-field w-24 text-sm"
                    v-model.number="horasEditablesQPorRango[idx]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card p-6 animate-slide-up" style="animation-delay: 100ms">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-md">
              <DocumentChartBarIcon class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900">Resumen de Horas</h3>
              <p class="text-sm text-slate-500">Control anual y trimestral por usuario</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button 
              v-if="cambiosPendientes" 
              class="btn-primary text-sm flex items-center gap-2"
              @click="guardarCambiosMeses"
            >
              <CheckIcon class="w-4 h-4" />
              Guardar
            </button>
            <button 
              class="btn-secondary text-sm flex items-center gap-2"
              @click="descargarExcel"
            >
              <ArrowDownTrayIcon class="w-4 h-4" />
              Excel
            </button>
            <button 
              class="btn-secondary text-sm flex items-center gap-2"
              @click="descargarHTML"
            >
              <CodeBracketIcon class="w-4 h-4" />
              HTML
            </button>
          </div>
        </div>
        
        <div class="overflow-x-auto border border-slate-200 rounded-xl">
          <table class="w-full text-left min-w-[1400px]">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">CÓDIGO</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">GRADO</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">NOMBRE</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">ENE</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">FEB</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">MAR</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center bg-emerald-50">Q1</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">ABR</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">MAY</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">JUN</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center bg-emerald-50">Q2</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">JUL</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">AGO</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">SEP</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center bg-emerald-50">Q3</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">OCT</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">NOV</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">DIC</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center bg-emerald-50">Q4</th>
                <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center bg-slate-100">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(user, idxU) in usuariosMock" 
                :key="user.codigo"
                class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <td class="py-2 px-3 text-xs font-mono text-slate-600">{{ user.codigo }}</td>
                <td class="py-2 px-3">
                  <span class="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700">{{ user.grado }}</span>
                </td>
                <td class="py-2 px-3 text-sm font-medium text-slate-900">{{ user.nombre }}</td>
                <template v-for="idxM in 3">
                  <td class="py-2 px-3 text-center" @dblclick="activarEdicion(idxU, idxM-1)">
                    <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM-1)">
                      <input 
                        type="number" 
                        min="0" 
                        class="input-field w-16 text-xs text-center"
                        :value="getHorasMes(user)[idxM-1]"
                        @blur="confirmarEdicion(idxU, idxM-1, ($event.target as HTMLInputElement).valueAsNumber)"
                        @keyup.enter="confirmarEdicion(idxU, idxM-1, ($event.target as HTMLInputElement).valueAsNumber)"
                        autofocus
                      />
                    </template>
                    <template v-else>
                      <span class="text-sm text-slate-700">{{ getHorasMes(user)[idxM-1] }}</span>
                    </template>
                  </td>
                </template>
                <td class="py-2 px-3 text-center bg-emerald-50/50">
                  <span 
                    :class="[
                      'text-sm font-bold px-2 py-1 rounded-lg',
                      colorQ(qHoras(user, 0), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[0] ?? 0)
                    ]"
                  >
                    {{ qHoras(user, 0) }}
                  </span>
                </td>
                <template v-for="idxM in 3">
                  <td class="py-2 px-3 text-center" @dblclick="activarEdicion(idxU, idxM+2)">
                    <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM+2)">
                      <input 
                        type="number" 
                        min="0" 
                        class="input-field w-16 text-xs text-center"
                        :value="getHorasMes(user)[idxM+2]"
                        @blur="confirmarEdicion(idxU, idxM+2, ($event.target as HTMLInputElement).valueAsNumber)"
                        @keyup.enter="confirmarEdicion(idxU, idxM+2, ($event.target as HTMLInputElement).valueAsNumber)"
                        autofocus
                      />
                    </template>
                    <template v-else>
                      <span class="text-sm text-slate-700">{{ getHorasMes(user)[idxM+2] }}</span>
                    </template>
                  </td>
                </template>
                <td class="py-2 px-3 text-center bg-emerald-50/50">
                  <span 
                    :class="[
                      'text-sm font-bold px-2 py-1 rounded-lg',
                      colorQ(qHoras(user, 1), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[1] ?? 0)
                    ]"
                  >
                    {{ qHoras(user, 1) }}
                  </span>
                </td>
                <template v-for="idxM in 3">
                  <td class="py-2 px-3 text-center" @dblclick="activarEdicion(idxU, idxM+5)">
                    <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM+5)">
                      <input 
                        type="number" 
                        min="0" 
                        class="input-field w-16 text-xs text-center"
                        :value="getHorasMes(user)[idxM+5]"
                        @blur="confirmarEdicion(idxU, idxM+5, ($event.target as HTMLInputElement).valueAsNumber)"
                        @keyup.enter="confirmarEdicion(idxU, idxM+5, ($event.target as HTMLInputElement).valueAsNumber)"
                        autofocus
                      />
                    </template>
                    <template v-else>
                      <span class="text-sm text-slate-700">{{ getHorasMes(user)[idxM+5] }}</span>
                    </template>
                  </td>
                </template>
                <td class="py-2 px-3 text-center bg-emerald-50/50">
                  <span 
                    :class="[
                      'text-sm font-bold px-2 py-1 rounded-lg',
                      colorQ(qHoras(user, 2), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[2] ?? 0)
                    ]"
                  >
                    {{ qHoras(user, 2) }}
                  </span>
                </td>
                <template v-for="idxM in 3">
                  <td class="py-2 px-3 text-center" @dblclick="activarEdicion(idxU, idxM+8)">
                    <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM+8)">
                      <input 
                        type="number" 
                        min="0" 
                        class="input-field w-16 text-xs text-center"
                        :value="getHorasMes(user)[idxM+8]"
                        @blur="confirmarEdicion(idxU, idxM+8, ($event.target as HTMLInputElement).valueAsNumber)"
                        @keyup.enter="confirmarEdicion(idxU, idxM+8, ($event.target as HTMLInputElement).valueAsNumber)"
                        autofocus
                      />
                    </template>
                    <template v-else>
                      <span class="text-sm text-slate-700">{{ getHorasMes(user)[idxM+8] }}</span>
                    </template>
                  </td>
                </template>
                <td class="py-2 px-3 text-center bg-emerald-50/50">
                  <span 
                    :class="[
                      'text-sm font-bold px-2 py-1 rounded-lg',
                      colorQ(qHoras(user, 3), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[3] ?? 0)
                    ]"
                  >
                    {{ qHoras(user, 3) }}
                  </span>
                </td>
                <td class="py-2 px-3 text-center bg-slate-100">
                  <span class="text-sm font-bold text-slate-900">{{ totalHoras(user) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { 
  ArrowRightOnRectangleIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  CheckIcon, 
  ArrowDownTrayIcon, 
  CodeBracketIcon,
  DocumentChartBarIcon 
} from '@heroicons/vue/24/solid'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push({ name: 'login-usuario' })
}

const horasRequeridasPorQ = [
  { q: '1Q', meses: ['Enero', 'Febrero', 'Marzo'], horas: 80 },
  { q: '2Q', meses: ['Abril', 'Mayo', 'Junio'], horas: 75 },
  { q: '3Q', meses: ['Julio', 'Agosto', 'Septiembre'], horas: 90 },
  { q: '4Q', meses: ['Octubre', 'Noviembre', 'Diciembre'], horas: 85 }
]

interface UsuarioMock {
  codigo: string;
  grado: string;
  nombre: string;
  horasMes: number[];
}

const usuariosMock: UsuarioMock[] = [
  { codigo: "A07298", grado: "BRIGADIER", nombre: "ABARCA CHOQUEHUANCA, Uriel Ezequiel", horasMes: [21,0,0,0,0,2,0,0,0,0,0,0] },
  { codigo: "A00945", grado: "BRIGADIER", nombre: "ADIEGO VILLAGRACA, Eduardo Juan Pablo", horasMes: [103,66,14,183,2,8,4,0,26,0,0,0] },
  { codigo: "A01973", grado: "BRIGADIER", nombre: "ARDITTO ALEJOS, Giancarlo", horasMes: [39,159,21,11,0,0,0,0,0,0,0,0] },
  { codigo: "A05131", grado: "BRIGADIER", nombre: "BASTAS SANCHEZ , Luis Estuardo", horasMes: [3,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A01345", grado: "BRIGADIER", nombre: "BECERRA ALVARADO, Arturo Luis", horasMes: [0,0,0,39,0,0,0,0,0,0,0,0] },
  { codigo: "A01404", grado: "BRIGADIER", nombre: "CAIJA MAGUIÑA ZAPATA, José Augusto Martín Mariano", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A01834", grado: "BRIGADIER", nombre: "CAINO FLORES, Sergio Efraín", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00981", grado: "BRIGADIER", nombre: "ESPINOSA BELAUNDE, Ernesto Martín", horasMes: [16,0,2,18,0,0,0,0,0,0,0,0] },
  { codigo: "A01109", grado: "BRIGADIER", nombre: "GARCIA LANFRANCO, Cesar Fernando", horasMes: [180,163,231,574,236,180,0,0,0,0,0,0] },
  { codigo: "A01009", grado: "BRIGADIER", nombre: "GARCIA MESONES, Martin Wilton", horasMes: [12,13,26,39,9,5,0,0,0,0,0,0] },
  { codigo: "A00984", grado: "BRIGADIER", nombre: "GUERRERO YAÑEZ, Carlos Alberto", horasMes: [122,117,150,389,52,164,0,0,0,0,0,0] },
  { codigo: "A00941", grado: "BRIGADIER", nombre: "MARTIN ALVA, Fanor Eduardo", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00982", grado: "BRIGADIER", nombre: "OREJAS VEGA , José Luis", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00948", grado: "BRIGADIER", nombre: "RIVARA DAVILA, julio Alberto", horasMes: [12,21,10,43,0,19,0,0,0,0,0,0] },
  { codigo: "A00987", grado: "BRIGADIER", nombre: "SILVA FAEDO, Giorgio", horasMes: [1,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00910", grado: "BRIGADIER", nombre: "TANTAHUATAY PROAÑO, Victor Eduardo", horasMes: [10,9,21,40,36,8,0,0,0,0,0,0] },
  { codigo: "A00981", grado: "BRIGADIER", nombre: "TITO SUAREZ, Juan Carlos", horasMes: [1,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00980", grado: "BRIGADIER", nombre: "TORRES CROSSAR, Fabricio", horasMes: [3,0,0,37,0,0,0,0,0,0,0,0] },
  { codigo: "A00979", grado: "BRIGADIER", nombre: "VARALLANOS GAMARRA, José Adalberto", horasMes: [1,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A05741", grado: "BRIGADIER", nombre: "VARGAS ALZAMORA, Segundo Juan", horasMes: [46,0,0,9,0,0,0,0,0,0,0,0] },
  { codigo: "A07851", grado: "TENIENTE BRIGADIER", nombre: "AINZAIN RODRIGUEZ, Rafael Eduardo", horasMes: [84,0,0,99,0,0,0,0,0,0,0,0] },
  { codigo: "A07818", grado: "TENIENTE BRIGADIER", nombre: "BLONDET GARCIA, Helmut Elias", horasMes: [74,0,0,183,0,0,0,0,0,0,0,0] },
  { codigo: "A07819", grado: "TENIENTE BRIGADIER", nombre: "FRANCO BLAS, Christian Jesús", horasMes: [19,0,0,55,0,0,0,0,0,0,0,0] },
  { codigo: "A07820", grado: "TENIENTE BRIGADIER", nombre: "ITURRIZAGA CACERES, Juan Manuel", horasMes: [39,0,0,55,0,0,0,0,0,0,0,0] },
  { codigo: "A07821", grado: "TENIENTE BRIGADIER", nombre: "SALINAS CHIRINOS, Miguel Angel", horasMes: [332,336,322,990,378,421,0,0,0,0,0,0] },
  { codigo: "A07822", grado: "TENIENTE BRIGADIER", nombre: "SANGUINETTI CACHAY, Nicole Cecilia", horasMes: [21,0,0,148,0,0,0,0,0,0,0,0] },
  { codigo: "A07823", grado: "TENIENTE BRIGADIER", nombre: "TARAZONA VALENCIA, Paolo Milagro", horasMes: [75,36,37,148,41,26,0,0,0,0,0,0] },
  { codigo: "A07824", grado: "TENIENTE BRIGADIER", nombre: "VILLARREAL SEVILLANO, Ivan Fernando", horasMes: [24,0,0,24,0,0,0,0,0,0,0,0] },
  { codigo: "A07825", grado: "TENIENTE BRIGADIER", nombre: "YIKA MEZZANO, Mario Attilio", horasMes: [9,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A07912", grado: "CAPITAN", nombre: "BARAHONA TORRES, Monica Vanessa", horasMes: [61,0,0,102,0,0,0,0,0,0,0,0] },
  { codigo: "A01063", grado: "CAPITAN", nombre: "BONILLA PINAZO, Alex", horasMes: [4,17,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A01064", grado: "CAPITAN", nombre: "CASTILLO MENDIETA, Viviana Stefany", horasMes: [29,0,0,71,0,0,0,0,0,0,0,0] },
  { codigo: "A01065", grado: "CAPITAN", nombre: "CORDERO NUPAY, Jesús Armando", horasMes: [59,31,52,142,0,0,0,0,0,0,0,0] },
  { codigo: "A05120", grado: "CAPITAN", nombre: "FLORES URQUIA, Alejandra Cecilia", horasMes: [4,0,3,7,0,0,0,0,0,0,0,0] },
  { codigo: "A05121", grado: "CAPITAN", nombre: "GARCIA VALLE , Sharon Verónica", horasMes: [24,0,0,0,0,0,0,0,0,0,0,0] },
]

usuariosMock.push(
  { codigo: "A24671", grado: "SEGUNDO", nombre: "ALEGRIA SANCHEZ, Mario Cesar Alberto", horasMes: [461,250,296,247,248,182,0,0,0,0,0,0] },
  { codigo: "A23762", grado: "SEGUNDO", nombre: "ALVA HILARIO, Diego Andres", horasMes: [117,85,47,19,9,43,0,0,0,0,0,0] },
  { codigo: "A22888", grado: "SEGUNDO", nombre: "ARIAS MIGNONE, Gianni", horasMes: [44,36,73,52,68,38,0,0,0,0,0,0] },
  { codigo: "A22313", grado: "SEGUNDO", nombre: "ARIAS ORE, Juan Luis", horasMes: [0,0,2,0,0,3,0,0,0,0,0,0] },
  { codigo: "A13270", grado: "SEGUNDO", nombre: "BASTAS QUEVEDO, Alejandro Estuardo", horasMes: [0,0,10,31,0,0,0,0,0,0,0,0] },
  { codigo: "A12678", grado: "SEGUNDO", nombre: "CABRERA POMA, Antonella Tamara", horasMes: [122,109,58,173,0,0,0,0,0,0,0,0] },
  { codigo: "A22562", grado: "SEGUNDO", nombre: "CASTREJÓN VASQUEZ, Marya Rossana", horasMes: [331,253,186,178,70,57,0,0,0,0,0,0] },
  { codigo: "A24705", grado: "SEGUNDO", nombre: "CASTRO ASENCIO, Xiomara Rachiel", horasMes: [24,26,63,20,0,0,0,0,0,0,0,0] },
  { codigo: "A22308", grado: "SEGUNDO", nombre: "CENTENO GUTIERREZ, Veronica Patricia", horasMes: [102,64,75,39,36,73,0,0,0,0,0,0] },
  { codigo: "A22904", grado: "SEGUNDO", nombre: "CHAVEZ LLAQUE, Carolina", horasMes: [0,0,11,17,15,32,0,0,0,0,0,0] },
  { codigo: "A20874", grado: "SEGUNDO", nombre: "CHAVEZ MIANI, Carlos Nicolas", horasMes: [294,279,256,370,296,247,0,0,0,0,0,0] },
  { codigo: "A22896", grado: "SEGUNDO", nombre: "CORONEL-ZEGARRA BUSCAGLIA, Brisa Paola", horasMes: [3,0,17,0,0,0,0,0,0,0,0,0] },
  { codigo: "A23708", grado: "SEGUNDO", nombre: "COTRINA PAREDES, Edgar Armando", horasMes: [106,48,94,63,24,37,0,0,0,0,0,0] },
)

function qHoras(user: UsuarioMock, qIdx: number): number {
  const start = qIdx * 3
  return user.horasMes.slice(start, start+3).reduce((a: number, b: number) => a+b, 0)
}

function totalHoras(user: UsuarioMock): number {
  return user.horasMes.reduce((a: number, b: number) => a+b, 0)
}

function colorQ(valor: number, meta: number): string {
  const pct = (valor / meta) * 100;
  if (pct >= 100) return 'bg-emerald-100 text-emerald-700';
  if (pct > 50) return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

interface HorasPorQPorRango {
  BRIGADIER: number[];
  'TENIENTE BRIGADIER': number[];
  CAPITAN: number[];
  TENIENTE: number[];
  SEGUNDO: number[];
}

const horasPorQPorRango = reactive<HorasPorQPorRango>({
  'BRIGADIER':    [80, 75, 90, 85],
  'TENIENTE BRIGADIER': [70, 65, 80, 75],
  'CAPITAN':      [60, 55, 70, 65],
  'TENIENTE':     [50, 45, 60, 55],
  'SEGUNDO':      [40, 35, 50, 45],
})

const rangos: (keyof HorasPorQPorRango | 'TODOS')[] = [
  'TODOS',
  'BRIGADIER',
  'TENIENTE BRIGADIER',
  'CAPITAN',
  'TENIENTE',
  'SEGUNDO',
]

const rangoSeleccionado = ref<typeof rangos[number]>('TODOS')
const horasEditablesQPorRango = ref([...horasPorQPorRango['BRIGADIER']])

const anioActual = new Date().getFullYear()
const anios = Array.from({length: (anioActual + 2) - 2020 + 1}, (_, i) => 2020 + i)
const anioSeleccionado = ref(anioActual)

const horasPorQPorRangoPorAnio = reactive<{ [anio: number]: HorasPorQPorRango }>({
  [anioActual]: JSON.parse(JSON.stringify(horasPorQPorRango))
})

watch([anioSeleccionado, rangoSeleccionado], ([nuevoAnio, nuevoRango]) => {
  if (!horasPorQPorRangoPorAnio[nuevoAnio]) {
    horasPorQPorRangoPorAnio[nuevoAnio] = JSON.parse(JSON.stringify(horasPorQPorRango))
  }
  if (nuevoRango === 'TODOS') {
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[nuevoAnio]['BRIGADIER']]
  } else {
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[nuevoAnio][nuevoRango as keyof HorasPorQPorRango]]
  }
})

function guardarCambiosQ() {
  const anio = anioSeleccionado.value
  if (horasEditablesQPorRango.value.some(h => h < 0)) {
    Swal.fire('Error', 'Las horas deben ser un número positivo.', 'error')
    return
  }
  if (rangoSeleccionado.value === 'TODOS') {
    (Object.keys(horasPorQPorRangoPorAnio[anio]) as (keyof HorasPorQPorRango)[]).forEach(rango => {
      horasPorQPorRangoPorAnio[anio][rango] = [...horasEditablesQPorRango.value]
    })
    Swal.fire('¡Actualizado!', `Horas requeridas para todos los rangos en ${anio} actualizadas.`, 'success')
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[anio][rangos[1] as keyof HorasPorQPorRango]]
  } else {
    horasPorQPorRangoPorAnio[anio][rangoSeleccionado.value as keyof HorasPorQPorRango] = [...horasEditablesQPorRango.value]
    Swal.fire('¡Actualizado!', `Horas requeridas para el rango de ${rangoSeleccionado.value} en ${anio} actualizadas.`, 'success')
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[anio][rangoSeleccionado.value as keyof HorasPorQPorRango]]
  }
}

function descargarExcel() {
  const headers = [
    'CÓDIGO', 'GRADO', 'NOMBRE',
    'ENE', 'FEB', 'MAR', 'Q1',
    'ABR', 'MAY', 'JUN', 'Q2',
    'JUL', 'AGO', 'SEP', 'Q3',
    'OCT', 'NOV', 'DIC', 'Q4', 'TOTAL'
  ]
  const data = usuariosMock.map(user => {
    const horas = getHorasMes(user)
    const q1 = qHoras(user, 0)
    const q2 = qHoras(user, 1)
    const q3 = qHoras(user, 2)
    const q4 = qHoras(user, 3)
    const total = totalHoras(user)
    return [
      user.codigo,
      user.grado,
      user.nombre,
      horas[0], horas[1], horas[2], q1,
      horas[3], horas[4], horas[5], q2,
      horas[6], horas[7], horas[8], q3,
      horas[9], horas[10], horas[11], q4,
      total
    ]
  })
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data])

  function getExcelColor(valor: number, meta: number): string {
    const pct = (valor / meta) * 100
    if (pct >= 100) return 'FFD1FAE5'
    if (pct > 50) return 'FFFEF3C7'
    return 'FFFEE2E2'
  }
  for (let i = 0; i < usuariosMock.length; i++) {
    const user = usuariosMock[i]
    const row = i + 1
    const metas = horasPorQPorRangoPorAnio[anioSeleccionado.value][user.grado as keyof HorasPorQPorRango]
    const qIdxs = [6, 10, 14, 18]
    const qs = [qHoras(user, 0), qHoras(user, 1), qHoras(user, 2), qHoras(user, 3)]
    qIdxs.forEach((col, idx) => {
      const cell = XLSX.utils.encode_cell({ r: row, c: col })
      if (!ws[cell]) return
      ws[cell].s = {
        fill: {
          patternType: 'solid',
          fgColor: { rgb: getExcelColor(qs[idx], metas?.[idx] ?? 0) }
        }
      }
    })
  }
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Resumen')
  XLSX.writeFile(wb, 'resumen_horas_usuarios.xlsx', { cellStyles: true })
}

const celdaEditando = ref<{ idxUsuario: number; idxMes: number } | null>(null)
const cambiosPendientes = ref(false)

function activarEdicion(idxUsuario: number, idxMes: number) {
  celdaEditando.value = { idxUsuario, idxMes }
}

function confirmarEdicion(idxUsuario: number, idxMes: number, nuevoValor: number) {
  if (nuevoValor < 0) return
  usuariosMock[idxUsuario].horasMes[idxMes] = nuevoValor
  celdaEditando.value = null
  cambiosPendientes.value = true
}

function guardarCambiosMeses() {
  cambiosPendientes.value = false
  Swal.fire('¡Actualizado!', 'Horas mensuales actualizadas correctamente.', 'success')
}

function getHorasMes(user: UsuarioMock): number[] {
  return [...user.horasMes, ...Array(12 - user.horasMes.length).fill(0)].slice(0, 12)
}

function descargarHTML() {
  const headers = [
    'CÓDIGO', 'GRADO', 'NOMBRE',
    'ENE', 'FEB', 'MAR', 'Q1',
    'ABR', 'MAY', 'JUN', 'Q2',
    'JUL', 'AGO', 'SEP', 'Q3',
    'OCT', 'NOV', 'DIC', 'Q4', 'TOTAL'
  ]
  function getHtmlColor(valor: number, meta: number): string {
    const pct = (valor / meta) * 100
    if (pct >= 100) return '#D1FAE5'
    if (pct > 50) return '#FEF3C7'
    return '#FEE2E2'
  }
  let html = '<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:12px;">'
  html += '<thead><tr>' + headers.map(h => `<th style="background:#F1F5F9;padding:8px;">${h}</th>`).join('') + '</tr></thead>'
  html += '<tbody>'
  for (const user of usuariosMock) {
    const horas = getHorasMes(user)
    const metas = horasPorQPorRangoPorAnio[anioSeleccionado.value][user.grado as keyof HorasPorQPorRango]
    const q1 = horas[0] + horas[1] + horas[2]
    const q2 = horas[3] + horas[4] + horas[5]
    const q3 = horas[6] + horas[7] + horas[8]
    const q4 = horas[9] + horas[10] + horas[11]
    const total = horas.reduce((a, b) => a + b, 0)
    html += '<tr>'
    html += `<td style="padding:6px;">${user.codigo}</td><td style="padding:6px;">${user.grado}</td><td style="padding:6px;">${user.nombre}</td>`
    html += `<td style="padding:6px;text-align:center;">${horas[0]}</td><td style="padding:6px;text-align:center;">${horas[1]}</td><td style="padding:6px;text-align:center;">${horas[2]}</td>`
    html += `<td style="background:${getHtmlColor(q1, metas?.[0] ?? 0)};font-weight:bold;text-align:center;padding:6px;">${q1}</td>`
    html += `<td style="padding:6px;text-align:center;">${horas[3]}</td><td style="padding:6px;text-align:center;">${horas[4]}</td><td style="padding:6px;text-align:center;">${horas[5]}</td>`
    html += `<td style="background:${getHtmlColor(q2, metas?.[1] ?? 0)};font-weight:bold;text-align:center;padding:6px;">${q2}</td>`
    html += `<td style="padding:6px;text-align:center;">${horas[6]}</td><td style="padding:6px;text-align:center;">${horas[7]}</td><td style="padding:6px;text-align:center;">${horas[8]}</td>`
    html += `<td style="background:${getHtmlColor(q3, metas?.[2] ?? 0)};font-weight:bold;text-align:center;padding:6px;">${q3}</td>`
    html += `<td style="padding:6px;text-align:center;">${horas[9]}</td><td style="padding:6px;text-align:center;">${horas[10]}</td><td style="padding:6px;text-align:center;">${horas[11]}</td>`
    html += `<td style="background:${getHtmlColor(q4, metas?.[3] ?? 0)};font-weight:bold;text-align:center;padding:6px;">${q4}</td>`
    html += `<td style="font-weight:bold;text-align:center;padding:6px;background:#E2E8F0;">${total}</td>`
    html += '</tr>'
  }
  html += '</tbody></table>'
  const blob = new Blob([
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reporte Horas</title></head><body>' +
    html +
    '</body></html>'
  ], { type: 'text/html' })
  saveAs(blob, 'reporte_horas_usuarios.html')
}
</script>
