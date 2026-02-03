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
  <section id="how-it-works" class="py-24 px-6 bg-bg-secondary/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">How It <span class="gradient-text">Works</span></h2>
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
            class="relative text-center group"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Step Number -->
            <div class="w-20 h-20 rounded-[2.5rem] bg-bg-tertiary border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-glow-purple group-hover:shadow-glow-purple-lg transition-all duration-500 relative z-10">
              <component :is="step.icon" class="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              <!-- Number Badge -->
              <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center text-white text-sm font-bold">
                {{ index + 1 }}
              </div>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-text-primary">{{ step.title }}</h3>
            <p class="text-text-muted leading-relaxed px-4">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="text-center animate-fade-in-up" style="animation-delay: 0.4s;">
        <GradientButton size="lg" glow>
          Create Your First Live Session
        </GradientButton>
      </div>
    </div>
  </section>
</template>
