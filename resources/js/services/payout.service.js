import api from './api'

export const payoutService = {
    /**
     * Get all payouts
     */
    async getPayouts(params = {}) {
        return api.get('/payouts', { params })
    },

    /**
     * Get single payout
     */
    async getPayout(id) {
        return api.get(`/payouts/${id}`)
    },

    /**
     * Request payout
     */
    async requestPayout(data) {
        return api.post('/payouts', data)
    },

    /**
     * Cancel payout
     */
    async cancelPayout(id) {
        return api.post(`/payouts/${id}/cancel`)
    },
}
