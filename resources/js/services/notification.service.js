import api from './api'

export const notificationService = {
    /**
     * Get all notifications
     */
    async getNotifications(params = {}) {
        return api.get('/notifications', { params })
    },

    /**
     * Get unread count
     */
    async getUnreadCount() {
        return api.get('/notifications/unread')
    },

    /**
     * Mark notification as read
     */
    async markAsRead(id) {
        return api.post(`/notifications/${id}/read`)
    },

    /**
     * Mark all notifications as read
     */
    async markAllAsRead() {
        return api.post('/notifications/read-all')
    },

    /**
     * Delete notification
     */
    async deleteNotification(id) {
        return api.delete(`/notifications/${id}`)
    },
}
