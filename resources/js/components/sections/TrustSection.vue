<script setup>
import { Lock, ShieldCheck, UserCheck } from 'lucide-vue-next'
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

        <div class="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div class="animate-fade-in-up">
            <h2 class="text-4xl md:text-5xl font-bold font-heading mb-8 leading-tight">
              A Platform Built on <br />
              <span class="gradient-text">Absolute Trust</span>
            </h2>
            <div class="space-y-8">
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Lock class="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 class="text-xl font-bold text-text-primary mb-2">Escrow-as-a-Service</h4>
                  <p class="text-text-muted leading-relaxed">
                    We act as a neutral third party, holding funds until the buyer confirms the item is as described. This eliminates payment fraud entirely.
                  </p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <UserCheck class="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 class="text-xl font-bold text-text-primary mb-2">Verified Sellers Only</h4>
                  <p class="text-text-muted leading-relaxed">
                    Every seller on Blocrail undergoes rigorous KYC and business verification to ensure they are legitimate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
            <div class="glass-card bg-white/5 p-8 border-white/5">
              <div class="flex items-center gap-6 mb-8 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div class="text-3xl font-black text-purple-400">100%</div>
                <div class="text-sm font-medium text-text-secondary leading-tight">
                  Security guarantee of <br /> funds for both parties
                </div>
              </div>
              <p class="text-text-muted italic leading-relaxed mb-8">
                "Since switching to Blocrail, I've completely stopped dealing with fake transfer alerts and lost order screenshots. My customers trust me more, and my sales have doubled."
              </p>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gradient-purple"></div>
                <div>
                  <div class="font-bold text-text-primary">Sarah J.</div>
                  <div class="text-sm text-text-muted">Verified Fashion Seller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
