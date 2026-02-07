/**
 * Application constants
 */

export const APP_NAME = 'Blocrail'

// Order statuses
export const ORDER_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
}

export const ORDER_STATUS_LABELS = {
    [ORDER_STATUS.PENDING]: 'Pending Payment',
    [ORDER_STATUS.PAID]: 'Paid',
    [ORDER_STATUS.PROCESSING]: 'Processing',
    [ORDER_STATUS.SHIPPED]: 'Shipped',
    [ORDER_STATUS.DELIVERED]: 'Delivered',
    [ORDER_STATUS.CANCELLED]: 'Cancelled',
}

// Payment statuses
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
}

// Escrow statuses
export const ESCROW_STATUS = {
    PENDING: 'pending',
    HELD: 'held',
    RELEASED: 'released',
    REFUNDED: 'refunded',
}

// Seller tiers
export const SELLER_TIER = {
    TIER1: 'tier1',
    TIER2: 'tier2',
    TIER3: 'tier3',
}

export const SELLER_TIER_LABELS = {
    [SELLER_TIER.TIER1]: 'New Seller',
    [SELLER_TIER.TIER2]: 'Trusted Seller',
    [SELLER_TIER.TIER3]: 'Enterprise Seller',
}

// Dispute statuses
export const DISPUTE_STATUS = {
    OPEN: 'open',
    UNDER_REVIEW: 'under_review',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
}

// Payout statuses
export const PAYOUT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
}

// Session statuses
export const SESSION_STATUS = {
    DRAFT: 'draft',
    ACTIVE: 'active',
    ENDED: 'ended',
}

// Platform types
export const PLATFORM_TYPES = [
    { value: 'instagram', label: 'Instagram Live' },
    { value: 'tiktok', label: 'TikTok Live' },
    { value: 'facebook', label: 'Facebook Live' },
    { value: 'youtube', label: 'YouTube Live' },
    { value: 'other', label: 'Other' },
]

// Pagination
export const DEFAULT_PAGE_SIZE = 15
export const PAGE_SIZE_OPTIONS = [10, 15, 25, 50, 100]

// Currency
export const CURRENCY = 'NGN'
export const CURRENCY_SYMBOL = '₦'

// Minimum payout amount
export const MIN_PAYOUT_AMOUNT = 5000
