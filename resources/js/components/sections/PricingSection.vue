<script setup>
import { Check } from 'lucide-vue-next'
import GradientButton from '../ui/GradientButton.vue'

const features = [
  'Unlimited Live Sessions',
  'Secure Checkout Links',
  'Escrow Protection',
  'Basic Order Dashboard',
  'Risk-Based Payouts'
]
</script>

<template>
  <section id="pricing" class="py-24 px-6 bg-bg-secondary/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">Simple, <span class="gradient-text">Transparent</span> Pricing</h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          No monthly fees for basic sellers. Upgrade to unlock faster payouts and advanced analytics.
        </p>
      </div>

      <div class="max-w-lg mx-auto">
        <div class="glass-card p-10 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500 animate-fade-in-up">
          <div class="absolute inset-0 bg-gradient-purple opacity-5 group-hover:opacity-10 transition-opacity"></div>
          
          <div class="text-center mb-10">
            <h3 class="text-2xl font-bold text-text-primary mb-4">Transaction Fee</h3>
            <div class="flex items-baseline justify-center gap-1 mb-4">
              <span class="text-6xl font-black gradient-text">3–5%</span>
            </div>
            <p class="text-sm text-text-muted">per successful transaction</p>
          </div>

          <div class="space-y-5 mb-12">
            <div v-for="feature in features" :key="feature" class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Check class="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span class="text-text-secondary">{{ feature }}</span>
            </div>
          </div>

          <GradientButton class="w-full" glow>
            Start for Free
          </GradientButton>
        </div>
      </div>
    </div>
  </section>
</template>
