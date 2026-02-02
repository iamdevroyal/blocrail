<script setup>
import { Check } from 'lucide-vue-next'
import GradientButton from '../ui/GradientButton.vue'
import OutlineButton from '../ui/OutlineButton.vue'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for new sellers getting started.',
    features: [
      '3 Live Sessions / Month',
      'Secure Checkout Links',
      'T+7 Escrow Release',
      'Basic Order Dashboard',
      'Up to $100 / Transaction'
    ],
    cta: 'Start Selling',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing sellers who need more.',
    features: [
      'Unlimited Live Sessions',
      'T+3 Escrow Release',
      'Advanced Inventory MGT',
      'Detailed Risk Analytics',
      'Priority Email Support',
      'Custom Checkout Branding'
    ],
    cta: 'Choose Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For high-volume commerce brands.',
    features: [
      'Sub-minute Payouts',
      'White-label Integration',
      'Dedicated Risk Manager',
      'API Access & Webhooks',
      'Negotiated Transaction Fees'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]
</script>

<template>
  <section id="pricing" class="py-24 px-6 bg-bg-secondary/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">Simple, <span class="gradient-text">Transparent</span> Pricing</h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          No hidden fees. Just clear pricing designed to grow with your business.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 items-start">
        <div 
          v-for="(plan, index) in plans" 
          :key="plan.name"
          class="glass-card p-10 relative overflow-hidden group transition-all duration-500"
          :class="[plan.popular ? 'border-purple-500 shadow-glow-purple-lg scale-105 z-10' : '']"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="absolute top-0 right-0 bg-gradient-purple text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest">
            Most Popular
          </div>

          <div class="mb-10">
            <h3 class="text-2xl font-bold text-text-primary mb-2">{{ plan.name }}</h3>
            <p class="text-sm text-text-muted">{{ plan.description }}</p>
          </div>

          <div class="flex items-baseline gap-1 mb-10">
            <span class="text-5xl font-black text-text-primary">{{ plan.price }}</span>
            <span v-if="plan.period" class="text-text-muted">{{ plan.period }}</span>
          </div>

          <div class="space-y-5 mb-12">
            <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Check class="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span class="text-sm text-text-secondary">{{ feature }}</span>
            </div>
          </div>

          <GradientButton v-if="plan.popular" class="w-full">
            {{ plan.cta }}
          </GradientButton>
          <OutlineButton v-else class="w-full">
            {{ plan.cta }}
          </OutlineButton>
        </div>
      </div>
    </div>
  </section>
</template>
