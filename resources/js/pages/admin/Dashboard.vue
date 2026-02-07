<template>
  <AppLayout>
    <div v-if="loading" class="space-y-6">
      <Skeleton type="header" />
      <Skeleton type="stats" />
      <Skeleton type="card" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton type="card" />
        <Skeleton type="card" />
      </div>
      <Skeleton type="list" :rows="5" />
    </div>

    <div v-else class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
        <p class="text-gray-400 mt-1">Platform overview and analytics</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glass class="text-center">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">Platform GMV</span>
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-3xl font-bold text-white">{{ formatCurrency(dashboard.gmv) }}</p>
          <p class="text-xs text-gray-500 mt-1">Total value</p>
        </Card>

        <Card glass class="text-center">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">Total Orders</span>
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p class="text-3xl font-bold text-white">{{ dashboard.total_orders?.toLocaleString() }}</p>
          <p class="text-xs text-gray-500 mt-1">All time</p>
        </Card>

        <Card glass class="text-center">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">Active Sellers</span>
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p class="text-3xl font-bold text-white">{{ dashboard.active_sellers }}</p>
          <p class="text-xs text-gray-500 mt-1">Currently active</p>
        </Card>

        <Card glass class="text-center">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">Pending Disputes</span>
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p class="text-3xl font-bold text-white">{{ dashboard.pending_disputes }}</p>
          <p class="text-xs text-gray-500 mt-1">Needs attention</p>
        </Card>
      </div>

      <!-- Quick Actions -->
      <Card title="Quick Actions" glass>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            @click="$router.push('/admin/sellers')"
            class="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500 rounded-lg transition group"
          >
            <svg class="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p class="text-white text-sm font-medium">Manage Sellers</p>
          </button>

          <button
            @click="$router.push('/admin/orders')"
            class="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500 rounded-lg transition group"
          >
            <svg class="w-8 h-8 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p class="text-white text-sm font-medium">View Orders</p>
          </button>

          <button
            @click="$router.push('/admin/disputes')"
            class="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500 rounded-lg transition group"
          >
            <svg class="w-8 h-8 text-yellow-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="text-white text-sm font-medium">Resolve Disputes</p>
          </button>

          <button
            @click="$router.push('/admin/payouts')"
            class="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500 rounded-lg transition group"
          >
            <svg class="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p class="text-white text-sm font-medium">Review Payouts</p>
          </button>
        </div>
      </Card>

      <!-- Analytics Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Revenue Trend"
          type="line"
          :data="revenueChartData"
          :show-period-selector="true"
          @period-change="handlePeriodChange"
        />
        
        <AnalyticsChart
          title="Orders Overview"
          type="bar"
          :data="ordersChartData"
        />
      </div>

      <!-- Recent Activity -->
      <Card title="Recent Activity" glass>
        <div class="space-y-4">
          <div v-if="!dashboard.recent_actions?.length" class="text-center py-8 text-gray-500">
            No recent activity found.
          </div>
          <div v-for="action in dashboard.recent_actions" :key="action.time" class="flex items-start space-x-3 pb-4 border-b border-slate-700 last:border-0 last:pb-0">
            <div 
              class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              :class="{
                'bg-purple-500': action.type === 'order',
                'bg-blue-500': action.type === 'seller',
                'bg-yellow-500': action.type === 'dispute'
              }"
            ></div>
            <div class="flex-1">
              <p class="text-white text-sm font-medium">{{ action.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ action.subtitle }} • {{ formatDate(action.time) }}</p>
            </div>
            <div class="text-xs font-medium px-2 py-1 rounded bg-slate-800 text-gray-400 capitalize">
              {{ action.status }}
            </div>
          </div>
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
import AnalyticsChart from '@/components/admin/AnalyticsChart.vue'
import Skeleton from '@/components/common/Skeleton.vue'

const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const dashboard = computed(() => adminStore.dashboard)
const analytics = computed(() => adminStore.analytics)
const loading = computed(() => adminStore.loading)

// Chart data
const revenueChartData = computed(() => ({
  labels: analytics.value.revenue?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      data: analytics.value.revenue?.data || [12000, 19000, 15000, 25000, 22000, 30000, 28000]
    }
  ]
}))

const ordersChartData = computed(() => ({
  labels: analytics.value.orders?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Orders',
      data: analytics.value.orders?.data || [12, 19, 15, 25, 22, 30, 28]
    }
  ]
}))

const handlePeriodChange = async (period) => {
  try {
    await adminStore.fetchAnalytics({ period })
  } catch (error) {
    toast.error('Failed to load analytics')
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      adminStore.fetchDashboard(),
      adminStore.fetchAnalytics()
    ])
  } catch (error) {
    toast.error('Failed to load dashboard')
  }
})
</script>
