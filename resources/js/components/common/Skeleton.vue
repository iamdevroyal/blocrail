<template>
  <div class="animate-pulse space-y-4">
    <!-- Header Skeleton -->
    <div v-if="type === 'header'" class="space-y-3">
      <div class="h-8 bg-slate-700 rounded w-1/4"></div>
      <div class="h-4 bg-slate-700 rounded w-1/3"></div>
    </div>

    <!-- Card Skeleton -->
    <div v-else-if="type === 'card'" class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div class="space-y-3">
        <div class="h-6 bg-slate-700 rounded w-1/3"></div>
        <div class="h-4 bg-slate-700 rounded w-full"></div>
        <div class="h-4 bg-slate-700 rounded w-5/6"></div>
      </div>
    </div>

    <!-- Table Skeleton -->
    <div v-else-if="type === 'table'" class="space-y-3">
      <div v-for="i in rows" :key="i" class="flex space-x-4">
        <div class="h-12 bg-slate-700 rounded flex-1"></div>
        <div class="h-12 bg-slate-700 rounded flex-1"></div>
        <div class="h-12 bg-slate-700 rounded flex-1"></div>
      </div>
    </div>

    <!-- List Skeleton -->
    <div v-else-if="type === 'list'" class="space-y-3">
      <div v-for="i in rows" :key="i" class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-slate-700 rounded-full flex-shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-slate-700 rounded w-3/4"></div>
          <div class="h-3 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Stats Skeleton -->
    <div v-else-if="type === 'stats'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div v-for="i in 5" :key="i" class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <div class="space-y-3">
          <div class="h-4 bg-slate-700 rounded w-1/2"></div>
          <div class="h-8 bg-slate-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Form Skeleton -->
    <div v-else-if="type === 'form'" class="space-y-4">
      <div v-for="i in rows" :key="i" class="space-y-2">
        <div class="h-4 bg-slate-700 rounded w-1/4"></div>
        <div class="h-10 bg-slate-700 rounded w-full"></div>
      </div>
    </div>

    <!-- Default Skeleton -->
    <div v-else class="space-y-3">
      <div class="h-4 bg-slate-700 rounded w-full"></div>
      <div class="h-4 bg-slate-700 rounded w-5/6"></div>
      <div class="h-4 bg-slate-700 rounded w-4/6"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['header', 'card', 'table', 'list', 'stats', 'form', 'default'].includes(value)
  },
  rows: {
    type: Number,
    default: 3
  }
})
</script>
