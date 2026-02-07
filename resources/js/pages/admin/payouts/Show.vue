<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <Button variant="ghost" @click="$router.back()">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Badge :variant="getStatusVariant(payout?.status)">
          {{ payout?.status }}
        </Badge>
      </div>

      <Loading v-if="loading && !payout" text="Loading payout..." class="py-20" />

      <div v-else-if="payout" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Payout Details -->
          <Card title="Payout Information" glass>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reference</label>
                  <p class="text-white font-mono">{{ payout.reference }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Request Date</label>
                  <p class="text-white">{{ formatDate(payout.created_at) }}</p>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Amount</label>
                  <p class="text-white text-lg font-bold">{{ formatCurrency(payout.amount) }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Fee (2.5%)</label>
                  <p class="text-red-400 text-lg font-bold">-{{ formatCurrency(payout.fee) }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Net Amount</label>
                  <p class="text-green-400 text-lg font-bold">{{ formatCurrency(payout.net_amount) }}</p>
                </div>
              </div>

              <div v-if="payout.transfer_reference" class="pt-4 border-t border-slate-700">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Transfer Reference</label>
                <p class="text-white font-mono">{{ payout.transfer_reference }}</p>
              </div>

              <div v-if="payout.completed_at" class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Completed At</label>
                  <p class="text-white">{{ formatDate(payout.completed_at) }}</p>
                </div>
                <div v-if="payout.processed_by">
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Processed By</label>
                  <p class="text-white">{{ payout.processed_by }}</p>
                </div>
              </div>

              <div v-if="payout.notes" class="pt-4 border-t border-slate-700">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Notes</label>
                <p class="text-gray-300">{{ payout.notes }}</p>
              </div>
            </div>
          </Card>

          <!-- Bank Details -->
          <Card title="Bank Account Details" glass>
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Bank Name</label>
                  <p class="text-white">{{ payout.bank_name }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Account Number</label>
                  <p class="text-white font-mono">{{ payout.account_number }}</p>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Account Name</label>
                <p class="text-white">{{ payout.account_name }}</p>
              </div>
            </div>
          </Card>

          <!-- Payout Timeline -->
          <Card title="Payout Timeline" glass>
            <div class="space-y-4">
              <div
                v-for="(event, index) in payout.timeline"
                :key="index"
                class="flex items-start space-x-3"
              >
                <div class="flex flex-col items-center">
                  <div class="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                  <div v-if="index < payout.timeline.length - 1" class="w-0.5 h-full bg-slate-700 mt-1"></div>
                </div>
                <div class="flex-1 pb-4">
                  <p class="text-white font-medium">{{ event.title }}</p>
                  <p class="text-sm text-gray-400">{{ event.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(event.created_at) }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Seller Info -->
          <Card title="Seller Information" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Store Name</label>
                <p class="text-white">{{ payout.seller_name }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p class="text-white text-sm">{{ payout.seller_email }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p class="text-white">{{ payout.seller_phone }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Risk Tier</label>
                <Badge :variant="getTierVariant(payout.seller_tier)">
                  Tier {{ payout.seller_tier }}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" class="w-full mt-4" @click="viewSeller">
                View Seller Profile
              </Button>
            </div>
          </Card>

          <!-- Wallet Balance -->
          <Card title="Wallet Balance" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Available Balance</label>
                <p class="text-white text-lg font-bold">{{ formatCurrency(payout.wallet_balance) }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Earned</label>
                <p class="text-gray-300">{{ formatCurrency(payout.total_earned) }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Withdrawn</label>
                <p class="text-gray-300">{{ formatCurrency(payout.total_withdrawn) }}</p>
              </div>
            </div>
          </Card>

          <!-- Security Notice -->
          <Card glass>
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-white text-sm font-medium mb-1">Security Notice</p>
                <p class="text-gray-400 text-xs">All bank details are encrypted and securely stored. Verify account details before processing payouts.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import Button from '@/components/common/Button.vue'
import Loading from '@/components/common/Loading.vue'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const payoutId = route.params.id
const loading = computed(() => adminStore.loading)
const payout = computed(() => adminStore.currentPayout)
const getStatusVariant = (status) => {
  if (status === 'completed') return 'success'
  if (status === 'processing') return 'info'
  if (status === 'pending') return 'warning'
  return 'danger'
}

const getTierVariant = (tier) => {
  if (tier === 1) return 'success'
  if (tier === 2) return 'warning'
  return 'danger'
}

const viewSeller = () => {
  router.push(`/admin/sellers/${payout.value.seller_id}`)
}

onMounted(async () => {
  try {
    await adminStore.getPayout(payoutId)
  } catch (error) {
    toast.error('Failed to load payout')
  }
})
</script>
