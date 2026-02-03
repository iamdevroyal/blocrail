<script setup>
import { X } from 'lucide-vue-next'

const painPoints = [
  {
    title: 'Fake Payment Alerts',
    description: 'Buyers send fake screenshots of transfers, leaving you out of pocket.'
  },
  {
    title: 'Manual Bank Transfers',
    description: 'Waiting hours for confirmations while managing dozens of orders.'
  },
  {
    title: 'WhatsApp Order Confusion',
    description: 'Lost messages, duplicate orders, and endless back-and-forth chaos.'
  },
  {
    title: 'No Buyer Protection',
    description: 'Buyers hesitate to pay upfront with no guarantee of delivery.'
  },
  {
    title: 'No Structured Tracking',
    description: 'Spreadsheets and notes can\'t keep up with live session volume.'
  }
]
</script>

<template>
  <section id="problem" class="relative py-32 px-6 overflow-hidden">
    <!-- Background Grid -->
    <div class="absolute inset-0 bg-grid opacity-20"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-6xl font-black font-heading mb-6">
          Live Selling Is Powerful — <br class="hidden md:block" />
          <span class="gradient-text">But Payment Is Broken.</span>
        </h2>
        <p class="text-xl text-text-secondary max-w-3xl mx-auto">
          If you sell during live sessions, you already know the chaos:
        </p>
      </div>

      <!-- Pain Points Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div v-for="(pain, index) in painPoints" :key="index" 
             class="glass-card p-8 hover:border-red-500/30 transition-all duration-300 group">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <X class="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">{{ pain.title }}</h3>
              <p class="text-text-muted">{{ pain.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Message -->
      <div class="text-center">
        <p class="text-2xl md:text-3xl text-text-secondary mb-6 font-medium">
          You're juggling <span class="text-red-400 font-bold">screenshots</span> instead of focusing on <span class="text-purple-400 font-bold">sales</span>.
        </p>
        <p class="text-3xl md:text-4xl font-black font-heading gradient-text">
          Blocrail fixes that.
        </p>
      </div>
    </div>
  </section>
</template>
