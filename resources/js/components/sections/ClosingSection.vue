<script setup>
import GradientButton from '../ui/GradientButton.vue'
import OutlineButton from '../ui/OutlineButton.vue'

const navigateToApp = () => {
    // Logic for app navigation or registration
    window.location.href = '/register'
}

const navigateToWaitlist = () => {
    window.location.href = '#waitlist'
}
</script>

<template>
  <section class="py-32 px-6 bg-transparent text-center relative overflow-hidden">
     <!-- Ambient Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto relative z-10">
      <h2 class="text-4xl md:text-6xl font-bold font-heading mb-8 tracking-tight">
        Building the Future of<br />
        <span class="gradient-text">Live Commerce</span>
      </h2>
      
      <p class="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
        Live commerce is moving beyond social platforms. It requires native streaming, structured payments, and embedded intelligence. Blocrail is building that system — deliberately.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <GradientButton size="lg" glow @click="navigateToApp">
          Start with Secure Rails Today
        </GradientButton>
        <OutlineButton size="lg" @click="navigateToWaitlist">
          Join the Ecosystem Early
        </OutlineButton>
      </div>
    </div>
  </section>
</template>
