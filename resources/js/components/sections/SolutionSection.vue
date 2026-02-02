<script setup>
import { CheckCircle2, Link as LinkIcon, ShieldCheck, Zap } from 'lucide-vue-next'

const features = [
  {
    title: 'Protected Checkout Links',
    description: 'Generate secure links for your products in seconds. Share them in DMs or your bio.'
  },
  {
    title: 'Automated Escrow',
    description: 'Funds are held securely until the buyer confirms receipt, protecting both parties.'
  },
  {
    title: 'Smart Order Tracking',
    description: 'All your live session orders in one clean dashboard. No more manual tracking.'
  },
  {
    title: 'Risk-Based Payouts',
    description: 'The more you sell and successfully deliver, the faster you get paid.'
  }
]
</script>

<template>
  <section id="solution" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div class="animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
            <ShieldCheck class="w-4 h-4" />
            <span>Built for Trust</span>
          </div>
          <h2 class="section-title mb-8">Streamline Your <span class="gradient-text">Live Commerce</span></h2>
          <p class="text-xl text-text-secondary mb-12 leading-relaxed">
            Blocrail streamlines your live selling workflow so you can focus on your audience, not the administration.
          </p>

          <div class="grid sm:grid-cols-2 gap-8">
            <div v-for="feature in features" :key="feature.title" class="flex gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <CheckCircle2 class="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h4 class="font-bold text-text-primary mb-2">{{ feature.title }}</h4>
                <p class="text-sm text-text-muted leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="absolute -inset-4 bg-gradient-purple opacity-20 blur-3xl rounded-full"></div>
          <div class="glass-card p-4 relative overflow-hidden">
            <!-- Mockup Dashboard -->
            <div class="bg-bg-primary rounded-xl overflow-hidden border border-white/5">
              <div class="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div class="text-xs text-text-muted font-mono">checkout.blocrail.com/live-0284</div>
              </div>
              <div class="p-8 space-y-6">
                <div class="h-8 w-48 bg-white/5 rounded-lg animate-pulse"></div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="h-32 bg-white/5 rounded-xl animate-pulse"></div>
                  <div class="h-32 bg-white/5 rounded-xl animate-pulse" style="animation-delay: 0.1s;"></div>
                </div>
                <div class="space-y-3">
                  <div class="h-4 w-full bg-white/5 rounded-lg"></div>
                  <div class="h-4 w-5/6 bg-white/5 rounded-lg"></div>
                </div>
                <div class="h-12 w-full bg-gradient-purple rounded-xl opacity-50"></div>
              </div>
            </div>
            
            <!-- Float UI Elements -->
            <div class="absolute top-1/4 -right-12 glass-card p-6 shadow-glow-purple-lg animate-float">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ShieldCheck class="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div class="text-xs text-text-muted">Payment Secured</div>
                  <div class="text-sm font-bold text-text-primary">Escrow Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
