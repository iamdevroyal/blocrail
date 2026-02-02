<script setup>
import GradientButton from '../ui/GradientButton.vue'
import OutlineButton from '../ui/OutlineButton.vue'
import { Shield, Sparkles, Zap } from 'lucide-vue-next'

const scrollToSection = (href) => {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
    <!-- Animated Orbs -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] animate-float"></div>

    <div class="max-w-7xl mx-auto relative z-10 text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-semibold mb-8 animate-fade-in-up">
        <Sparkles class="w-4 h-4" />
        <span>The New Standard for Social Commerce</span>
      </div>

      <!-- Headline -->
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-8 leading-[1.1] animate-fade-in-up">
        Sell Live. <br />
        <span class="gradient-text">Get Paid Securely.</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style="animation-delay: 0.1s;">
        Blocrail powers protected payments for sellers who go live on Instagram, 
        TikTok and Facebook — with <span class="text-purple-400 font-semibold">escrow</span>, 
        structured orders, and faster payouts.
      </p>

      <!-- CTAs -->
      <div class="flex gap-4 justify-center flex-wrap mb-16 animate-fade-in-up" style="animation-delay: 0.2s;">
        <GradientButton size="lg" glow>
          Start Selling with Blocrail
        </GradientButton>
        <OutlineButton size="lg" @click="scrollToSection('#how-it-works')">
          See How It Works
        </OutlineButton>
      </div>

      <!-- Trust Badges -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-white/5 animate-fade-in-up" style="animation-delay: 0.3s;">
        <div class="flex items-center justify-center gap-3 text-text-muted">
          <Shield class="w-6 h-6 text-purple-500" />
          <span class="font-medium">Escrow Protection</span>
        </div>
        <div class="flex items-center justify-center gap-3 text-text-muted">
          <Zap class="w-6 h-6 text-purple-500" />
          <span class="font-medium">Instant Checkout</span>
        </div>
        <div class="flex items-center justify-center gap-3 text-text-muted hidden md:flex">
          <Sparkles class="w-6 h-6 text-purple-500" />
          <span class="font-medium">Fraud Prevention</span>
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
</style>
