<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Mobile Sidebar Overlay -->
      <div 
        v-if="uiStore.sidebarOpen" 
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
        @click="uiStore.closeSidebar()"
      ></div>

      <!-- Page Content -->
      <!-- Page Content -->
      <main class="flex-1 bg-slate-900 w-full md:ml-64 transition-all duration-300 px-4 pb-4 pt-20 md:px-6 md:pb-6 md:pt-24">
        <slot />
      </main>
    </div>
    
    <InstallPrompt />
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import InstallPrompt from './InstallPrompt.vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
</script>
