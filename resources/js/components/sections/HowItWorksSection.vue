<script setup>
import { Link, ShoppingBag, Truck, Wallet } from 'lucide-vue-next'

const steps = [
  {
    icon: Link,
    title: 'Generate Link',
    description: 'Select your live session products and generate a secure checkout link.'
  },
  {
    icon: ShoppingBag,
    title: 'Buyer Pays',
    description: 'Buyers pay instantly using their preferred method (Card, Transfer, USSD).'
  },
  {
    icon: Truck,
    title: 'Ship Product',
    description: 'You ship the order. Funds are held safely in escrow during transit.'
  },
  {
    icon: Wallet,
    title: 'Get Paid',
    description: 'Once delivery is confirmed, funds are released to your bank account.'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-24 px-6 bg-bg-secondary/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">How <span class="gradient-text">It Works</span></h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          Blocrail handles the security and logistics so you can focus on your performance.
        </p>
      </div>

      <div class="relative">
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
    </div>
  </section>
</template>
