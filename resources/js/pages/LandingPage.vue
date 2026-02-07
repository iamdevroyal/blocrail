<script setup>
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue'

// Lazy load sections
const HeaderSection = defineAsyncComponent(() => import('@/components/sections/HeaderSection.vue'))
const HeroSection = defineAsyncComponent(() => import('@/components/sections/HeroSection.vue'))
//const GlobalThesisSection = defineAsyncComponent(() => import('@/components/sections/GlobalThesisSection.vue'))
const ProblemSection = defineAsyncComponent(() => import('@/components/sections/ProblemSection.vue'))
const SolutionSection = defineAsyncComponent(() => import('@/components/sections/SolutionSection.vue'))
//const PhaseOneSection = defineAsyncComponent(() => import('@/components/sections/PhaseOneSection.vue'))
const HowItWorksSection = defineAsyncComponent(() => import('@/components/sections/HowItWorksSection.vue'))
//const PhilosophySection = defineAsyncComponent(() => import('@/components/sections/PhilosophySection.vue'))
const BenefitsSection = defineAsyncComponent(() => import('@/components/sections/BenefitsSection.vue'))
const FeaturesSection = defineAsyncComponent(() => import('@/components/sections/FeaturesSection.vue'))
const EcosystemRoadmapSection = defineAsyncComponent(() => import('@/components/sections/EcosystemRoadmapSection.vue'))
const AILayerSection = defineAsyncComponent(() => import('@/components/sections/AILayerSection.vue'))
const ScaleSection = defineAsyncComponent(() => import('@/components/sections/ScaleSection.vue'))
const ProductionSection = defineAsyncComponent(() => import('@/components/sections/ProductionSection.vue'))
const PricingSection = defineAsyncComponent(() => import('@/components/sections/PricingSection.vue'))
const FAQSection = defineAsyncComponent(() => import('@/components/sections/FAQSection.vue'))
const AboutSection = defineAsyncComponent(() => import('@/components/sections/AboutSection.vue'))
const WaitlistSection = defineAsyncComponent(() => import('@/components/sections/WaitlistSection.vue'))
const CTASection = defineAsyncComponent(() => import('@/components/sections/CTASection.vue'))
const ClosingSection = defineAsyncComponent(() => import('@/components/sections/ClosingSection.vue'))
const FooterSection = defineAsyncComponent(() => import('@/components/sections/FooterSection.vue'))

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  // Observe existing elements
  setTimeout(() => {
     document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
  }, 100) // Small delay to ensure initial render

  // Watch for new elements (async components)
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
            if (node.classList.contains('animate-on-scroll')) {
                observer.observe(node)
            }
            node.querySelectorAll?.('.animate-on-scroll').forEach(el => observer.observe(el))
        }
      })
    })
  })

  mutationObserver.observe(document.body, { childList: true, subtree: true })
  
  onUnmounted(() => {
    observer.disconnect()
    mutationObserver.disconnect()
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#0A0B14] text-white selection:bg-purple-500/30">
    <!-- Ambient Background Effects (Restored) -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] animate-float-slow"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <HeaderSection />
      
      <main>
        <!-- Hero & Thesis -->
        <HeroSection />
        <!-- <GlobalThesisSection /> -->
        
        <!-- Old Problem/Solution + New PhaseOne -->
        <ProblemSection />
        <SolutionSection />
        <!-- <PhaseOneSection /> -->
        <HowItWorksSection />
        
        <!-- Strategy & Philosophy -->
        <!-- <PhilosophySection /> -->
        
        <BenefitsSection />
        
        <!-- Features & Ecosystem -->
        <FeaturesSection />
        <!-- Future Vision -->
        <EcosystemRoadmapSection />
        <AILayerSection />
        
        <!-- Infrastructure Deep Dive -->
        <ScaleSection />
        <ProductionSection />
        
        <!-- Pricing -->
        <PricingSection />
        
        <!-- Support & Conversion -->
        <FAQSection />
        <AboutSection />
        <WaitlistSection />
        
        <!-- Closing -->
        <ClosingSection />
        <CTASection />
      </main>

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

/* Global Utility Classes for "Old Theme" consistency */
.gradient-text {
  background: linear-gradient(to right, #c084fc, #e879f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
}

/* Animations */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: opacity, transform;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
.delay-400 { transition-delay: 400ms; }
.delay-500 { transition-delay: 500ms; }

@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.5; }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>
