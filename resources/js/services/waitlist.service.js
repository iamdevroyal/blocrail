import api from './api'

export default {
    /**
     * Join the waitlist
     * @param {Object} data - Waitlist data (name, email, platform)
     * @returns {Promise}
     */
    async join(data) {
        const response = await api.post('/waitlist', data)
        return response.data
    }
}
