<script setup>
import { Link, ShoppingBag, Truck, Wallet } from 'lucide-vue-next'
import GradientButton from '../ui/GradientButton.vue'

const steps = [
  {
    icon: Link,
    title: 'Create Live Session',
    description: 'Generate a secure checkout link for your live session in seconds.'
  },
  {
    icon: ShoppingBag,
    title: 'Drop Your Link',
    description: 'Pin it during your live on Instagram, TikTok, or Facebook.'
  },
  {
    icon: Truck,
    title: 'Buyers Pay Securely',
    description: 'Payments are processed safely and held in escrow.'
  },
  {
    icon: Wallet,
    title: 'Get Paid',
    description: 'Funds are released after delivery confirmation — or faster as you build trust.'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-24 px-6 bg-transparent relative overflow-hidden">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="section-title mb-6 text-3xl md:text-5xl font-bold font-heading">How It <span class="gradient-text">Works</span></h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          Four simple steps to secure your sales and protect your payments.
        </p>
      </div>

      <div class="relative mb-20">
        <!-- Connecting Line -->
        <div class="hidden lg:block absolute top-[4.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="relative text-center group animate-on-scroll"
            :class="`delay-${(index + 1) * 100}`"
          >
            <!-- Step Number -->
            <div class="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 relative z-10 backdrop-blur-sm">
              <component :is="step.icon" class="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              <!-- Number Badge -->
              <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {{ index + 1 }}
              </div>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-white">{{ step.title }}</h3>
            <p class="text-text-muted leading-relaxed px-4">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
