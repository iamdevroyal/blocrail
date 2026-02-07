<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Payouts</h1>
          <p class="text-gray-400 mt-1">Track your withdrawal requests</p>
        </div>
        <Button variant="primary" @click="$router.push('/seller/wallet')" class="w-full sm:w-auto justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Request New Payout
        </Button>
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
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="col-span-2 flex items-end">
            <Button variant="ghost" size="sm" class="w-full" @click="resetFilters">
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <!-- Payouts List -->
      <Card glass no-padding overflow-hidden>
        <div v-if="loading && payouts.length === 0" class="p-6">
          <Skeleton type="table" :rows="10" />
        </div>        
        <Table
          v-else
          :columns="columns"
          :data="payouts"
        >
          <template #cell-reference="{ value }">
            <span class="font-mono text-xs text-purple-400">{{ value }}</span>
          </template>
          
          <template #cell-status="{ value }">
            <Badge :variant="getStatusVariant(value)">{{ value }}</Badge>
          </template>
          
          <template #cell-amount="{ value }">
            <span class="font-semibold text-white">{{ formatCurrency(value) }}</span>
          </template>

          <template #cell-fee="{ value }">
            <span class="text-gray-400">{{ formatCurrency(value) }}</span>
          </template>

          <template #cell-net_amount="{ value }">
            <span class="font-semibold text-green-400">{{ formatCurrency(value) }}</span>
          </template>

          <template #cell-actions="{ row }">
            <Button
              v-if="row.status === 'pending'"
              variant="danger"
              size="sm"
              @click="confirmCancel(row)"
            >
              Cancel
            </Button>
          </template>

          <template #empty>
            <EmptyState
              title="No payouts yet"
              description="Your payout requests will appear here"
              icon="document"
              action-text="Request Payout"
              @action="$router.push('/seller/wallet')"
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

      <!-- Cancel Confirmation Modal -->
      <Modal :show="showCancelModal" title="Cancel Payout" @close="showCancelModal = false">
        <p class="text-gray-300">
          Are you sure you want to cancel this payout request of <strong class="text-white">{{ formatCurrency(payoutToCancel?.amount) }}</strong>?
        </p>
        <template #footer>
          <div class="flex items-center justify-end space-x-3">
            <Button variant="ghost" @click="showCancelModal = false">No, Keep It</Button>
            <Button variant="danger" :loading="cancelling" @click="cancelPayout">Yes, Cancel</Button>
          </div>
        </template>
      </Modal>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePayoutStore } from '@/stores/payouts'
import { formatCurrency } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Pagination from '@/components/common/Pagination.vue'
import Modal from '@/components/common/Modal.vue'

const router = useRouter()
const payoutStore = usePayoutStore()
const toast = useToast()

const loading = computed(() => payoutStore.loading)
const payouts = computed(() => payoutStore.payouts)
const pagination = computed(() => payoutStore.pagination)

const showCancelModal = ref(false)
const payoutToCancel = ref(null)
const cancelling = ref(false)

const filters = reactive({
  status: ''
})

const columns = [
  { key: 'reference', label: 'Reference' },
  { key: 'amount', label: 'Amount' },
  { key: 'fee', label: 'Fee' },
  { key: 'net_amount', label: 'Net Amount' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Requested', format: 'datetime' },
  { key: 'actions', label: '' },
]

const getStatusVariant = (status) => {
  switch (status) {
    case 'completed': return 'success'
    case 'pending': return 'warning'
    case 'processing': return 'info'
    case 'failed':
    case 'cancelled': return 'danger'
    default: return 'default'
  }
}

const fetchPayouts = async (page = 1) => {
  try {
    await payoutStore.fetchPayouts(page)
  } catch (error) {
    toast.error('Failed to load payouts')
  }
}

const handleFilter = () => {
  payoutStore.setFilters(filters)
  fetchPayouts(1)
}

const resetFilters = () => {
  filters.status = ''
  payoutStore.clearFilters()
  fetchPayouts(1)
}

const confirmCancel = (payout) => {
  payoutToCancel.value = payout
  showCancelModal.value = true
}

const cancelPayout = async () => {
  if (!payoutToCancel.value) return

  cancelling.value = true
  try {
    await payoutStore.cancelPayout(payoutToCancel.value.id)
    toast.success('Payout cancelled successfully')
    showCancelModal.value = false
    payoutToCancel.value = null
  } catch (error) {
    toast.error('Failed to cancel payout')
  } finally {
    cancelling.value = false
  }
}

onMounted(() => {
  fetchPayouts()
})
</script>
