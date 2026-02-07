import api from './api'

export const disputeService = {
    /**
     * Get all disputes
     */
    async getDisputes(params = {}) {
        return api.get('/disputes', { params })
    },

    /**
     * Get single dispute
     */
    async getDispute(id) {
        return api.get(`/disputes/${id}`)
    },

    /**
     * Upload evidence
     */
    async uploadEvidence(id, data) {
        return api.post(`/disputes/${id}/evidence`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    /**
     * Add comment
     */
    async addComment(id, comment) {
        return api.post(`/disputes/${id}/comments`, { comment })
    },
}
