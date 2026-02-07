import api from './api'

export const settingsService = {
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
     * Update password
     */
    async updatePassword(data) {
        return api.put('/seller/password', data)
    },
}
