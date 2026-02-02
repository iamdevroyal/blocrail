<script setup>
defineProps({
  size: { type: String, default: 'md' }
})
</script>

<template>
  <button 
    class="relative group rounded-xl font-bold border-2 border-white/10 hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/10 transition-all duration-300"
    :class="[
      size === 'sm' ? 'px-6 py-2 text-sm' : 
      size === 'lg' ? 'px-10 py-3.5 text-lg' : 'px-8 py-2.5'
    ]"
  >
    <span class="relative z-10 text-text-primary group-hover:text-purple-400 transition-colors flex items-center justify-center gap-2">
      <slot />
    </span>
  </button>
</template>
