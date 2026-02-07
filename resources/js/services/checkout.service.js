import api from './api'

export const checkoutService = {
    /**
     * Get live session by token
     */
    async getSession(token) {
        return api.get(`/live/${token}`)
    },

    /**
     * Create order
     */
    async createOrder(data) {
        return api.post('/orders', data)
    },

    /**
     * Verify payment
     */
    async verifyPayment(reference) {
        return api.get(`/payments/verify/${reference}`)
    },

    /**
     * Get order by reference
     */
    async getOrderByReference(reference) {
        return api.get(`/orders/reference/${reference}`)
    },
}
