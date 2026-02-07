<template>
  <AppLayout>
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <Loading text="Loading session details..." />
    </div>

    <div v-else-if="session" class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center space-x-4">
          <button @click="$router.push('/seller/sessions')" class="p-2 text-gray-400 hover:text-white transition group">
            <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div class="flex items-center space-x-3">
              <h1 class="text-3xl font-bold text-white">{{ session.title }}</h1>
              <Badge :variant="getStatusVariant(session.status)">{{ session.status }}</Badge>
            </div>
            <p class="text-gray-400 mt-1">Platform: <span class="capitalize">{{ session.platform_type }}</span> · Created {{ formatDate(session.created_at) }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <Button v-if="session.status === 'draft'" variant="primary" @click="toggleStatus">
            Activate Session
          </Button>
          <Button v-else-if="session.status === 'active'" variant="danger" @click="toggleStatus">
            End Session
          </Button>
          <Button variant="ghost" @click="$router.push(`/seller/sessions/${session.id}/edit`)">
            Edit
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content (Stats & Products) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Real-time Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card glass class="text-center">
              <p class="text-gray-400 text-sm">Views</p>
              <p class="text-2xl font-bold text-white mt-1">{{ session.views || 0 }}</p>
            </Card>
            <Card glass class="text-center">
              <p class="text-gray-400 text-sm">Active Cart Items</p>
              <p class="text-2xl font-bold text-white mt-1">{{ stats.cart_items || 0 }}</p>
            </Card>
            <Card glass class="text-center">
              <p class="text-gray-400 text-sm">Orders Generated</p>
              <p class="text-2xl font-bold text-white mt-1">{{ session.orders_count || 0 }}</p>
            </Card>
          </div>

          <!-- Product List -->
          <Card title="Session Catalog" glass>
            <div class="space-y-4">
              <div v-for="product in session.products" :key="product.id" class="flex items-center p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                <img v-if="product.images?.length" :src="product.images[0].url" class="w-12 h-12 rounded bg-slate-700 object-cover" />
                <div class="ml-4 flex-1">
                  <p class="text-sm font-medium text-white">{{ product.name }}</p>
                  <p class="text-xs text-gray-400">{{ formatCurrency(product.price) }} · {{ product.stock_quantity }} in stock</p>
                </div>
                <Badge variant="default" size="sm">{{ product.orders_count || 0 }} sold</Badge>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar (Sharing) -->
        <div class="space-y-6">
          <Card title="Share Session" glass>
            <div class="space-y-6">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Checkout Link</label>
                <LinkGenerator :token="session.session_token" />
              </div>
              <div class="pt-6 border-t border-slate-700">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Scan to Checkout</label>
                <QRCode :url="sessionUrl" />
              </div>
            </div>
          </Card>

          <Card title="Live Stream Tips" glass>
            <ul class="text-sm text-gray-400 space-y-3">
              <li class="flex items-start">
                <svg class="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Pin the checkout link in your live chat or comments.
              </li>
              <li class="flex items-start">
                <svg class="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Explain the escrow protection to build buyer trust.
              </li>
              <li class="flex items-start">
                <svg class="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Show the QR code on camera for easy mobile scanning.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-[60vh]">
      <EmptyState title="Session not found" description="The session you are looking for does not exist or has been deleted." icon="search" action-text="Back to Sessions" @action="$router.push('/seller/sessions')" />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessions'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LinkGenerator from '@/components/seller/LinkGenerator.vue'
import QRCode from '@/components/seller/QRCode.vue'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()
const toast = useToast()

const sessionId = route.params.id
const loading = ref(true)
const session = computed(() => sessionStore.currentSession)
const stats = ref({ cart_items: 0 })
let pollingInterval = null

const sessionUrl = computed(() => {
  if (!session.value) return ''
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin
  return `${baseUrl}/live/${session.value.session_token}`
})

const getStatusVariant = (status) => {
  switch (status) {
    case 'active': return 'success'
    case 'draft': return 'warning'
    case 'ended': return 'default'
    default: return 'default'
  }
}

const toggleStatus = async () => {
  try {
    if (session.value.status === 'draft') {
      await sessionStore.activateSession(sessionId)
      toast.success('Session is now LIVE!')
    } else if (session.value.status === 'active') {
      await sessionStore.endSession(sessionId)
      toast.info('Session has ended.')
    }
  } catch (error) {
    toast.error('Failed to update session status')
  }
}

const fetchData = async () => {
  try {
    await sessionStore.fetchSession(sessionId)
    if (session.value?.status === 'active') {
      const analytics = await sessionStore.fetchAnalytics(sessionId)
      stats.value.cart_items = analytics.cart_items || 0
    }
  } catch (error) {
    if (loading.value) {
      toast.error('Failed to load session details')
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()
  
  // Start polling if session is active
  if (session.value?.status === 'active') {
    pollingInterval = setInterval(fetchData, 30000) // Poll every 30 seconds
  }
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})
</script>
