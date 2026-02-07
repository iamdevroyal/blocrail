import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
    const authStore = useAuthStore()
    const router = useRouter()

    const user = computed(() => authStore.user)
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const isAdmin = computed(() => authStore.isAdmin)
    const isSeller = computed(() => authStore.isSeller)
    const loading = computed(() => authStore.loading)

    const login = async (credentials) => {
        return await authStore.login(credentials)
    }

    const register = async (userData) => {
        return await authStore.register(userData)
    }

    const logout = async () => {
        await authStore.logout()
    }

    const checkAuth = () => {
        return authStore.checkAuth()
    }

    return {
        user,
        isAuthenticated,
        isAdmin,
        isSeller,
        loading,
        login,
        register,
        logout,
        checkAuth,
    }
}
