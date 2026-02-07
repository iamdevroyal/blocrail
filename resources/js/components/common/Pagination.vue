<template>
  <div class="flex items-center justify-between">
    <!-- Info -->
    <p class="text-gray-400 text-sm">
      Showing {{ startItem }} to {{ endItem }} of {{ total }} {{ itemName }}
    </p>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- Previous Button -->
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="px-3 py-1.5 text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        :class="currentPage === 1 ? 'text-gray-500 bg-slate-800' : 'text-white bg-slate-700 hover:bg-slate-600'"
      >
        Previous
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="px-3 py-1.5 text-sm font-medium rounded-lg transition"
          :class="page === currentPage 
            ? 'bg-purple-600 text-white' 
            : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-3 py-1.5 text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        :class="currentPage === totalPages ? 'text-gray-500 bg-slate-800' : 'text-white bg-slate-700 hover:bg-slate-600'"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    default: 15,
  },
  total: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    default: 'items',
  },
})

const emit = defineEmits(['page-change'])

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
