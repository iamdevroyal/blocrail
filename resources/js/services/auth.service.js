import api from './api'

export const authService = {
    /**
     * Register a new seller
     */
    async register(data) {
        return api.post('/auth/register', data)
    },

    /**
     * Login user
     */
    async login(credentials) {
        // CSRF cookie is on the root path, not /api
        // We get the base URL from the API config or hardcode the backend root
        const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000'
        await api.get(`${backendUrl}/sanctum/csrf-cookie`)
        return api.post('/auth/login', credentials)
    },

    /**
     * Logout user
     */
    async logout() {
        return api.post('/auth/logout')
    },

    /**
     * Get authenticated user
     */
    async me() {
        return api.get('/auth/me')
    },
}
