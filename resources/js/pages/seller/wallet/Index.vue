<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Wallet & Escrow</h1>
          <p class="text-gray-400 mt-1">Manage your earnings and withdrawals</p>
        </div>
        <Button variant="primary" @click="showPayoutModal = true" :disabled="balance.available < 5000" class="w-full sm:w-auto justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Request Payout
        </Button>
      </div>

      <!-- Balance Cards -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Skeleton type="stats" v-for="i in 5" :key="i" />
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card glass class="text-center">
          <p class="text-gray-400 text-sm mb-1">Available Balance</p>
          <p class="text-2xl font-bold text-green-400">{{ formatCurrency(balance.available) }}</p>
          <p class="text-xs text-gray-500 mt-1">Ready to withdraw</p>
        </Card>

        <Card glass class="text-center">
          <p class="text-gray-400 text-sm mb-1">Pending</p>
          <p class="text-2xl font-bold text-yellow-400">{{ formatCurrency(balance.pending) }}</p>
          <p class="text-xs text-gray-500 mt-1">In escrow</p>
        </Card>

        <Card glass class="text-center">
          <p class="text-gray-400 text-sm mb-1">Reserve</p>
          <p class="text-2xl font-bold text-purple-400">{{ formatCurrency(balance.reserve) }}</p>
          <p class="text-xs text-gray-500 mt-1">Held for disputes</p>
        </Card>

        <Card glass class="text-center">
          <p class="text-gray-400 text-sm mb-1">Total Earned</p>
          <p class="text-2xl font-bold text-white">{{ formatCurrency(balance.total_earned) }}</p>
          <p class="text-xs text-gray-500 mt-1">All time</p>
        </Card>

        <Card glass class="text-center">
          <p class="text-gray-400 text-sm mb-1">Total Withdrawn</p>
          <p class="text-2xl font-bold text-gray-400">{{ formatCurrency(balance.total_withdrawn) }}</p>
          <p class="text-xs text-gray-500 mt-1">All time</p>
        </Card>
      </div>

      <!-- Filters -->
      <Card glass>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Type</label>
            <select
              v-model="filters.type"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            >
              <option value="">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="hold">Hold</option>
              <option value="release">Release</option>
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

      <!-- Transaction History -->
      <Card title="Transaction History" glass no-padding overflow-hidden>
        <div v-if="loading && transactions.length === 0" class="p-6">
          <Skeleton type="table" :rows="10" />
        </div>
        
        <Table
          v-else
          :columns="columns"
          :data="transactions"
        >
          <template #cell-type="{ value }">
            <Badge :variant="getTypeVariant(value)">{{ value }}</Badge>
          </template>
          
          <template #cell-amount="{ row }">
            <span
              class="font-semibold"
              :class="row.type === 'credit' || row.type === 'release' ? 'text-green-400' : 'text-red-400'"
            >
              {{ row.type === 'credit' || row.type === 'release' ? '+' : '-' }}{{ formatCurrency(row.amount) }}
            </span>
          </template>

          <template #cell-balance_after="{ value }">
            <span class="text-white font-medium">{{ formatCurrency(value) }}</span>
          </template>

          <template #empty>
            <EmptyState
              title="No transactions yet"
              description="Your transaction history will appear here"
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
            item-name="transactions"
            @page-change="fetchTransactions"
          />
        </div>
      </Card>

      <!-- Payout Request Modal -->
      <Modal :show="showPayoutModal" title="Request Payout" @close="showPayoutModal = false">
        <form @submit.prevent="handlePayoutRequest" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Amount *</label>
            <input
              v-model.number="payoutForm.amount"
              type="number"
              min="5000"
              :max="balance.available"
              step="100"
              required
              placeholder="Enter amount (min ₦5,000)"
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p class="text-xs text-gray-400 mt-1">Available: {{ formatCurrency(balance.available) }}</p>
          </div>

          <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Amount</span>
              <span class="text-white">{{ formatCurrency(payoutForm.amount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Fee (2.5%)</span>
              <span class="text-white">{{ formatCurrency(payoutFee) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-2 border-t border-slate-700">
              <span class="text-white">You'll Receive</span>
              <span class="text-green-400">{{ formatCurrency(netAmount) }}</span>
            </div>
          </div>

          <div v-if="!bankDetails" class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p class="text-yellow-400 text-sm flex items-start">
              <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Please add your bank details before requesting a payout.
            </p>
          </div>
        </form>

        <template #footer>
          <div class="flex items-center justify-end space-x-3">
            <Button variant="ghost" @click="showPayoutModal = false">Cancel</Button>
            <Button
              variant="primary"
              :loading="requesting"
              :disabled="!bankDetails || payoutForm.amount < 5000 || payoutForm.amount > balance.available"
              @click="handlePayoutRequest"
            >
              Request Payout
            </Button>
          </div>
        </template>
      </Modal>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useWalletStore } from '@/stores/wallet'
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

const walletStore = useWalletStore()
const toast = useToast()

const loading = computed(() => walletStore.loading)
const balance = computed(() => walletStore.balance)
const transactions = computed(() => walletStore.transactions)
const pagination = computed(() => walletStore.pagination)
const bankDetails = computed(() => walletStore.bankDetails)

const showPayoutModal = ref(false)
const requesting = ref(false)

const filters = reactive({
  type: '',
  date_from: '',
  date_to: ''
})

const payoutForm = reactive({
  amount: 5000
})

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount' },
  { key: 'balance_after', label: 'Balance' },
  { key: 'created_at', label: 'Date', format: 'datetime' },
]

const payoutFee = computed(() => {
  return payoutForm.amount * 0.025 // 2.5% fee
})

const netAmount = computed(() => {
  return payoutForm.amount - payoutFee.value
})

const getTypeVariant = (type) => {
  switch (type) {
    case 'credit': return 'success'
    case 'release': return 'success'
    case 'debit': return 'danger'
    case 'hold': return 'warning'
    default: return 'default'
  }
}

const fetchTransactions = async (page = 1) => {
  try {
    await walletStore.fetchTransactions(page)
  } catch (error) {
    toast.error('Failed to load transactions')
  }
}

const handleFilter = () => {
  walletStore.setFilters(filters)
  fetchTransactions(1)
}

const resetFilters = () => {
  filters.type = ''
  filters.date_from = ''
  filters.date_to = ''
  walletStore.clearFilters()
  fetchTransactions(1)
}

const handlePayoutRequest = async () => {
  if (!bankDetails.value) {
    toast.warning('Please add your bank details first')
    return
  }

  if (payoutForm.amount < 5000) {
    toast.warning('Minimum payout amount is ₦5,000')
    return
  }

  if (payoutForm.amount > balance.value.available) {
    toast.warning('Insufficient balance')
    return
  }

  requesting.value = true
  try {
    await walletStore.requestPayout(payoutForm.amount)
    toast.success('Payout request submitted successfully!')
    showPayoutModal.value = false
    payoutForm.amount = 5000
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to request payout')
  } finally {
    requesting.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    walletStore.fetchBalance(),
    walletStore.fetchTransactions(),
    walletStore.fetchBankDetails().catch(() => {}) // Don't fail if no bank details
  ])
})
</script>
