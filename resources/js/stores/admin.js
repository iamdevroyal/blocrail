import { defineStore } from 'pinia'
import { adminService } from '@/services/admin.service'

export const useAdminStore = defineStore('admin', {
    state: () => ({
        dashboard: {
            gmv: 0,
            total_orders: 0,
            active_sellers: 0,
            pending_disputes: 0,
        },
        analytics: {
            revenue: [],
            orders: [],
            sellers: [],
        },
        sellers: [],
        orders: [],
        disputes: [],
        payouts: [],
        currentSeller: null,
        currentOrder: null,
        currentDispute: null,
        currentPayout: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            date_from: '',
            date_to: '',
            status: '',
            seller_id: '',
        },
        loading: false,
        error: null,
    }),

    actions: {
        /**
         * Fetch dashboard stats
         */
        async fetchDashboard() {
            this.loading = true
            this.error = null

            try {
                const { data } = await adminService.getDashboard()
                this.dashboard = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load dashboard'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch analytics
         */
        async fetchAnalytics(params = {}) {
            try {
                const { data } = await adminService.getAnalytics(params)
                this.analytics = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load analytics'
                throw error
            }
        },

        /**
         * Fetch sellers
         */
        async fetchSellers(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    ...this.filters,
                }

                const { data } = await adminService.getSellers(params)
                const paginator = data.data

                this.sellers = paginator.data
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load sellers'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Get single seller details
         */
        async getSeller(sellerId) {
            this.loading = true
            this.error = null

            try {
                const { data } = await adminService.getSeller(sellerId)
                this.currentSeller = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load seller'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Get single order details
         */
        async getOrder(orderId) {
            this.loading = true
            this.error = null

            try {
                const { data } = await adminService.getOrder(orderId)
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
         * Get single dispute details
         */
        async getDispute(disputeId) {
            this.loading = true
            this.error = null

            try {
                const { data } = await adminService.getDispute(disputeId)
                this.currentDispute = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load dispute'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Get single payout details
         */
        async getPayout(payoutId) {
            this.loading = true
            this.error = null

            try {
                const { data } = await adminService.getPayout(payoutId)
                this.currentPayout = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load payout'
                throw error
            } finally {
                this.loading = false
            }
        },
        /**
         * Update seller tier
         */
        async updateSellerTier(sellerId, tier, reason) {
            try {
                const { data } = await adminService.updateSellerTier(sellerId, tier, reason)
                const index = this.sellers.findIndex(s => s.id === sellerId)
                if (index !== -1) {
                    this.sellers[index] = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update tier'
                throw error
            }
        },

        /**
         * Update seller status
         */
        async updateSellerStatus(sellerId, status, reason) {
            try {
                const { data } = await adminService.updateSellerStatus(sellerId, status, reason)
                const index = this.sellers.findIndex(s => s.id === sellerId)
                if (index !== -1) {
                    this.sellers[index] = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update status'
                throw error
            }
        },

        /**
         * Fetch orders
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

                const { data } = await adminService.getOrders(params)
                const paginator = data.data

                this.orders = paginator.data
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
         * Fetch disputes
         */
        async fetchDisputes(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    ...this.filters,
                }

                const { data } = await adminService.getDisputes(params)
                const paginator = data.data

                this.disputes = paginator.data
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load disputes'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch payouts
         */
        async fetchPayouts(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    ...this.filters,
                }

                const { data } = await adminService.getPayouts(params)
                const paginator = data.data

                this.payouts = paginator.data
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load payouts'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Resolve dispute
         */
        async resolveDispute(disputeId, resolution) {
            try {
                const { data } = await adminService.resolveDispute(disputeId, resolution)
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to resolve dispute'
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
                date_from: '',
                date_to: '',
                status: '',
                seller_id: '',
            }
        },
    },
})
