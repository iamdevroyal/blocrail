<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-slate-700">
      <slot name="header">
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      </slot>
    </div>
    
    <div :class="bodyClasses">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-700 bg-slate-800/30">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  padding: {
    type: Boolean,
    default: true,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  glass: {
    type: Boolean,
    default: false,
  },
})

const cardClasses = computed(() => {
  const base = 'rounded-xl border overflow-hidden'
  const background = props.glass 
    ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' 
    : 'bg-slate-800 border-slate-700'
  const hoverEffect = props.hover 
    ? 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300' 
    : ''
  
  return [base, background, hoverEffect].filter(Boolean).join(' ')
})

const bodyClasses = computed(() => {
  return props.padding ? 'p-6' : ''
})
</script>
