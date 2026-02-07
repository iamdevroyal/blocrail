<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Disputes</h1>
          <p class="text-gray-400 mt-1">Manage order disputes and resolutions</p>
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
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div class="col-span-2 flex items-end">
            <Button variant="ghost" size="sm" class="w-full" @click="resetFilters">
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <!-- Disputes List -->
      <div v-if="loading && disputes.length === 0" class="space-y-4">
        <Skeleton type="card" v-for="i in 5" :key="i" />
      </div>

      <div v-else-if="disputes.length > 0" class="grid grid-cols-1 gap-4">
        <Card
          v-for="dispute in disputes"
          :key="dispute.id"
          glass
          hover
          class="cursor-pointer"
          @click="viewDispute(dispute.id)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-white">Dispute #{{ dispute.id }}</h3>
                <Badge :variant="getStatusVariant(dispute.status)">{{ dispute.status }}</Badge>
              </div>
              <p class="text-gray-400 text-sm mb-3">{{ dispute.reason }}</p>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Order:</span>
                  <span class="text-white ml-2 font-mono">#{{ dispute.order_number }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Amount:</span>
                  <span class="text-white ml-2 font-semibold">{{ formatCurrency(dispute.amount) }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Filed by:</span>
                  <span class="text-white ml-2">{{ dispute.buyer_name }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Filed:</span>
                  <span class="text-white ml-2">{{ formatDate(dispute.created_at) }}</span>
                </div>
              </div>
            </div>
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Card>
      </div>

      <Card v-else glass>
        <EmptyState
          title="No disputes"
          description="You have no active disputes. Great job!"
          icon="document"
        />
      </Card>

      <!-- Pagination -->
      <Pagination
        v-if="pagination.last_page > 1"
        :current-page="pagination.current_page"
        :total-pages="pagination.last_page"
        :per-page="pagination.per_page"
        :total="pagination.total"
        item-name="disputes"
        @page-change="fetchDisputes"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDisputeStore } from '@/stores/disputes'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()
const disputeStore = useDisputeStore()
const toast = useToast()

const loading = computed(() => disputeStore.loading)
const disputes = computed(() => disputeStore.disputes)
const pagination = computed(() => disputeStore.pagination)

const filters = reactive({
  status: ''
})

const getStatusVariant = (status) => {
  switch (status) {
    case 'resolved': return 'success'
    case 'open': return 'warning'
    case 'under_review': return 'info'
    case 'rejected': return 'danger'
    default: return 'default'
  }
}

const fetchDisputes = async (page = 1) => {
  try {
    await disputeStore.fetchDisputes(page)
  } catch (error) {
    toast.error('Failed to load disputes')
  }
}

const handleFilter = () => {
  disputeStore.setFilters(filters)
  fetchDisputes(1)
}

const resetFilters = () => {
  filters.status = ''
  disputeStore.clearFilters()
  fetchDisputes(1)
}

const viewDispute = (id) => {
  router.push(`/seller/disputes/${id}`)
}

onMounted(() => {
  fetchDisputes()
})
</script>
