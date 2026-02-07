<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import GradientButton from '../ui/GradientButton.vue'

const router = useRouter()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
  { name: 'About', href: '#about' },
  { name: 'Pricing', href: '#pricing' },
]

const scrollToSection = async (href) => {
  mobileMenuOpen.value = false
  
  if (href.startsWith('#')) {
    if (router.currentRoute.value.path !== '/') {
      await router.push({ path: '/', hash: href })
      return
    }
    
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    // Handle external links or other routes if any
    router.push(href)
  }
}

// Smart routing: authenticated users -> dashboard, new users -> register
const navigateToApp = () => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/seller/dashboard')
  } else {
    router.push('/register')
  }
}
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 px-6 md:px-8"
    :class="[isScrolled ? 'md:py-4' : 'md:py-6']"
  >
    <nav 
      class="max-w-7xl mx-auto transition-all duration-500 ease-out border border-white/10"
      :class="[
        'glass-card py-3 px-6 md:px-8 flex items-center justify-between',
        isScrolled ? 'rounded-2xl shadow-glow-purple-xl bg-bg-secondary/80' : 'rounded-[2rem] bg-bg-secondary/40'
      ]"
    >
      <!-- Logo -->
      <div class="cursor-pointer" @click="scrollToSection('#')">
        <img src="/logo.png" alt="Blocrail Logo" class="h-8 md:h-10 w-auto object-contain" />
      </div>

      <!-- Desktop Nav Links -->
      <div class="hidden md:flex items-center gap-8">
        <a 
          v-for="link in navLinks" 
          :key="link.name"
          :href="link.href"
          class="text-sm font-medium text-text-muted hover:text-purple-400 transition-colors"
          @click.prevent="scrollToSection(link.href)"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- CTA / Mobile Toggle -->
      <div class="flex items-center gap-4">
        <div class="hidden md:block">
          <GradientButton size="sm" @click="navigateToApp">
            Launch App
          </GradientButton>
        </div>
        
        <!-- Mobile Menu Toggle -->
        <button 
          class="md:hidden text-text-primary p-2 focus:outline-none"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg 
            class="w-6 h-6 transition-transform duration-300" 
            :class="{ 'rotate-90': mobileMenuOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!mobileMenuOpen" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen"
        class="absolute top-24 left-6 right-6 md:hidden glass-card rounded-2xl p-6 border border-white/10 shadow-glow-purple-xl"
      >
        <div class="flex flex-col gap-6">
          <a 
            v-for="link in navLinks" 
            :key="link.name"
            :href="link.href"
            class="text-text-secondary font-medium hover:text-purple-400"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.name }}
          </a>
          <GradientButton size="md" class="w-full" @click="navigateToApp">
            Launch App
          </GradientButton>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.glass-card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
