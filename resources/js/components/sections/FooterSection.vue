<script setup>
import { Github, Twitter, Linkedin, Facebook } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const footerLinks = {
  product: [
    { name: 'Payment Rails', href: '#' },
    { name: 'Checkout Links', href: '#' },
    { name: 'Seller Dashboard', href: '#' },
    { name: 'Pricing', href: '#' }
  ],
  company: [
    { name: 'About Blocrail', href: '#about' },
    { name: 'Master Plan', href: '#' },
    { name: 'Waitlist', href: '#waitlist' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'API Docs', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' }
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
  <footer class="pt-24 pb-12 px-6 bg-bg-primary border-t border-white/5 relative overflow-hidden">
     <!-- Ambient Glow -->
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 px-4">
        <!-- Brand Column -->
        <div class="lg:col-span-2">
          <div class="mb-6 cursor-pointer" @click="scrollToSection('#')">
            <img src="/logo.png" alt="Blocrail Logo" class="h-10 md:h-12 w-auto object-contain" />
          </div>
          <p class="text-text-secondary text-base max-w-sm mb-8 leading-relaxed">
            The operating system for AI-powered live commerce. Building the infrastructure for the next generation of social selling.
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
        <div class="flex flex-col gap-2">
            <p class="text-text-muted text-sm font-medium">
              © {{ currentYear }} Blocrail Technology Ltd. All rights reserved.
            </p>
            <p class="text-text-secondary text-xs opacity-70">
                Blocrail is currently in phased rollout.
            </p>
        </div>
        
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
