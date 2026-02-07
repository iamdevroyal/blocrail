import axios from 'axios'
import router from '@/router'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Enable credentials for Sanctum CSRF
})

// Request interceptor - attach token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor - handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized - redirect to login
            if (error.response.status === 401) {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_user')
                router.push('/login')
            }

            // Handle 403 Forbidden
            if (error.response.status === 403) {
                console.error('Access forbidden')
            }

            // Handle 404 Not Found
            if (error.response.status === 404) {
                console.error('Resource not found')
            }

            // Handle 500 Server Error
            if (error.response.status === 500) {
                console.error('Server error occurred')
            }
        }

        return Promise.reject(error)
    }
)

export default api
