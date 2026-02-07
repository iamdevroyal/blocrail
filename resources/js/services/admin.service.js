import api from './api'

export const adminService = {
    /**
     * Get admin dashboard
     */
    async getDashboard() {
        return api.get('/admin/dashboard')
    },

    /**
     * Get analytics
     */
    async getAnalytics(params = {}) {
        return api.get('/admin/analytics', { params })
    },

    /**
     * Get all sellers
     */
    async getSellers(params = {}) {
        return api.get('/admin/sellers', { params })
    },

    /**
     * Get seller details
     */
    async getSeller(id) {
        return api.get(`/admin/sellers/${id}`)
    },

    /**
     * Update seller tier
     */
    async updateSellerTier(id, tier, reason) {
        return api.put(`/admin/sellers/${id}/tier`, { tier, reason })
    },

    /**
     * Update seller status
     */
    async updateSellerStatus(id, status, reason) {
        return api.put(`/admin/sellers/${id}/status`, { status, reason })
    },

    /**
     * Get all orders (admin)
     */
    async getOrders(params = {}) {
        return api.get('/admin/orders', { params })
    },

    /**
     * Get order details
     */
    async getOrder(id) {
        return api.get(`/admin/orders/${id}`)
    },

    /**
     * Get all disputes
     */
    async getDisputes(params = {}) {
        return api.get('/admin/disputes', { params })
    },

    /**
     * Get dispute details
     */
    async getDispute(id) {
        return api.get(`/admin/disputes/${id}`)
    },

    /**
     * Resolve dispute (refund)
     */
    async resolveDispute(id, data) {
        return api.post(`/admin/disputes/${id}/resolve`, data)
    },

    /**
     * Reject dispute
     */
    async rejectDispute(id, data) {
        return api.post(`/admin/disputes/${id}/reject`, data)
    },

    /**
     * Get all payouts
     */
    async getPayouts(params = {}) {
        return api.get('/admin/payouts', { params })
    },

    /**
     * Get payout details
     */
    async getPayout(id) {
        return api.get(`/admin/payouts/${id}`)
    },

    // Waitlist Management
    /**
     * Get waitlist entries
     */
    async getWaitlist(params = {}) {
        return api.get('/admin/waitlist', { params })
    },

    /**
     * Export waitlist to CSV
     */
    async exportWaitlist() {
        return api.get('/admin/waitlist/export', { responseType: 'blob' })
    },

    /**
     * Get waitlist statistics
     */
    async getWaitlistStats() {
        return api.get('/admin/waitlist/stats')
    },

    /**
     * Get waitlist analytics
     */
    async getWaitlistAnalytics(params = {}) {
        return api.get('/admin/waitlist/analytics', { params })
    },

    /**
     * Notify single waitlist entry
     */
    async notifyWaitlistEntry(id) {
        return api.post(`/admin/waitlist/${id}/notify`)
    },

    /**
     * Bulk notify waitlist entries
     */
    async bulkNotifyWaitlist(ids) {
        return api.post('/admin/waitlist/bulk-notify', { ids })
    },

    /**
     * Delete waitlist entry
     */
    async deleteWaitlistEntry(id) {
        return api.delete(`/admin/waitlist/${id}`)
    }
}

export default adminService
