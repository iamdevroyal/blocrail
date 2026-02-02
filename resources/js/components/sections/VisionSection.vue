<script setup>
import { Sparkles } from 'lucide-vue-next'
</script>

<template>
  <section id="vision" class="py-32 px-6 relative overflow-hidden text-center">
    <!-- Center Orb Accent -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto relative z-10 animate-fade-in-up">
      <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-text-primary text-sm font-bold mb-10 tracking-widest uppercase">
        <Sparkles class="w-4 h-4 text-purple-500" />
        <span>Our Vision</span>
      </div>
      
      <h2 class="text-4xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-12 leading-tight">
        The Infrastructure for the <span class="gradient-text">Future of Commerce.</span>
      </h2>
      
      <div class="space-y-8">
        <p class="text-lg md:text-xl text-text-secondary leading-relaxed">
          Blocrail is building the rails for secure live selling — today through protected checkout links, 
          tomorrow through native streaming technology. We're just getting started.
        </p>
      </div>

      <div class="mt-20 flex justify-center gap-12 text-text-muted">
        <div class="text-center">
          <div class="text-3xl font-black text-text-primary mb-1">$500B</div>
          <div class="text-xs font-bold uppercase tracking-wider">Market Size</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-black text-text-primary mb-1">2026</div>
          <div class="text-xs font-bold uppercase tracking-wider">Infrastructure Goal</div>
        </div>
      </div>
    </div>
  </section>
</template>
