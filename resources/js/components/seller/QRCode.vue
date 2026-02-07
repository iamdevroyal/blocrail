<template>
  <div class="flex flex-col items-center space-y-4">
    <div class="p-4 bg-white rounded-xl shadow-lg">
      <img
        :src="qrCodeUrl"
        :alt="`QR Code for ${url}`"
        class="w-48 h-48"
        @load="loading = false"
      />
      <div v-if="loading" class="flex items-center justify-center w-48 h-48">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    </div>
    <Button variant="ghost" size="sm" @click="downloadQR">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download QR Code
    </Button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

const loading = ref(true)

const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(props.url)}&bgcolor=FFFFFF&color=000000&margin=10`
})

const downloadQR = async () => {
  try {
    const response = await fetch(qrCodeUrl.value)
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'session-qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('Failed to download QR code', error)
  }
}
</script>
