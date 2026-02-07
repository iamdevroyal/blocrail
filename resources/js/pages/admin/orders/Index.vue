<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-white">Order Management</h1>
          <p class="text-gray-400 mt-1">View and manage all platform orders</p>
        </div>
      </div>

      <!-- Filters -->
      <Card glass>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Search</label>
            <input
              v-model="search"
              type="text"
              placeholder="Order number..."
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @input="handleSearch"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Date Range</label>
            <input
              v-model="filters.date_from"
              type="date"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            />
          </div>

          <div class="flex items-end">
            <Button variant="ghost" size="sm" class="w-full" @click="resetFilters">
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <!-- Orders Table -->
      <Card title="All Orders" glass no-padding overflow-hidden>
        <div v-if="loading && orders.length === 0" class="p-6">
          <Skeleton type="table" :rows="10" />
        </div>
        
        <Table
          v-else
          :columns="columns"
          :data="orders"
        >
          <template #cell-order_number="{ row }">
            <div>
              <p class="text-white font-mono font-medium">{{ row.order_number }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(row.created_at) }}</p>
            </div>
          </template>

          <template #cell-seller="{ row }">
            <div>
              <p class="text-white font-medium">{{ row.seller_name }}</p>
              <p class="text-xs text-gray-500">{{ row.seller_email }}</p>
            </div>
          </template>

          <template #cell-buyer="{ row }">
            <div>
              <p class="text-white">{{ row.buyer_name }}</p>
              <p class="text-xs text-gray-500">{{ row.buyer_phone }}</p>
            </div>
          </template>

          <template #cell-amount="{ row }">
            <span class="text-white font-medium">{{ formatCurrency(row.total_amount) }}</span>
          </template>

          <template #cell-status="{ row }">
            <Badge :variant="getStatusVariant(row.status)">
              {{ row.status }}
            </Badge>
          </template>

          <template #cell-payment="{ row }">
            <Badge :variant="row.payment_status === 'paid' ? 'success' : 'warning'">
              {{ row.payment_status }}
            </Badge>
          </template>

          <template #cell-actions="{ row }">
            <button
              @click="viewOrder(row.id)"
              class="text-purple-400 hover:text-purple-300 transition"
              title="View Details"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </template>

          <template #empty>
            <EmptyState
              title="No orders found"
              description="No orders match your current filters"
              icon="document"
            />
          </template>
        </Table>

        <div v-if="pagination.last_page > 1" class="px-6 py-4 border-t border-slate-700">
          <Pagination
            :current-page="pagination.current_page"
            :total-pages="pagination.last_page"
            :per-page="pagination.per_page"
            :total="pagination.total"
            item-name="orders"
            @page-change="fetchOrders"
          />
        </div>
      </Card>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Table from '@/components/common/Table.vue'
import Badge from '@/components/common/Badge.vue'
import Button from '@/components/common/Button.vue'
import Loading from '@/components/common/Loading.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Pagination from '@/components/common/Pagination.vue'
import Skeleton from '@/components/common/Skeleton.vue'

const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const search = ref('')
const filters = ref({
  status: '',
  date_from: '',
})

const loading = computed(() => adminStore.loading)
const orders = computed(() => adminStore.orders)
const pagination = computed(() => adminStore.pagination)
const columns = [
  { key: 'order_number', label: 'Order Number' },
  { key: 'seller', label: 'Seller' },
  { key: 'buyer', label: 'Buyer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'payment', label: 'Payment' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const getStatusVariant = (status) => {
  if (status === 'delivered') return 'success'
  if (status === 'confirmed') return 'info'
  if (status === 'pending') return 'warning'
  return 'danger'
}

const handleSearch = () => {
  setTimeout(() => {
    fetchOrders()
  }, 300)
}

const handleFilter = () => {
  adminStore.setFilters(filters.value)
  fetchOrders()
}

const resetFilters = () => {
  search.value = ''
  filters.value = { status: '', date_from: '' }
  adminStore.clearFilters()
  fetchOrders()
}

const fetchOrders = async (page = 1) => {
  try {
    await adminStore.fetchOrders(page)
  } catch (error) {
    toast.error('Failed to load orders')
  }
}

const viewOrder = (id) => {
  router.push(`/admin/orders/${id}`)
}

onMounted(() => {
  fetchOrders()
})
</script>
