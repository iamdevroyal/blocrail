<script setup>
defineProps({
  size: { type: String, default: 'md' },
  glow: { type: Boolean, default: false }
})
</script>

<template>
  <button 
    class="relative group overflow-hidden rounded-xl font-bold transition-all duration-300"
    :class="[
      size === 'sm' ? 'px-6 py-2.5 text-sm' : 
      size === 'lg' ? 'px-10 py-4 text-lg' : 'px-8 py-3',
      glow ? 'shadow-glow-purple-lg hover:shadow-glow-purple-xl' : ''
    ]"
  >
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-purple transition-transform duration-300 group-hover:scale-105"></div>
    
    <!-- Shine Effect -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full decoration-[2000ms]"></div>
    
    <span class="relative z-10 text-white flex items-center justify-center gap-2">
      <slot />
    </span>
  </button>
</template>
