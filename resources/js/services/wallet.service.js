import api from './api'

export const walletService = {
    /**
     * Get wallet balance
     */
    async getBalance() {
        return api.get('/escrow/balance')
    },

    /**
     * Get transaction history
     */
    async getTransactions(params = {}) {
        return api.get('/escrow/transactions', { params })
    },

    /**
     * Request payout
     */
    async requestPayout(data) {
        return api.post('/payouts', data)
    },

    /**
     * Get bank details
     */
    async getBankDetails() {
        return api.get('/seller/bank-details')
    },

    /**
     * Save bank details
     */
    async saveBankDetails(data) {
        return api.post('/seller/bank-details', data)
    },
}
