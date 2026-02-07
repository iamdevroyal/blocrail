<template>
  <div class="text-center py-12">
    <!-- Icon -->
    <div class="inline-flex p-4 rounded-full mb-4" :class="iconBgClass">
      <slot name="icon">
        <svg :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="defaultIconPath" />
        </svg>
      </slot>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>

    <!-- Description -->
    <p class="text-gray-400 max-w-md mx-auto mb-6">{{ description }}</p>

    <!-- Action Button -->
    <slot name="action">
      <Button v-if="actionText" :variant="actionVariant" @click="$emit('action')">
        {{ actionText }}
      </Button>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'No data found',
  },
  description: {
    type: String,
    default: 'Get started by creating your first item',
  },
  icon: {
    type: String,
    default: 'box',
    validator: (value) => ['box', 'document', 'user', 'photo', 'folder', 'search'].includes(value),
  },
  actionText: {
    type: String,
    default: '',
  },
  actionVariant: {
    type: String,
    default: 'primary',
  },
})

defineEmits(['action'])

const iconPaths = {
  box: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  photo: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  folder: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
}

const defaultIconPath = computed(() => iconPaths[props.icon])

const iconClass = computed(() => 'w-12 h-12 text-gray-500')

const iconBgClass = computed(() => 'bg-slate-700/50')
</script>
