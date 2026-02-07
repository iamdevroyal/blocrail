<template>
  <AppLayout>
    <div v-if="loading && !form.title" class="flex flex-col items-center justify-center min-h-[60vh]">
      <Loading text="Loading session details..." />
    </div>

    <div v-else class="max-w-4xl mx-auto space-y-6">
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
            <h1 class="text-2xl md:text-3xl font-bold text-white">Edit Session</h1>
            <p class="text-gray-400 mt-1">Update your live session settings</p>
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
          </Card>
        </div>

        <!-- Sidebar / Settings -->
        <div class="space-y-6">
          <Card title="Social Platform" glass>
            <div class="space-y-4">
              <label class="block text-sm font-medium text-gray-300 mb-2">Platform</label>
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

          <Card title="Status" glass>
             <div class="flex items-center justify-between">
                <span class="text-sm text-gray-300 capitalize">{{ form.status }}</span>
                <Badge :variant="getStatusVariant(form.status)">{{ form.status }}</Badge>
              </div>
              <p class="text-xs text-gray-400 mt-2">
                To change status, use the controls on the session dashboard.
              </p>
          </Card>

          <div class="flex flex-col space-y-3">
            <Button variant="primary" type="submit" :loading="saving">
              Update Session
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/sessions'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import ProductSelector from '@/components/seller/ProductSelector.vue'

const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()
const toast = useToast()

const sessionId = route.params.id
const loading = ref(true)
const saving = ref(false)

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
  status: 'draft',
  products: []
})

const getStatusVariant = (status) => {
  switch (status) {
    case 'active': return 'success'
    case 'draft': return 'warning'
    case 'ended': return 'default'
    default: return 'default'
  }
}

const loadSession = async () => {
  try {
    const data = await sessionStore.fetchSession(sessionId)
    form.title = data.title
    form.description = data.description
    form.platform_type = data.platform_type
    form.status = data.status
    form.products = data.products || []
  } catch (error) {
    toast.error('Failed to load session details')
    router.push('/seller/sessions')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (form.products.length === 0) {
    toast.warning('Please select at least one product')
    return
  }

  saving.value = true
  try {
    const payload = {
      ...form,
      product_ids: form.products.map(p => p.id)
    }
    await sessionStore.updateSession(sessionId, payload)
    toast.success('Session updated successfully!')
    router.push(`/seller/sessions/${sessionId}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update session')
  } finally {
    saving.value = false
  }
}

onMounted(loadSession)
</script>
