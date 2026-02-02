<script setup>
import { BadgeCheck, CreditCard, Globe, Zap } from 'lucide-vue-next'

const benefits = [
  {
    icon: Zap,
    title: 'Speed to Market',
    description: 'Launch your live commerce store in under 5 minutes. No complex integration needed.'
  },
  {
    icon: CreditCard,
    title: 'Multiple Tiers',
    description: 'Unlock faster payouts and lower fees as you build your reputation as a trusted seller.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Sell to anyone, anywhere, with our global payment infrastructure and escrow protection.'
  },
  {
    icon: BadgeCheck,
    title: 'Fraud Protection',
    description: 'State-of-the-art risk engine prevents chargebacks and fake payment alerts.'
  }
]
</script>

<template>
  <section id="benefits" class="py-24 px-6 bg-bg-secondary/30 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div class="animate-fade-in-up">
          <h2 class="section-title mb-8">
            Why Sellers <span class="gradient-text">Scale Faster</span> with Blocrail
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div 
              v-for="benefit in benefits" 
              :key="benefit.title"
              class="glass-card p-6 border-white/5 hover:bg-white/5 transition-all"
            >
              <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                <component :is="benefit.icon" class="w-6 h-6 text-purple-500" />
              </div>
              <h4 class="font-bold text-lg text-text-primary mb-2">{{ benefit.title }}</h4>
              <p class="text-sm text-text-muted leading-relaxed">{{ benefit.description }}</p>
            </div>
          </div>
        </div>

        <div class="relative animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="absolute -inset-4 bg-gradient-purple opacity-20 blur-3xl rounded-full"></div>
          <div class="glass-card p-4 relative overflow-hidden">
             <!-- Mockup Stats UI -->
             <div class="bg-bg-primary rounded-xl overflow-hidden p-8 border border-white/5">
                <div class="flex justify-between items-start mb-12">
                  <div>
                    <div class="text-sm text-text-muted mb-1">Total Volume</div>
                    <div class="text-3xl font-black text-text-primary">$124,500.00</div>
                  </div>
                  <div class="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold flex items-center gap-1">
                    <Zap class="w-3 h-3" />
                    +24%
                  </div>
                </div>
                <div class="space-y-6">
                  <div v-for="i in 3" :key="i" class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-lg bg-white/5"></div>
                      <div class="space-y-1">
                        <div class="h-3 w-24 bg-white/10 rounded"></div>
                        <div class="h-2 w-16 bg-white/5 rounded"></div>
                      </div>
                    </div>
                    <div class="h-3 w-16 bg-white/10 rounded"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
