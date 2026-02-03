<script setup>
import { ShieldCheck, UserCheck, Lock, TrendingUp, CheckCircle2 } from 'lucide-vue-next'
</script>

<template>
  <section id="trust" class="py-24 px-6 relative overflow-hidden">
    <!-- Background Accents -->
    <div class="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -translate-x-1/2"></div>
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] translate-x-1/3"></div>

    <div class="max-w-7xl mx-auto">
      <div class="glass-card p-12 lg:p-20 relative overflow-hidden">
        <!-- Floating Icons Overlay -->
        <div class="absolute top-10 right-10 opacity-5 -rotate-12">
          <ShieldCheck class="w-64 h-64" />
        </div>

        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
            Built for Trust — <br class="hidden md:block" />
            <span class="gradient-text">For Sellers and Buyers</span>
          </h2>
          <p class="text-xl text-text-muted max-w-2xl mx-auto">
            Blocrail uses a smart escrow system that protects both sides.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 relative z-10">
          <!-- For Buyers -->
          <div class="animate-fade-in-up bg-white/5 rounded-2xl p-8 border border-white/5">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <UserCheck class="w-6 h-6 text-blue-400" />
              </div>
              <h3 class="text-2xl font-bold text-white">For Buyers</h3>
            </div>
            <ul class="space-y-6">
              <li class="flex items-center gap-4">
                <CheckCircle2 class="w-6 h-6 text-blue-500" />
                <span class="text-lg text-text-primary">Secure checkout</span>
              </li>
              <li class="flex items-center gap-4">
                <CheckCircle2 class="w-6 h-6 text-blue-500" />
                <span class="text-lg text-text-primary">Order confirmation</span>
              </li>
              <li class="flex items-center gap-4">
                <CheckCircle2 class="w-6 h-6 text-blue-500" />
                <span class="text-lg text-text-primary">Dispute resolution</span>
              </li>
            </ul>
          </div>

          <!-- For Sellers -->
          <div class="animate-fade-in-up bg-white/5 rounded-2xl p-8 border border-white/5" style="animation-delay: 0.2s">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <ShieldCheck class="w-6 h-6 text-purple-400" />
              </div>
              <h3 class="text-2xl font-bold text-white">For Sellers</h3>
            </div>
            <ul class="space-y-6">
              <li class="flex items-center gap-4">
                <CheckCircle2 class="w-6 h-6 text-purple-500" />
                <span class="text-lg text-text-primary">Verified payments</span>
              </li>
              <li class="flex items-center gap-4">
                <CheckCircle2 class="w-6 h-6 text-purple-500" />
                <span class="text-lg text-text-primary">Structured tracking</span>
              </li>
              <li class="flex items-center gap-4">
                <CheckCircle2 class="w-6 h-6 text-purple-500" />
                <span class="text-lg text-text-primary">Tier-based faster payouts</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-16 text-center animate-fade-in-up" style="animation-delay: 0.4s">
          <p class="text-xl md:text-2xl font-medium text-white mb-2">
            As you build a strong delivery record, you unlock faster fund releases.
          </p>
          <p class="text-3xl font-black gradient-text">Trust earns speed.</p>
        </div>
      </div>
    </div>
  </section>
</template>
