<script setup>
import { Check, ShieldCheck, Activity, FileText, LayoutDashboard, CreditCard } from 'lucide-vue-next'
</script>

<template>
  <section id="platform" class="py-24 px-6 bg-transparent relative overflow-hidden">
    <!-- Subtle Grid Background -->
    <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="mb-16 animate-on-scroll">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6 uppercase tracking-wider">
            Phase One: Live Now
        </div>
        <h2 class="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
          Production-Ready Payment Rails<br />
          <span class="text-text-secondary">For Live Sellers</span>
        </h2>
        <p class="text-xl text-text-secondary max-w-2xl">
          Blocrail provides structured payment infrastructure designed specifically for live commerce environments. No screenshots. No manual verification. No ambiguity.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div class="glass-card p-6 hover:bg-white/[0.05] transition-colors group rounded-2xl animate-on-scroll delay-100">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Secure Session Checkout</h3>
          <p class="text-text-muted text-sm">Encrypted, time-bound payment links generated instantly for each transaction.</p>
        </div>

        <!-- Feature 2 -->
        <div class="glass-card p-6 hover:bg-white/[0.05] transition-colors group rounded-2xl animate-on-scroll delay-200">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Check class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Real-time Confirmation</h3>
          <p class="text-text-muted text-sm">Instant validation of funds. Sellers know the moment payment is secured.</p>
        </div>

        <!-- Feature 3 -->
        <div class="glass-card p-6 hover:bg-white/[0.05] transition-colors group rounded-2xl animate-on-scroll delay-300">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Activity class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Fraud Signal Monitoring</h3>
          <p class="text-text-muted text-sm">Active monitoring of transaction patterns to detect and block suspicious activity.</p>
        </div>

        <!-- Feature 4 -->
        <div class="glass-card p-6 hover:bg-white/[0.05] transition-colors group rounded-2xl animate-on-scroll delay-400">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Structured Logging</h3>
          <p class="text-text-muted text-sm">Every transaction is immutably recorded for audit trails and reconciliation.</p>
        </div>

        <!-- Feature 5 -->
        <div class="glass-card p-6 hover:bg-white/[0.05] transition-colors group rounded-2xl animate-on-scroll delay-500">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LayoutDashboard class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Dashboard Reporting</h3>
          <p class="text-text-muted text-sm">Comprehensive view of sales, revenue, and pending settlements in one place.</p>
        </div>

        <!-- Feature 6 -->
        <div class="glass-card p-6 hover:bg-white/[0.05] transition-colors group rounded-2xl animate-on-scroll delay-500">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CreditCard class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Settlement Tracking</h3>
          <p class="text-text-muted text-sm">Clear visibility into when funds will be available and paid out.</p>
        </div>
      </div>
    </div>
  </section>
</template>
