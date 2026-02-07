<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Dashboard</h1>
          <p class="text-gray-400 mt-1">Welcome back, {{ user?.name }}!</p>
        </div>
        <Badge :variant="tierVariant" class="w-fit">{{ tierLabel }}</Badge>
      </div>

      <!-- Skeleton Loader -->
      <div v-if="loading" class="space-y-6">
        <Skeleton type="stats" />
        <Skeleton type="table" :rows="5" />
        <Skeleton type="card" />
      </div>

      <!-- Stats Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <!-- GMV -->
        <Card glass hover>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Total GMV</p>
              <p class="text-2xl font-bold text-white mt-1">{{ formatCurrency(stats.gmv || 0) }}</p>
            </div>
            <div class="p-3 bg-purple-500/20 rounded-lg">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <!-- Total Orders -->
        <Card glass hover>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Total Orders</p>
              <p class="text-2xl font-bold text-white mt-1">{{ stats.total_orders || 0 }}</p>
            </div>
            <div class="p-3 bg-blue-500/20 rounded-lg">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </Card>

        <!-- Total Products -->
        <Card glass hover>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Total Products</p>
              <p class="text-2xl font-bold text-white mt-1">{{ stats.total_products || 0 }}</p>
            </div>
            <div class="p-3 bg-indigo-500/20 rounded-lg">
              <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </Card>

        <!-- Pending Payouts -->
        <Card glass hover>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Pending Payouts</p>
              <p class="text-2xl font-bold text-white mt-1">{{ formatCurrency(stats.pending_payouts || 0) }}</p>
            </div>
            <div class="p-3 bg-green-500/20 rounded-lg">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <!-- Active Disputes -->
        <Card glass hover>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Active Disputes</p>
              <p class="text-2xl font-bold text-white mt-1">{{ stats.dispute_count || 0 }}</p>
            </div>
            <div class="p-3 bg-red-500/20 rounded-lg">
              <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <!-- Recent Orders -->
      <Card title="Recent Orders" glass>
        <div v-if="recentOrders.length === 0" class="text-center py-12">
          <p class="text-gray-400">No recent orders</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-700">
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th class="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id" class="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                <td class="py-3 px-4 text-white font-mono text-sm">{{ order.order_number }}</td>
                <td class="py-3 px-4 text-white">{{ order.customer_name }}</td>
                <td class="py-3 px-4 text-white">{{ formatCurrency(order.total_amount) }}</td>
                <td class="py-3 px-4">
                  <Badge :variant="getStatusVariant(order.status)">{{ order.status }}</Badge>
                </td>
                <td class="py-3 px-4 text-gray-400">{{ formatDate(order.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glass hover class="cursor-pointer" @click="$router.push('/seller/products/create')">
          <div class="text-center py-6">
            <div class="inline-flex p-4 bg-purple-500/20 rounded-full mb-4">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">Add Product</h3>
            <p class="text-gray-400 text-sm mt-1">Create a new product</p>
          </div>
        </Card>

        <Card glass hover class="cursor-pointer" @click="$router.push('/seller/sessions/create')">
          <div class="text-center py-6">
            <div class="inline-flex p-4 bg-blue-500/20 rounded-full mb-4">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">Start Live Session</h3>
            <p class="text-gray-400 text-sm mt-1">Create a new live session</p>
          </div>
        </Card>

        <Card glass hover class="cursor-pointer" @click="$router.push('/seller/payouts')">
          <div class="text-center py-6">
            <div class="inline-flex p-4 bg-green-500/20 rounded-full mb-4">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">Request Payout</h3>
            <p class="text-gray-400 text-sm mt-1">Withdraw your earnings</p>
          </div>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSellerStore } from '@/stores/seller'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { SELLER_TIER_LABELS } from '@/utils/constants'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const sellerStore = useSellerStore()
const toast = useToast()

const user = computed(() => authStore.user)
const stats = computed(() => sellerStore.stats)
const recentOrders = computed(() => sellerStore.recentOrders)
const loading = computed(() => sellerStore.loading)

const tierLabel = computed(() => SELLER_TIER_LABELS[sellerStore.tier] || 'New Seller')
const tierVariant = computed(() => {
  const tier = sellerStore.tier
  if (tier === 'tier3') return 'success'
  if (tier === 'tier2') return 'primary'
  return 'default'
})

const getStatusVariant = (status) => {
  const variants = {
    paid: 'success',
    pending: 'warning',
    delivered: 'info',
    cancelled: 'danger',
  }
  return variants[status] || 'default'
}

onMounted(async () => {
  try {
    await sellerStore.fetchDashboard()
  } catch (error) {
    toast.error('Failed to load dashboard')
  }
})
</script>
