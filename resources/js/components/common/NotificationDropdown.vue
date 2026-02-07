<template>
  <div class="absolute right-0 mt-2 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 notification-dropdown">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-slate-700">
      <h3 class="text-white font-semibold">Notifications</h3>
      <button
        v-if="unreadNotifications.length > 0"
        @click="handleMarkAllAsRead"
        class="text-xs text-purple-400 hover:text-purple-300 transition"
      >
        Mark all as read
      </button>
    </div>

    <!-- Notifications List -->
    <div class="max-h-96 overflow-y-auto">
      <Loading v-if="loading" text="Loading..." class="py-8" />
      
      <div v-else-if="notifications.length > 0" class="divide-y divide-slate-700">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          @click="handleNotificationClick(notification)"
          class="px-4 py-3 hover:bg-slate-700/50 transition cursor-pointer"
          :class="{ 'bg-slate-700/30': !notification.read_at }"
        >
          <div class="flex items-start space-x-3">
            <!-- Icon -->
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              :class="getNotificationIconClass(notification.type)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="getNotificationIconPath(notification.type)"
                />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium">{{ notification.title }}</p>
              <p class="text-gray-400 text-xs mt-1">{{ notification.message }}</p>
              <p class="text-gray-500 text-xs mt-1">{{ formatTimeAgo(notification.created_at) }}</p>
            </div>

            <!-- Unread Indicator -->
            <div v-if="!notification.read_at" class="flex-shrink-0">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p class="text-gray-400 text-sm">No notifications</p>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="notifications.length > 0" class="px-4 py-3 border-t border-slate-700">
      <button
        @click="viewAll"
        class="w-full text-center text-sm text-purple-400 hover:text-purple-300 transition"
      >
        View all notifications
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notifications'
import { useToast } from 'vue-toastification'
import Loading from './Loading.vue'

const emit = defineEmits(['close'])

const router = useRouter()
const notificationStore = useNotificationStore()
const toast = useToast()

const loading = computed(() => notificationStore.loading)
const notifications = computed(() => notificationStore.notifications.slice(0, 10)) // Show latest 10
const unreadNotifications = computed(() => notificationStore.unreadNotifications)

const getNotificationIconClass = (type) => {
  const classes = {
    order: 'bg-blue-500/20 text-blue-400',
    payment: 'bg-green-500/20 text-green-400',
    dispute: 'bg-yellow-500/20 text-yellow-400',
    payout: 'bg-purple-500/20 text-purple-400',
    system: 'bg-gray-500/20 text-gray-400',
  }
  return classes[type] || classes.system
}

const getNotificationIconPath = (type) => {
  const paths = {
    order: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    payment: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    dispute: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    payout: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    system: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  }
  return paths[type] || paths.system
}

const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

const handleNotificationClick = async (notification) => {
  try {
    // Mark as read
    if (!notification.read_at) {
      await notificationStore.markAsRead(notification.id)
    }

    // Navigate to related page if link exists
    if (notification.link) {
      router.push(notification.link)
      emit('close')
    }
  } catch (error) {
    console.error('Failed to handle notification click:', error)
  }
}

const handleMarkAllAsRead = async () => {
  try {
    await notificationStore.markAllAsRead()
    toast.success('All notifications marked as read')
  } catch (error) {
    toast.error('Failed to mark all as read')
  }
}

const viewAll = () => {
  router.push('/notifications')
  emit('close')
}

onMounted(() => {
  notificationStore.fetchNotifications()
})
</script>
