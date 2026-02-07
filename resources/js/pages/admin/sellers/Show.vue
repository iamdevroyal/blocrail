<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <Button variant="ghost" @click="$router.back()">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sellers
        </Button>
        <div class="flex items-center space-x-3">
          <Badge :variant="getTierVariant(seller?.risk_tier)">
            Tier {{ seller?.risk_tier }}
          </Badge>
          <Badge :variant="getStatusVariant(seller?.status)">
            {{ seller?.status }}
          </Badge>
        </div>
      </div>

      <div v-if="loading && !seller" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <Skeleton type="card" />
          <Skeleton type="stats" />
          <Skeleton type="list" :rows="3" />
        </div>
        <div class="lg:col-span-1 space-y-6">
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      </div>

      <div v-else-if="seller" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Seller Information -->
          <Card title="Seller Information" glass>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Store Name</label>
                  <p class="text-white text-lg font-medium">{{ seller.store_name }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Store Slug</label>
                  <p class="text-purple-400 font-mono">{{ seller.store_slug }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                  <p class="text-white">{{ seller.email }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                  <p class="text-white">{{ seller.phone || 'Not provided' }}</p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</label>
                <p class="text-gray-300">{{ seller.address || 'Not provided' }}</p>
              </div>

              <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Joined</label>
                  <p class="text-white">{{ formatDate(seller.created_at) }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Last Active</label>
                  <p class="text-white">{{ formatDate(seller.last_active_at) }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Verified</label>
                  <Badge :variant="seller.email_verified_at ? 'success' : 'warning'">
                    {{ seller.email_verified_at ? 'Verified' : 'Unverified' }}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <!-- Performance Analytics -->
          <Card title="Performance Analytics" glass>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Total GMV</p>
                <p class="text-2xl font-bold text-green-400">{{ formatCurrency(seller.analytics?.gmv || 0) }}</p>
              </div>
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Total Orders</p>
                <p class="text-2xl font-bold text-purple-400">{{ seller.analytics?.total_orders || 0 }}</p>
              </div>
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Avg Order Value</p>
                <p class="text-2xl font-bold text-blue-400">{{ formatCurrency(seller.analytics?.avg_order_value || 0) }}</p>
              </div>
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Success Rate</p>
                <p class="text-2xl font-bold text-yellow-400">{{ seller.analytics?.success_rate || 0 }}%</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Active Products</p>
                <p class="text-xl font-bold text-white">{{ seller.analytics?.active_products || 0 }}</p>
              </div>
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Live Sessions</p>
                <p class="text-xl font-bold text-white">{{ seller.analytics?.live_sessions || 0 }}</p>
              </div>
              <div class="text-center p-4 bg-slate-900/50 rounded-lg">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Disputes</p>
                <p class="text-xl font-bold text-white">{{ seller.analytics?.disputes || 0 }}</p>
              </div>
            </div>
          </Card>

          <!-- Recent Orders -->
          <Card title="Recent Orders" glass>
            <div v-if="seller.recent_orders?.length > 0" class="space-y-3">
              <div
                v-for="order in seller.recent_orders"
                :key="order.id"
                class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition cursor-pointer"
                @click="viewOrder(order.id)"
              >
                <div class="flex-1">
                  <p class="text-white font-mono font-medium">{{ order.order_number }}</p>
                  <p class="text-sm text-gray-400">{{ order.buyer_name }} • {{ formatDate(order.created_at) }}</p>
                </div>
                <div class="text-right mr-4">
                  <p class="text-white font-medium">{{ formatCurrency(order.total_amount) }}</p>
                  <Badge :variant="getOrderStatusVariant(order.status)" size="sm">
                    {{ order.status }}
                  </Badge>
                </div>
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <EmptyState
              v-else
              title="No orders yet"
              description="This seller hasn't received any orders"
              icon="document"
            />
            <Button v-if="seller.recent_orders?.length > 0" variant="ghost" size="sm" class="w-full mt-4" @click="viewAllOrders">
              View All Orders
            </Button>
          </Card>

          <!-- Admin Actions -->
          <Card title="Admin Actions" glass>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p class="text-white font-medium">Update Risk Tier</p>
                  <p class="text-sm text-gray-400">Change seller's risk tier (1-3)</p>
                </div>
                <Button variant="primary" size="sm" @click="openTierModal">
                  Update Tier
                </Button>
              </div>

              <div class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p class="text-white font-medium">Update Status</p>
                  <p class="text-sm text-gray-400">Activate, suspend, or ban seller</p>
                </div>
                <Button 
                  :variant="seller.status === 'active' ? 'danger' : 'success'" 
                  size="sm" 
                  @click="openStatusModal"
                >
                  {{ seller.status === 'active' ? 'Suspend' : 'Activate' }}
                </Button>
              </div>

              <div class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p class="text-white font-medium">View Disputes</p>
                  <p class="text-sm text-gray-400">See all disputes for this seller</p>
                </div>
                <Button variant="ghost" size="sm" @click="viewDisputes">
                  View Disputes
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Wallet Summary -->
          <Card title="Wallet Summary" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Available Balance</label>
                <p class="text-white text-2xl font-bold">{{ formatCurrency(seller.wallet?.available_balance || 0) }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Pending</label>
                  <p class="text-yellow-400 font-medium">{{ formatCurrency(seller.wallet?.pending_balance || 0) }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reserve</label>
                  <p class="text-orange-400 font-medium">{{ formatCurrency(seller.wallet?.reserve_balance || 0) }}</p>
                </div>
              </div>
              <div class="pt-3 border-t border-slate-700">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Earned</label>
                <p class="text-green-400 text-lg font-bold">{{ formatCurrency(seller.wallet?.total_earned || 0) }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Withdrawn</label>
                <p class="text-gray-300 font-medium">{{ formatCurrency(seller.wallet?.total_withdrawn || 0) }}</p>
              </div>
            </div>
          </Card>

          <!-- Bank Details -->
          <Card title="Bank Details" glass>
            <div v-if="seller.bank_details" class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Bank Name</label>
                <p class="text-white">{{ seller.bank_details.bank_name }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Account Number</label>
                <p class="text-white font-mono">{{ seller.bank_details.account_number }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Account Name</label>
                <p class="text-white">{{ seller.bank_details.account_name }}</p>
              </div>
              <div v-if="seller.bank_details.bvn">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">BVN</label>
                <p class="text-white font-mono">{{ seller.bank_details.bvn }}</p>
              </div>
            </div>
            <EmptyState
              v-else
              title="No bank details"
              description="Seller hasn't added bank details"
              icon="document"
            />
          </Card>

          <!-- Risk Assessment -->
          <Card title="Risk Assessment" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Current Tier</label>
                <Badge :variant="getTierVariant(seller.risk_tier)" size="lg">
                  Tier {{ seller.risk_tier }}
                </Badge>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Dispute Rate</label>
                <p class="text-white">{{ seller.risk_metrics?.dispute_rate || 0 }}%</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Refund Rate</label>
                <p class="text-white">{{ seller.risk_metrics?.refund_rate || 0 }}%</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Avg Response Time</label>
                <p class="text-white">{{ seller.risk_metrics?.avg_response_time || 'N/A' }}</p>
              </div>
            </div>
          </Card>

          <!-- Activity Log -->
          <Card title="Recent Activity" glass>
            <div class="space-y-3">
              <div
                v-for="(activity, index) in seller.recent_activity"
                :key="index"
                class="flex items-start space-x-3 pb-3 border-b border-slate-700 last:border-0 last:pb-0"
              >
                <div class="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div class="flex-1">
                  <p class="text-white text-sm">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.created_at) }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <!-- Update Tier Modal -->
      <Modal :show="showTierModal" title="Update Seller Tier" @close="showTierModal = false">
        <div class="space-y-4">
          <p class="text-gray-400 text-sm">Update risk tier for <span class="text-white font-medium">{{ seller?.store_name }}</span></p>
          
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
            <span class="text-white font-medium">{{ seller?.store_name }}</span>?
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
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import Loading from '@/components/common/Loading.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Skeleton from '@/components/common/Skeleton.vue'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const sellerId = route.params.id
const loading = ref(false)
const seller = ref(null)
const showTierModal = ref(false)
const showStatusModal = ref(false)
const newTier = ref(1)
const newStatus = ref('')
const updateReason = ref('')
const updating = ref(false)

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

const getOrderStatusVariant = (status) => {
  if (status === 'delivered') return 'success'
  if (status === 'confirmed') return 'info'
  if (status === 'pending') return 'warning'
  return 'danger'
}

const openTierModal = () => {
  newTier.value = seller.value.risk_tier
  updateReason.value = ''
  showTierModal.value = true
}

const openStatusModal = () => {
  newStatus.value = seller.value.status === 'active' ? 'suspended' : 'active'
  updateReason.value = ''
  showStatusModal.value = true
}

const handleTierUpdate = async () => {
  if (updateReason.value.length < 10) {
    toast.warning('Reason must be at least 10 characters long')
    return
  }

  updating.value = true
  try {
    await adminStore.updateSellerTier(sellerId, newTier.value, updateReason.value)
    seller.value.risk_tier = newTier.value
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
    await adminStore.updateSellerStatus(sellerId, newStatus.value, updateReason.value)
    seller.value.status = newStatus.value
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

const viewOrder = (orderId) => {
  router.push(`/admin/orders/${orderId}`)
}

const viewAllOrders = () => {
  router.push(`/admin/orders?seller_id=${sellerId}`)
}

const viewDisputes = () => {
  router.push(`/admin/disputes?seller_id=${sellerId}`)
}

const fetchSeller = async () => {
  loading.value = true
  try {
    const data = await adminStore.getSeller(sellerId)
    seller.value = data
  } catch (error) {
    toast.error('Failed to load seller')
    router.push('/admin/sellers')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSeller()
})
</script>
