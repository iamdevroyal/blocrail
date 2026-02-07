<template>
  <AppLayout>
    <div v-if="loading && !dispute" class="flex flex-col items-center justify-center min-h-[60vh]">
      <Loading text="Loading dispute details..." />
    </div>

    <div v-else-if="dispute" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button @click="$router.push('/seller/disputes')" class="p-2 text-gray-400 hover:text-white transition group">
            <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div class="flex items-center space-x-3">
              <h1 class="text-2xl font-bold text-white">Dispute #{{ dispute.id }}</h1>
              <Badge :variant="getStatusVariant(dispute.status)">{{ dispute.status }}</Badge>
            </div>
            <p class="text-gray-400 mt-1">Filed on {{ formatDate(dispute.created_at, true) }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Dispute Details -->
          <Card title="Dispute Information" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reason</label>
                <p class="text-white">{{ dispute.reason }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</label>
                <p class="text-gray-300 leading-relaxed">{{ dispute.description }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Number</label>
                  <p class="text-white font-mono">#{{ dispute.order_number }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Disputed Amount</label>
                  <p class="text-white font-semibold">{{ formatCurrency(dispute.amount) }}</p>
                </div>
              </div>
            </div>
          </Card>

          <!-- Evidence -->
          <Card title="Evidence" glass>
            <div class="space-y-4">
              <div v-if="dispute.evidence?.length > 0" class="grid grid-cols-2 gap-4">
                <a
                  v-for="(file, index) in dispute.evidence"
                  :key="index"
                  :href="file.url"
                  target="_blank"
                  class="relative group"
                >
                  <img
                    v-if="file.type === 'image'"
                    :src="file.url"
                    class="w-full h-32 object-cover rounded-lg border border-slate-700 group-hover:border-purple-500 transition"
                  />
                  <div v-else class="w-full h-32 bg-slate-800 rounded-lg border border-slate-700 group-hover:border-purple-500 transition flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </a>
              </div>

              <div v-if="dispute.status === 'open' || dispute.status === 'under_review'">
                <label class="block text-sm font-medium text-gray-300 mb-2">Upload Additional Evidence</label>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  @change="handleFileSelect"
                  class="hidden"
                />
                <Button variant="ghost" @click="$refs.fileInput.click()">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Choose Files
                </Button>
                <p class="text-xs text-gray-500 mt-2">Accepted: Images, PDF (Max 5MB each)</p>

                <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
                  <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between p-2 bg-slate-800 rounded">
                    <span class="text-sm text-gray-300">{{ file.name }}</span>
                    <button @click="removeFile(index)" class="text-red-400 hover:text-red-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <Button variant="primary" :loading="uploading" @click="uploadEvidence">
                    Upload Evidence
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <!-- Resolution -->
          <Card v-if="dispute.resolution" title="Resolution" glass>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Outcome</label>
                <Badge :variant="dispute.resolution.outcome === 'seller' ? 'success' : 'danger'">
                  {{ dispute.resolution.outcome === 'seller' ? 'Resolved in your favor' : 'Resolved in buyer favor' }}
                </Badge>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Admin Notes</label>
                <p class="text-gray-300">{{ dispute.resolution.notes }}</p>
              </div>
              <div v-if="dispute.resolution.refund_amount">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Refund Amount</label>
                <p class="text-white font-semibold">{{ formatCurrency(dispute.resolution.refund_amount) }}</p>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <Card title="Buyer Information" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</label>
                <p class="text-white">{{ dispute.buyer_name }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p class="text-white">{{ dispute.buyer_phone }}</p>
              </div>
              <div v-if="dispute.buyer_email">
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p class="text-white">{{ dispute.buyer_email }}</p>
              </div>
            </div>
          </Card>

          <Card title="Order Details" glass>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Number</label>
                <p class="text-white font-mono">#{{ dispute.order_number }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Total</label>
                <p class="text-white font-semibold">{{ formatCurrency(dispute.order_total) }}</p>
              </div>
              <Button variant="ghost" size="sm" @click="$router.push(`/seller/orders/${dispute.order_id}`)">
                View Full Order
              </Button>
            </div>
          </Card>

          <Card title="Timeline" glass>
            <div class="space-y-4">
              <div v-for="(event, index) in dispute.timeline" :key="index" class="flex items-start space-x-3">
                <div class="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div class="flex-1">
                  <p class="text-sm text-white">{{ event.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(event.created_at, true) }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisputeStore } from '@/stores/disputes'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'

const route = useRoute()
const router = useRouter()
const disputeStore = useDisputeStore()
const toast = useToast()

const disputeId = route.params.id
const loading = ref(true)
const uploading = ref(false)
const selectedFiles = ref([])
const fileInput = ref(null)

const dispute = computed(() => disputeStore.currentDispute)

const getStatusVariant = (status) => {
  switch (status) {
    case 'resolved': return 'success'
    case 'open': return 'warning'
    case 'under_review': return 'info'
    case 'rejected': return 'danger'
    default: return 'default'
  }
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const uploadEvidence = async () => {
  if (selectedFiles.value.length === 0) {
    toast.warning('Please select files to upload')
    return
  }

  uploading.value = true
  try {
    await disputeStore.uploadEvidence(disputeId, selectedFiles.value)
    toast.success('Evidence uploaded successfully')
    selectedFiles.value = []
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    toast.error('Failed to upload evidence')
  } finally {
    uploading.value = false
  }
}

const loadDispute = async () => {
  try {
    await disputeStore.fetchDispute(disputeId)
  } catch (error) {
    toast.error('Failed to load dispute details')
    router.push('/seller/disputes')
  } finally {
    loading.value = false
  }
}

onMounted(loadDispute)
</script>
