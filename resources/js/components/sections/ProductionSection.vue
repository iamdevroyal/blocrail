<script setup>
import { Lock, FileKey, Shield, FileSearch, Cloud } from 'lucide-vue-next'
</script>

<template>
  <section class="py-24 px-6 bg-transparent relative overflow-hidden">
     <!-- Background Glow -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div class="animate-on-scroll">
          <h2 class="text-3xl md:text-5xl font-bold font-heading mb-8 leading-tight">
            Production-Grade<br />
            <span class="text-green-400">by Design</span>
          </h2>
          <div class="space-y-6 text-lg text-text-secondary">
             <p class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Every session is traceable.</p>
             <p class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Every payment is structured.</p>
             <p class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Every transaction is recorded.</p>
          </div>
          <div class="mt-8 pt-8 border-t border-white/5">
              <p class="text-white font-medium text-xl">This makes you look serious globally.</p>
          </div>
        </div>

        <div class="space-y-4">
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-green-500/30 transition-colors animate-on-scroll delay-100">
                <div class="p-2 rounded-lg bg-green-500/10">
                    <Lock class="w-5 h-5 text-green-400" />
                </div>
                <span class="text-gray-300 font-medium">Encrypted Payment Sessions</span>
            </div>
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-green-500/30 transition-colors animate-on-scroll delay-200">
                <div class="p-2 rounded-lg bg-green-500/10">
                    <FileKey class="w-5 h-5 text-green-400" />
                </div>
                <span class="text-gray-300 font-medium">Secure Tokenized Checkout</span>
            </div>
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-green-500/30 transition-colors animate-on-scroll delay-300">
                <div class="p-2 rounded-lg bg-green-500/10">
                    <Shield class="w-5 h-5 text-green-400" />
                </div>
                <span class="text-gray-300 font-medium">Real-time Transaction Validation</span>
            </div>
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-green-500/30 transition-colors animate-on-scroll delay-400">
                <div class="p-2 rounded-lg bg-green-500/10">
                    <FileSearch class="w-5 h-5 text-green-400" />
                </div>
                <span class="text-gray-300 font-medium">Structured Audit Logging</span>
            </div>
            <div class="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-green-500/30 transition-colors animate-on-scroll delay-500">
                <div class="p-2 rounded-lg bg-green-500/10">
                    <Cloud class="w-5 h-5 text-green-400" />
                </div>
                <span class="text-gray-300 font-medium">Cloud-Scalable Deployment</span>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>
