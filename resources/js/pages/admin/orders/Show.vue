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
        <Badge :variant="getStatusVariant(order?.status)">
          {{ order?.status }}
        </Badge>
      </div>

      <div v-if="loading && !order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <Skeleton type="card" />
          <Skeleton type="list" :rows="3" />
          <Skeleton type="list" :rows="4" />
        </div>
        <div class="lg:col-span-1 space-y-6">
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      </div>

      <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Order Details -->
          <Card title="Order Details" glass>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Number</label>
                  <p class="text-white font-mono">{{ order.order_number }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Date</label>
                  <p class="text-white">{{ formatDate(order.created_at) }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Payment Status</label>
                  <Badge :variant="order.payment_status === 'paid' ? 'success' : 'warning'">
                    {{ order.payment_status }}
                  </Badge>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Payment Reference</label>
                  <p class="text-white font-mono text-sm">{{ order.payment_reference }}</p>
                </div>
              </div>
            </div>
          </Card>

          <!-- Order Items -->
          <Card title="Order Items" glass>
            <div class="space-y-3">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex items-start space-x-4 pb-3 border-b border-slate-700 last:border-0"
              >
                <img
                  v-if="item.product_image"
                  :src="item.product_image"
                  :alt="item.product_name"
                  class="w-16 h-16 rounded-lg object-cover bg-slate-800"
                />
                <div class="flex-1">
                  <p class="text-white font-medium">{{ item.product_name }}</p>
                  <p v-if="item.variant_name" class="text-sm text-gray-400">{{ item.variant_name }}</p>
                  <p class="text-sm text-gray-500 mt-1">Qty: {{ item.quantity }} × {{ formatCurrency(item.price) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-white font-medium">{{ formatCurrency(item.quantity * item.price) }}</p>
                </div>
              </div>

              <div class="pt-3 space-y-2">
                <div class="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{{ formatCurrency(order.subtotal) }}</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span>{{ formatCurrency(order.delivery_fee) }}</span>
                </div>
                <div class="flex justify-between text-white text-lg font-bold pt-2 border-t border-slate-700">
                  <span>Total</span>
                  <span>{{ formatCurrency(order.total_amount) }}</span>
                </div>
              </div>
            </div>
          </Card>

          <!-- Order Timeline -->
          <Card title="Order Timeline" glass>
            <div class="space-y-4">
              <div
                v-for="(event, index) in order.timeline"
                :key="index"
                class="flex items-start space-x-3"
              >
                <div class="flex flex-col items-center">
                  <div class="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                  <div v-if="index < order.timeline.length - 1" class="w-0.5 h-full bg-slate-700 mt-1"></div>
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
                <p class="text-white">{{ order.seller_name }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p class="text-white text-sm">{{ order.seller_email }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p class="text-white">{{ order.seller_phone }}</p>
              </div>
              <Button variant="ghost" size="sm" class="w-full mt-4" @click="viewSeller">
                View Seller Profile
              </Button>
            </div>
          </Card>

          <!-- Buyer Info -->
          <Card title="Buyer Information" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</label>
                <p class="text-white">{{ order.buyer_name }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p class="text-white">{{ order.buyer_phone }}</p>
              </div>
              <div v-if="order.buyer_email">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p class="text-white text-sm">{{ order.buyer_email }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</label>
                <p class="text-gray-300 text-sm">{{ order.delivery_address }}</p>
              </div>
            </div>
          </Card>

          <!-- Escrow Status -->
          <Card title="Escrow Status" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Escrow Amount</label>
                <p class="text-white text-lg font-bold">{{ formatCurrency(order.total_amount) }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</label>
                <Badge :variant="order.escrow_released ? 'success' : 'warning'">
                  {{ order.escrow_released ? 'Released' : 'Held' }}
                </Badge>
              </div>
              <div v-if="order.escrow_released_at">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Released At</label>
                <p class="text-white text-sm">{{ formatDate(order.escrow_released_at) }}</p>
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
import Skeleton from '@/components/common/Skeleton.vue'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()

const orderId = route.params.id
const loading = computed(() => adminStore.loading)
const order = computed(() => adminStore.currentOrder)
const getStatusVariant = (status) => {
  if (status === 'delivered') return 'success'
  if (status === 'confirmed') return 'info'
  if (status === 'pending') return 'warning'
  return 'danger'
}

const viewSeller = () => {
  router.push(`/admin/sellers/${order.value.seller_id}`)
}

onMounted(async () => {
  try {
    await adminStore.getOrder(orderId)
  } catch (error) {
    toast.error('Failed to load order')
  }
})
</script>
