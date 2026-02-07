<script setup>
import { Bot, MessageSquare, Zap, LineChart, BrainCircuit } from 'lucide-vue-next'
</script>

<template>
  <section class="py-24 px-6 bg-transparent relative overflow-hidden">
    <!-- Abstract AI visual background -->
    <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-50"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="animate-on-scroll">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6 uppercase tracking-wider">
            Future Layer
          </div>
          <h2 class="text-3xl md:text-5xl font-bold font-heading mb-8 leading-tight">
            Intelligence Built<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Into Commerce</span>
          </h2>
          <p class="text-xl text-text-secondary mb-12 leading-relaxed">
            Blocrail’s AI layer will enable a new class of automated commerce, allowing sellers to scale their presence without scaling their time.
          </p>

          <div class="space-y-6">
            <div class="flex gap-4 group animate-on-scroll delay-100">
              <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Bot class="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white mb-2">Virtual Sales Agents</h3>
                <p class="text-text-muted text-sm">Real-time product demonstration and continuous 24/7 sales presence.</p>
              </div>
            </div>

            <div class="flex gap-4 group animate-on-scroll delay-200">
              <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <MessageSquare class="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white mb-2">Automated Q&A</h3>
                <p class="text-text-muted text-sm">Instant, accurate responses to customer product inquiries during streams.</p>
              </div>
            </div>

            <div class="flex gap-4 group animate-on-scroll delay-300">
              <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <BrainCircuit class="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white mb-2">Intelligent Insights</h3>
                <p class="text-text-muted text-sm">Performance analytics optimization based on real viewer interaction data.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Choice Visual -->
        <div class="glass-card p-8 border border-white/10 rounded-3xl relative overflow-hidden animate-on-scroll delay-200">
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
            <h3 class="text-xl font-bold text-white mb-8 relative z-10">Seller Autonomy</h3>
            <div class="space-y-4 relative z-10">
                <div class="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors cursor-default">
                    <span class="text-gray-300 font-medium">Stream Independently</span>
                    <div class="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
                <div class="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex justify-between items-center hover:bg-purple-500/20 transition-colors cursor-default">
                    <span class="text-purple-300 font-medium">Co-host with AI</span>
                    <div class="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                </div>
                <div class="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex justify-between items-center hover:bg-blue-500/20 transition-colors cursor-default">
                    <span class="text-blue-300 font-medium">Fully Automate with AI</span>
                    <div class="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
            </div>
            <p class="mt-8 text-sm text-text-muted text-center relative z-10">
                Positioning you ahead of standard social commerce.
            </p>
        </div>
      </div>
    </div>
  </section>
</template>
