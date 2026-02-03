<script setup>
import { Github, Twitter, Linkedin, Facebook } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const footerLinks = {
  product: [
    { name: 'Escrow', href: '#trust' },
    { name: 'Checkout Links', href: '#solution' },
    { name: 'Seller Dashboard', href: '#features' },
    { name: 'Pricing', href: '#pricing' }
  ],
  company: [
    { name: 'About Blocrail', href: '#about' },
    { name: 'Future Vision', href: '#vision' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Waitlist', href: '#waitlist' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Dispute Process', href: '#' },
    { name: 'Security Policy', href: '#' },
    { name: 'API Docs', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ]
}

const scrollToSection = (href) => {
  if (href.startsWith('#')) {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="pt-24 pb-12 px-6 bg-bg-primary border-t border-white/5">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 px-4">
        <!-- Brand Column -->
        <div class="lg:col-span-2">
          <div class="mb-6 cursor-pointer" @click="scrollToSection('#')">
            <img src="/logo.png" alt="Blocrail Logo" class="h-10 md:h-12 w-auto object-contain" />
          </div>
          <p class="text-text-secondary text-base max-w-sm mb-8 leading-relaxed">
            The global rail for live commerce security. We enable trust in the $500B social selling market through sophisticated escrow infrastructure.
          </p>
          <div class="flex gap-5">
            <a href="#" class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
              <Github class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
              <Facebook class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div v-for="(links, category) in footerLinks" :key="category">
          <h4 class="text-white font-bold uppercase tracking-widest text-xs mb-8">{{ category }}</h4>
          <ul class="space-y-4">
            <li v-for="link in links" :key="link.name">
              <a 
                :href="link.href" 
                class="text-text-muted hover:text-purple-400 transition-colors text-sm"
                @click="scrollToSection(link.href)"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <p class="text-text-muted text-sm font-medium">
          © {{ currentYear }} Blocrail Technology Ltd. All rights reserved.
        </p>
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-xs font-bold text-text-muted uppercase tracking-wider">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
