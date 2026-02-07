<script setup>
import { defineAsyncComponent } from 'vue'

const HeaderSection = defineAsyncComponent(() => import('@/components/sections/HeaderSection.vue'))
const FooterSection = defineAsyncComponent(() => import('@/components/sections/FooterSection.vue'))

const lastUpdated = 'February 7, 2026'
</script>

<template>
  <div class="min-h-screen bg-[#0A0B14] text-white selection:bg-purple-500/30">
    <HeaderSection />

    <main class="relative z-10 pt-32 pb-24 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="mb-12">
          <h1 class="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight">Privacy Policy</h1>
          <p class="text-text-secondary text-lg">Last Updated: {{ lastUpdated }}</p>
        </div>

        <div class="prose prose-invert prose-lg max-w-none text-text-muted">
          <p>
            At Blocrail ("we", "our", or "us"), we take your privacy seriously. We are building the operating system for AI-powered live commerce, and we understand that trust is the foundation of our infrastructure. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, platform, APIs, and services (collectively, the "Services").
          </p>

          <h3>1. Information We Collect</h3>
          <p>We collect information that is necessary to provide our infrastructure services, process payments, and ensure the security of transactions.</p>
          
          <h4>Information You Provide</h4>
          <ul>
            <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, business details, and banking information for payouts.</li>
            <li><strong>Identity Verification (KYC):</strong> To comply with financial regulations, we may collect government-issued ID, tax identification numbers, and other proof of identity.</li>
            <li><strong>Transaction Data:</strong> Details about the products you sell, prices, shipping information, and communication with buyers during live sessions.</li>
          </ul>

          <h4>Information Automatically Collected</h4>
          <ul>
            <li><strong>Usage Data:</strong> We collect log data, device information, IP addresses, and browser types to monitor the health of our infrastructure and prevent fraud.</li>
            <li><strong>Transaction Signals:</strong> We analyze transaction patterns to detect anomalies and potential fraud risks in real-time.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use the collected data to build, maintain, and improve our live commerce infrastructure:</p>
          <ul>
            <li><strong>Processing Transactions:</strong> To facilitate secure checkout, hold funds in escrow, and release payouts to sellers.</li>
            <li><strong>Fraud Prevention:</strong> To monitor for suspicious activity, prevent unauthorized transactions, and protect both buyers and sellers.</li>
            <li><strong>Service Improvement:</strong> To analyze platform performance, optimize latency for live interactions, and develop new features (including future AI capabilities).</li>
            <li><strong>Communication:</strong> To send transactional emails (receipts, dispute updates) and critical service notifications.</li>
          </ul>

          <h3>3. Sharing of Your Information</h3>
          <p>We are an infrastructure company and do not sell your personal data. We share data only as necessary to operate our services:</p>
          <ul>
            <li><strong>Financial Partners:</strong> We share necessary data with payment processors, banks, and escrow partners to facilitate money movement.</li>
            <li><strong>Service Providers:</strong> We use trusted third-party vendors for cloud hosting, analytics, and identity verification.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or to protect the rights and safety of Blocrail or others.</li>
          </ul>

          <h3>4. Data Security</h3>
          <p>
            We employ infrastructure-grade security measures to protect your data. This includes encryption of sensitive data in transit and at rest, regular security audits, and strict access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h3>5. Your Rights</h3>
          <p>Depending on your jurisdiction, you may have rights regarding your personal data, including:</p>
          <ul>
            <li>Accessing and correcting your personal information.</li>
            <li>Requesting deletion of your account and data (subject to retention requirements for financial records).</li>
            <li>Opting out of marketing communications.</li>
          </ul>

          <h3>6. Future AI Features</h3>
          <p>
            As Blocrail rolls out AI-powered features (such as automated sales agents and commerce intelligence), we will update this policy to transparently reflect how data is used to train or operate these models. Currently, customer data is not used to train public AI models without explicit consent.
          </p>

          <h3>7. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us at privacy@blocrail.com.
          </p>
        </div>
      </div>
    </main>

    <FooterSection />
  </div>
</template>

<style scoped>
.prose h3 {
  color: #fff;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
.prose h4 {
  color: #e2e8f0;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.prose strong {
  color: #fff;
}
.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
.prose li {
  margin-bottom: 0.5rem;
}
</style>
