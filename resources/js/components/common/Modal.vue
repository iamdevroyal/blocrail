<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" @click="close"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        :class="modalClasses"
        @click.stop
      >
        <!-- Header -->
        <div v-if="$slots.header || title" class="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <slot name="header">
            <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
          </slot>
          <button
            v-if="closeable"
            @click="close"
            class="text-gray-400 hover:text-white transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Body -->
        <div class="px-6 py-4">
          <slot></slot>
        </div>
        
        <!-- Footer -->
        <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-700 bg-slate-800/30">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  closeable: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'update:show'])

const close = () => {
  if (props.closeable) {
    emit('close')
    emit('update:show', false)
  }
}

const modalClasses = computed(() => {
  const base = 'relative bg-slate-800 rounded-xl shadow-2xl border border-slate-700 transform transition-all'
  
  const sizes = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-2xl w-full',
    xl: 'max-w-4xl w-full',
  }
  
  return [base, sizes[props.size]].join(' ')
})

// Prevent body scroll when modal is open
watch(() => props.show, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
