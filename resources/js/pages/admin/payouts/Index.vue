<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-white">Payout Oversight</h1>
          <p class="text-gray-400 mt-1">Monitor and manage seller payouts</p>
        </div>
      </div>

      <!-- Filters -->
      <Card glass>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Search Seller</label>
            <input
              v-model="search"
              type="text"
              placeholder="Seller name or email..."
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @input="handleSearch"
            />
          </div>

          <div class="flex items-end">
            <Button variant="ghost" size="sm" class="w-full" @click="resetFilters">
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <!-- Payouts Table -->
      <Card title="All Payouts" glass no-padding overflow-hidden>
        <div v-if="loading && payouts.length === 0" class="p-6">
          <Skeleton type="table" :rows="10" />
        </div>
        
        <Table
          v-else
          :columns="columns"
          :data="payouts"
        >
          <template #cell-reference="{ row }">
            <div>
              <p class="text-white font-mono font-medium">{{ row.reference }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(row.created_at) }}</p>
            </div>
          </template>

          <template #cell-seller="{ row }">
            <div>
              <p class="text-white font-medium">{{ row.seller_name }}</p>
              <p class="text-xs text-gray-500">{{ row.seller_email }}</p>
            </div>
          </template>

          <template #cell-amount="{ row }">
            <div>
              <p class="text-white font-medium">{{ formatCurrency(row.amount) }}</p>
              <p class="text-xs text-gray-500">Fee: {{ formatCurrency(row.fee) }}</p>
            </div>
          </template>

          <template #cell-net_amount="{ row }">
            <span class="text-green-400 font-bold">{{ formatCurrency(row.net_amount) }}</span>
          </template>

          <template #cell-status="{ row }">
            <Badge :variant="getStatusVariant(row.status)">
              {{ row.status }}
            </Badge>
          </template>

          <template #cell-actions="{ row }">
            <button
              @click="viewPayout(row.id)"
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
              title="No payouts found"
              description="No payouts match your current filters"
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
            item-name="payouts"
            @page-change="fetchPayouts"
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
})

const loading = computed(() => adminStore.loading)
const payouts = computed(() => adminStore.payouts)
const pagination = computed(() => adminStore.pagination)

const columns = [
  { key: 'reference', label: 'Reference' },
  { key: 'seller', label: 'Seller' },
  { key: 'amount', label: 'Amount' },
  { key: 'net_amount', label: 'Net Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const getStatusVariant = (status) => {
  if (status === 'completed') return 'success'
  if (status === 'processing') return 'info'
  if (status === 'pending') return 'warning'
  return 'danger'
}

const handleSearch = () => {
  setTimeout(() => {
    fetchPayouts()
  }, 300)
}

const handleFilter = () => {
  adminStore.setFilters(filters.value)
  fetchPayouts()
}

const resetFilters = () => {
  search.value = ''
  filters.value = { status: '' }
  adminStore.clearFilters()
  fetchPayouts()
}

const fetchPayouts = async (page = 1) => {
  try {
    await adminStore.fetchPayouts(page)
  } catch (error) {
    toast.error('Failed to load payouts')
  }
}

const viewPayout = (id) => {
  router.push(`/admin/payouts/${id}`)
}

onMounted(() => {
  fetchPayouts()
})
</script>
