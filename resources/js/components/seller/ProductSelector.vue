<template>
  <div class="space-y-4">
    <!-- Search and Filter -->
    <div class="flex space-x-2">
      <div class="flex-1 relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          v-model="search"
          placeholder="Search products..."
          class="block w-full pl-10 pr-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm"
          @input="handleSearch"
        />
      </div>
      <Button variant="ghost" @click="toggleSelectedOnly" :class="{ 'bg-slate-700': showSelectedOnly }">
        Selected ({{ modelValue.length }})
      </Button>
    </div>

    <!-- Product List -->
    <div class="max-h-96 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
      <Loading v-if="loading" text="Loading products..." />
      <EmptyState
        v-else-if="filteredProducts.length === 0"
        :title="showSelectedOnly ? 'No products selected' : 'No products found'"
        description="Try a different search term or clear filters"
        icon="search"
      />
      <div
        v-else
        v-for="product in filteredProducts"
        :key="product.id"
        class="flex items-center p-3 rounded-lg border transition cursor-pointer"
        :class="isSelected(product.id) ? 'bg-purple-600/20 border-purple-500' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'"
        @click="toggleSelection(product)"
      >
        <img
          v-if="product.images?.length"
          :src="product.images[0].url"
          class="w-12 h-12 rounded bg-slate-700 object-cover flex-shrink-0"
        />
        <div v-else class="w-12 h-12 rounded bg-slate-700 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <p class="text-sm font-medium text-white">{{ product.name }}</p>
          <p class="text-xs text-gray-400">{{ formatCurrency(product.price) }} · {{ product.stock_quantity }} in stock</p>
        </div>
        <div class="ml-2">
          <div
            class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition"
            :class="isSelected(product.id) ? 'bg-purple-500 border-purple-500' : 'border-slate-600'"
          >
            <svg v-if="isSelected(product.id)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import { formatCurrency, debounce } from '@/utils/helpers'
import Loading from '@/components/common/Loading.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const productStore = useProductStore()
const search = ref('')
const showSelectedOnly = ref(false)
const loading = computed(() => productStore.loading)

const handleSearch = debounce(() => {
  productStore.setFilters({ search: search.value })
  productStore.fetchProducts(1)
}, 300)

const toggleSelectedOnly = () => {
  showSelectedOnly.value = !showSelectedOnly.value
}

const isSelected = (id) => props.modelValue.some(p => p.id === id)

const toggleSelection = (product) => {
  const newValue = [...props.modelValue]
  const index = newValue.findIndex(p => p.id === product.id)
  
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(product)
  }
  
  emit('update:modelValue', newValue)
}

const filteredProducts = computed(() => {
  if (showSelectedOnly.value) {
    return props.modelValue
  }
  return productStore.products
})

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>
