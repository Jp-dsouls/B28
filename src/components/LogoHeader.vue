<script setup lang="ts">
import { ref } from 'vue'
import { IMAGES, type ImageSize } from '../config/images'

interface Props {
  size?: ImageSize
  showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: true
})

const escudoError = ref(false)
const logoError = ref(false)

const responsiveSizeClasses = {
  sm: 'w-6 h-6 sm:w-8 sm:h-8',
  md: 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12',
  lg: 'w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16'
}

const handleImageError = (type: 'escudo' | 'logo') => {
  if (type === 'escudo') {
    escudoError.value = true
  } else {
    logoError.value = true
  }
}
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <div class="relative">
        <img 
          v-if="!escudoError" 
          :src="IMAGES.ESCUDO_B28" 
          :alt="IMAGES.ALT_TEXTS.ESCUDO_B28" 
          :class="[responsiveSizeClasses[size], 'object-contain rounded-full']" 
          loading="lazy" 
          @error="handleImageError('escudo')" 
        />
        <div 
          v-if="escudoError" 
          :class="[
            responsiveSizeClasses[size],
            'bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-red-600/30'
          ]"
        >
          B28
        </div>
      </div>

      <div class="relative">
        <img 
          v-if="!logoError" 
          :src="IMAGES.LOGO_CGBVP" 
          :alt="IMAGES.ALT_TEXTS.LOGO_CGBVP" 
          :class="[responsiveSizeClasses[size], 'object-contain rounded-full']" 
          loading="lazy" 
          @error="handleImageError('logo')" 
        />
        <div 
          v-if="logoError" 
          :class="[
            responsiveSizeClasses[size],
            'bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-600/30'
          ]"
        >
          CGBVP
        </div>
      </div>
    </div>

    <div v-if="showText" class="hidden sm:block">
      <h5 class="text-sm sm:text-base font-bold text-white uppercase tracking-wide leading-tight">
        B28 Asistencia
      </h5>
      <p class="text-xs text-slate-300 font-medium">Sistema de Control</p>
    </div>
  </div>
</template>

<style scoped>
img {
  image-rendering: -webkit-optimize-contrast;
  transition: transform 0.2s ease;
}

img:hover {
  transform: scale(1.05);
}
</style>
