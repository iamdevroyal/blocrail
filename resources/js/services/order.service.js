import api from './api'

export const orderService = {
    /**
     * Get all orders
     */
    async getOrders(params = {}) {
        return api.get('/orders', { params })
    },

    /**
     * Get single order
     */
    async getOrder(id) {
        return api.get(`/orders/${id}`)
    },

    /**
     * Confirm delivery
     */
    async confirmDelivery(id) {
        return api.post(`/orders/${id}/confirm-delivery`)
    },

    /**
     * Get order timeline
     */
    async getTimeline(id) {
        return api.get(`/orders/${id}/timeline`)
    },
}
