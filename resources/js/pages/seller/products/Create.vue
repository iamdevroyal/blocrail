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
            <h1 class="text-2xl md:text-3xl font-bold text-white">Create Product</h1>
            <p class="text-gray-400 mt-1">Add a new product to your catalog</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <Card title="Basic Information" glass>
          <div class="space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
              <input v-model="form.name" type="text" required class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter product name" />
              <p v-if="errors.name" class="mt-1 text-sm text-red-400">{{ errors.name[0] }}</p>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea v-model="form.description" required rows="4" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Describe your product"></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-400">{{ errors.description[0] }}</p>
            </div>

            <!-- Price & Stock -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Price (₦) *</label>
                <input v-model.number="form.price" type="number" required min="0" step="0.01" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="0.00" />
                <p v-if="errors.price" class="mt-1 text-sm text-red-400">{{ errors.price[0] }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Stock Quantity *</label>
                <input v-model.number="form.stock_quantity" type="number" required min="0" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="0" />
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

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select v-model="form.status" class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Card>

        <!-- Product Variants -->
        <Card title="Inventory & Variants" glass>
          <VariantManager v-model="form.variants" @update:options="form.attributes = $event" :base-price="form.price" />
        </Card>

        <!-- Images -->
        <Card title="Product Images" glass>
          <ImageUploader @update:images="form.images = $event" />
        </Card>

        <!-- Actions -->
        <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:space-x-4">
          <Button variant="ghost" type="button" @click="$router.back()" class="w-full sm:w-auto">Cancel</Button>
          <Button variant="primary" type="submit" :loading="loading" class="w-full sm:w-auto">Create Product</Button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import AppLayout from '@/components/common/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import ImageUploader from '@/components/seller/ImageUploader.vue'
import VariantManager from '@/components/seller/variants/VariantManager.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const productStore = useProductStore()
const toast = useToast()

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock_quantity: 0,
  category_id: '',
  subcategory_id: '',
  status: 'active',
  images: [],
  variants: [],
})

const errors = reactive({})
const loading = ref(false)
const loadingSubcategories = ref(false)

const categories = computed(() => productStore.categories)
const subcategories = computed(() => productStore.subcategories)

onMounted(async () => {
  try {
    await productStore.fetchCategories()
  } catch (error) {
    toast.error('Failed to load categories')
  }
})

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

const handleSubmit = async () => {
  loading.value = true
  Object.keys(errors).forEach(key => delete errors[key])

  // Prepare submission data
  const submissionData = {
    name: form.name,
    description: form.description,
    price: form.price,
    stock_quantity: form.stock_quantity,
    attributes: form.attributes, // Send structured attributes
    variants: form.variants,
    is_active: form.status === 'active',
    category_id: form.category_id || null,
    subcategory_id: form.subcategory_id || null,
  }

  try {
    const product = await productStore.createProduct(submissionData)
    
    // Upload images if any
    if (form.images.length > 0) {
      await productStore.uploadImages(product.id, form.images)
    }

    toast.success('Product created successfully!')
    router.push('/seller/products')
  } catch (error) {
    console.error('Create error:', error)
    if (error.response?.data?.errors) {
      Object.assign(errors, error.response.data.errors)
    }
    toast.error(error.response?.data?.message || 'Failed to create product')
  } finally {
    loading.value = false
  }
}
</script>
