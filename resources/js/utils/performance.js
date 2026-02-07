/**
 * Lazy load components for better performance
 */
export const lazyLoad = (componentPath) => {
    return () => import(/* @vite-ignore */ componentPath)
}

/**
 * Lazy load component with retry logic
 * @param {Function} importFunc - The import function (e.g., () => import('./Component.vue'))
 * @param {number} maxRetries - Maximum number of retry attempts
 * @returns {Function} Component loader function
 */
export function lazyLoadWithRetry(importFunc, maxRetries = 3) {
    return () => {
        return new Promise((resolve, reject) => {
            const attemptLoad = (retriesLeft) => {
                importFunc()
                    .then(resolve)
                    .catch((error) => {
                        if (retriesLeft === 0) {
                            console.error('Failed to load component after retries:', error)
                            reject(error)
                            return
                        }

                        console.log(`Retry loading component (${maxRetries - retriesLeft + 1}/${maxRetries})...`)

                        // Wait before retrying (exponential backoff)
                        const delay = Math.min(1000 * Math.pow(2, maxRetries - retriesLeft), 5000)
                        setTimeout(() => attemptLoad(retriesLeft - 1), delay)
                    })
            }

            attemptLoad(maxRetries)
        })
    }
}
/**
 * Preload component
 */
export const preloadComponent = (componentPath) => {
    return import(/* @vite-ignore */ componentPath)
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
    let timeoutId
    return function (...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), delay)
    }
}

/**
 * Throttle function
 */
export function throttle(fn, limit = 300) {
    let inThrottle
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * Image lazy loading observer
 */
export function setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    const src = img.dataset.src

                    if (src) {
                        img.src = src
                        img.removeAttribute('data-src')
                        observer.unobserve(img)
                    }
                }
            })
        })

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img)
        })

        return imageObserver
    }
}

/**
 * Cache manager
 */
export class CacheManager {
    constructor(cacheName = 'app-cache', maxAge = 3600000) { // 1 hour default
        this.cacheName = cacheName
        this.maxAge = maxAge
    }

    set(key, value, customMaxAge = null) {
        const item = {
            value,
            timestamp: Date.now(),
            maxAge: customMaxAge || this.maxAge
        }
        localStorage.setItem(`${this.cacheName}:${key}`, JSON.stringify(item))
    }

    get(key) {
        const itemStr = localStorage.getItem(`${this.cacheName}:${key}`)
        if (!itemStr) return null

        try {
            const item = JSON.parse(itemStr)
            const now = Date.now()

            // Check if expired
            if (now - item.timestamp > item.maxAge) {
                this.remove(key)
                return null
            }

            return item.value
        } catch (error) {
            console.error('Cache parse error:', error)
            this.remove(key)
            return null
        }
    }

    remove(key) {
        localStorage.removeItem(`${this.cacheName}:${key}`)
    }

    clear() {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
            if (key.startsWith(`${this.cacheName}:`)) {
                localStorage.removeItem(key)
            }
        })
    }
}

/**
 * Bundle size optimization - tree-shakeable imports
 */
export const optimizeImports = {
    // Only import what you need from libraries
    lodash: {
        debounce: () => import('lodash-es/debounce'),
        throttle: () => import('lodash-es/throttle'),
        cloneDeep: () => import('lodash-es/cloneDeep'),
    }
}

/**
 * Performance monitoring
 */
export function measurePerformance(name, fn) {
    const start = performance.now()
    const result = fn()
    const end = performance.now()

    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)

    return result
}

/**
 * Async performance monitoring
 */
export async function measurePerformanceAsync(name, fn) {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()

    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)

    return result
}
