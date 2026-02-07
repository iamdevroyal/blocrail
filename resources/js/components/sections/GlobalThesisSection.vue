<script setup>
import { AlertCircle, Globe } from 'lucide-vue-next'
</script>

<template>
  <section id="thesis" class="py-24 px-6 bg-transparent relative overflow-hidden">
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="max-w-3xl mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
          Live Commerce Is Growing.<br />
          <span class="gradient-text">Infrastructure Is Lagging.</span>
        </h2>
        <p class="text-xl text-text-secondary leading-relaxed">
          Across platforms worldwide, live selling is accelerating. But the underlying rails haven't caught up.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate-on-scroll delay-100">
          <p class="text-lg text-text-muted">
            Most live commerce today depends on fragile workarounds:
          </p>
          
          <ul class="space-y-4">
            <li class="flex items-start gap-3 text-text-muted animate-on-scroll delay-200">
              <AlertCircle class="w-5 h-5 text-red-400 mt-1 shrink-0" />
              <span>Third-party social platforms with no commerce logic</span>
            </li>
            <li class="flex items-start gap-3 text-text-muted animate-on-scroll delay-300">
              <AlertCircle class="w-5 h-5 text-red-400 mt-1 shrink-0" />
              <span>Manual payment transfers and screenshot confirmations</span>
            </li>
            <li class="flex items-start gap-3 text-text-muted animate-on-scroll delay-400">
              <AlertCircle class="w-5 h-5 text-red-400 mt-1 shrink-0" />
              <span>Fragmented checkout flows causing high drop-off</span>
            </li>
            <li class="flex items-start gap-3 text-text-muted animate-on-scroll delay-500">
              <AlertCircle class="w-5 h-5 text-red-400 mt-1 shrink-0" />
              <span>No structured transaction layer for dispute resolution</span>
            </li>
          </ul>

          <div class="pt-8 border-t border-white/5 animate-on-scroll delay-500">
            <p class="text-2xl font-semibold text-white">
              Content scaled. <span class="text-purple-400">Commerce didn’t.</span>
            </p>
          </div>
        </div>

        <!-- Visual Representation -->
        <div class="relative animate-on-scroll delay-300">
          <div class="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div class="relative glass-card p-8 backdrop-blur-md border border-white/10 rounded-2xl">
             <div class="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                <Globe class="w-8 h-8 text-purple-400" />
                <div>
                    <h3 class="text-lg font-medium text-white">Global Fragmentation</h3>
                    <p class="text-sm text-text-muted">Current State</p>
                </div>
             </div>
             
             <div class="space-y-3">
                 <div class="h-2 bg-white/10 rounded-full w-3/4"></div>
                 <div class="h-2 bg-white/10 rounded-full w-1/2"></div>
                 <div class="h-2 bg-red-500/20 rounded-full w-full mt-4"></div> <!-- Error visual -->
             </div>

             <div class="mt-8 flex justify-between items-center text-sm text-text-muted">
                 <span>Manual Verification</span>
                 <span class="text-red-400 font-semibold flex items-center gap-1">
                    <AlertCircle class="w-3 h-3" /> High Risk
                 </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
