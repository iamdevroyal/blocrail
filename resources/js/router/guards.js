/**
 * Route guards for authentication and authorization
 */

// Helper to safely parse user from local storage
const getAuthUser = () => {
    try {
        const userStr = localStorage.getItem('auth_user')
        if (!userStr || userStr === 'undefined' || userStr === 'null') return {}
        return JSON.parse(userStr)
    } catch (e) {
        console.error('Failed to parse auth_user:', e)
        return {}
    }
}

export function authGuard(to, from, next) {
    const token = localStorage.getItem('auth_token')

    if (!token) {
        next('/login')
    } else {
        next()
    }
}

export function guestGuard(to, from, next) {
    const token = localStorage.getItem('auth_token')

    if (token) {
        const user = getAuthUser()
        if (user.role === 'admin') {
            next('/admin/dashboard')
        } else if (user.role === 'seller') {
            next('/seller/dashboard')
        } else {
            // Invalid role or no user data, clear token and stay on login or let guest pass (but generic logic says stay)
            // If we have a token but no role, it's safer to clear and let them login again.
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
            next()
        }
    } else {
        next()
    }
}

export function roleGuard(allowedRoles) {
    return (to, from, next) => {
        const user = getAuthUser()
        const userRole = user.role

        if (allowedRoles.includes(userRole)) {
            next()
        } else {
            next('/unauthorized')
        }
    }
}

export function adminGuard(to, from, next) {
    const user = getAuthUser()

    if (user.role === 'admin') {
        next()
    } else {
        // If not admin, check if seller to redirect appropriately, otherwise login
        if (user.role === 'seller') {
            next('/seller/dashboard')
        } else {
            next('/login')
        }
    }
}

export function sellerGuard(to, from, next) {
    const user = getAuthUser()

    if (user.role === 'seller') {
        next()
    } else {
        // If not seller, check if admin to redirect appropriately, otherwise login
        if (user.role === 'admin') {
            next('/admin/dashboard')
        } else {
            next('/login')
        }
    }
}
