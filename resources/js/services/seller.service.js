import api from './api'

export const sellerService = {
    /**
     * Get seller dashboard stats
     */
    async getDashboard() {
        return api.get('/seller/dashboard')
    },

    /**
     * Get seller profile
     */
    async getProfile() {
        return api.get('/seller/profile')
    },

    /**
     * Update seller profile
     */
    async updateProfile(data) {
        return api.put('/seller/profile', data)
    },

    /**
     * Update bank details
     */
    async updateBankDetails(data) {
        return api.put('/seller/bank-details', data)
    },
}
