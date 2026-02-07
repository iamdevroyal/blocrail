import { useToast } from 'vue-toastification'
import router from '@/router'

/**
 * Global error handler
 */
export function setupErrorHandler(app) {
    const toast = useToast()

    // Vue error handler
    app.config.errorHandler = (err, instance, info) => {
        console.error('Vue Error:', err)
        console.error('Component:', instance)
        console.error('Info:', info)

        // Show user-friendly error message
        toast.error('An unexpected error occurred. Please try again.')

        // Log to error tracking service (e.g., Sentry)
        if (import.meta.env.PROD) {
            // window.Sentry?.captureException(err)
        }
    }

    // Global unhandled rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason)

        // Prevent default browser error handling
        event.preventDefault()

        // Show user-friendly error message
        toast.error('An unexpected error occurred. Please try again.')

        // Log to error tracking service
        if (import.meta.env.PROD) {
            // window.Sentry?.captureException(event.reason)
        }
    })
}

/**
 * API error handler
 */
export function handleApiError(error) {
    const toast = useToast()

    if (!error.response) {
        // Network error
        toast.error('Network error. Please check your connection.')
        return
    }

    const status = error.response.status
    const message = error.response.data?.message || 'An error occurred'

    switch (status) {
        case 400:
            toast.error(message)
            break
        case 401:
            toast.error('Session expired. Please login again.')
            router.push('/login')
            break
        case 403:
            toast.error('You don\'t have permission to perform this action.')
            break
        case 404:
            toast.error('Resource not found.')
            break
        case 422:
            // Validation errors
            const errors = error.response.data?.errors
            if (errors) {
                Object.values(errors).flat().forEach(err => {
                    toast.error(err)
                })
            } else {
                toast.error(message)
            }
            break
        case 429:
            toast.error('Too many requests. Please try again later.')
            break
        case 500:
            toast.error('Server error. Please try again later.')
            router.push('/error/500')
            break
        case 503:
            toast.error('Service temporarily unavailable.')
            break
        default:
            toast.error(message)
    }
}

/**
 * Retry logic with exponential backoff
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error

            // Don't retry on client errors (4xx)
            if (error.response?.status >= 400 && error.response?.status < 500) {
                throw error
            }

            // Wait before retrying (exponential backoff)
            if (i < maxRetries - 1) {
                const delay = baseDelay * Math.pow(2, i)
                await new Promise(resolve => setTimeout(resolve, delay))
            }
        }
    }

    throw lastError
}

/**
 * Offline detection
 */
export function setupOfflineDetection() {
    const toast = useToast()
    let isOffline = false

    window.addEventListener('offline', () => {
        isOffline = true
        toast.warning('You are offline. Some features may not work.', {
            timeout: false,
            closeButton: false,
        })
    })

    window.addEventListener('online', () => {
        if (isOffline) {
            toast.success('You are back online!')
            isOffline = false

            // Reload page to sync data
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    })
}
