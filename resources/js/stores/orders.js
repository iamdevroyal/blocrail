import { defineStore } from 'pinia'
import { orderService } from '@/services/order.service'

export const useOrderStore = defineStore('orders', {
    state: () => ({
        orders: [],
        currentOrder: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            search: '',
            status: '',
            payment_status: '',
            date_from: '',
            date_to: '',
        },
        loading: false,
        error: null,
    }),

    getters: {
        pendingOrders: (state) => state.orders.filter(o => o.status === 'pending'),
        paidOrders: (state) => state.orders.filter(o => o.payment_status === 'paid'),
    },

    actions: {
        /**
         * Fetch orders with pagination and filters
         */
        async fetchOrders(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    ...this.filters,
                }

                const { data } = await orderService.getOrders(params)

                // data.data is the Paginator object
                // data.data.data is the Array of orders
                const paginator = data.data

                this.orders = paginator.data || []
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load orders'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch single order
         */
        async fetchOrder(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await orderService.getOrder(id)
                this.currentOrder = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load order'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Confirm delivery
         */
        async confirmDelivery(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await orderService.confirmDelivery(id)

                const index = this.orders.findIndex(o => o.id === id)
                if (index !== -1) {
                    this.orders[index] = data
                }

                if (this.currentOrder?.id === id) {
                    this.currentOrder = data
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to confirm delivery'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Get order timeline
         */
        async fetchTimeline(id) {
            try {
                const { data } = await orderService.getTimeline(id)
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load timeline'
                throw error
            }
        },

        /**
         * Set filters
         */
        setFilters(filters) {
            this.filters = { ...this.filters, ...filters }
        },

        /**
         * Clear filters
         */
        clearFilters() {
            this.filters = {
                search: '',
                status: '',
                payment_status: '',
                date_from: '',
                date_to: '',
            }
        },
    },
})
