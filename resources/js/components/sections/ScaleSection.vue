<script setup>
import { Server, Database, Globe, Zap, Network } from 'lucide-vue-next'
</script>

<template>
  <section class="py-24 px-6 bg-transparent border-t border-white/5 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-5xl font-bold font-heading mb-6">
          Designed for Platform-Scale Growth
        </h2>
        <p class="text-xl text-text-secondary">
          This is infrastructure, not a feature.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group text-center animate-on-scroll delay-100">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap class="w-6 h-6 text-text-muted group-hover:text-white" />
            </div>
            <h3 class="text-white font-bold mb-2">High Throughput</h3>
            <p class="text-xs text-text-muted">Engineered to handle massive concurrent transaction volume.</p>
        </div>
        <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group text-center animate-on-scroll delay-200">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Network class="w-6 h-6 text-text-muted group-hover:text-white" />
            </div>
            <h3 class="text-white font-bold mb-2">Event-Driven</h3>
            <p class="text-xs text-text-muted">Session logic built on real-time event architecture.</p>
        </div>
        <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group text-center animate-on-scroll delay-300">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database class="w-6 h-6 text-text-muted group-hover:text-white" />
            </div>
            <h3 class="text-white font-bold mb-2">Scalable Settlement</h3>
            <p class="text-xs text-text-muted">Automated reconciliation infrastructure.</p>
        </div>
        <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group text-center animate-on-scroll delay-400">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe class="w-6 h-6 text-text-muted group-hover:text-white" />
            </div>
            <h3 class="text-white font-bold mb-2">Global Deployment</h3>
            <p class="text-xs text-text-muted">Multi-region support baked into the core.</p>
        </div>
      </div>
    </div>
  </section>
</template>
