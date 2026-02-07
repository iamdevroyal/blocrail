<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex items-center space-x-4">
          <button @click="$router.back()" class="p-2 text-gray-400 hover:text-white transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white">Edit Product</h1>
            <p class="text-gray-400 mt-1">Update product information</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <Loading v-if="loading && !form.name" text="Loading product..." />

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <Card title="Basic Information" glass>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
              <input v-model="form.name" type="text" required class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <p v-if="errors.name" class="mt-1 text-sm text-red-400">{{ errors.name[0] }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea v-model="form.description" required rows="4" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-400">{{ errors.description[0] }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Price (₦) *</label>
                <input v-model.number="form.price" type="number" required min="0" step="0.01" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <p v-if="errors.price" class="mt-1 text-sm text-red-400">{{ errors.price[0] }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Stock Quantity *</label>
                <input v-model.number="form.stock_quantity" type="number" required min="0" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <p v-if="errors.stock_quantity" class="mt-1 text-sm text-red-400">{{ errors.stock_quantity[0] }}</p>
              </div>
            </div>

            <!-- Category & Subcategory -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select v-model="form.category_id" @change="handleCategoryChange" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <p v-if="errors.category_id" class="mt-1 text-sm text-red-400">{{ errors.category_id[0] }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Subcategory</label>
                <select v-model="form.subcategory_id" :disabled="!form.category_id || loadingSubcategories" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50">
                  <option value="">Select Subcategory</option>
                  <option v-for="sub in subcategories" :key="sub.id" :value="sub.id">
                    {{ sub.name }}
                  </option>
                </select>
                <p v-if="errors.subcategory_id" class="mt-1 text-sm text-red-400">{{ errors.subcategory_id[0] }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select v-model="form.status" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Card>

        <!-- Existing Images -->
        <Card v-if="existingImages.length > 0" title="Existing Images" glass>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in existingImages" :key="image.id || index" class="relative group">
              <img :src="image.url || image" :alt="form.name" class="w-full h-32 object-cover rounded-lg" />
              <button type="button" @click="deleteExistingImage(image.id || image)" class="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </Card>

        <!-- Product Variants -->
        <Card title="Inventory & Variants" glass>
          <VariantManager v-model="form.variants" @update:options="form.attributes = $event" :base-price="form.price" />
        </Card>


        <!-- Add New Images -->
        <Card title="Add New Images" glass>
          <ImageUploader @update:images="newImages = $event" />
        </Card>

        <!-- Actions -->
        <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:space-x-4">
          <Button variant="ghost" type="button" @click="$router.back()" class="w-full sm:w-auto">Cancel</Button>
          <Button variant="primary" type="submit" :loading="saving" class="w-full sm:w-auto">Update Product</Button>
        </div>

        <!-- General Error Message -->
        <div v-if="Object.keys(errors).length > 0" class="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
          <p class="font-medium mb-1">Please correct the following errors:</p>
          <ul class="list-disc list-inside">
            <li v-for="(error, key) in errors" :key="key">
              {{ Array.isArray(error) ? error[0] : error }}
            </li>
          </ul>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Loading from '@/components/common/Loading.vue'
import ImageUploader from '@/components/seller/ImageUploader.vue'
import VariantManager from '@/components/seller/variants/VariantManager.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const toast = useToast()

const productId = route.params.id

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock_quantity: 0,
  category_id: '',
  subcategory_id: '',
  status: 'active',
  variants: [],
  attributes: [],
})

const existingImages = ref([])
const newImages = ref([])
const loading = ref(true)
const saving = ref(false)
const loadingSubcategories = ref(false)
const errors = reactive({})

const categories = computed(() => productStore.categories)
const subcategories = computed(() => productStore.subcategories)

const loadProduct = async () => {
  try {
    const product = await productStore.fetchProduct(productId)
    
    // Fetch categories first if not loaded
    if (categories.value.length === 0) {
      await productStore.fetchCategories()
    }

    Object.assign(form, {
      name: product.name,
      description: product.description,
      price: product.price,
      stock_quantity: product.stock_quantity,
      category_id: product.category_id || '',
      subcategory_id: product.subcategory_id || '',
      status: product.is_active ? 'active' : 'inactive',
      variants: product.variants || [],
      attributes: product.variant_attributes || [], // Populate attributes from backend data
    })
 
    // If there's a category, load its subcategories
    if (form.category_id) {
      await productStore.fetchSubcategories(form.category_id)
      // Re-assign subcategory_id because it might have been cleared by state update if not careful
      form.subcategory_id = product.subcategory_id || ''
    }

    existingImages.value = product.images || []
  } catch (error) {
    console.error('Load error:', error)
    toast.error('Failed to load product')
    router.push('/seller/products')
  } finally {
    loading.value = false
  }
}

const handleCategoryChange = async () => {
  form.subcategory_id = ''
  if (!form.category_id) return

  loadingSubcategories.value = true
  try {
    await productStore.fetchSubcategories(form.category_id)
  } catch (error) {
    toast.error('Failed to load subcategories')
  } finally {
    loadingSubcategories.value = false
  }
}

const deleteExistingImage = async (imageId) => {
  try {
    await productStore.deleteImage(productId, imageId)
    existingImages.value = existingImages.value.filter(img => img.id !== imageId)
    toast.success('Image deleted')
  } catch (error) {
    toast.error('Failed to delete image')
  }
}

const handleSubmit = async () => {
  saving.value = true
  Object.keys(errors).forEach(key => delete errors[key])

  // Prepare submission data
  const submissionData = {
    ...form,
    is_active: form.status === 'active',
    attributes: form.attributes, // Send attributes structure
  }

  // Remove keys not accepted by backend
  delete submissionData.status
  try {
    await productStore.updateProduct(productId, submissionData)
    
    // Upload new images if any
    if (newImages.value.length > 0) {
      await productStore.uploadImages(productId, newImages.value)
    }

    toast.success('Product updated successfully!')
    router.push('/seller/products')
  } catch (error) {
    console.error('Update error:', error)
    if (error.response?.data?.errors) {
      Object.assign(errors, error.response.data.errors)
    }
    toast.error(error.response?.data?.message || 'Failed to update product')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>
