<script setup>
import { AlertTriangle, Clock, ShieldAlert } from 'lucide-vue-next'

const problems = [
  {
    icon: ShieldAlert,
    title: 'Payment Uncertainty',
    description: 'Buyers are hesitant to pay via direct DM transfers without protection. You lose sales due to lack of trust.'
  },
  {
    icon: AlertTriangle,
    title: 'Screenshots & Chaos',
    description: 'Juggling payment screenshots and DM receipts is a nightmare. Orders get lost, and customers get frustrated.'
  },
  {
    icon: Clock,
    title: 'Payout Delays',
    description: 'Waiting days for traditional processors to release your hard-earned funds after a successful live session.'
  }
]
</script>

<template>
  <section id="problem" class="py-24 px-6 bg-bg-secondary/30 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">Social Selling is <span class="text-pink-500">Broken</span></h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Running a live sale should be about the energy and the products, not chasing payments and verifying bank alerts.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(problem, index) in problems" 
          :key="index"
          class="glass-card p-10 group hover:bg-bg-tertiary transition-all duration-500"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <component :is="problem.icon" class="w-8 h-8 text-pink-500" />
          </div>
          <h3 class="text-2xl font-bold mb-4 text-text-primary">{{ problem.title }}</h3>
          <p class="text-text-muted leading-relaxed">{{ problem.description }}</p>
        </div>
      </div>

      <div class="mt-20 glass-card p-12 text-center border-pink-500/20 bg-pink-500/5 animate-fade-in-up">
        <p class="text-2xl font-semibold mb-2">The Result?</p>
        <p class="text-lg text-text-secondary">
          You're juggling screenshots instead of focusing on sales. Blocrail fixes that.
        </p>
      </div>
    </div>
  </section>
</template>
