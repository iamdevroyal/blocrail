<script setup>
import { Layers } from 'lucide-vue-next'
</script>

<template>
  <section class="py-32 px-6 bg-transparent border-y border-white/5 relative overflow-hidden">
    <!-- Glow -->
    <div class="absolute inset-0 bg-purple-600/5 blur-3xl"></div>
    
    <div class="max-w-4xl mx-auto text-center relative z-10 animate-on-scroll">
      <div class="mb-8 flex justify-center">
        <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <Layers class="w-10 h-10 text-purple-400" />
        </div>
      </div>
      
      <h2 class="text-4xl md:text-6xl font-bold font-heading mb-8 tracking-tight">
        Infrastructure First.
      </h2>
      
      <div class="space-y-6 text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
        <p>
          Before AI. Before automation. Before marketplace scale.
        </p>
        <p class="text-white font-medium">
          Live commerce requires structured rails.
        </p>
        <p>
          Blocrail begins at the transaction layer — because everything above it depends on stability below it.
        </p>
      </div>
    </div>
  </section>
</template>
