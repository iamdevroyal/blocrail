<template>
  <AppLayout>
    <div v-if="loading" class="space-y-6">
      <Skeleton type="header" />
      <Skeleton type="stats" />
      <Skeleton type="card" />
      <Skeleton type="table" :rows="5" />
    </div>
    <div v-else class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Waitlist Management</h1>
        <p class="text-text-secondary">Manage and track waitlist signups</p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-bg-secondary rounded-lg p-6 border border-white/10">
          <div class="text-text-muted text-sm mb-1">Total Entries</div>
          <div class="text-3xl font-bold text-white">{{ stats.total || 0 }}</div>
        </div>
        <div class="bg-bg-secondary rounded-lg p-6 border border-white/10">
          <div class="text-text-muted text-sm mb-1">Notified</div>
          <div class="text-3xl font-bold text-green-500">{{ stats.notified || 0 }}</div>
        </div>
        <div class="bg-bg-secondary rounded-lg p-6 border border-white/10">
          <div class="text-text-muted text-sm mb-1">Pending</div>
          <div class="text-3xl font-bold text-yellow-500">{{ stats.unnotified || 0 }}</div>
        </div>
        <div class="bg-bg-secondary rounded-lg p-6 border border-white/10">
          <div class="text-text-muted text-sm mb-1">Top Platform</div>
          <div class="text-2xl font-bold text-purple-500">{{ stats.top_platform || 'N/A' }}</div>
        </div>
      </div>

      <!-- Filters and Actions -->
      <div class="bg-bg-secondary rounded-lg p-6 border border-white/10 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name or email..."
              class="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              @input="debounceSearch"
            />
          </div>

          <!-- Platform Filter -->
          <select
            v-model="filters.platform"
            class="bg-bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            @change="loadWaitlist"
          >
            <option value="">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="Other">Other</option>
          </select>

          <!-- Notified Filter -->
          <select
            v-model="filters.notified"
            class="bg-bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            @change="loadWaitlist"
          >
            <option value="">All Status</option>
            <option value="true">Notified</option>
            <option value="false">Pending</option>
          </select>

          <!-- Export Button -->
          <button
            @click="exportWaitlist"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Export CSV
          </button>

          <!-- Bulk Notify Button -->
          <button
            v-if="selectedIds.length > 0"
            @click="bulkNotify"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Notify Selected ({{ selectedIds.length }})
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-bg-secondary rounded-lg border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-bg-primary border-b border-white/10">
              <tr>
                <th class="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    @change="toggleSelectAll"
                    :checked="isAllSelected"
                    class="rounded border-white/20 bg-bg-secondary text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th class="px-6 py-4 text-left text-text-muted font-medium">Name</th>
                <th class="px-6 py-4 text-left text-text-muted font-medium">Email</th>
                <th class="px-6 py-4 text-left text-text-muted font-medium">Platform</th>
                <th class="px-6 py-4 text-left text-text-muted font-medium">Status</th>
                <th class="px-6 py-4 text-left text-text-muted font-medium">Joined</th>
                <th class="px-6 py-4 text-left text-text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in waitlist.data"
                :key="entry.id"
                class="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td class="px-6 py-4">
                  <input
                    type="checkbox"
                    :value="entry.id"
                    v-model="selectedIds"
                    :disabled="entry.notified"
                    class="rounded border-white/20 bg-bg-secondary text-purple-600 focus:ring-purple-500"
                  />
                </td>
                <td class="px-6 py-4 text-white">{{ entry.name }}</td>
                <td class="px-6 py-4 text-text-secondary">{{ entry.email }}</td>
                <td class="px-6 py-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                    {{ entry.platform || 'N/A' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span
                    v-if="entry.notified"
                    class="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400"
                  >
                    Notified
                  </span>
                  <span
                    v-else
                    class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400"
                  >
                    Pending
                  </span>
                </td>
                <td class="px-6 py-4 text-text-secondary text-sm">
                  {{ formatDate(entry.created_at) }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      v-if="!entry.notified"
                      @click="notifySingle(entry.id)"
                      class="text-green-400 hover:text-green-300 transition-colors"
                      title="Send Invitation"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteEntry(entry.id)"
                      class="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="waitlist.data && waitlist.data.length > 0" class="px-6 py-4 border-t border-white/10 flex justify-between items-center">
          <div class="text-text-muted text-sm">
            Showing {{ waitlist.from }} to {{ waitlist.to }} of {{ waitlist.total }} entries
          </div>
          <div class="flex gap-2">
            <button
              v-for="page in paginationPages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                page === waitlist.current_page
                  ? 'bg-purple-600 text-white'
                  : 'bg-bg-primary text-text-secondary hover:bg-white/5'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import adminService from '@/services/admin.service'
import { debounce } from 'lodash-es'
import AppLayout from '@/components/common/AppLayout.vue'
import Skeleton from '@/components/common/Skeleton.vue'

const toast = useToast()

const stats = ref({})
const waitlist = ref({ data: [] })
const selectedIds = ref([])
const filters = ref({
  search: '',
  platform: '',
  notified: '',
  page: 1
})
const loading = ref(false)

const isAllSelected = computed(() => {
  const unnotified = waitlist.value.data?.filter(e => !e.notified) || []
  return unnotified.length > 0 && selectedIds.value.length === unnotified.length
})

const paginationPages = computed(() => {
  const pages = []
  const total = waitlist.value.last_page || 1
  const current = waitlist.value.current_page || 1
  
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  
  return pages
})

const loadWaitlist = async () => {
  loading.value = true
  try {
    const params = {
      page: filters.value.page,
      search: filters.value.search,
      platform: filters.value.platform,
      notified: filters.value.notified
    }
    
    const response = await adminService.getWaitlist(params)
    waitlist.value = response.data
  } catch (error) {
    toast.error('Failed to load waitlist')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const response = await adminService.getWaitlistStats()
    stats.value = response.data
  } catch (error) {
    toast.error('Failed to load statistics')
    console.error(error)
  }
}

const debounceSearch = debounce(() => {
  filters.value.page = 1
  loadWaitlist()
}, 500)

const toggleSelectAll = () => {
  const unnotified = waitlist.value.data.filter(e => !e.notified)
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = unnotified.map(e => e.id)
  }
}

const notifySingle = async (id) => {
  try {
    await adminService.notifyWaitlistEntry(id)
    toast.success('Invitation email sent successfully')
    await loadWaitlist()
    await loadStats()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to send invitation')
  }
}

const bulkNotify = async () => {
  if (selectedIds.value.length === 0) return
  
  try {
    const response = await adminService.bulkNotifyWaitlist(selectedIds.value)
    toast.success(response.data.message)
    selectedIds.value = []
    await loadWaitlist()
    await loadStats()
  } catch (error) {
    toast.error('Failed to send invitations')
  }
}

const deleteEntry = async (id) => {
  if (!confirm('Are you sure you want to delete this entry?')) return
  
  try {
    await adminService.deleteWaitlistEntry(id)
    toast.success('Entry deleted successfully')
    await loadWaitlist()
    await loadStats()
  } catch (error) {
    toast.error('Failed to delete entry')
  }
}

const exportWaitlist = async () => {
  try {
    const response = await adminService.exportWaitlist()
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `waitlist_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    toast.success('Waitlist exported successfully')
  } catch (error) {
    toast.error('Failed to export waitlist')
  }
}

const changePage = (page) => {
  filters.value.page = page
  loadWaitlist()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadWaitlist()
  loadStats()
})
</script>
