<template>
  <div class="space-y-4">
    <div class="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
      <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileSelect" />
      
      <svg class="w-12 h-12 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      
      <p class="text-white font-medium mb-1">Click to upload or drag and drop</p>
      <p class="text-gray-400 text-sm">PNG, JPG up to 5MB each</p>
    </div>

    <!-- Image Previews -->
    <div v-if="previewImages.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="(image, index) in previewImages" :key="index" class="relative group">
        <img :src="image.url" :alt="`Preview ${index + 1}`" class="w-full h-32 object-cover rounded-lg" />
        <button @click="removeImage(index)" class="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:images'])

const fileInput = ref(null)
const previewImages = ref([])
const selectedFiles = ref([])

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  addFiles(files)
}

const addFiles = (files) => {
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} is too large. Maximum size is 5MB.`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImages.value.push({
        url: e.target.result,
        file,
      })
      selectedFiles.value.push(file)
      emit('update:images', selectedFiles.value)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
  emit('update:images', selectedFiles.value)
}
</script>
