import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('auth_user')) || null,
        token: localStorage.getItem('auth_token') || null,
        isAuthenticated: !!localStorage.getItem('auth_token'),
        loading: false,
        error: null,
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 'admin',
        isSeller: (state) => state.user?.role === 'seller',
        userName: (state) => state.user?.name || '',
        userEmail: (state) => state.user?.email || '',
    },

    actions: {
        /**
         * Login user
         */
        async login(credentials) {
            this.loading = true
            this.error = null

            try {
                const { data } = await authService.login(credentials)

                // The backend returns { success: true, data: { user: ..., token: ... } }
                // So we need to access data.data.*
                const authData = data.data

                this.token = authData.token
                this.user = authData.user
                this.isAuthenticated = true

                // Persist to localStorage
                localStorage.setItem('auth_token', authData.token)
                localStorage.setItem('auth_user', JSON.stringify(authData.user))

                // Redirect based on role
                if (authData.user.role === 'admin') {
                    router.push('/admin/dashboard')
                } else {
                    router.push('/seller/dashboard')
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Register new seller
         */
        async register(userData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await authService.register(userData)

                this.token = data.token
                this.user = data.user
                this.isAuthenticated = true

                // Persist to localStorage
                localStorage.setItem('auth_token', data.token)
                localStorage.setItem('auth_user', JSON.stringify(data.user))

                router.push('/seller/dashboard')

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Logout user
         */
        async logout() {
            try {
                await authService.logout()
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                // Clear state
                this.user = null
                this.token = null
                this.isAuthenticated = false

                // Clear localStorage
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_user')

                router.push('/login')
            }
        },

        /**
         * Fetch current user
         */
        async fetchUser() {
            try {
                const { data } = await authService.me()
                this.user = data
                this.isAuthenticated = true
                localStorage.setItem('auth_user', JSON.stringify(data))
                return data
            } catch (error) {
                this.logout()
                throw error
            }
        },

        /**
         * Check if user is authenticated
         */
        checkAuth() {
            return this.isAuthenticated && this.token
        },
    },
})
