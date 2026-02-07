// Service Worker for Blocrail PWA
const CACHE_VERSION = 'v2'; // Incremented to force cache refresh
const CACHE_NAME = `blocrail-${CACHE_VERSION}`;
const API_CACHE = `blocrail-api-${CACHE_VERSION}`;
const IMAGE_CACHE = `blocrail-images-${CACHE_VERSION}`;

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/login',
    '/offline',
    '/icons/android/android-launchericon-192-192.png',
    '/icons/android/android-launchericon-512-512.png'
]

// Install event - cache app shell
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...')
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching app shell')
                return cache.addAll(PRECACHE_ASSETS)
            })
            .then(() => self.skipWaiting())
    )
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...')
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map(name => {
                            console.log('[Service Worker] Deleting old cache:', name)
                            return caches.delete(name)
                        })
                )
            })
            .then(() => self.clients.claim())
    )
})

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return
    }

    // API requests - network only with offline fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request).catch(() => {
                return new Response(
                    JSON.stringify({
                        error: 'Offline',
                        message: 'No network connection. Please check your internet and try again.'
                    }),
                    {
                        status: 503,
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
            })
        )
        return
    }

    // App pages - network first, cache fallback
    event.respondWith(
        fetch(request)
            .then(response => {
                // Clone response for caching
                const responseClone = response.clone()

                // Cache successful responses
                if (response.status === 200) {
                    caches.open(RUNTIME_CACHE)
                        .then(cache => cache.put(request, responseClone))
                }

                return response
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse
                        }

                        // Show offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/offline')
                        }

                        return new Response('Offline', { status: 503 })
                    })
            })
    )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag)
    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOrders())
    }
})

async function syncOrders() {
    // Implement order sync logic here
    console.log('[Service Worker] Syncing orders...')
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received')
    const data = event.data ? event.data.json() : {}

    const options = {
        body: data.body || 'New notification from Blocrail',
        icon: '/icons/android/android-launchericon-192-192.png',
        badge: '/icons/android/android-launchericon-72-72.png',
        vibrate: [200, 100, 200],
        data: data.data || {},
        actions: data.actions || [],
        tag: data.tag || 'default',
        requireInteraction: data.requireInteraction || false
    }

    event.waitUntil(
        self.registration.showNotification(data.title || 'Blocrail', options)
    )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked')
    event.notification.close()

    const urlToOpen = event.notification.data.url || '/seller/dashboard'

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                // Check if there's already a window open
                for (let client of windowClients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus()
                    }
                }
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen)
                }
            })
    )
})
