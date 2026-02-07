<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Loading State -->
    <div v-if="loading && !session" class="flex flex-col items-center justify-center min-h-screen">
      <Loading text="Loading store..." />
    </div>

    <!-- Error State -->
    <div v-else-if="error && !session" class="flex flex-col items-center justify-center min-h-screen px-4">
      <div class="text-center">
        <svg class="w-20 h-20 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-2xl font-bold text-white mb-2">Session Not Found</h1>
        <p class="text-gray-400">This live session is not available or has ended.</p>
      </div>
    </div>

    <!-- Checkout Page -->
    <div v-else-if="session" class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ session.seller.store_name }}</h1>
        <p class="text-gray-400">{{ session.title }}</p>
        <div class="flex items-center justify-center space-x-2 mt-2">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Live Now
          </span>
          <span class="text-gray-500 text-sm">{{ session.views }} watching</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Products Section -->
        <div class="lg:col-span-2 space-y-4">
          <h2 class="text-xl font-bold text-white mb-4">Available Products</h2>
          
          <div v-if="session.products?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="product in session.products"
              :key="product.id"
              class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition group"
            >
              <!-- Product Image -->
              <div class="relative aspect-square bg-slate-900">
                <img
                  v-if="product.images?.[0]"
                  :src="product.images[0].url"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-4">
                <h3 class="text-lg font-semibold text-white mb-1">{{ product.name }}</h3>
                <p v-if="product.description" class="text-sm text-gray-400 mb-3 line-clamp-2">{{ product.description }}</p>
                
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl font-bold text-purple-400">{{ formatCurrency(product.price) }}</span>
                  <span v-if="product.stock_quantity > 0" class="text-xs text-green-400">{{ product.stock_quantity }} in stock</span>
                  <span v-else class="text-xs text-red-400">Out of stock</span>
                </div>

                <!-- Variant Selection -->
                <div v-if="product.variants?.length > 0" class="mb-3">
                  <label class="block text-xs font-medium text-gray-400 mb-2">Select Variant</label>
                  <select
                    v-model="selectedVariants[product.id]"
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option :value="null">Default</option>
                    <option v-for="variant in product.variants" :key="variant.id" :value="variant">
                      {{ variant.name }} - {{ formatCurrency(variant.price) }}
                    </option>
                  </select>
                </div>

                <!-- Quantity & Add to Cart -->
                <div class="flex items-center space-x-2">
                  <div class="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                    <button
                      @click="decrementQuantity(product.id)"
                      class="px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 transition"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      v-model.number="quantities[product.id]"
                      type="number"
                      min="1"
                      :max="product.stock"
                      class="w-16 px-2 py-2 bg-slate-900 text-white text-center focus:outline-none"
                    />
                    <button
                      @click="incrementQuantity(product.id)"
                      class="px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 transition"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <button
                    @click="addToCart(product)"
                    :disabled="product.stock === 0"
                    class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <p class="text-gray-400">No products available in this session</p>
          </div>
        </div>

        <!-- Order Summary & Checkout -->
        <div class="lg:col-span-1">
          <div class="sticky top-4 space-y-4">
            <!-- Cart -->
            <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 class="text-lg font-bold text-white mb-4">Your Order ({{ cartItemCount }})</h3>
              
              <div v-if="cart.length > 0" class="space-y-3 mb-4">
                <div v-for="(item, index) in cart" :key="index" class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="text-white text-sm font-medium">{{ item.name }}</p>
                    <p v-if="item.variant_name" class="text-xs text-gray-400">{{ item.variant_name }}</p>
                    <p class="text-xs text-gray-500">{{ formatCurrency(item.price) }} × {{ item.quantity }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-white font-semibold">{{ formatCurrency(item.price * item.quantity) }}</span>
                    <button @click="removeFromCart(index)" class="text-red-400 hover:text-red-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <svg class="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p class="text-gray-400 text-sm">Your cart is empty</p>
              </div>

              <!-- Order Summary -->
              <div v-if="cart.length > 0" class="border-t border-slate-700 pt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Subtotal</span>
                  <span class="text-white">{{ formatCurrency(cartTotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Delivery Fee</span>
                  <span class="text-white">{{ formatCurrency(deliveryFee) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold pt-2 border-t border-slate-700">
                  <span class="text-white">Total</span>
                  <span class="text-purple-400">{{ formatCurrency(orderTotal) }}</span>
                </div>
              </div>
            </div>

            <!-- Customer Form -->
            <div v-if="cart.length > 0" class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 class="text-lg font-bold text-white mb-4">Delivery Details</h3>
              
              <form @submit.prevent="handleCheckout" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                  <input
                    v-model="orderForm.customer_name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Phone Number *</label>
                  <input
                    v-model="orderForm.customer_phone"
                    type="tel"
                    required
                    placeholder="080XXXXXXXX"
                    class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Email (Optional)</label>
                  <input
                    v-model="orderForm.customer_email"
                    type="email"
                    placeholder="your@email.com"
                    class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Delivery Address *</label>
                  <textarea
                    v-model="orderForm.delivery_address"
                    required
                    rows="3"
                    placeholder="Enter your full delivery address"
                    class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="processing"
                  class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold rounded-lg transition shadow-lg"
                >
                  <span v-if="processing">Processing...</span>
                  <span v-else>Pay {{ formatCurrency(orderTotal) }}</span>
                </button>
              </form>

              <!-- Trust Badges -->
              <div class="mt-6 pt-6 border-t border-slate-700">
                <div class="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure Payment
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Escrow Protected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Success Modal -->
    <Modal :show="showSuccessModal" title="Order Placed Successfully!" @close="showSuccessModal = false">
      <div class="text-center py-6">
        <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p class="text-gray-400 mb-4">Your order has been placed successfully.</p>
        <p class="text-sm text-gray-500">Order Reference: <span class="font-mono text-purple-400">{{ orderReference }}</span></p>
        <p class="text-sm text-gray-400 mt-4">The seller will contact you shortly for delivery.</p>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useCheckoutStore } from '@/stores/checkout'
import { usePaystack } from '@/composables/usePaystack'
import { formatCurrency } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import Loading from '@/components/common/Loading.vue'
import Modal from '@/components/common/Modal.vue'

const route = useRoute()
const checkoutStore = useCheckoutStore()
const { initializePayment } = usePaystack()
const toast = useToast()

const token = route.params.token
const loading = computed(() => checkoutStore.loading)
const error = computed(() => checkoutStore.error)
const session = computed(() => checkoutStore.session)
const cart = computed(() => checkoutStore.cart)
const cartTotal = computed(() => checkoutStore.cartTotal)
const orderTotal = computed(() => checkoutStore.orderTotal)
const cartItemCount = computed(() => checkoutStore.cartItemCount)
const deliveryFee = computed(() => checkoutStore.deliveryFee)
const orderForm = computed(() => checkoutStore.orderForm)

const selectedVariants = ref({})
const quantities = ref({})
const processing = ref(false)
const showSuccessModal = ref(false)
const orderReference = ref('')

const addToCart = (product) => {
  const variant = selectedVariants.value[product.id]
  const quantity = quantities.value[product.id] || 1
  
  checkoutStore.addToCart(product, variant, quantity)
  toast.success('Added to cart!')
  
  // Reset
  quantities.value[product.id] = 1
  selectedVariants.value[product.id] = null
}

const removeFromCart = (index) => {
  checkoutStore.removeFromCart(index)
  toast.info('Removed from cart')
}

const incrementQuantity = (productId) => {
  quantities.value[productId] = (quantities.value[productId] || 1) + 1
}

const decrementQuantity = (productId) => {
  if ((quantities.value[productId] || 1) > 1) {
    quantities.value[productId]--
  }
}

const handleCheckout = async () => {
  if (!orderForm.value.customer_name || !orderForm.value.customer_phone || !orderForm.value.delivery_address) {
    toast.warning('Please fill in all required fields')
    return
  }

  processing.value = true

  try {
    // Generate payment reference
    const reference = 'BLC-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    orderReference.value = reference

    // Initialize Paystack payment
    await initializePayment({
      email: orderForm.value.customer_email || `${orderForm.value.customer_phone}@blocrail.com`,
      amount: orderTotal.value,
      reference,
      metadata: {
        customer_name: orderForm.value.customer_name,
        customer_phone: orderForm.value.customer_phone,
        session_id: session.value.id,
      },
      onSuccess: async (response) => {
        try {
          // Verify payment and create order
          await checkoutStore.verifyPayment(response.reference)
          await checkoutStore.createOrder(response.reference)
          
          showSuccessModal.value = true
          processing.value = false
        } catch (error) {
          toast.error('Payment verification failed')
          processing.value = false
        }
      },
      onClose: () => {
        processing.value = false
      },
    })
  } catch (error) {
    toast.error('Failed to initialize payment')
    processing.value = false
  }
}

onMounted(async () => {
  try {
    await checkoutStore.fetchSession(token)
    
    // Initialize quantities
    session.value.products?.forEach(product => {
      quantities.value[product.id] = 1
    })
  } catch (error) {
    toast.error('Failed to load session')
  }
})
</script>
