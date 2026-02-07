import api from './api'

export const sessionService = {
    /**
     * Get all live sessions
     */
    async getSessions(params = {}) {
        return api.get('/live-sessions', { params })
    },

    /**
     * Get single session
     */
    async getSession(id) {
        return api.get(`/live-sessions/${id}`)
    },

    /**
     * Create new session
     */
    async createSession(data) {
        return api.post('/live-sessions', data)
    },

    /**
     * Update session
     */
    async updateSession(id, data) {
        return api.put(`/live-sessions/${id}`, data)
    },

    /**
     * Delete session
     */
    async deleteSession(id) {
        return api.delete(`/live-sessions/${id}`)
    },

    /**
     * Activate session
     */
    async activateSession(id) {
        return api.post(`/live-sessions/${id}/activate`)
    },

    /**
     * End session
     */
    async endSession(id) {
        return api.post(`/live-sessions/${id}/end`)
    },

    /**
     * Get session analytics
     */
    async getAnalytics(id) {
        return api.get(`/live-sessions/${id}/analytics`)
    },
}
