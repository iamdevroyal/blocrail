<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import GradientButton from '../ui/GradientButton.vue'
import OutlineButton from '../ui/OutlineButton.vue'
import { Shield, Sparkles, Zap, Bot, Database, Lock, Globe, CreditCard, ShoppingBag, Smartphone } from 'lucide-vue-next'

const router = useRouter()

const taglines = [
  "The Operating System for AI-Powered Live Commerce",
  "Secure Payment Rails for the Creator Economy",
  "Infrastructure for the Next Generation of Selling",
  "Where AI Agents and Commerce Converge"
]

const currentTagline = ref(taglines[0])
const fadeState = ref('in') // 'in' or 'out'
let intervalId = null

onMounted(() => {
  let index = 0
  intervalId = setInterval(() => {
    fadeState.value = 'out'
    setTimeout(() => {
      index = (index + 1) % taglines.length
      currentTagline.value = taglines[index]
      fadeState.value = 'in'
    }, 500) // Wait for fade out to complete (matches duration-500)
  }, 4000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const scrollToSection = (href) => {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const navigateToApp = () => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/seller/dashboard')
  } else {
    router.push('/register')
  }
}

const navigateToWaitlist = () => {
    window.location.href = '#waitlist'
}

const icons = [Shield, Sparkles, Zap, Bot, Database, Lock, Globe, CreditCard, ShoppingBag, Smartphone]

// Generate random confetti data
const confettiIcons = Array.from({ length: 25 }).map((_, i) => ({
    component: icons[i % icons.length],
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 24 + 16, // 16px to 40px
    duration: Math.random() * 20 + 15, // 15s to 35s
    delay: Math.random() * -20, // Start at random times
    opacity: Math.random() * 0.15 + 0.05, // 0.05 to 0.2 opacity
    floatX: Math.random() * 40 - 20 // -20px to 20px horizontal drift
}))
</script>

<template>
  <section id="home" class="relative min-h-[90vh] flex items-center justify-center pt-32 pb-10 px-6 overflow-hidden">
    <!-- Animated Orbs (Restored) -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] animate-float"></div>

    <!-- Floating Confetti Icons -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <component 
        v-for="(icon, index) in confettiIcons" 
        :key="index"
        :is="icon.component"
        class="absolute text-purple-400 animate-confetti-float"
        :style="{
          left: icon.left + '%',
          top: icon.top + '%',
          width: icon.size + 'px',
          height: icon.size + 'px',
          opacity: icon.opacity,
          animationDuration: icon.duration + 's',
          animationDelay: icon.delay + 's',
          '--float-x': icon.floatX + 'px'
        }"
      />
    </div>

    <div class="max-w-7xl mx-auto relative z-10 text-center px-4 md:px-0">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 font-semibold mb-6 animate-fade-in-up">
        <Sparkles class="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span 
          class="text-xs md:text-sm transition-opacity duration-500"
          :class="fadeState === 'out' ? 'opacity-0' : 'opacity-100'"
        >
          {{ currentTagline }}
        </span>
      </div>

      <!-- Headline -->
      <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-6 md:mb-8 leading-[1.1] animate-fade-in-up">
        The Operating System<br />
        <span class="gradient-text">For AI-Powered Commerce</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed animate-fade-in-up px-2 md:px-0" style="animation-delay: 0.1s;">
        Blocrail is building a standalone <span class="text-purple-400 font-semibold">live commerce ecosystem</span> where sellers stream, AI agents sell, and secure payment rails 
         <span class="text-purple-400 font-semibold"> power every transaction</span>.
      </p>
      
      <!-- Phased Rollout Indicators -->
      <div class="flex flex-col items-center gap-3 md:gap-2 mb-10 md:mb-12 animate-fade-in-up px-4" style="animation-delay: 0.15s;">
          <span class="text-sm font-medium text-white flex items-center gap-2 text-center">
            <span class="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] shrink-0"></span>
            Today: Production-ready payment rails.
          </span>
          <span class="text-sm font-medium text-text-muted flex items-center gap-2 text-center">
            <span class="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] shrink-0"></span>
            Next: Native streaming and AI sales agents.
          </span>
      </div>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none mb-12 md:mb-16 animate-fade-in-up px-4" style="animation-delay: 0.2s;">
        <GradientButton size="lg" class="w-full sm:w-auto" glow @click="navigateToApp">
          Start Secure Live Payments
        </GradientButton>
        <OutlineButton size="lg" class="w-full sm:w-auto" @click="navigateToWaitlist">
          Request Early Access
        </OutlineButton>
      </div>

      <!-- Trust Badges -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto pt-8 md:pt-12 border-t border-white/5 animate-fade-in-up px-4" style="animation-delay: 0.3s;">
        <div class="flex items-center justify-center gap-2 md:gap-3 text-text-muted">
          <Shield class="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
          <span class="text-sm md:text-base font-medium">Escrow Protection</span>
        </div>
        <div class="flex items-center justify-center gap-2 md:gap-3 text-text-muted">
          <Zap class="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
          <span class="text-sm md:text-base font-medium">Payment Rails</span>
        </div>
        <div class="flex items-center justify-center gap-2 md:gap-3 text-text-muted col-span-2 md:col-span-1">
          <Sparkles class="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
          <span class="text-sm md:text-base font-medium">AI & Streaming (In Dev)</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.1); }
}
.animate-float {
  animation: float 8s ease-in-out infinite;
}

@keyframes confetti-float {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(var(--float-x), -20px) rotate(10deg); }
  50% { transform: translate(0, -40px) rotate(0deg); }
  75% { transform: translate(calc(var(--float-x) * -1), -20px) rotate(-10deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

.animate-confetti-float {
  animation-name: confetti-float;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
