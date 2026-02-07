import { defineStore } from 'pinia'
import { notificationService } from '@/services/notification.service'

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        unreadCount: 0,
        loading: false,
        error: null,
        pollingInterval: null,
    }),

    getters: {
        unreadNotifications: (state) => state.notifications.filter(n => !n.read_at),
        readNotifications: (state) => state.notifications.filter(n => n.read_at),
    },

    actions: {
        /**
         * Fetch all notifications
         */
        async fetchNotifications() {
            this.loading = true
            this.error = null

            try {
                const { data } = await notificationService.getNotifications()
                this.notifications = data.data || data
                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load notifications'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch unread count
         */
        async fetchUnreadCount() {
            try {
                const { data } = await notificationService.getUnreadCount()
                this.unreadCount = data.count || 0
                return data
            } catch (error) {
                console.error('Failed to fetch unread count:', error)
            }
        },

        /**
         * Mark notification as read
         */
        async markAsRead(id) {
            try {
                await notificationService.markAsRead(id)

                const notification = this.notifications.find(n => n.id === id)
                if (notification && !notification.read_at) {
                    notification.read_at = new Date().toISOString()
                    this.unreadCount = Math.max(0, this.unreadCount - 1)
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to mark as read'
                throw error
            }
        },

        /**
         * Mark all notifications as read
         */
        async markAllAsRead() {
            try {
                await notificationService.markAllAsRead()

                this.notifications.forEach(notification => {
                    if (!notification.read_at) {
                        notification.read_at = new Date().toISOString()
                    }
                })
                this.unreadCount = 0
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to mark all as read'
                throw error
            }
        },

        /**
         * Delete notification
         */
        async deleteNotification(id) {
            try {
                await notificationService.deleteNotification(id)

                const index = this.notifications.findIndex(n => n.id === id)
                if (index !== -1) {
                    const notification = this.notifications[index]
                    if (!notification.read_at) {
                        this.unreadCount = Math.max(0, this.unreadCount - 1)
                    }
                    this.notifications.splice(index, 1)
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete notification'
                throw error
            }
        },

        /**
         * Start polling for new notifications
         */
        startPolling(interval = 30000) { // Poll every 30 seconds
            if (this.pollingInterval) {
                this.stopPolling()
            }

            // Initial fetch
            this.fetchUnreadCount()

            // Set up polling
            this.pollingInterval = setInterval(() => {
                this.fetchUnreadCount()
            }, interval)
        },

        /**
         * Stop polling
         */
        stopPolling() {
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval)
                this.pollingInterval = null
            }
        },

        /**
         * Add new notification (for real-time updates)
         */
        addNotification(notification) {
            this.notifications.unshift(notification)
            if (!notification.read_at) {
                this.unreadCount++
            }
        },
    },
})
