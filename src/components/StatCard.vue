<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: string | number
  icon?: any
  color?: 'slate' | 'green' | 'amber' | 'red'
}

const props = defineProps<Props>()

const colorClasses = computed(() => {
  const colors = {
    slate: {
      bg: 'bg-slate-50',
      icon: 'bg-gradient-to-br from-slate-600 to-slate-700',
      text: 'text-slate-900',
      border: 'border-slate-100'
    },
    green: {
      bg: 'bg-emerald-50',
      icon: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      text: 'text-emerald-900',
      border: 'border-emerald-100'
    },
    amber: {
      bg: 'bg-amber-50',
      icon: 'bg-gradient-to-br from-amber-500 to-amber-600',
      text: 'text-amber-900',
      border: 'border-amber-100'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'bg-gradient-to-br from-red-500 to-red-600',
      text: 'text-red-900',
      border: 'border-red-100'
    }
  }
  return colors[props.color || 'slate']
})
</script>

<template>
  <div :class="['stat-card', colorClasses.bg, 'border', colorClasses.border]">
    <div class="flex items-center gap-4">
      <div v-if="icon" :class="['w-12 h-12 rounded-xl flex items-center justify-center shadow-md', colorClasses.icon]">
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
      <div v-else :class="['w-12 h-12 rounded-xl', colorClasses.icon]"></div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-slate-500 truncate mb-1">{{ title }}</p>
        <h5 :class="['text-3xl font-bold tracking-tight', colorClasses.text]">{{ value }}</h5>
      </div>
    </div>
  </div>
</template>
