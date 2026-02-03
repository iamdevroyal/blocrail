<script setup>
import { Lock, ShieldCheck, TrendingUp, LayoutDashboard } from 'lucide-vue-next'

const features = [
  {
    icon: Lock,
    title: 'Secure Checkout Pages',
    description: 'Mobile-first, fast-loading pages designed for impulse buyers.'
  },
  {
    icon: ShieldCheck,
    title: 'Escrow Protection',
    description: 'Payments held securely until delivery confirmation.'
  },
  {
    icon: TrendingUp,
    title: 'Smart Risk Engine',
    description: 'Low dispute rate? Faster payouts.'
  },
  {
    icon: LayoutDashboard,
    title: 'Seller Dashboard',
    description: 'Track orders, live sessions, payouts, and performance.'
  }
]
</script>

<template>
  <section id="features" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">Infrastructure for <span class="gradient-text">Growth</span></h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          The tools you need to build a professional live selling business.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="glass-card p-8 group hover:border-purple-500/50 transition-all duration-500"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <component :is="feature.icon" class="w-7 h-7 text-purple-400" />
          </div>
          <h3 class="text-xl font-bold mb-3 text-text-primary">{{ feature.title }}</h3>
          <p class="text-text-muted leading-relaxed text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
