<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Orders</h1>
          <p class="text-gray-400 mt-1">Manage and track your customer orders</p>
        </div>
      </div>

      <!-- Filters -->
      <Card glass>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Search</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Order #, Customer..."
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
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment</label>
            <select
              v-model="filters.payment_status"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            >
              <option value="">All Payments</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">From Date</label>
            <input
              v-model="filters.date_from"
              type="date"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            />
          </div>
           <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">To Date</label>
            <input
              v-model="filters.date_to"
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

      <!-- Orders List -->
      <Card glass no-padding overflow-hidden>
        <div v-if="loading && orders.length === 0" class="p-6">
          <Skeleton type="table" :rows="10" />
        </div>
        
        <Table
          v-else
          :columns="columns"
          :data="orders"
          clickable
          @row-click="viewOrder"
        >
          <template #cell-order_number="{ row }">
            <span class="font-mono text-xs text-purple-400 font-bold">{{ row.order_number }}</span>
          </template>
          
          <template #cell-status="{ value }">
            <Badge :variant="getStatusVariant(value)">{{ value }}</Badge>
          </template>
          
          <template #cell-payment_status="{ value }">
            <span class="flex items-center text-xs" :class="value === 'paid' ? 'text-green-400' : 'text-yellow-400'">
              <span class="w-1.5 h-1.5 rounded-full mr-2" :class="value === 'paid' ? 'bg-green-500' : 'bg-yellow-500'"></span>
              {{ value }}
            </span>
          </template>
          
          <template #cell-total_amount="{ value }">
            <span class="font-semibold text-white">{{ formatCurrency(value) }}</span>
          </template>

          <template #empty>
            <EmptyState
              title="No orders found"
              description="Orders from your live sessions will appear here."
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
            @page-change="fetchOrders"
          />
        </div>
      </Card>
    </div>
  </AppLayout>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import { formatCurrency, debounce } from '@/utils/helpers'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()
const orderStore = useOrderStore()

const loading = computed(() => orderStore.loading)
const orders = computed(() => orderStore.orders)
const pagination = computed(() => orderStore.pagination)

const filters = reactive({
  search: '',
  status: '',
  payment_status: '',
  date_from: '',
  date_to: ''
})

const columns = [
  { key: 'order_number', label: 'Order #' },
  { key: 'customer_name', label: 'Customer' },
  { key: 'total_amount', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'payment_status', label: 'Payment' },
  { key: 'created_at', label: 'Date', format: 'date' },
]

const getStatusVariant = (status) => {
  switch (status) {
    case 'delivered':
    case 'paid': return 'success'
    case 'pending': return 'warning'
    case 'shipped': return 'info'
    case 'cancelled': return 'danger'
    default: return 'default'
  }
}

const fetchOrders = async (page = 1) => {
  await orderStore.fetchOrders(page)
}

const handleSearch = debounce(() => {
  orderStore.setFilters(filters)
  fetchOrders(1)
}, 300)

const handleFilter = () => {
  orderStore.setFilters(filters)
  fetchOrders(1)
}

const resetFilters = () => {
  filters.search = ''
  filters.status = ''
  filters.payment_status = ''
  filters.date_from = ''
  filters.date_to = ''
  orderStore.clearFilters()
  fetchOrders(1)
}

const viewOrder = (order) => {
  router.push(`/seller/orders/${order.id}`)
}

onMounted(() => {
  fetchOrders()
})
</script>
