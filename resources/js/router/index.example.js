import { createRouter, createWebHistory } from 'vue-router'
import { lazyLoadWithRetry } from '@/utils/performance'

// Eager load critical routes
import NotFound from '@/pages/errors/NotFound.vue'

const routes = [
    // Public Routes (Lazy loaded)
    {
        path: '/',
        name: 'home',
        component: lazyLoadWithRetry('@/pages/Home.vue'),
        meta: { title: 'Home' }
    },
    {
        path: '/login',
        name: 'login',
        component: lazyLoadWithRetry('@/pages/auth/Login.vue'),
        meta: { title: 'Login', guest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: lazyLoadWithRetry('@/pages/auth/Register.vue'),
        meta: { title: 'Register', guest: true }
    },

    // Public Checkout (Lazy loaded)
    {
        path: '/live/:token',
        name: 'checkout',
        component: lazyLoadWithRetry('@/pages/public/Checkout.vue'),
        meta: { title: 'Checkout' }
    },

    // Seller Routes (Lazy loaded with auth)
    {
        path: '/seller',
        meta: { requiresAuth: true, role: 'seller' },
        children: [
            {
                path: 'dashboard',
                name: 'seller.dashboard',
                component: lazyLoadWithRetry('@/pages/seller/Dashboard.vue'),
                meta: { title: 'Seller Dashboard' }
            },
            {
                path: 'products',
                name: 'seller.products',
                component: lazyLoadWithRetry('@/pages/seller/products/Index.vue'),
                meta: { title: 'Products' }
            },
            {
                path: 'products/create',
                name: 'seller.products.create',
                component: lazyLoadWithRetry('@/pages/seller/products/Create.vue'),
                meta: { title: 'Create Product' }
            },
            {
                path: 'sessions',
                name: 'seller.sessions',
                component: lazyLoadWithRetry('@/pages/seller/sessions/Index.vue'),
                meta: { title: 'Live Sessions' }
            },
            {
                path: 'sessions/create',
                name: 'seller.sessions.create',
                component: lazyLoadWithRetry('@/pages/seller/sessions/Create.vue'),
                meta: { title: 'Create Session' }
            },
            {
                path: 'orders',
                name: 'seller.orders',
                component: lazyLoadWithRetry('@/pages/seller/orders/Index.vue'),
                meta: { title: 'Orders' }
            },
            {
                path: 'orders/:id',
                name: 'seller.orders.show',
                component: lazyLoadWithRetry('@/pages/seller/orders/Show.vue'),
                meta: { title: 'Order Details' }
            },
            {
                path: 'wallet',
                name: 'seller.wallet',
                component: lazyLoadWithRetry('@/pages/seller/Wallet.vue'),
                meta: { title: 'Wallet' }
            },
            {
                path: 'disputes',
                name: 'seller.disputes',
                component: lazyLoadWithRetry('@/pages/seller/disputes/Index.vue'),
                meta: { title: 'Disputes' }
            },
            {
                path: 'settings',
                name: 'seller.settings',
                component: lazyLoadWithRetry('@/pages/seller/Settings.vue'),
                meta: { title: 'Settings' }
            },
        ]
    },

    // Admin Routes (Lazy loaded with auth)
    {
        path: '/admin',
        meta: { requiresAuth: true, role: 'admin' },
        children: [
            {
                path: 'dashboard',
                name: 'admin.dashboard',
                component: lazyLoadWithRetry('@/pages/admin/Dashboard.vue'),
                meta: { title: 'Admin Dashboard' }
            },
            {
                path: 'sellers',
                name: 'admin.sellers',
                component: lazyLoadWithRetry('@/pages/admin/sellers/Index.vue'),
                meta: { title: 'Sellers' }
            },
            {
                path: 'sellers/:id',
                name: 'admin.sellers.show',
                component: lazyLoadWithRetry('@/pages/admin/sellers/Show.vue'),
                meta: { title: 'Seller Details' }
            },
            {
                path: 'orders',
                name: 'admin.orders',
                component: lazyLoadWithRetry('@/pages/admin/orders/Index.vue'),
                meta: { title: 'Orders' }
            },
            {
                path: 'orders/:id',
                name: 'admin.orders.show',
                component: lazyLoadWithRetry('@/pages/admin/orders/Show.vue'),
                meta: { title: 'Order Details' }
            },
            {
                path: 'disputes',
                name: 'admin.disputes',
                component: lazyLoadWithRetry('@/pages/admin/disputes/Index.vue'),
                meta: { title: 'Disputes' }
            },
            {
                path: 'disputes/:id',
                name: 'admin.disputes.show',
                component: lazyLoadWithRetry('@/pages/admin/disputes/Show.vue'),
                meta: { title: 'Dispute Details' }
            },
            {
                path: 'payouts',
                name: 'admin.payouts',
                component: lazyLoadWithRetry('@/pages/admin/payouts/Index.vue'),
                meta: { title: 'Payouts' }
            },
            {
                path: 'payouts/:id',
                name: 'admin.payouts.show',
                component: lazyLoadWithRetry('@/pages/admin/payouts/Show.vue'),
                meta: { title: 'Payout Details' }
            },
        ]
    },

    // Error Routes
    {
        path: '/error/500',
        name: 'error.500',
        component: lazyLoadWithRetry('@/pages/errors/ServerError.vue'),
        meta: { title: 'Server Error' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        meta: { title: '404 Not Found' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Navigation guards
router.beforeEach((to, from, next) => {
    // Set page title
    document.title = to.meta.title ? `${to.meta.title} - Blocrail` : 'Blocrail'

    // Auth check
    const isAuthenticated = !!localStorage.getItem('auth_token')
    const userRole = localStorage.getItem('user_role')

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (to.meta.guest && isAuthenticated) {
        next({ name: 'home' })
    } else if (to.meta.role && userRole !== to.meta.role) {
        next({ name: 'not-found' })
    } else {
        next()
    }
})

export default router
