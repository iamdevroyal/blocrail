<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <Button variant="ghost" @click="$router.back()">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
        </div>
        <Badge :variant="getStatusVariant(dispute?.status)">
          {{ dispute?.status?.replace('_', ' ') }}
        </Badge>
      </div>

      <Loading v-if="loading && !dispute" text="Loading dispute..." class="py-20" />

      <div v-else-if="dispute" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Dispute Info -->
          <Card title="Dispute Information" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reason</label>
                <p class="text-white">{{ dispute.reason }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</label>
                <p class="text-gray-300">{{ dispute.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Filed</label>
                  <p class="text-white">{{ formatDate(dispute.created_at) }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Last Updated</label>
                  <p class="text-white">{{ formatDate(dispute.updated_at) }}</p>
                </div>
              </div>
            </div>
          </Card>

          <!-- Evidence -->
          <Card title="Evidence" glass>
            <div v-if="dispute.evidence?.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <a
                v-for="(file, index) in dispute.evidence"
                :key="index"
                :href="file.url"
                target="_blank"
                class="aspect-square bg-slate-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition"
              >
                <img
                  v-if="file.type === 'image'"
                  :src="file.url"
                  :alt="`Evidence ${index + 1}`"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex flex-col items-center justify-center">
                  <svg class="w-12 h-12 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p class="text-xs text-gray-500">{{ file.name }}</p>
                </div>
              </a>
            </div>
            <EmptyState
              v-else
              title="No evidence"
              description="No evidence has been uploaded for this dispute"
              icon="document"
            />
          </Card>

          <!-- Resolution (if resolved) -->
          <Card v-if="dispute.status === 'resolved' || dispute.status === 'rejected'" title="Resolution" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Outcome</label>
                <Badge :variant="dispute.outcome === 'buyer' ? 'success' : 'danger'" size="lg">
                  {{ dispute.outcome === 'buyer' ? 'Buyer Favor' : 'Seller Favor' }}
                </Badge>
              </div>

              <div v-if="dispute.admin_notes">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Admin Notes</label>
                <p class="text-gray-300">{{ dispute.admin_notes }}</p>
              </div>

              <div v-if="dispute.refund_amount">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Refund Amount</label>
                <p class="text-white text-lg font-bold">{{ formatCurrency(dispute.refund_amount) }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Resolved At</label>
                <p class="text-white">{{ formatDate(dispute.resolved_at) }}</p>
              </div>
            </div>
          </Card>

          <!-- Resolution Form (if pending) -->
          <Card v-else-if="dispute.status === 'open' || dispute.status === 'under_review'" title="Resolve Dispute" glass>
            <form @submit.prevent="handleResolve" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Outcome *</label>
                <select
                  v-model="resolutionForm.outcome"
                  required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Outcome</option>
                  <option value="buyer">Buyer Favor (Refund)</option>
                  <option value="seller">Seller Favor (No Refund)</option>
                </select>
              </div>

              <div v-if="resolutionForm.outcome === 'buyer'">
                <label class="block text-sm font-medium text-gray-300 mb-2">Refund Amount *</label>
                <input
                  v-model.number="resolutionForm.refund_amount"
                  type="number"
                  required
                  :max="dispute.order_amount"
                  placeholder="Enter refund amount"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">Maximum: {{ formatCurrency(dispute.order_amount) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Admin Notes *</label>
                <textarea
                  v-model="resolutionForm.admin_notes"
                  required
                  rows="4"
                  placeholder="Explain the resolution decision..."
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-700">
                <Button variant="ghost" @click="$router.back()">Cancel</Button>
                <Button variant="primary" type="submit" :loading="resolving">
                  Resolve Dispute
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Order Info -->
          <Card title="Order Information" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Number</label>
                <p class="text-white font-mono">{{ dispute.order_number }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Amount</label>
                <p class="text-white text-lg font-bold">{{ formatCurrency(dispute.order_amount) }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Payment Status</label>
                <Badge variant="success">Paid</Badge>
              </div>

              <Button variant="ghost" size="sm" class="w-full mt-4" @click="viewOrder">
                View Full Order
              </Button>
            </div>
          </Card>

          <!-- Buyer Info -->
          <Card title="Buyer Information" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</label>
                <p class="text-white">{{ dispute.buyer_name }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p class="text-white">{{ dispute.buyer_phone }}</p>
              </div>

              <div v-if="dispute.buyer_email">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p class="text-white text-sm">{{ dispute.buyer_email }}</p>
              </div>
            </div>
          </Card>

          <!-- Seller Info -->
          <Card title="Seller Information" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Store Name</label>
                <p class="text-white">{{ dispute.seller_name }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p class="text-white text-sm">{{ dispute.seller_email }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Risk Tier</label>
                <Badge :variant="getTierVariant(dispute.seller_tier)">
                  Tier {{ dispute.seller_tier }}
                </Badge>
              </div>

              <Button variant="ghost" size="sm" class="w-full mt-4" @click="viewSeller">
                View Seller Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisputeStore } from '@/stores/disputes'
import { useAdminStore } from '@/stores/admin'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import Button from '@/components/common/Button.vue'
import Loading from '@/components/common/Loading.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const disputeId = route.params.id
const loading = computed(() => adminStore.loading)
const dispute = computed(() => adminStore.currentDispute)
const resolving = ref(false)

const resolutionForm = reactive({
  outcome: '',
  refund_amount: 0,
  admin_notes: '',
})

const getStatusVariant = (status) => {
  if (status === 'open') return 'warning'
  if (status === 'under_review') return 'info'
  if (status === 'resolved') return 'success'
  return 'danger'
}

const getTierVariant = (tier) => {
  if (tier === 1) return 'success'
  if (tier === 2) return 'warning'
  return 'danger'
}

const handleResolve = async () => {
  if (!resolutionForm.outcome || !resolutionForm.admin_notes) {
    toast.warning('Please fill in all required fields')
    return
  }

  if (resolutionForm.outcome === 'buyer' && !resolutionForm.refund_amount) {
    toast.warning('Please enter refund amount')
    return
  }

  resolving.value = true
  try {
    await adminStore.resolveDispute(disputeId, resolutionForm)
    toast.success('Dispute resolved successfully')
    router.push('/admin/disputes')
  } catch (error) {
    toast.error('Failed to resolve dispute')
  } finally {
    resolving.value = false
  }
}

const viewOrder = () => {
  router.push(`/admin/orders/${dispute.value.order_id}`)
}

const viewSeller = () => {
  router.push(`/admin/sellers/${dispute.value.seller_id}`)
}

onMounted(async () => {
  try {
    await adminStore.getDispute(disputeId)
    
    // Pre-fill refund amount with order amount
    if (dispute.value) {
      resolutionForm.refund_amount = dispute.value.order_amount
    }
  } catch (error) {
    toast.error('Failed to load dispute')
  }
})
</script>
