<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Products</h1>
          <p class="text-gray-400 mt-1">Manage your product catalog</p>
        </div>
        <Button variant="primary" @click="$router.push('/seller/products/create')" class="w-full sm:w-auto justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Button>
      </div>

      <!-- Filters -->
      <Card glass>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              @input="debouncedSearch"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              v-model="statusFilter"
              class="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="applyFilters"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Clear Filters -->
          <div class="flex items-end">
            <Button variant="ghost" @click="clearFilters" class="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      <!-- Skeleton Loader -->
      <div v-if="loading" class="p-6">
        <Skeleton type="table" :rows="10" />
      </div>

      <!-- Products Table -->
      <Card v-else glass>
        <div v-if="products.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p class="text-gray-400 text-lg">No products found</p>
          <Button variant="primary" class="mt-4" @click="$router.push('/seller/products/create')">
            Create Your First Product
          </Button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-700">
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Stock</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                <th class="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product.id"
                class="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center space-x-3">
                    <img
                      v-if="product.images && product.images.length > 0"
                      :src="product.images[0].url || product.images[0]"
                      :alt="product.name"
                      class="w-12 h-12 rounded-lg object-cover"
                    />
                    <div v-else class="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-white font-medium">{{ product.name }}</p>
                      <p class="text-gray-400 text-sm">{{ truncate(product.description, 50) }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-white">{{ formatCurrency(product.price) }}</td>
                <td class="py-3 px-4">
                  <span :class="product.stock_quantity > 10 ? 'text-green-400' : 'text-yellow-400'">
                    {{ product.stock_quantity }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <Badge :variant="product.is_active ? 'success' : 'default'">
                    {{ product.is_active ? 'Active' : 'Inactive' }}
                  </Badge>
                </td>
                <td class="py-3 px-4 text-gray-400">{{ formatDate(product.created_at) }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center justify-end space-x-2">
                    <router-link
                      :to="{ name: 'seller.products.show', params: { id: product.id } }"
                      class="p-2 text-gray-400 hover:bg-gray-500/10 rounded-lg transition"
                      title="View"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </router-link>
                    <button
                      @click="editProduct(product.id)"
                      class="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                      title="Edit"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="confirmDelete(product)"
                      class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Delete"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="mt-6 flex items-center justify-between">
          <p class="text-gray-400 text-sm">
            Showing {{ products.length }} of {{ pagination.total }} products
          </p>
          <div class="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              :disabled="pagination.current_page === 1"
              @click="goToPage(pagination.current_page - 1)"
            >
              Previous
            </Button>
            <span class="text-gray-400 text-sm">
              Page {{ pagination.current_page }} of {{ pagination.last_page }}
            </span>
            <Button
              variant="ghost"
              size="sm"
              :disabled="pagination.current_page === pagination.last_page"
              @click="goToPage(pagination.current_page + 1)"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <!-- Delete Confirmation Modal -->
      <Modal :show="showDeleteModal" title="Delete Product" @close="showDeleteModal = false">
        <p class="text-gray-300">
          Are you sure you want to delete <strong class="text-white">{{ productToDelete?.name }}</strong>?
          This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex items-center justify-end space-x-3">
            <Button variant="ghost" @click="showDeleteModal = false">Cancel</Button>
            <Button variant="danger" :loading="deleting" @click="deleteProduct">Delete</Button>
          </div>
        </template>
      </Modal>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { formatCurrency, formatDate, truncate, debounce } from '@/utils/helpers'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import Modal from '@/components/common/Modal.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const productStore = useProductStore()
const toast = useToast()

const searchQuery = ref('')
const statusFilter = ref('')
const showDeleteModal = ref(false)
const productToDelete = ref(null)
const deleting = ref(false)

const products = computed(() => productStore.products)
const pagination = computed(() => productStore.pagination)
const loading = computed(() => productStore.loading)

const debouncedSearch = debounce(() => {
  applyFilters()
}, 300)

const applyFilters = async () => {
  productStore.setFilters({
    search: searchQuery.value,
    status: statusFilter.value,
  })
  await fetchProducts()
}

const clearFilters = async () => {
  searchQuery.value = ''
  statusFilter.value = ''
  productStore.clearFilters()
  await fetchProducts()
}

const fetchProducts = async (page = 1) => {
  try {
    await productStore.fetchProducts(page)
  } catch (error) {
    toast.error('Failed to load products')
  }
}

const goToPage = (page) => {
  fetchProducts(page)
}

const editProduct = (id) => {
  router.push(`/seller/products/${id}/edit`)
}

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = async () => {
  if (!productToDelete.value) return

  deleting.value = true
  try {
    await productStore.deleteProduct(productToDelete.value.id)
    toast.success('Product deleted successfully')
    showDeleteModal.value = false
    productToDelete.value = null
  } catch (error) {
    toast.error('Failed to delete product')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
