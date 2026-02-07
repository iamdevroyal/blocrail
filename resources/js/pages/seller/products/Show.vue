<template>
  <AppLayout>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Product Details</h1>
        <p class="text-gray-400">View product information and variants</p>
      </div>
      <div class="flex space-x-3">
        <router-link
          :to="{ name: 'seller.products' }"
          class="px-4 py-2 text-gray-300 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition"
        >
          Back to Products
        </router-link>
        <router-link
          :to="{ name: 'seller.products.edit', params: { id: '$route.params.id' } }"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Product
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      <div class="md:col-span-2 space-y-6">
        <div class="h-64 bg-slate-800 rounded-xl"></div>
        <div class="h-32 bg-slate-800 rounded-xl"></div>
      </div>
      <div class="space-y-6">
        <div class="h-40 bg-slate-800 rounded-xl"></div>
        <div class="h-40 bg-slate-800 rounded-xl"></div>
      </div>
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-6">
        
        <!-- Basic Info Card -->
        <Card glass>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-xl font-semibold text-white">{{ product.name }}</h2>
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  product.is_active 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                ]"
              >
                {{ product.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <div class="prose max-w-none text-gray-400 mb-6">
              <p class="whitespace-pre-line">{{ product.description }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-700 pt-4">
              <div>
                <span class="block text-sm text-gray-400">Price</span>
                <span class="text-lg font-semibold text-white">{{ formatCurrency(product.price) }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-400">Total Stock</span>
                <span class="text-lg font-semibold text-white">{{ product.stock_quantity }} units</span>
              </div>
              <div>
                 <span class="block text-sm text-gray-400">Inventory Status</span>
                 <span 
                   :class="[
                     'text-sm font-medium',
                     product.stock_quantity > 10 ? 'text-green-400' : product.stock_quantity > 0 ? 'text-orange-400' : 'text-red-400'
                   ]"
                 >
                   {{ product.stock_quantity > 10 ? 'In Stock' : product.stock_quantity > 0 ? 'Low Stock' : 'Out of Stock' }}
                 </span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Variants Card -->
        <Card v-if="product.variants && product.variants.length > 0" glass>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Product Variants</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-700 text-sm text-gray-400">
                    <th class="py-2 px-3">Variant</th>
                    <th class="py-2 px-3">SKU</th>
                    <th class="py-2 px-3 text-right">Price</th>
                    <th class="py-2 px-3 text-right">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(variant, index) in product.variants" 
                    :key="index"
                    class="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30"
                  >
                    <td class="py-3 px-3">
                      <div class="flex gap-2">
                        <span 
                          v-for="(attrVal, i) in (variant.attribute_values || [])" 
                          :key="i"
                          class="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300"
                        >
                          {{ attrVal.variant_attribute ? attrVal.variant_attribute.name : 'Option' }}: {{ attrVal.value }}
                        </span>
                      </div>
                    </td>
                    <td class="py-3 px-3 text-sm text-gray-400">{{ variant.sku || '-' }}</td>
                    <td class="py-3 px-3 text-sm text-right font-medium text-white">{{ formatCurrency(variant.price || product.price) }}</td>
                    <td class="py-3 px-3 text-sm text-right text-gray-300">{{ variant.stock_quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <!-- Images Card -->
         <Card v-if="product.images && product.images.length > 0" glass>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Product Images</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                class="aspect-square rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group relative"
              >
                <img 
                  :src="getImageUrl(image)" 
                  class="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  alt="Product Image"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Category Info -->
        <Card glass>
          <div class="p-6 space-y-4">
            <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Categorization</h3>
            
            <div>
              <span class="block text-xs text-gray-500 mb-1">Category</span>
              <span class="text-white font-medium">{{ product.category?.name || 'Uncategorized' }}</span>
            </div>
            
            <div v-if="product.subcategory">
              <span class="block text-xs text-gray-500 mb-1">Subcategory</span>
              <span class="text-white font-medium">{{ product.subcategory.name }}</span>
            </div>
          </div>
        </Card>

        <!-- Meta Info -->
        <Card glass>
          <div class="p-6 space-y-4">
            <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Additional Info</h3>
            
            <div>
              <span class="block text-xs text-gray-500 mb-1">Date Created</span>
              <span class="text-sm text-slate-300">{{ formatDate(product.created_at) }}</span>
            </div>
            
            <div>
              <span class="block text-xs text-gray-500 mb-1">Last Updated</span>
              <span class="text-sm text-slate-300">{{ formatDate(product.updated_at) }}</span>
            </div>
          </div>
        </Card>
      </div>

    </div>
    
    <!-- Not Found State -->
    <div v-else-if="!loading && !product" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900">Product not found</h3>
      <p class="text-gray-500 mt-2">The product you are looking for does not exist or has been removed.</p>
      <router-link :to="{ name: 'seller.products' }" class="mt-6 inline-flex text-blue-600 hover:text-blue-700 font-medium">
        Back to Products
      </router-link>
    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import { formatCurrency, formatDate } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const loading = ref(true)
const product = computed(() => productStore.currentProduct)

const loadProduct = async () => {
  loading.value = true
  try {
    await productStore.fetchProduct(route.params.id)
  } catch (error) {
    console.error('Failed to load product', error)
  } finally {
    loading.value = false
  }
}

const getImageUrl = (image) => {
  if (!image) return ''
  
  // Extract URL from object if necessary (backend stores as {id, url})
  const path = typeof image === 'object' ? image.url : image
  
  if (!path || typeof path !== 'string') return ''
  
  // If it's already a full URL, return it
  if (path.startsWith('http')) return path
  
  // Clean up path to avoid double /storage/ prefix
  const cleanPath = path.replace(/^\/?storage\//, '')
  
  return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${cleanPath}`
}

onMounted(() => {
  loadProduct()
})
</script>
