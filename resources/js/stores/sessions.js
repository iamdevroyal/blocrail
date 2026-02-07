import { defineStore } from 'pinia'
import { sessionService } from '@/services/session.service'

export const useSessionStore = defineStore('sessions', {
    state: () => ({
        sessions: [],
        currentSession: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            search: '',
            status: '',
        },
        loading: false,
        error: null,
    }),

    getters: {
        activeSessions: (state) => state.sessions.filter(s => s.status === 'active'),
        draftSessions: (state) => state.sessions.filter(s => s.status === 'draft'),
        endedSessions: (state) => state.sessions.filter(s => s.status === 'ended'),
    },

    actions: {
        /**
         * Fetch sessions with pagination and filters
         */
        async fetchSessions(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    search: this.filters.search,
                    status: this.filters.status,
                }

                const { data } = await sessionService.getSessions(params)

                const paginator = data.data

                this.sessions = paginator.data || []
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load sessions'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch single session
         */
        async fetchSession(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sessionService.getSession(id)
                this.currentSession = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Create new session
         */
        async createSession(sessionData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sessionService.createSession(sessionData)
                this.sessions.unshift(data.data)
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to create session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update session
         */
        async updateSession(id, sessionData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sessionService.updateSession(id, sessionData)

                const index = this.sessions.findIndex(s => s.id === id)
                if (index !== -1) {
                    this.sessions[index] = data.data
                }

                this.currentSession = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Delete session
         */
        async deleteSession(id) {
            this.loading = true
            this.error = null

            try {
                await sessionService.deleteSession(id)
                this.sessions = this.sessions.filter(s => s.id !== id)
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Activate session
         */
        async activateSession(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sessionService.activateSession(id)

                const index = this.sessions.findIndex(s => s.id === id)
                if (index !== -1) {
                    this.sessions[index] = data.data
                }

                if (this.currentSession?.id === id) {
                    this.currentSession = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to activate session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * End session
         */
        async endSession(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await sessionService.endSession(id)

                const index = this.sessions.findIndex(s => s.id === id)
                if (index !== -1) {
                    this.sessions[index] = data.data
                }

                if (this.currentSession?.id === id) {
                    this.currentSession = data.data
                }

                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to end session'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Get session analytics
         */
        async fetchAnalytics(id) {
            try {
                const { data } = await sessionService.getAnalytics(id)
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load analytics'
                throw error
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
                search: '',
                status: '',
            }
        },
    },
})
