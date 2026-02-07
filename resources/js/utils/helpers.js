import { format, formatDistance, formatRelative } from 'date-fns'
import { CURRENCY_SYMBOL } from './constants'

/**
 * Format currency amount
 */
export function formatCurrency(amount, includeCurrency = true) {
    const formatted = new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount || 0)

    return includeCurrency ? `${CURRENCY_SYMBOL}${formatted}` : formatted
}

/**
 * Format date
 */
export function formatDate(date, formatStr = 'MMM dd, yyyy') {
    if (!date) return ''
    return format(new Date(date), formatStr)
}

/**
 * Format date and time
 */
export function formatDateTime(date) {
    if (!date) return ''
    return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date) {
    if (!date) return ''
    return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

/**
 * Format relative date (e.g., "yesterday at 3:00 PM")
 */
export function formatRelativeDate(date) {
    if (!date) return ''
    return formatRelative(new Date(date), new Date())
}

/**
 * Truncate text
 */
export function truncate(text, length = 50) {
    if (!text) return ''
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
}

/**
 * Capitalize first letter
 */
export function capitalize(text) {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Convert snake_case to Title Case
 */
export function snakeToTitle(text) {
    if (!text) return ''
    return text
        .split('_')
        .map(word => capitalize(word))
        .join(' ')
}

/**
 * Generate random string
 */
export function randomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (error) {
        console.error('Failed to copy:', error)
        return false
    }
}

/**
 * Download file
 */
export function downloadFile(url, filename) {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * Debounce function
 */
export function debounce(func, wait = 300) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Get initials from name
 */
export function getInitials(name) {
    if (!name) return ''
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

/**
 * Format phone number
 */
export function formatPhone(phone) {
    if (!phone) return ''
    // Format: 0801 234 5678
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/)
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`
    }
    return phone
}

/**
 * Validate email
 */
export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

/**
 * Validate phone number (Nigerian)
 */
export function isValidPhone(phone) {
    const re = /^0\d{10}$/
    return re.test(phone)
}

/**
 * Get file extension
 */
export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
