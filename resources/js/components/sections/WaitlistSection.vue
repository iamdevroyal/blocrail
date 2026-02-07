<script setup>
import { ref } from 'vue'
import GradientButton from '../ui/GradientButton.vue'
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import waitlistService from '@/services/waitlist.service'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = ref({
  name: '',
  email: '',
  platform: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(null)
const validationErrors = ref({})

const platforms = ['Instagram', 'TikTok', 'Facebook', 'Other']

const submitWaitlist = async () => {
  loading.value = true
  error.value = null
  validationErrors.value = {}
  
  try {
    await waitlistService.join(form.value)
    success.value = true
    form.value = { name: '', email: '', platform: '' }
    toast.success('Successfully joined the waitlist!')
  } catch (err) {
    if (err.response?.status === 422) {
      // Validation errors
      validationErrors.value = err.response.data.errors || {}
      error.value = Object.values(validationErrors.value).flat()[0] || 'Please check your input.'
    } else {
      error.value = err.response?.data?.message || 'An error occurred. Please try again.'
    }
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section id="waitlist" class="py-24 px-6 relative overflow-hidden">
    <div class="max-w-3xl mx-auto">
      <div class="glass-card p-8 md:p-12 relative overflow-hidden border-purple-500/30">
        <!-- Background Accents -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div class="relative z-10 text-center mb-10">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-6 uppercase tracking-wider">
            <Sparkles class="w-3 h-3" />
            <span>Early Access</span>
          </div>
          <h2 class="text-3xl md:text-5xl font-black font-heading mb-4 leading-tight">
            Join the <span class="gradient-text">Waitlist</span>
          </h2>
          <p class="text-text-secondary text-lg">
            Be among the first sellers to experience secure live commerce payments.
          </p>
        </div>

        <!-- Success State -->
        <div v-if="success" class="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-fade-in-up">
          <div class="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 class="w-8 h-8 text-green-500" />
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">You're on the list!</h3>
          <p class="text-text-secondary">Thanks for joining. We'll be in touch soon with your early access invite.</p>
          <button @click="success = false" class="mt-6 text-sm text-text-muted hover:text-white underline">
            Register another email
          </button>
        </div>

        <!-- Form State -->
        <form v-else @submit.prevent="submitWaitlist" class="space-y-6 max-w-md mx-auto animate-fade-in-up">
          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Full Name</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-white/20"
              placeholder="e.g. Sarah Jones"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Email Address</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              class="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-white/20"
              placeholder="sarah@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Primary Platform</label>
            <div class="relative">
              <select 
                v-model="form.platform"
                class="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled selected>Select platform...</option>
                <option v-for="p in platforms" :key="p" :value="p">{{ p }}</option>
              </select>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <GradientButton 
            type="submit" 
            class="w-full" 
            glow 
            :disabled="loading"
          >
            <span v-if="!loading">Join Waitlist</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          </GradientButton>
          
          <p class="text-xs text-center text-text-muted">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
