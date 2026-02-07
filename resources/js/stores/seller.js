import { defineStore } from 'pinia'
import { sellerService } from '@/services/seller.service'

export const useSellerStore = defineStore('seller', {
    state: () => ({
        dashboard: null,
        profile: null,
        loading: false,
        error: null,
    }),

    getters: {
        stats: (state) => state.dashboard?.stats || {},
        recentOrders: (state) => state.dashboard?.recent_orders || [],
        tier: (state) => state.profile?.tier || 'tier1',
        storeName: (state) => state.profile?.store_name || '',
    },

    actions: {
        /**
         * Fetch dashboard data
         */
        async fetchDashboard() {
            this.loading = true
            this.error = null

            try {
                const { data } = await sellerService.getDashboard()
                // Backend returns { success: true, data: { stats: ..., recent_orders: ... } }
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
         * Fetch seller profile
         */
        async fetchProfile() {
            try {
                const { data } = await sellerService.getProfile()
                this.profile = data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load profile'
                throw error
            }
        },

        /**
         * Update profile
         */
        async updateProfile(profileData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sellerService.updateProfile(profileData)
                this.profile = data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update profile'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update bank details
         */
        async updateBankDetails(bankData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sellerService.updateBankDetails(bankData)
                this.profile = { ...this.profile, ...data }
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update bank details'
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
