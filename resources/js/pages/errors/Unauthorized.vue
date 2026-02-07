<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 403 Illustration -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border-4 border-red-500/50">
          <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      
      <!-- Message -->
      <h2 class="text-3xl font-semibold text-white mb-4">Access Denied</h2>
      <p class="text-gray-400 mb-8 max-w-md mx-auto">
        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
      </p>
      
      <!-- Actions -->
      <div class="flex gap-4 justify-center">
        <button
          @click="$router.go(-1)"
          class="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
        >
          Go Back
        </button>
        <router-link
          to="/"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
        >
          Go Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 403 Unauthorized page
</script>
