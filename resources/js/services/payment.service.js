import api from './api'

export const paymentService = {
    /**
     * Initialize Paystack payment
     */
    async initializePayment(data) {
        return api.post('/payments/initiate', data)
    },

    /**
     * Verify payment
     */
    async verifyPayment(reference) {
        return api.get(`/payments/verify/${reference}`)
    },

    /**
     * Get payment history
     */
    async getPayments(params = {}) {
        return api.get('/payments', { params })
    },
}
