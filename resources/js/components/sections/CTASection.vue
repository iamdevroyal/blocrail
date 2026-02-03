<script setup>
import GradientButton from '../ui/GradientButton.vue'
import OutlineButton from '../ui/OutlineButton.vue'
import { Sparkles } from 'lucide-vue-next'
</script>

<template>
  <section class="py-24 px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="glass-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/20 p-12 md:p-24 text-center relative overflow-hidden">
        <!-- Background Accents -->
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
        
        <div class="relative z-10 max-w-3xl mx-auto animate-fade-in-up">
          <h2 class="text-4xl md:text-6xl font-black font-heading mb-8 leading-tight">
            Ready to Stop <br />
            <span class="text-white">Chasing Screenshots?</span>
          </h2>
          <p class="text-xl text-text-secondary/80 mb-12 leading-relaxed">
            Start selling live with secure checkout and escrow protection.
          </p>
          
          <div class="flex flex-wrap gap-6 justify-center">
            <GradientButton size="lg" glow>
              Launch Your First Live Session
            </GradientButton>
            <OutlineButton size="lg">
              Talk to Sales
            </OutlineButton>
          </div>

          <div class="mt-12 flex items-center justify-center gap-2 text-text-muted text-sm font-medium">
            <Sparkles class="w-4 h-4 text-purple-400" />
            <span>No credit card required to get started</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
