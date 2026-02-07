<script setup>
import { ref } from 'vue'
import { Plus, Minus } from 'lucide-vue-next'

const openIndex = ref(0)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}

const faqs = [
  {
    question: 'What is Blocrail?',
    answer: 'Blocrail is an AI powered streaming and payment infrastructure platform for live sellers. We provide AI powered streamers and secure payment rails with escrow protection for sellers who stream on Instagram, TikTok, and Facebook.'
  },
  {
    question: 'How does the AI streaming work?',
    answer: 'Instead of Going Live yourself, you can rent AI streamers who go live to sell your products, they display, test and answer questions on your behalf when live'
  },
  {
    question: 'How does escrow payment work?',
    answer: 'When a buyer pays, funds are held securely in escrow until you confirm delivery. This protects both you and your buyers from fraud.'
  },
  {
    question: 'How do I get paid?',
    answer: 'Funds are released to your available balance based on your seller tier. New sellers: 2 days after delivery. Trusted sellers: 1 day. Top sellers: instant release.'
  },
  {
    question: 'What are seller tiers?',
    answer: 'Your tier is based on your delivery record and dispute rate. Better performance = faster payouts.'
  },
  {
    question: 'What fees do you charge?',
    answer: 'We charge 3-5% per successful transaction. No monthly fees for basic sellers. AI Streamers renting is coming soon'
  },
  {
    question: 'Can buyers dispute orders?',
    answer: 'Yes. Buyers can raise disputes if there\'s an issue. Our team reviews evidence from both sides and resolves fairly.'
  },
  {
    question: 'Do I need a website?',
    answer: 'No! Blocrail provides streaming landing pages and secure payment rails for you. Just share it during your live session.'
  },
  {
    question: 'Which platforms do you support?',
    answer: 'Currently, we support sellers who go live on Instagram, TikTok, and Facebook. Native streaming coming soon.'
  }
]
</script>

<template>
  <section id="faq" class="py-24 px-6 relative">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="section-title mb-6">Frequently Asked <span class="gradient-text">Questions</span></h2>
        <p class="text-xl text-text-secondary">
          Everything you need to know about selling with Blocrail.
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="glass-card border border-white/5 overflow-hidden transition-all duration-300 animate-fade-in-up"
          :class="{ 'border-purple-500/30 bg-purple-500/5': openIndex === index }"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <button 
            @click="toggle(index)"
            class="w-full px-8 py-6 flex items-center justify-between text-left group"
          >
            <span class="text-lg font-bold text-text-primary group-hover:text-purple-400 transition-colors">
              {{ faq.question }}
            </span>
            <div class="relative w-6 h-6 flex items-center justify-center">
              <Plus 
                class="w-5 h-5 text-purple-500 transition-all duration-300 absolute"
                :class="{ 'opacity-0 rotate-90': openIndex === index }"
              />
              <Minus 
                class="w-5 h-5 text-purple-500 transition-all duration-300 absolute"
                :class="{ 'opacity-0 -rotate-90': openIndex !== index }"
              />
            </div>
          </button>
          
          <div 
            class="grid transition-all duration-300 ease-in-out"
            :class="openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <div class="px-8 pb-8 text-text-muted leading-relaxed">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
