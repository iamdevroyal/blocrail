import { defineStore } from 'pinia'
import { walletService } from '@/services/wallet.service'

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        balance: {
            available: 0,
            pending: 0,
            reserve: 0,
            total_earned: 0,
            total_withdrawn: 0,
        },
        transactions: [],
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            type: '',
            date_from: '',
            date_to: '',
        },
        bankDetails: null,
        loading: false,
        error: null,
    }),

    getters: {
        totalBalance: (state) => state.balance.available + state.balance.pending,
    },

    actions: {
        /**
         * Fetch wallet balance
         */
        async fetchBalance() {
            this.loading = true
            this.error = null

            try {
                const { data } = await walletService.getBalance()
                this.balance = data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load balance'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch transaction history
         */
        async fetchTransactions(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    ...this.filters,
                }

                const { data } = await walletService.getTransactions(params)

                this.transactions = data.data
                this.pagination = {
                    current_page: data.current_page,
                    last_page: data.last_page,
                    per_page: data.per_page,
                    total: data.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load transactions'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch bank details
         */
        async fetchBankDetails() {
            try {
                const { data } = await walletService.getBankDetails()
                this.bankDetails = data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load bank details'
                throw error
            }
        },

        /**
         * Save bank details
         */
        async saveBankDetails(details) {
            this.loading = true
            this.error = null

            try {
                const { data } = await walletService.saveBankDetails(details)
                this.bankDetails = data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to save bank details'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Request payout
         */
        async requestPayout(amount) {
            this.loading = true
            this.error = null

            try {
                const { data } = await walletService.requestPayout({ amount })
                await this.fetchBalance() // Refresh balance
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to request payout'
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
                type: '',
                date_from: '',
                date_to: '',
            }
        },
    },
})
