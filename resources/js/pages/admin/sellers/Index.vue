<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-white">Seller Management</h1>
          <p class="text-gray-400 mt-1">Manage and monitor sellers</p>
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
              placeholder="Search sellers..."
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
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Risk Tier</label>
            <select
              v-model="filters.tier"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              @change="handleFilter"
            >
              <option value="">All Tiers</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </div>

          <div class="flex items-end">
            <Button variant="ghost" size="sm" class="w-full" @click="resetFilters">
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <!-- Sellers Table -->
      <Card title="All Sellers" glass no-padding overflow-hidden>
        <div v-if="loading && sellers.length === 0" class="p-6">
          <Skeleton type="table" :rows="10" />
        </div>
        
        <Table
          v-else
          :columns="columns"
          :data="sellers"
        >
          <template #cell-store_name="{ row }">
            <div>
              <p class="text-white font-medium">{{ row.store_name }}</p>
              <p class="text-xs text-gray-500">{{ row.email }}</p>
            </div>
          </template>

          <template #cell-tier="{ row }">
            <Badge :variant="getTierVariant(row.risk_tier)">
              Tier {{ row.risk_tier }}
            </Badge>
          </template>

          <template #cell-status="{ row }">
            <Badge :variant="getStatusVariant(row.status)">
              {{ row.status }}
            </Badge>
          </template>

          <template #cell-gmv="{ row }">
            <span class="text-white font-medium">{{ formatCurrency(row.gmv || 0) }}</span>
          </template>

          <template #cell-orders="{ row }">
            <span class="text-white">{{ row.orders_count || 0 }}</span>
          </template>

          <template #cell-actions="{ row }">
            <div class="flex items-center space-x-2">
              <button
                @click="viewSeller(row.id)"
                class="text-purple-400 hover:text-purple-300 transition"
                title="View Details"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button
                @click="openTierModal(row)"
                class="text-blue-400 hover:text-blue-300 transition"
                title="Update Tier"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                v-if="row.status === 'active'"
                @click="openStatusModal(row, 'suspended')"
                class="text-yellow-400 hover:text-yellow-300 transition"
                title="Suspend"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </button>
              <button
                v-else
                @click="openStatusModal(row, 'active')"
                class="text-green-400 hover:text-green-300 transition"
                title="Activate"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </template>

          <template #empty>
            <EmptyState
              title="No sellers found"
              description="No sellers match your current filters"
              icon="users"
            />
          </template>
        </Table>

        <div v-if="pagination.last_page > 1" class="px-6 py-4 border-t border-slate-700">
          <Pagination
            :current-page="pagination.current_page"
            :total-pages="pagination.last_page"
            :per-page="pagination.per_page"
            :total="pagination.total"
            item-name="sellers"
            @page-change="fetchSellers"
          />
        </div>
      </Card>
    </div>

    <!-- Update Tier Modal -->
    <Modal :show="showTierModal" title="Update Seller Tier" @close="showTierModal = false">
      <div class="space-y-4">
        <p class="text-gray-400 text-sm">Update risk tier for <span class="text-white font-medium">{{ selectedSeller?.store_name }}</span></p>
        
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Risk Tier</label>
            <select
              v-model="newTier"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="1">Tier 1 - Low Risk</option>
              <option value="2">Tier 2 - Medium Risk</option>
              <option value="3">Tier 3 - High Risk</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Reason for Update</label>
            <textarea
              v-model="updateReason"
              rows="3"
              placeholder="Provide a reason (min 10 characters)..."
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-end space-x-3">
          <Button variant="ghost" @click="showTierModal = false">Cancel</Button>
          <Button variant="primary" @click="handleTierUpdate" :loading="updating">
            Update Tier
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Update Status Modal -->
    <Modal :show="showStatusModal" :title="`${newStatus === 'active' ? 'Activate' : 'Suspend'} Seller`" @close="showStatusModal = false">
      <div class="space-y-4">
        <p class="text-gray-400">
          Are you sure you want to {{ newStatus === 'active' ? 'activate' : 'suspend' }} 
          <span class="text-white font-medium">{{ selectedSeller?.store_name }}</span>?
        </p>

        <div v-if="newStatus === 'suspended'">
          <label class="block text-sm font-medium text-gray-300 mb-2">Reason for Suspension</label>
          <textarea
            v-model="updateReason"
            rows="3"
            placeholder="Provide a reason (min 10 characters)..."
            class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-end space-x-3">
          <Button variant="ghost" @click="showStatusModal = false">Cancel</Button>
          <Button 
            :variant="newStatus === 'active' ? 'primary' : 'danger'" 
            @click="handleStatusUpdate" 
            :loading="updating"
          >
            {{ newStatus === 'active' ? 'Activate' : 'Suspend' }}
          </Button>
        </div>
      </template>
    </Modal>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { formatCurrency } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Table from '@/components/common/Table.vue'
