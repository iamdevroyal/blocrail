export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration.scope)

                    // Check for updates periodically
                    setInterval(() => {
                        registration.update()
                    }, 60000) // Check every minute

                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing

                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                showUpdateNotification()
                            }
                        })
                    })
                })
                .catch(error => {
                    console.error('❌ Service Worker registration failed:', error)
                })

            // Track installation
            let deferredPrompt
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault()
                deferredPrompt = e
                // Store for later use
                window.deferredPrompt = deferredPrompt
            })

            window.addEventListener('appinstalled', () => {
                console.log('✅ PWA installed successfully')
                window.deferredPrompt = null
            })
        })
    } else {
        console.warn('⚠️ Service Workers are not supported in this browser')
    }
}

function showUpdateNotification() {
    // Dispatch custom event for update notification
    window.dispatchEvent(new CustomEvent('sw-update-available'))

    // Show toast if available
    if (window.toast) {
        window.toast.info('New version available! Refresh to update.', {
            timeout: 0,
            closeButton: true,
            onClick: () => {
                window.location.reload()
            }
        })
    }
}
