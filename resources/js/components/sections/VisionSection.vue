<script setup>
import { Sparkles, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section id="vision" class="py-32 px-6 relative overflow-hidden text-center">
    <!-- Center Orb Accent -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto relative z-10 animate-fade-in-up">
      <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-text-primary text-sm font-bold mb-10 tracking-widest uppercase">
        <Sparkles class="w-4 h-4 text-purple-500" />
        <span>Future Vision</span>
      </div>
      
      <h2 class="text-4xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-8 leading-tight">
        The Future of <br />
        <span class="gradient-text">Live Commerce Infrastructure</span>
      </h2>
      
      <p class="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-16">
        Blocrail is building the rails for secure live selling — today through protected checkout links, 
        tomorrow through native AI-Powered streaming technology.
      </p>

      <div class="flex justify-center items-center gap-4 md:gap-12 text-sm md:text-base">
        <div class="glass-card px-6 py-3 border-purple-500/50 bg-purple-500/10">
          <span class="font-bold text-white">Phase 1:</span> Secure Checkout
        </div>
        <ArrowRight class="w-5 h-5 text-text-muted" />
        <div class="glass-card px-6 py-3 opacity-50">
          <span class="font-bold text-white">Phase 2:</span> AI Native Streaming
        </div>
      </div>

      <p class="mt-12 text-2xl font-black gradient-text">We're just getting started.</p>
    </div>
  </section>
</template>
