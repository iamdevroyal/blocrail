<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex items-center space-x-4">
          <button @click="$router.back()" class="p-2 text-gray-400 hover:text-white transition group">
            <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white">Create Live Session</h1>
            <p class="text-gray-400 mt-1">Setup your storefront for a live selling event</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <Card title="Session Details" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Session Title *</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="e.g., Weekend Flash Sale!"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Tell your customers what this session is about..."
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
            </div>
          </Card>

          <Card title="Products for this Session" glass>
            <ProductSelector v-model="form.products" />
            <p v-if="form.products.length === 0" class="mt-4 text-sm text-yellow-400 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Select at least one product to start selling
            </p>
          </Card>
        </div>

        <!-- Sidebar / Settings -->
        <div class="space-y-6">
          <Card title="Social Platform" glass>
            <div class="space-y-4">
              <label class="block text-sm font-medium text-gray-300 mb-2">Where are you going live?</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="platform in platforms"
                  :key="platform.id"
                  type="button"
                  @click="form.platform_type = platform.id"
                  class="flex flex-col items-center justify-center p-3 rounded-lg border transition space-y-2"
                  :class="form.platform_type === platform.id ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-800/50 border-slate-700 text-gray-400 hover:border-slate-600'"
                >
                  <span class="text-xs font-medium">{{ platform.name }}</span>
                </button>
              </div>
            </div>
          </Card>

          <Card title="Quick Options" glass>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-300">Set as Active</span>
                <button
                  type="button"
                  @click="form.status = form.status === 'live' ? 'scheduled' : 'live'"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="form.status === 'live' ? 'bg-purple-600' : 'bg-slate-700'"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    :class="form.status === 'live' ? 'translate-x-5' : 'translate-x-0'"
                  ></span>
                </button>
              </div>
              <p class="text-xs text-gray-400">
                {{ form.status === 'live' ? 'Session will be live and accessible immediately.' : 'Session will be saved as a draft for later.' }}
              </p>
            </div>
          </Card>

          <div class="flex flex-col space-y-3">
            <Button variant="primary" type="submit" :loading="loading" :disabled="form.products.length === 0">
              {{ form.status === 'live' ? 'Launch Session' : 'Save Draft' }}
            </Button>
            <Button variant="ghost" type="button" @click="$router.back()">
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessions'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import ProductSelector from '@/components/seller/ProductSelector.vue'

const router = useRouter()
const sessionStore = useSessionStore()
const toast = useToast()

const loading = ref(false)

const platforms = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'whatsapp', name: 'WhatsApp' },
]

const form = reactive({
  title: '',
  description: '',
  platform_type: 'instagram',
  status: 'scheduled',
  products: []
})

const handleSubmit = async () => {
  if (form.products.length === 0) {
    toast.warning('Please select at least one product')
    return
  }

  loading.value = true
  try {
    const payload = {
      ...form,
      product_ids: form.products.map(p => p.id)
    }

    console.log(payload)
    const session = await sessionStore.createSession(payload)
    toast.success('Session created successfully!')
    router.push(`/seller/sessions/${session.id}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create session')
  } finally {
    loading.value = false
  }
}
</script>
