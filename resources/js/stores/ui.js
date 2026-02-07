import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        sidebarOpen: false
    }),
    actions: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen
        },
        closeSidebar() {
            this.sidebarOpen = false
        },
        openSidebar() {
            this.sidebarOpen = true
        }
    }
})
