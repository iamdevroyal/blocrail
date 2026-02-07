import { defineStore } from 'pinia'
import { disputeService } from '@/services/dispute.service'

export const useDisputeStore = defineStore('disputes', {
    state: () => ({
        disputes: [],
        currentDispute: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            status: '',
        },
        loading: false,
        error: null,
    }),

    getters: {
        openDisputes: (state) => state.disputes.filter(d => d.status === 'open'),
        resolvedDisputes: (state) => state.disputes.filter(d => d.status === 'resolved'),
    },

    actions: {
        /**
         * Fetch disputes
         */
        async fetchDisputes(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    ...this.filters,
                }

                const { data } = await disputeService.getDisputes(params)

                const paginator = data.data

                this.disputes = paginator.data || []
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load disputes'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch single dispute
         */
        async fetchDispute(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await disputeService.getDispute(id)
                this.currentDispute = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load dispute'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Upload evidence
         */
        async uploadEvidence(id, files) {
            this.loading = true
            this.error = null

            try {
                const formData = new FormData()
                files.forEach((file, index) => {
                    formData.append(`evidence[${index}]`, file)
                })

                const { data } = await disputeService.uploadEvidence(id, formData)

                if (this.currentDispute?.id === id) {
                    this.currentDispute = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to upload evidence'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Add comment
         */
        async addComment(id, comment) {
            this.loading = true
            this.error = null

            try {
                const { data } = await disputeService.addComment(id, comment)

                if (this.currentDispute?.id === id) {
                    this.currentDispute = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to add comment'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Set filters
         */
        setFilters(filters) {
            this.filters = { ...this.filters, ...filters }
        },

        /**
         * Clear filters
         */
        clearFilters() {
            this.filters = {
                status: '',
            }
        },
    },
})
