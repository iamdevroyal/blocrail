<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white">Live Sessions</h1>
          <p class="text-gray-400 mt-1">Manage your live selling sessions</p>
        </div>
        <Button variant="primary" @click="$router.push('/seller/sessions/create')" class="w-full sm:w-auto justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Session
        </Button>
      </div>

      <!-- Filters -->
      <Card glass>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <input v-model="searchQuery" type="text" placeholder="Search sessions..." class="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" @input="debouncedSearch" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select v-model="statusFilter" class="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" @change="applyFilters">
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          <div class="flex items-end">
            <Button variant="ghost" @click="clearFilters" class="w-full">Clear Filters</Button>
          </div>
        </div>
      </Card>

      <!-- Skeleton Loader -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton type="card" v-for="i in 6" :key="i" />
      </div>

      <!-- Sessions Grid -->
      <div v-else-if="sessions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="session in sessions" :key="session.id" glass hover class="cursor-pointer" @click="viewSession(session.id)">
          <div class="space-y-4">
            <!-- Header -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-1">{{ session.title }}</h3>
                <p class="text-gray-400 text-sm line-clamp-2">{{ session.description }}</p>
              </div>
              <Badge :variant="getStatusVariant(session.status)">{{ session.status }}</Badge>
            </div>

            <!-- Platform -->
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span class="text-gray-300 text-sm capitalize">{{ session.platform_type }}</span>
            </div>

            <!-- Products -->
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span class="text-gray-300 text-sm">{{ session.products.length || 0 }} products</span>
            </div>

            <!-- Stats (if active) -->
            <div v-if="session.status === 'active'" class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div>
                <p class="text-gray-400 text-xs">Views</p>
                <p class="text-white font-semibold">{{ session.views || 0 }}</p>
              </div>
              <div>
                <p class="text-gray-400 text-xs">Orders</p>
                <p class="text-white font-semibold">{{ session.orders_count || 0 }}</p>
              </div>
            </div>

            <!-- Date -->
            <div class="text-gray-400 text-xs pt-2 border-t border-slate-700">
              Created {{ formatDate(session.created_at) }}
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2 pt-2" @click.stop>
              <Button v-if="session.status === 'draft'" variant="primary" size="sm" @click="activateSession(session.id)" class="flex-1">
                Activate
              </Button>
              <Button v-if="session.status === 'active'" variant="danger" size="sm" @click="endSession(session.id)" class="flex-1">
                End Session
              </Button>
              <Button variant="ghost" size="sm" @click="editSession(session.id)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm" @click="confirmDelete(session)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Empty State -->
      <Card v-else glass>
        <EmptyState title="No sessions found" description="Create your first live session to start selling" icon="document" action-text="Create Session" @action="$router.push('/seller/sessions/create')" />
      </Card>

      <!-- Pagination -->
      <Pagination v-if="pagination.last_page > 1" :current-page="pagination.current_page" :total-pages="pagination.last_page" :per-page="pagination.per_page" :total="pagination.total" item-name="sessions" @page-change="goToPage" />

      <!-- Delete Modal -->
      <Modal :show="showDeleteModal" title="Delete Session" @close="showDeleteModal = false">
        <p class="text-gray-300">
          Are you sure you want to delete <strong class="text-white">{{ sessionToDelete?.title }}</strong>?
          This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex items-center justify-end space-x-3">
            <Button variant="ghost" @click="showDeleteModal = false">Cancel</Button>
            <Button variant="danger" :loading="deleting" @click="deleteSession">Delete</Button>
          </div>
        </template>
      </Modal>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessions'
import { formatDate, debounce } from '@/utils/helpers'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Pagination from '@/components/common/Pagination.vue'
import Modal from '@/components/common/Modal.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const sessionStore = useSessionStore()
const toast = useToast()

const searchQuery = ref('')
const statusFilter = ref('')
const showDeleteModal = ref(false)
const sessionToDelete = ref(null)
const deleting = ref(false)

const sessions = computed(() => sessionStore.sessions)
const pagination = computed(() => sessionStore.pagination)
const loading = computed(() => sessionStore.loading)

const getStatusVariant = (status) => {
  const variants = {
    active: 'success',
    draft: 'warning',
    ended: 'default',
  }
  return variants[status] || 'default'
}

const debouncedSearch = debounce(() => {
  applyFilters()
}, 300)

const applyFilters = async () => {
  sessionStore.setFilters({
    search: searchQuery.value,
    status: statusFilter.value,
  })
  await fetchSessions()
}

const clearFilters = async () => {
  searchQuery.value = ''
  statusFilter.value = ''
  sessionStore.clearFilters()
  await fetchSessions()
}

const fetchSessions = async (page = 1) => {
  try {
    await sessionStore.fetchSessions(page)
  } catch (error) {
    toast.error('Failed to load sessions')
  }
}

const goToPage = (page) => {
  fetchSessions(page)
}

const viewSession = (id) => {
  router.push(`/seller/sessions/${id}`)
}

const editSession = (id) => {
  router.push(`/seller/sessions/${id}/edit`)
}

const activateSession = async (id) => {
  try {
    await sessionStore.activateSession(id)
    toast.success('Session activated successfully')
  } catch (error) {
    toast.error('Failed to activate session')
  }
}

const endSession = async (id) => {
  try {
    await sessionStore.endSession(id)
    toast.success('Session ended successfully')
  } catch (error) {
    toast.error('Failed to end session')
  }
}

const confirmDelete = (session) => {
  sessionToDelete.value = session
  showDeleteModal.value = true
}

const deleteSession = async () => {
  if (!sessionToDelete.value) return

  deleting.value = true
  try {
    await sessionStore.deleteSession(sessionToDelete.value.id)
    toast.success('Session deleted successfully')
    showDeleteModal.value = false
    sessionToDelete.value = null
  } catch (error) {
    toast.error('Failed to delete session')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchSessions()
})
</script>
