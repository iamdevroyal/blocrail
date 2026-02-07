<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- Spinner -->
      <div :class="spinnerClasses">
        <div class="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full opacity-25"></div>
        <div class="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <!-- Text -->
      <p v-if="text" class="mt-4 text-center text-gray-400 text-sm">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  text: {
    type: String,
    default: '',
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
})

const containerClass = computed(() => {
  return props.fullScreen ? 'min-h-screen' : 'py-12'
})

const spinnerClasses = computed(() => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }
  
  return ['relative', sizes[props.size]].join(' ')
})
</script>
