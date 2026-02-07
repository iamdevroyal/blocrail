import { defineStore } from 'pinia'
import { payoutService } from '@/services/payout.service'

export const usePayoutStore = defineStore('payouts', {
    state: () => ({
        payouts: [],
        currentPayout: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            status: '',
        },
        loading: false,
        error: null,
    }),

    getters: {
        pendingPayouts: (state) => state.payouts.filter(p => p.status === 'pending'),
        completedPayouts: (state) => state.payouts.filter(p => p.status === 'completed'),
    },

    actions: {
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

                const { data } = await payoutService.getPayouts(params)
                const paginator = data.data

                this.payouts = paginator
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load payouts'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch single payout
         */
        async fetchPayout(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await payoutService.getPayout(id)
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
         * Request payout
         */
        async requestPayout(payoutData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await payoutService.requestPayout(payoutData)
                this.payouts.unshift(data.data)
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to request payout'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Cancel payout
         */
        async cancelPayout(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await payoutService.cancelPayout(id)

                const index = this.payouts.findIndex(p => p.id === id)
                if (index !== -1) {
                    this.payouts[index] = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to cancel payout'
                throw error
            } finally {
                this.loading = false
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
                status: '',
            }
        },
    },
})
