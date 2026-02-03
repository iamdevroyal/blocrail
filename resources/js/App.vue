<script setup>
import { defineAsyncComponent } from 'vue'

// Lazy load sections for better performance
const HeaderSection = defineAsyncComponent(() => import('./components/sections/HeaderSection.vue'))
const HeroSection = defineAsyncComponent(() => import('./components/sections/HeroSection.vue'))
const ProblemSection = defineAsyncComponent(() => import('./components/sections/ProblemSection.vue'))
const SolutionSection = defineAsyncComponent(() => import('./components/sections/SolutionSection.vue'))
const HowItWorksSection = defineAsyncComponent(() => import('./components/sections/HowItWorksSection.vue'))
const TrustSection = defineAsyncComponent(() => import('./components/sections/TrustSection.vue'))
const BenefitsSection = defineAsyncComponent(() => import('./components/sections/BenefitsSection.vue'))
const FeaturesSection = defineAsyncComponent(() => import('./components/sections/FeaturesSection.vue'))
const PricingSection = defineAsyncComponent(() => import('./components/sections/PricingSection.vue'))
const VisionSection = defineAsyncComponent(() => import('./components/sections/VisionSection.vue'))
const FAQSection = defineAsyncComponent(() => import('./components/sections/FAQSection.vue'))
const AboutSection = defineAsyncComponent(() => import('./components/sections/AboutSection.vue'))
const WaitlistSection = defineAsyncComponent(() => import('./components/sections/WaitlistSection.vue'))
const CTASection = defineAsyncComponent(() => import('./components/sections/CTASection.vue'))
const FooterSection = defineAsyncComponent(() => import('./components/sections/FooterSection.vue'))
</script>

<template>
  <div class="min-h-screen bg-[#0A0B14] text-white selection:bg-purple-500/30">
    <!-- Ambient Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px]"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <HeaderSection />
      
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <TrustSection />
        <BenefitsSection />
        <FeaturesSection />
        <PricingSection />
        <VisionSection />
        <FAQSection />
        <AboutSection />
        <WaitlistSection />
        <CTASection />
      </main>>

      <FooterSection />
    </div>
  </div>
</template>

<style>
:root {
  --bg-primary: #0A0B14;
}

body {
  background-color: var(--bg-primary);
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
