<template>
  <aside 
    class="fixed left-0 top-16 bottom-0 w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto transition-transform duration-300 ease-in-out z-40"
    :class="[
      uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0'
    ]"
  >
    <nav class="p-4 space-y-2">
      <!-- Admin Navigation -->
      <template v-if="authStore.isAdmin">
        <!-- Dashboard -->
        <router-link
          to="/admin/dashboard"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/admin/dashboard') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <!-- Sellers -->
        <router-link
          to="/admin/sellers"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/admin/sellers') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="font-medium">Sellers</span>
        </router-link>

        <!-- Orders -->
        <router-link
          to="/admin/orders"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/admin/orders') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="font-medium">Orders</span>
        </router-link>

        <!-- Disputes -->
        <router-link
          to="/admin/disputes"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/admin/disputes') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="font-medium">Disputes</span>
        </router-link>

        <!-- Payouts -->
        <router-link
          to="/admin/payouts"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/admin/payouts') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="font-medium">Payouts</span>
        </router-link>

        <!-- Waitlist -->
        <router-link
          to="/admin/waitlist"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/admin/waitlist') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="font-medium">Waitlist</span>
        </router-link>
      </template>

      <!-- Seller Navigation -->
      <template v-else-if="authStore.isSeller">
        <!-- Dashboard -->
        <router-link
          to="/seller/dashboard"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/dashboard') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <!-- Products -->
        <router-link
          to="/seller/products"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/products') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span class="font-medium">Products</span>
        </router-link>

        <!-- Live Sessions -->
        <router-link
          to="/seller/sessions"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/sessions') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span class="font-medium">Live Sessions</span>
        </router-link>

        <!-- Orders -->
        <router-link
          to="/seller/orders"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/orders') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="font-medium">Orders</span>
        </router-link>

        <!-- Wallet -->
        <router-link
          to="/seller/wallet"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/wallet') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span class="font-medium">Wallet</span>
        </router-link>

        <!-- Payouts -->
        <router-link
          to="/seller/payouts"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/payouts') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="font-medium">Payouts</span>
        </router-link>

        <!-- Disputes -->
        <router-link
          to="/seller/disputes"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/disputes') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="font-medium">Disputes</span>
        </router-link>

        <div class="border-t border-slate-700 my-4"></div>

        <!-- Settings -->
        <router-link
          to="/seller/settings"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition"
          :class="isActive('/seller/settings') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="font-medium">Settings</span>
        </router-link>
      </template>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const uiStore = useUIStore()
const authStore = useAuthStore()

const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>
