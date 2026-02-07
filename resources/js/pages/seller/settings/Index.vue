<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-white">Settings</h1>
        <p class="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <!-- Settings Tabs -->
      <div class="border-b border-slate-700">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition',
              activeTab === 'profile'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            ]"
          >
            Profile
          </button>
          <button
            @click="activeTab = 'bank'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition',
              activeTab === 'bank'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            ]"
          >
            Bank Details
          </button>
          <button
            @click="activeTab = 'password'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition',
              activeTab === 'password'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            ]"
          >
            Password
          </button>
        </nav>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'">
        <Card title="Store Profile" glass>
          <Loading v-if="loading && !profile" text="Loading profile..." class="py-12" />
          
          <form v-else @submit.prevent="handleProfileUpdate" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Store Name *</label>
                <input
                  v-model="profileForm.store_name"
                  type="text"
                  required
                  placeholder="Enter store name"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Store Slug *</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">blocrail.com/</span>
                  <input
                    v-model="profileForm.store_slug"
                    type="text"
                    required
                    placeholder="your-store"
                    class="w-full pl-32 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <p class="text-xs text-gray-500 mt-1">This will be your store's public URL</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input
                  v-model="profileForm.phone"
                  type="tel"
                  required
                  placeholder="080XXXXXXXX"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 bg-slate-900/30 border border-slate-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Store Address</label>
              <textarea
                v-model="profileForm.address"
                rows="3"
                placeholder="Enter your store address"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <!-- Account Status -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-700">
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Account Status</label>
                <Badge :variant="profile?.status === 'active' ? 'success' : 'warning'">
                  {{ profile?.status || 'Unknown' }}
                </Badge>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Risk Tier</label>
                <Badge :variant="getRiskTierVariant(profile?.risk_tier)">
                  Tier {{ profile?.risk_tier || 1 }}
                </Badge>
              </div>
            </div>

            <div class="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
              <Button variant="ghost" @click="resetProfileForm">Cancel</Button>
              <Button variant="primary" type="submit" :loading="updating">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <!-- Bank Details Tab -->
      <div v-if="activeTab === 'bank'">
        <Card title="Bank Account Details" glass>
          <Loading v-if="loading && !bankDetails" text="Loading bank details..." class="py-12" />
          
          <form v-else @submit.prevent="handleBankUpdate" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Bank Name *</label>
                <select
                  v-model="bankForm.bank_name"
                  required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">GTBank</option>
                  <option value="First Bank">First Bank</option>
                  <option value="UBA">UBA</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="Fidelity Bank">Fidelity Bank</option>
                  <option value="Union Bank">Union Bank</option>
                  <option value="Sterling Bank">Sterling Bank</option>
                  <option value="Stanbic IBTC">Stanbic IBTC</option>
                  <option value="Wema Bank">Wema Bank</option>
                  <option value="Kuda Bank">Kuda Bank</option>
                  <option value="Opay">Opay</option>
                  <option value="Palmpay">Palmpay</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Account Number *</label>
                <input
                  v-model="bankForm.account_number"
                  type="text"
                  required
                  maxlength="10"
                  placeholder="0123456789"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Account Name *</label>
                <input
                  v-model="bankForm.account_name"
                  type="text"
                  required
                  placeholder="Account holder name"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">BVN (Optional)</label>
                <input
                  v-model="bankForm.bvn"
                  type="text"
                  maxlength="11"
                  placeholder="22XXXXXXXXX"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">For higher withdrawal limits</p>
              </div>
            </div>

            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p class="text-blue-400 text-sm flex items-start">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Your bank details are encrypted and securely stored. They will be used for payout processing only.
              </p>
            </div>

            <div class="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
              <Button variant="ghost" @click="resetBankForm">Cancel</Button>
              <Button variant="primary" type="submit" :loading="updating">
                Save Bank Details
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <!-- Password Tab -->
      <div v-if="activeTab === 'password'">
        <Card title="Change Password" glass>
          <form @submit.prevent="handlePasswordUpdate" class="space-y-6 max-w-md">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Current Password *</label>
              <input
                v-model="passwordForm.current_password"
                type="password"
                required
                placeholder="Enter current password"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">New Password *</label>
              <input
                v-model="passwordForm.new_password"
                type="password"
                required
                minlength="8"
                placeholder="Enter new password"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p class="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Confirm New Password *</label>
              <input
                v-model="passwordForm.new_password_confirmation"
                type="password"
                required
                minlength="8"
                placeholder="Confirm new password"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div class="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
              <Button variant="ghost" @click="resetPasswordForm">Cancel</Button>
              <Button variant="primary" type="submit" :loading="updating">
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from 'vue-toastification'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import Loading from '@/components/common/Loading.vue'

const settingsStore = useSettingsStore()
const toast = useToast()

const activeTab = ref('profile')
const loading = computed(() => settingsStore.loading)
const profile = computed(() => settingsStore.profile)
const bankDetails = computed(() => settingsStore.bankDetails)
const updating = ref(false)

const profileForm = reactive({
  store_name: '',
  store_slug: '',
  phone: '',
  email: '',
  address: '',
})

const bankForm = reactive({
  bank_name: '',
  account_number: '',
  account_name: '',
  bvn: '',
})

const passwordForm = reactive({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
})

const getRiskTierVariant = (tier) => {
  if (tier <= 1) return 'success'
  if (tier <= 2) return 'warning'
  return 'danger'
}

const resetProfileForm = () => {
  if (profile.value) {
    profileForm.store_name = profile.value.store_name || ''
    profileForm.store_slug = profile.value.store_slug || ''
    profileForm.phone = profile.value.phone || ''
    profileForm.email = profile.value.email || ''
    profileForm.address = profile.value.address || ''
  }
}

const resetBankForm = () => {
  if (bankDetails.value) {
    bankForm.bank_name = bankDetails.value.bank_name || ''
    bankForm.account_number = bankDetails.value.account_number || ''
    bankForm.account_name = bankDetails.value.account_name || ''
    bankForm.bvn = bankDetails.value.bvn || ''
  }
}

const resetPasswordForm = () => {
  passwordForm.current_password = ''
  passwordForm.new_password = ''
  passwordForm.new_password_confirmation = ''
}

const handleProfileUpdate = async () => {
  updating.value = true
  try {
    await settingsStore.updateProfile(profileForm)
    toast.success('Profile updated successfully!')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update profile')
  } finally {
    updating.value = false
  }
}

const handleBankUpdate = async () => {
  updating.value = true
  try {
    await settingsStore.updateBankDetails(bankForm)
    toast.success('Bank details updated successfully!')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update bank details')
  } finally {
    updating.value = false
  }
}

const handlePasswordUpdate = async () => {
  if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
    toast.warning('Passwords do not match')
    return
  }

  updating.value = true
  try {
    await settingsStore.updatePassword(passwordForm)
    toast.success('Password updated successfully!')
    resetPasswordForm()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update password')
  } finally {
    updating.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    settingsStore.fetchProfile(),
    settingsStore.fetchBankDetails().catch(() => {}), // Don't fail if no bank details
  ])
  
  resetProfileForm()
  resetBankForm()
})
</script>
