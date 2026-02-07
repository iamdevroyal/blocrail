<script setup>
import { Check } from 'lucide-vue-next'
import GradientButton from '../ui/GradientButton.vue'

const features = [
  'Unlimited Live Sessions',
  'Secure Checkout Links',
  'Escrow Protection',
  'Transaction Logging',
  'Risk-Based Payouts'
]
</script>

<template>
  <section id="pricing" class="py-24 px-6 bg-bg-secondary/30 relative overflow-hidden">
     <!-- Ambient Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="section-title text-3xl md:text-5xl font-bold font-heading mb-6">Simple, <span class="gradient-text">Transparent</span> Pricing</h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          No setup fees. No subscription required to start. You pay when transactions happen.
        </p>
      </div>

      <div class="max-w-lg mx-auto">
        <div class="glass-card p-10 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500 animate-on-scroll delay-100">
          <div class="absolute inset-0 bg-gradient-purple opacity-5 group-hover:opacity-10 transition-opacity"></div>
          
          <div class="text-center mb-10">
            <h3 class="text-2xl font-bold text-text-primary mb-4">Transaction Fee</h3>
            <div class="flex items-baseline justify-center gap-1 mb-4">
              <span class="text-6xl font-black gradient-text">3–6%</span>
            </div>
            <p class="text-sm text-text-muted">(volume-tiered)</p>
          </div>

          <div class="space-y-5 mb-12">
            <div v-for="feature in features" :key="feature" class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Check class="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span class="text-text-secondary">{{ feature }}</span>
            </div>
          </div>
          
          <div class="text-center mb-6">
              <p class="text-xs text-text-muted">
                  AI & streaming layers will follow separate usage-based pricing upon release.
              </p>
          </div>

          <GradientButton class="w-full" glow>
            Start Now
          </GradientButton>
        </div>
      </div>
    </div>
  </section>
</template>
