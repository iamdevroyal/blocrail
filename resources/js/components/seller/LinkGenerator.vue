<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        type="text"
        readonly
        :value="sessionUrl"
        class="w-full pl-4 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        @click="copyToClipboard"
        class="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-white bg-slate-800 rounded-md transition"
        title="Copy to clipboard"
      >
        <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 3h4m-4 4h4m-4 4h4" />
        </svg>
        <svg v-else class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
    <div class="flex space-x-2">
      <Button variant="ghost" size="sm" class="flex-1" @click="shareViaWhatsApp">
        Share on WhatsApp
      </Button>
      <Button variant="ghost" size="sm" class="flex-1" @click="shareViaInstagram">
        Instagram Bio
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  token: {
    type: String,
    required: true
  }
})

const toast = useToast()
const copied = ref(false)

const sessionUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin
  return `${baseUrl}/live/${props.token}`
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(sessionUrl.value)
    copied.value = true
    toast.success('Link copied to clipboard!')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    toast.error('Failed to copy link')
  }
}

const shareViaWhatsApp = () => {
  const text = encodeURIComponent(`Check out my live store session: ${sessionUrl.value}`)
  window.open(`https://wa.me/?text=${text}`, '_blank')
}

const shareViaInstagram = () => {
  toast.info('Copy the link and add it to your Instagram bio!')
}
</script>
