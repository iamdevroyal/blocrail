<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          404
        </h1>
      </div>
      
      <!-- Message -->
      <h2 class="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
      <p class="text-gray-400 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
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
// 404 Not Found page
</script>
