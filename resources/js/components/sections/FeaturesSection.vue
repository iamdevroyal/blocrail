<script setup>
import { Boxes, LayoutDashboard, LineChart, MessageSquare, ShieldCheck, Smartphone } from 'lucide-vue-next'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Seller Dashboard',
    description: 'Complete overview of your orders, payouts, and customer details in one beautiful interface.'
  },
  {
    icon: ShieldCheck,
    title: 'Escrow Logic',
    description: 'Custom-built escrow engine designed specifically for the dynamics of social commerce.'
  },
  {
    icon: Boxes,
    title: 'Product Variants',
    description: 'Easily manage colors, sizes, and inventory for your live sale items.'
  },
  {
    icon: MessageSquare,
    title: 'Dispute Management',
    description: 'A transparent system to resolve issues between buyers and sellers fairly.'
  },
  {
    icon: LineChart,
    title: 'Risk Scoring',
    description: 'Build your reputation and get faster payouts as your delivery performance improves.'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Manage your entire business from your phone, right alongside your social media apps.'
  }
]
</script>

<template>
  <section id="features" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="section-title mb-6">Everything You Need to <span class="gradient-text">Win</span></h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          We've built all the tools you need to stop worrying about administration and start focusing on growth.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="glass-card p-10 group hover:border-purple-500/50 transition-all duration-500"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <component :is="feature.icon" class="w-7 h-7 text-purple-400" />
          </div>
          <h3 class="text-xl font-bold mb-4 text-text-primary">{{ feature.title }}</h3>
          <p class="text-text-muted leading-relaxed text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
