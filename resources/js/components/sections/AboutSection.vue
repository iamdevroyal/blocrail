<script setup>
import { Shield, Zap, Heart } from 'lucide-vue-next'
</script>

<template>
  <section id="about" class="py-24 px-6 relative overflow-hidden">
    <!-- Background Accents -->
    <div class="absolute inset-0 bg-grid opacity-20"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-20 items-center mb-24">
        <div class="animate-fade-in-up">
          <h2 class="section-title mb-6">About <span class="gradient-text">Blocrail</span></h2>
          <p class="text-xl text-text-secondary leading-relaxed mb-8">
            We're building the payment infrastructure for the next generation of social commerce.
          </p>
          <div class="space-y-6 text-text-muted text-lg leading-relaxed">
            <p>
              Live selling is exploding, but payment systems are stuck in the past. Sellers struggle with screenshots, fake alerts, and manual tracking, while buyers hesitate to pay strangers on the internet.
            </p>
            <p>
              Blocrail bridges that gap with escrow-protected checkout links designed specifically for live sellers. We replace chaos with infrastructure, and distrust with guaranteed security.
            </p>
          </div>
        </div>

        <div class="relative animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="glass-card p-2 border-white/10 rotate-2 hover:rotate-0 transition-all duration-500">
             <div class="bg-gradient-to-br from-purple-900/50 to-bg-primary rounded-2xl aspect-video w-full flex items-center justify-center p-8 overflow-hidden relative">
               <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.2),transparent_70%)]"></div>
               <div class="text-center relative z-10">
                 <div class="text-5xl md:text-7xl font-black font-heading tracking-tight mb-2">
                   <span class="text-white">Secure.</span> <br />
                   <span class="text-white/50">Fast.</span> <br />
                   <span class="gradient-text">Trusted.</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="glass-card p-10 group hover:bg-white/5 transition-all animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 pt-1">
            <Shield class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-3">Trust First</h3>
          <p class="text-text-muted leading-relaxed">Escrow protection for every single transaction. No exceptions. We protect both sides equally.</p>
        </div>

        <div class="glass-card p-10 group hover:bg-white/5 transition-all animate-fade-in-up" style="animation-delay: 0.4s">
           <div class="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6 pt-1">
            <Zap class="w-6 h-6 text-yellow-400" />
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-3">Speed Matters</h3>
          <p class="text-text-muted leading-relaxed">Our tier-based payout system rewards good sellers with faster access to funds purely based on performance.</p>
        </div>

        <div class="glass-card p-10 group hover:bg-white/5 transition-all animate-fade-in-up" style="animation-delay: 0.5s">
           <div class="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 pt-1">
            <Heart class="w-6 h-6 text-pink-400" />
          </div>
          <h3 class="text-xl font-bold text-text-primary mb-3">Seller Focused</h3>
          <p class="text-text-muted leading-relaxed">Built by sellers, for sellers. We understand the hustle of a 3-hour live session and built tools to support it.</p>
        </div>
      </div>
    </div>
  </section>
</template>
