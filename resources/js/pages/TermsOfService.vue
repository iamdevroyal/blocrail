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
          <h1 class="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight">Terms of Service</h1>
          <p class="text-text-secondary text-lg">Last Updated: {{ lastUpdated }}</p>
        </div>

        <div class="prose prose-invert prose-lg max-w-none text-text-muted">
          <p>
            Welcome to Blocrail. Please read these Terms of Service ("Terms") carefully before using our platform. By accessing or using the Blocrail services, you agree to be bound by these Terms.
          </p>

          <h3>1. Description of Service</h3>
          <p>
            Blocrail provides infrastructure for live commerce, including but not limited to secure payment processing, escrow services, transaction logging, and dashboard analytics (the "Services"). We enable sellers ("Merchants") to accept payments from buyers ("Customers") during live streaming sessions on third-party platforms.
          </p>
          <p>
            Future services may include native streaming capabilities, AI-powered sales agents, and automated co-hosting tools. These features will be subject to additional terms upon release.
          </p>

          <h3>2. Account Registration</h3>
          <p>
            To use Blocrail as a Merchant, you must register for an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
          </p>

          <h3>3. Fees and Payments</h3>
          <ul>
            <li><strong>Transaction Fees:</strong> We charge a transaction fee ranging from 3% to 6% per successful transaction, based on your volume tier. This fee is deducted automatically from the gross transaction amount.</li>
            <li><strong>Payouts:</strong> Funds from sales are settled to your designated bank account or wallet according to the payout schedule displayed in your dashboard. Payouts are subject to our escrow release conditions (see Section 4).</li>
            <li><strong>Taxes:</strong> You are solely responsible for determining, collecting, and remitting any applicable taxes associated with your sales.</li>
          </ul>

          <h3>4. Escrow Services</h3>
          <p>
            To protect both Merchants and Customers, Blocrail may hold funds in escrow. Funds are released to the Merchant upon confirmation of product delivery or after a pre-determined satisfaction period. Blocrail reserves the right to extend the escrow period if a dispute is raised or if we detect suspicious activity.
          </p>

          <h3>5. Prohibited Activities</h3>
          <p>You agree not to use Blocrail for:</p>
          <ul>
            <li>Selling illegal, counterfeit, or prohibited goods.</li>
            <li>Engaging in fraudulent activities or money laundering.</li>
            <li>Harassing, abusing, or harming another person.</li>
            <li>Interfering with the proper operation of our infrastructure.</li>
          </ul>
          <p>We reserve the right to suspend or terminate accounts found in violation of these prohibitions.</p>

          <h3>6. Intellectual Property</h3>
          <p>
            The Blocrail platform, including its code, design, logos, and infrastructure, is the property of Blocrail and is protected by copyright and intellectual property laws. You retain ownership of the content and products you sell using our Services.
          </p>

          <h3>7. Disclaimers</h3>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. BLOCRAIL DOES NOT GUARANTEE THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE ARE AN INFRASTRUCTURE PROVIDER AND ARE NOT RESPONSIBLE FOR THE QUALITY, SAFETY, OR LEGALITY OF THE PRODUCTS SOLD BY MERCHANTS.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, BLOCRAIL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
          </p>

          <h3>9. Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Blocrail is incorporated, without regard to its conflict of law principles.
          </p>

          <h3>10. Changes to Terms</h3>
          <p>
            We may update these Terms from time to time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
          </p>

          <h3>11. Contact</h3>
          <p>
            For any questions regarding these Terms, please contact us at legal@blocrail.com.
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
