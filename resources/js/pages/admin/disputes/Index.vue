<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-white">Dispute Resolution</h1>
          <p class="text-gray-400 mt-1">Review and resolve customer disputes</p>
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
              <option value="open">Open</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Search</label>
            <input
              v-model="search"
              type="text"
              placeholder="Order number or dispute ID..."
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

      <!-- Disputes List -->
      <div class="grid grid-cols-1 gap-4">
        <div v-if="loading && disputes.length === 0" class="space-y-4">
          <Skeleton type="card" v-for="i in 5" :key="i" />
        </div>

        <Card
          v-for="dispute in disputes"
          :key="dispute.id"
          glass
          class="hover:border-purple-500 transition cursor-pointer"
          @click="viewDispute(dispute.id)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-white">Dispute #{{ dispute.id }}</h3>
                <Badge :variant="getStatusVariant(dispute.status)">
                  {{ dispute.status?.replace('_', ' ') }}
                </Badge>
                <Badge variant="ghost">
                  {{ dispute.reason }}
                </Badge>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p class="text-xs text-gray-500 mb-1">Order</p>
                  <p class="text-white font-medium">#{{ dispute.order_number }}</p>
                  <p class="text-sm text-gray-400">{{ formatCurrency(dispute.order_amount) }}</p>
                </div>

                <div>
                  <p class="text-xs text-gray-500 mb-1">Buyer</p>
                  <p class="text-white font-medium">{{ dispute.buyer_name }}</p>
                  <p class="text-sm text-gray-400">{{ dispute.buyer_phone }}</p>
                </div>

                <div>
                  <p class="text-xs text-gray-500 mb-1">Seller</p>
                  <p class="text-white font-medium">{{ dispute.seller_name }}</p>
                  <p class="text-sm text-gray-400">{{ dispute.seller_email }}</p>
                </div>
              </div>

              <p class="text-gray-400 text-sm mt-3">{{ dispute.description }}</p>

              <div class="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                <span>Filed {{ formatDate(dispute.created_at) }}</span>
                <span v-if="dispute.evidence_count">{{ dispute.evidence_count }} evidence files</span>
              </div>
            </div>

            <svg class="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Card>

        <EmptyState
          v-if="!loading && disputes.length === 0"
          title="No disputes found"
          description="No disputes match your current filters"
          icon="document"
        />
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1">
        <Pagination
          :current-page="pagination.current_page"
          :total-pages="pagination.last_page"
          :per-page="pagination.per_page"
          :total="pagination.total"
          item-name="disputes"
          @page-change="fetchDisputes"
        />
      </div>
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
const disputes = computed(() => adminStore.disputes)
const pagination = computed(() => adminStore.pagination)
const getStatusVariant = (status) => {
  if (status === 'open') return 'warning'
  if (status === 'under_review') return 'info'
  if (status === 'resolved') return 'success'
  return 'danger'
}

const handleSearch = () => {
  setTimeout(() => {
    fetchDisputes()
  }, 300)
}

const handleFilter = () => {
  adminStore.setFilters(filters.value)
  fetchDisputes()
}

const resetFilters = () => {
  search.value = ''
  filters.value = { status: '' }
  adminStore.clearFilters()
  fetchDisputes()
}

const fetchDisputes = async (page = 1) => {
  try {
    await adminStore.fetchDisputes(page)
  } catch (error) {
    toast.error('Failed to load disputes')
  }
}

const viewDispute = (id) => {
  router.push(`/admin/disputes/${id}`)
}

onMounted(() => {
  fetchDisputes()
})
</script>
