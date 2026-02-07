import { defineStore } from 'pinia'
import { settingsService } from '@/services/settings.service'
import { walletService } from '@/services/wallet.service'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        profile: null,
        bankDetails: null,
        loading: false,
        error: null,
    }),

    actions: {
        /**
         * Fetch seller profile
         */
        async fetchProfile() {
            this.loading = true
            this.error = null

            try {
                const { data } = await settingsService.getProfile()
                this.profile = data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load profile'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update seller profile
         */
        async updateProfile(profileData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await settingsService.updateProfile(profileData)
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
         * Update password
         */
        async updatePassword(passwordData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await settingsService.updatePassword(passwordData)
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update password'
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
         * Update bank details
         */
        async updateBankDetails(bankData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await walletService.saveBankDetails(bankData)
                this.bankDetails = data
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