import Badge from '@/components/common/Badge.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
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
  tier: '',
})

const loading = computed(() => adminStore.loading)
const sellers = computed(() => adminStore.sellers)
const pagination = computed(() => adminStore.pagination)

const showTierModal = ref(false)
const showStatusModal = ref(false)
const selectedSeller = ref(null)
const newTier = ref(1)
const newStatus = ref('')
const updateReason = ref('')
const updating = ref(false)

const columns = [
  { key: 'store_name', label: 'Store Name' },
  { key: 'tier', label: 'Risk Tier' },
  { key: 'status', label: 'Status' },
  { key: 'gmv', label: 'GMV' },
  { key: 'orders', label: 'Orders' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const getTierVariant = (tier) => {
  if (tier === 1) return 'success'
  if (tier === 2) return 'warning'
  return 'danger'
}

const getStatusVariant = (status) => {
  if (status === 'active') return 'success'
  if (status === 'suspended') return 'warning'
  return 'danger'
}

const handleSearch = () => {
  // Debounce search
  setTimeout(() => {
    fetchSellers()
  }, 300)
}

const handleFilter = () => {
  adminStore.setFilters(filters.value)
  fetchSellers()
}

const resetFilters = () => {
  search.value = ''
  filters.value = { status: '', tier: '' }
  adminStore.clearFilters()
  fetchSellers()
}

const fetchSellers = async (page = 1) => {
  try {
    await adminStore.fetchSellers(page)
  } catch (error) {
    toast.error('Failed to load sellers')
  }
}

const viewSeller = (id) => {
  router.push(`/admin/sellers/${id}`)
}

const openTierModal = (seller) => {
  selectedSeller.value = seller
  newTier.value = seller.risk_tier
  updateReason.value = ''
  showTierModal.value = true
}

const openStatusModal = (seller, status) => {
  selectedSeller.value = seller
  newStatus.value = status
  updateReason.value = ''
  showStatusModal.value = true
}

const handleTierUpdate = async () => {
  updating.value = true
  try {
    await adminStore.updateSellerTier(selectedSeller.value.id, newTier.value, updateReason.value)
    toast.success('Tier updated successfully')
    showTierModal.value = false
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update tier'
    const errors = error.response?.data?.errors
    
    if (errors) {
      Object.values(errors).flat().forEach(err => toast.error(err))
    } else {
      toast.error(message)
    }
  } finally {
    updating.value = false
  }
}

const handleStatusUpdate = async () => {
  if (newStatus.value === 'suspended' && updateReason.value.length < 10) {
    toast.warning('Reason must be at least 10 characters long')
    return
  }

  updating.value = true
  try {
    await adminStore.updateSellerStatus(selectedSeller.value.id, newStatus.value, updateReason.value)
    toast.success(`Seller ${newStatus.value === 'active' ? 'activated' : 'suspended'} successfully`)
    showStatusModal.value = false
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update status'
    const errors = error.response?.data?.errors
    
    if (errors) {
      Object.values(errors).flat().forEach(err => toast.error(err))
    } else {
      toast.error(message)
    }
  } finally {
    updating.value = false
  }
}

onMounted(() => {
  fetchSellers()
})
</script>
