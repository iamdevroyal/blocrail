import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, guestGuard, adminGuard, sellerGuard } from './guards'
import { lazyLoadWithRetry } from '@/utils/performance'

const routes = [
    // Public routes
    {
        path: '/',
        name: 'home',
        component: lazyLoadWithRetry(() => import('@/pages/LandingPage.vue')),
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: lazyLoadWithRetry(() => import('@/pages/PrivacyPolicy.vue')),
    },
    {
        path: '/terms',
        name: 'terms',
        component: lazyLoadWithRetry(() => import('@/pages/TermsOfService.vue')),
    },

    // Auth routes
    {
        path: '/login',
        name: 'login',
        component: lazyLoadWithRetry(() => import('@/pages/auth/Login.vue')),
        beforeEnter: guestGuard,
    },
    {
        path: '/register',
        name: 'register',
        component: lazyLoadWithRetry(() => import('@/pages/auth/Register.vue')),
        beforeEnter: guestGuard,
    },

    // Public checkout
    {
        path: '/live/:token',
        name: 'checkout',
        component: lazyLoadWithRetry(() => import('@/pages/public/Checkout.vue')),
    },

    // Offline page (PWA)
    {
        path: '/offline',
        name: 'offline',
        component: lazyLoadWithRetry(() => import('@/pages/Offline.vue')),
    },

    // Seller routes
    {
        path: '/seller',
        redirect: '/seller/dashboard',
        beforeEnter: [authGuard, sellerGuard],
        children: [
            {
                path: 'dashboard',
                name: 'seller.dashboard',
                component: lazyLoadWithRetry(() => import('@/pages/seller/Dashboard.vue')),
            },
            {
                path: 'products',
                name: 'seller.products',
                component: lazyLoadWithRetry(() => import('@/pages/seller/products/Index.vue')),
            },
            {
                path: 'products/create',
                name: 'seller.products.create',
                component: lazyLoadWithRetry(() => import('@/pages/seller/products/Create.vue')),
            },
            {
                path: 'products/:id/edit',
                name: 'seller.products.edit',
                component: lazyLoadWithRetry(() => import('@/pages/seller/products/Edit.vue')),
            },
            {
                path: 'products/:id',
                name: 'seller.products.show',
                component: lazyLoadWithRetry(() => import('@/pages/seller/products/Show.vue')),
            },
            {
                path: 'sessions',
                name: 'seller.sessions',
                component: lazyLoadWithRetry(() => import('@/pages/seller/sessions/Index.vue')),
            },
            {
                path: 'sessions/create',
                name: 'seller.sessions.create',
                component: lazyLoadWithRetry(() => import('@/pages/seller/sessions/Create.vue')),
            },
            {
                path: 'sessions/:id',
                name: 'seller.sessions.show',
                component: lazyLoadWithRetry(() => import('@/pages/seller/sessions/Show.vue')),
            },
            {
                path: 'orders',
                name: 'seller.orders',
                component: lazyLoadWithRetry(() => import('@/pages/seller/orders/Index.vue')),
            },
            {
                path: 'orders/:id',
                name: 'seller.orders.show',
                component: lazyLoadWithRetry(() => import('@/pages/seller/orders/Show.vue')),
            },
            {
                path: 'wallet',
                name: 'seller.wallet',
                component: lazyLoadWithRetry(() => import('@/pages/seller/wallet/Index.vue')),
            },
            {
                path: 'payouts',
                name: 'seller.payouts',
                component: lazyLoadWithRetry(() => import('@/pages/seller/payouts/Index.vue')),
            },
            {
                path: 'disputes',
                name: 'seller.disputes',
                component: lazyLoadWithRetry(() => import('@/pages/seller/disputes/Index.vue')),
            },
            {
                path: 'disputes/:id',
                name: 'seller.disputes.show',
                component: lazyLoadWithRetry(() => import('@/pages/seller/disputes/Show.vue')),
            },
            {
                path: 'settings',
                name: 'seller.settings',
                component: lazyLoadWithRetry(() => import('@/pages/seller/settings/Index.vue')),
            },
        ],
    },

    // Admin routes
    {
        path: '/admin',
        redirect: '/admin/dashboard',
        beforeEnter: [authGuard, adminGuard],
        children: [
            {
                path: 'dashboard',
                name: 'admin.dashboard',
                component: lazyLoadWithRetry(() => import('@/pages/admin/Dashboard.vue')),
            },
            {
                path: 'sellers',
                name: 'admin.sellers',
                component: lazyLoadWithRetry(() => import('@/pages/admin/sellers/Index.vue')),
            },
            {
                path: 'sellers/:id',
                name: 'admin.sellers.show',
                component: lazyLoadWithRetry(() => import('@/pages/admin/sellers/Show.vue')),
            },
            {
                path: 'orders',
                name: 'admin.orders',
                component: lazyLoadWithRetry(() => import('@/pages/admin/orders/Index.vue')),
            },
            {
                path: 'orders/:id',
                name: 'admin.orders.show',
                component: lazyLoadWithRetry(() => import('@/pages/admin/orders/Show.vue')),
            },
            {
                path: 'disputes',
                name: 'admin.disputes',
                component: lazyLoadWithRetry(() => import('@/pages/admin/disputes/Index.vue')),
            },
            {
                path: 'disputes/:id',
                name: 'admin.disputes.show',
                component: lazyLoadWithRetry(() => import('@/pages/admin/disputes/Show.vue')),
            },
            {
                path: 'payouts',
                name: 'admin.payouts',
                component: lazyLoadWithRetry(() => import('@/pages/admin/payouts/Index.vue')),
            },
            {
                path: 'payouts/:id',
                name: 'admin.payouts.show',
                component: lazyLoadWithRetry(() => import('@/pages/admin/payouts/Show.vue')),
            },
            {
                path: 'waitlist',
                name: 'admin.waitlist',
                component: lazyLoadWithRetry(() => import('@/pages/admin/Waitlist.vue')),
            },
        ],
    },

    // 404 catch-all
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: lazyLoadWithRetry(() => import('@/pages/errors/NotFound.vue')),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        el: to.hash,
                        behavior: 'smooth',
                    })
                }, 500)
            })
        }
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

export default router
