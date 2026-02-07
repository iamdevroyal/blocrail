<template>
  <AppLayout>
    <div v-if="loading && !order" class="flex flex-col items-center justify-center min-h-[60vh]">
      <Loading text="Loading order details..." />
    </div>

    <div v-else-if="order" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button @click="$router.push('/seller/orders')" class="p-2 text-gray-400 hover:text-white transition group">
            <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div class="flex items-center space-x-3">
              <h1 class="text-2xl font-bold text-white">Order <span class="text-purple-400">#{{ order.order_number }}</span></h1>
              <Badge :variant="getStatusVariant(order.status)">{{ order.status }}</Badge>
            </div>
            <p class="text-gray-400 mt-1">Placed on {{ formatDate(order.created_at, true) }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <Button v-if="order.status === 'paid'" variant="success" @click="confirmDelivery" :loading="confirming">
            Confirm Delivery
          </Button>
          <Button variant="ghost" @click="printOrder">
            Print Order
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Items -->
          <Card title="Order Items" glass>
            <div class="space-y-4">
              <div v-for="item in order.items" :key="item.id" class="flex items-center justify-between p-3 border border-slate-700/50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-slate-800 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img v-if="item.product?.image_url" :src="item.product.image_url" class="object-cover w-full h-full" />
                    <svg v-else class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-white">{{ item.product_name }}</p>
                    <p class="text-xs text-gray-500">Qty: {{ item.quantity }} · {{ formatCurrency(item.unit_price) }} each</p>
                  </div>
                </div>
                <p class="text-sm font-semibold text-white">{{ formatCurrency(item.total_price) }}</p>
              </div>
            </div>

            <!-- Totals -->
            <div class="mt-6 pt-6 border-t border-slate-700 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Subtotal</span>
                <span class="text-white">{{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Delivery Fee</span>
                <span class="text-white">{{ formatCurrency(order.delivery_fee) }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold pt-2">
                <span class="text-white">Total</span>
                <span class="text-purple-400">{{ formatCurrency(order.total_amount) }}</span>
              </div>
            </div>
          </Card>

          <!-- Timeline -->
          <Card title="Order Timeline" glass>
            <div class="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              <div v-for="(event, index) in timeline" :key="index" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <!-- Icon -->
                <div class="flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <!-- Card -->
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-800 bg-slate-800/20 shadow">
                    <div class="flex items-center justify-between space-x-2 mb-1">
                        <div class="font-bold text-white">{{ event.status }}</div>
                        <time class="font-mono text-xs text-purple-400">{{ formatDate(event.created_at, true) }}</time>
                    </div>
                    <div class="text-gray-400 text-sm">{{ event.notes || 'Status updated.' }}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <Card title="Customer Information" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</label>
                <p class="text-white">{{ order.customer_name }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p class="text-white">{{ order.customer_phone }}</p>
              </div>
              <div>
                 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                 <p class="text-white">{{ order.customer_email || 'N/A' }}</p>
              </div>
            </div>
          </Card>

          <Card title="Delivery Address" glass>
            <p class="text-sm text-gray-300 leading-relaxed">
              {{ order.delivery_address }}
            </p>
          </Card>

          <Card title="Payment Details" glass>
            <div class="space-y-4">
               <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</label>
                <Badge :variant="order.payment_status === 'paid' ? 'success' : 'warning'">{{ order.payment_status }}</Badge>
              </div>
              <div v-if="order.payment_reference">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reference</label>
                <p class="font-mono text-xs text-gray-400 break-all">{{ order.payment_reference }}</p>
              </div>
              <div>
                 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Payment Method</label>
                 <p class="text-white capitalize">{{ order.payment_method || 'Paystack' }}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const toast = useToast()

const orderId = route.params.id
const loading = ref(true)
const confirming = ref(false)
const timeline = ref([])
const order = computed(() => orderStore.currentOrder)

const getStatusVariant = (status) => {
  switch (status) {
    case 'delivered':
    case 'paid': return 'success'
    case 'pending': return 'warning'
    case 'shipped': return 'info'
    case 'cancelled': return 'danger'
    default: return 'default'
  }
}

const loadOrder = async () => {
  try {
    await orderStore.fetchOrder(orderId)
    timeline.value = await orderStore.fetchTimeline(orderId)
  } catch (error) {
    toast.error('Failed to load order details')
    router.push('/seller/orders')
  } finally {
    loading.value = false
  }
}

const confirmDelivery = async () => {
  confirming.value = true
  try {
    await orderStore.confirmDelivery(orderId)
    toast.success('Delivery confirmed and escrow released!')
    await loadOrder()
  } catch (error) {
    toast.error('Failed to confirm delivery')
  } finally {
    confirming.value = false
  }
}

const printOrder = () => {
  window.print()
}

onMounted(loadOrder)
</script>

<style scoped>
@media print {
  .no-print { display: none !important; }
  /* Basic print styles could be added here or in global css */
}
</style>
