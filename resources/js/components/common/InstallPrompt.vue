<template>
  <Transition name="slide-up">
    <div v-if="showPrompt" class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div class="bg-slate-800/95 backdrop-blur-sm border border-purple-500 rounded-xl p-4 shadow-2xl">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <div class="flex-1">
            <h3 class="text-white font-semibold mb-1">Install Blocrail</h3>
            <p class="text-gray-400 text-sm mb-3">Install App for quick access</p>
            
            <div class="flex space-x-2">
              <button
                @click="install"
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition"
              >
                Install
              </button>
              <button
                @click="dismiss"
                class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition"
              >
                Not now
              </button>
            </div>
          </div>
          
          <button @click="dismiss" class="text-gray-500 hover:text-gray-400 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)
let deferredPrompt = null

onMounted(() => {
  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    
    // Check if user dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    const dismissedTime = dismissed ? parseInt(dismissed) : 0
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
    
    // Show again after 7 days
    if (!dismissed || daysSinceDismissed > 7) {
      setTimeout(() => {
        showPrompt.value = true
      }, 5000) // Show after 5 seconds
    }
  })
  
  // Track installation
  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed')
    showPrompt.value = false
    deferredPrompt = null
    localStorage.removeItem('pwa-install-dismissed')
  })
})

const install = async () => {
  if (!deferredPrompt) return
  
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  
  console.log(`User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} install prompt`)
  
  showPrompt.value = false
  deferredPrompt = null
  
  if (outcome === 'dismissed') {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }
}

const dismiss = () => {
  showPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
