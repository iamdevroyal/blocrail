<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="relative p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-slate-800"
      :class="{ 'bg-slate-800 text-white': showDropdown }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <!-- Unread Badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-red-500 rounded-full"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <NotificationDropdown
      v-if="showDropdown"
      @close="showDropdown = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNotificationStore } from '@/stores/notifications'
import NotificationDropdown from './NotificationDropdown.vue'

const notificationStore = useNotificationStore()
const showDropdown = ref(false)

const unreadCount = computed(() => notificationStore.unreadCount)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.notification-bell')
  if (!dropdown && showDropdown.value) {
    showDropdown.value = false
  }
}

onMounted(() => {
  // Start polling for notifications
  notificationStore.startPolling()
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // Stop polling when component is destroyed
  notificationStore.stopPolling()
  
  // Remove click outside listener
  document.removeEventListener('click', handleClickOutside)
})
</script>
