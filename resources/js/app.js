import './bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import '../css/app.css'

import { setupErrorHandler, setupOfflineDetection } from '@/utils/errorHandler'
import { registerServiceWorker } from '@/utils/registerSW'

// Register Service Worker for PWA
registerServiceWorker()

const app = createApp(App)
const pinia = createPinia()

// Setup global error handling and offline detection
setupErrorHandler(app)
setupOfflineDetection()

// Toast configuration
const toastOptions = {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
}

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
