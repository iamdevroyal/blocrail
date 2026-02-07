<script setup>
import { Radio, Bot, Store, BarChart3, Wallet, Cpu } from 'lucide-vue-next'

const roadmapItems = [
  {
    icon: Radio,
    title: 'Native Live Streaming',
    status: 'In Development'
  },
  {
    icon: Bot,
    title: 'AI Co-Host Agents',
    status: 'In Development'
  },
  {
    icon: Cpu,
    title: 'AI Virtual Sales Agents',
    status: 'In Development'
  },
  {
    icon: Store,
    title: 'Agent Rental Marketplace',
    status: 'In Development'
  },
  {
    icon: BarChart3,
    title: 'Commerce Intelligence',
    status: 'In Development'
  },
  {
    icon: Wallet,
    title: 'Embedded Wallet Layer',
    status: 'Planned'
  }
]
</script>

<template>
  <section id="roadmap" class="py-24 px-6 bg-transparent">
    <div class="max-w-7xl mx-auto">
      <div class="mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
          Where Blocrail Is Headed
        </h2>
        <p class="text-xl text-text-secondary max-w-2xl">
          Blocrail is evolving into a full-stack live commerce ecosystem. We are rolling out these layers deliberately.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(item, index) in roadmapItems" :key="item.title" 
             class="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-purple-500/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] animate-on-scroll"
             :style="{ transitionDelay: (index * 100) + 'ms' }">
          <!-- Hover Gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10">
              <div class="flex items-start justify-between mb-6">
                <div class="p-3 rounded-xl bg-white/5 group-hover:bg-purple-500/10 transition-colors">
                    <component :is="item.icon" class="w-6 h-6 text-text-muted group-hover:text-purple-400 transition-colors" />
                </div>
                <span class="text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full bg-white/5 text-text-secondary border border-white/5">
                  {{ item.status }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-white">{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
