import { defineStore } from 'pinia'
import { checkoutService } from '@/services/checkout.service'

export const useCheckoutStore = defineStore('checkout', {
    state: () => ({
        session: null,
        cart: [],
        orderForm: {
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            delivery_address: '',
        },
        deliveryFee: 2000, // Default ₦2,000
        loading: false,
        error: null,
    }),

    getters: {
        cartTotal: (state) => {
            return state.cart.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
        },

        orderTotal: (state) => {
            const subtotal = state.cart.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
            return subtotal + state.deliveryFee
        },

        cartItemCount: (state) => {
            return state.cart.reduce((count, item) => count + item.quantity, 0)
        },
    },

    actions: {
        /**
         * Fetch session data
         */
        async fetchSession(token) {
            this.loading = true
            this.error = null

            try {
                const { data } = await checkoutService.getSession(token)
                this.session = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Add item to cart
         */
        addToCart(product, variant = null, quantity = 1) {
            const existingItem = this.cart.find(item =>
                item.product_id === product.id &&
                item.variant_id === variant?.id
            )

            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                this.cart.push({
                    product_id: product.id,
                    variant_id: variant?.id || null,
                    name: product.name,
                    variant_name: variant?.name || null,
                    price: variant?.price || product.price,
                    image: product.images?.[0] || null,
                    quantity,
                })
            }
        },

        /**
         * Update cart item quantity
         */
        updateQuantity(index, quantity) {
            if (quantity <= 0) {
                this.cart.splice(index, 1)
            } else {
                this.cart[index].quantity = quantity
            }
        },

        /**
         * Remove item from cart
         */
        removeFromCart(index) {
            this.cart.splice(index, 1)
        },

        /**
         * Clear cart
         */
        clearCart() {
            this.cart = []
        },

        /**
         * Update order form
         */
        updateOrderForm(field, value) {
            this.orderForm[field] = value
        },

        /**
         * Create order
         */
        async createOrder(paymentReference) {
            this.loading = true
            this.error = null

            try {
                const orderData = {
                    session_id: this.session.id,
                    items: this.cart.map(item => ({
                        product_id: item.product_id,
                        variant_id: item.variant_id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    customer_name: this.orderForm.customer_name,
                    customer_phone: this.orderForm.customer_phone,
                    customer_email: this.orderForm.customer_email,
                    delivery_address: this.orderForm.delivery_address,
                    delivery_fee: this.deliveryFee,
                    payment_reference: paymentReference,
                }

                const { data } = await checkoutService.createOrder(orderData)
                this.clearCart()
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to create order'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Verify payment
         */
        async verifyPayment(reference) {
            try {
                const { data } = await checkoutService.verifyPayment(reference)
                return data
            } catch (error) {
                throw error
            }
        },
    },
})
