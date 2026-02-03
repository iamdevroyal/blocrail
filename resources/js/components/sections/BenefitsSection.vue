<script setup>
import { Check } from 'lucide-vue-next'

const benefits = [
  'No fake alerts',
  'Structured order dashboard',
  'Delivery confirmation tracking',
  'Automated payout system',
  'Risk-based fast release tiers',
  'Transparent fee structure'
]
</script>

<template>
  <section id="benefits" class="py-24 px-6 bg-bg-secondary/30 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="section-title mb-6">
          Why Live Sellers Choose <span class="gradient-text">Blocrail</span>
        </h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          You focus on selling. Blocrail handles the money.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style="animation-delay: 0.2s">
        <div 
          v-for="(benefit, index) in benefits" 
          :key="index"
          class="glass-card p-8 hover:bg-white/5 transition-all group flex items-center gap-4 border border-white/5"
        >
          <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-purple-500" />
          </div>
          <span class="font-semibold text-lg text-text-primary">{{ benefit }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
