<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-white">Product Variants</h3>
      <Button v-if="!showForm" type="button" size="sm" variant="secondary" @click="addOption">
        Add Option
      </Button>
    </div>

    <!-- Options Builder -->
    <div v-if="options.length > 0" class="space-y-4">
      <div v-for="(option, index) in options" :key="index" class="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div class="flex gap-4 items-start">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-300 mb-1">Option Name</label>
            <input
              v-model="option.name"
              type="text"
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. Size, Color"
              @input="generateMatrix"
            />
          </div>
          <div class="flex-[2]">
            <label class="block text-sm font-medium text-gray-300 mb-1">Values (comma separated)</label>
            <div class="flex gap-2">
              <input
                v-model="option.rawValues"
                type="text"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="e.g. S, M, L or Red, Blue"
                @input="handleValuesInput(index)"
              />
              <button
                type="button"
                class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                @click="removeOption(index)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button v-if="options.length < 3" type="button" size="sm" variant="outline" class="w-full" @click="addOption">
        Add Another Option
      </Button>
    </div>

    <!-- Variants Table -->
    <div v-if="variants.length > 0" class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-slate-800/80 text-gray-300 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">Variant</th>
            <th class="px-4 py-3 w-32">Price (₦)</th>
            <th class="px-4 py-3 w-24">Stock</th>
            <th class="px-4 py-3">SKU</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
          <tr v-for="(variant, index) in variants" :key="index" class="text-white hover:bg-slate-800/30 transition">
            <td class="px-4 py-3">
              <span class="font-medium">
                {{ formatAttributes(variant.attributes) }}
              </span>
            </td>
            <td class="px-4 py-3 text-red-500">
              <input
                v-model.number="variant.price"
                type="number"
                step="0.01"
                class="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-purple-500"
              />
            </td>
            <td class="px-4 py-3">
              <input
                v-model.number="variant.stock_quantity"
                type="number"
                class="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-purple-500"
              />
            </td>
            <td class="px-4 py-3">
              <input
                v-model="variant.sku"
                type="text"
                class="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-purple-500"
                placeholder="Optional"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else-if="options.length > 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-slate-700 rounded-lg">
      Defined options and values to generate variant combinations
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  basePrice: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue', 'update:options'])

const options = ref([])
const variants = ref([])

  // Initialize if editing
  if (props.modelValue && props.modelValue.length > 0) {
    // Create a deep copy to work with
    const initialVariants = JSON.parse(JSON.stringify(props.modelValue))
    
    // Try to reconstruct options from variants for the UI
    const reconstructedOptions = {}
    
    // Normalize attributes for all variants first
    initialVariants.forEach(v => {
      const attributes = {}
      
      // We strictly use the new relation (v.attribute_values)
      if (v.attribute_values) {
          v.attribute_values.forEach(av => {
              // Handle case where variant_attribute might be missing/deleted but value exists
              const name = av.variant_attribute ? av.variant_attribute.name : 'Unknown'
              attributes[name] = av.value
          })
          v.attributes = attributes
      } else if (v.attributes) {
          // Keep v.attributes if it exists (for temporary state before save)
          // but we prioritize attribute_values if available
      }
  
      Object.entries(v.attributes || {}).forEach(([name, value]) => {
        if (!reconstructedOptions[name]) reconstructedOptions[name] = new Set()
        reconstructedOptions[name].add(value)
      })
    })
  
    // Assign normalized variants to state
    variants.value = initialVariants
  
    options.value = Object.entries(reconstructedOptions).map(([name, valuesSet]) => {
      const values = Array.from(valuesSet)
      return {
        name,
        values,
        rawValues: values.join(', ')
      }
    })
    
    // Emit initial options so parent form has the structure immediately
    emit('update:options', options.value)

    // Trigger update for modelValue to ensure normalized attributes are present
    // This fixes the "The variants.X.attributes field is required" error
    const sanitized = initialVariants.map(v => ({
      ...v,
      price: v.price === '' || v.price === null ? 0 : v.price,
      stock_quantity: v.stock_quantity === '' || v.stock_quantity === null ? 0 : v.stock_quantity
    }))
    emit('update:modelValue', sanitized)
  }

const addOption = () => {
  if (options.value.length >= 3) return
  options.value.push({ name: '', values: [], rawValues: '' })
}

const removeOption = (index) => {
  options.value.splice(index, 1)
  generateMatrix()
}

const handleValuesInput = (index) => {
  const option = options.value[index]
  option.values = option.rawValues.split(',')
    .map(v => v.trim())
    .filter(v => v !== '')
  generateMatrix()
}

const generateMatrix = () => {
  // Normalize and filter valid options
  const validOptions = options.value
    .filter(o => o.name.trim() && o.values.length > 0)
    .map(o => ({ ...o, name: o.name.trim() }))

  // Check for duplicate names to prevent attribute collisions
  const seenNames = new Set()
  for (const o of validOptions) {
    if (seenNames.has(o.name)) {
      // If duplicate, we stop matrix generation to avoid corrupted state
      variants.value = []
      return
    }
    seenNames.add(o.name)
  }
  
  if (validOptions.length === 0) {
    variants.value = []
    emit('update:options', [])
    return
  }

  // Emit options for parent component to include in submission
  emit('update:options', validOptions)

  // Cartesian product function
  const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
  
  const optionValues = validOptions.map(o => o.values.map(v => ({ name: o.name, value: v })))
  const combinations = validOptions.length === 1 
    ? optionValues[0].map(v => [v])
    : cartesian(...optionValues)

  const newVariants = combinations.map(combo => {
    const attributes = {}
    combo.forEach(attr => attributes[attr.name] = attr.value)
    
    // Strategy 1: Exact Match
    // Check if we have this exact combination already (e.g. keeping "Red/Small" when adding "Red/Medium")
    let match = variants.value.find(v => {
      const vAttrs = v.attributes || {}
      const vKeys = Object.keys(vAttrs)
      const newKeys = Object.keys(attributes)
      
      if (vKeys.length !== newKeys.length) return false
      return vKeys.every(k => vAttrs[k] === attributes[k])
    })

    // Strategy 2: Parent/Subset Match
    // If no exact match, look for a variant that is a direct parent (subset) of the new one
    // (e.g. inheriting "Red" details when creating "Red/Small" for the first time)
    // We only do this if the existing variant has FEWER attributes than the new one (strict parent)
    if (!match) {
      match = variants.value.find(v => {
        const vAttrs = v.attributes || {}
        const vKeys = Object.keys(vAttrs)
        const newKeys = Object.keys(attributes)
        
        // Parent must have fewer attributes
        if (vKeys.length >= newKeys.length) return false
        if (vKeys.length === 0) return false
        
        // All keys in existing must match the new attributes
        return vKeys.every(k => attributes[k] === vAttrs[k])
      })
    }

    // We removed the "Sibling Match" strategy to avoid unwanted assumptions.
    // New variants that are not direct descendants of an existing variant will start fresh.

    return match ? {
      attributes,
      price: match.price,
      stock_quantity: match.stock_quantity,
      sku: match.sku
    } : {
      attributes,
      price: props.basePrice || 0,
      stock_quantity: 0,
      sku: ''
    }
  })

  variants.value = newVariants
}

const formatAttributes = (attributes) => {
  if (!attributes) return ''
  return Object.entries(attributes)
    .map(([key, val]) => `${key}: ${val}`)
    .join(' / ')
}

  watch(variants, (newVal) => {
    // Ensure numbers are valid before emitting
    const sanitized = newVal.map(v => ({
      ...v,
      price: v.price === '' || v.price === null ? 0 : v.price,
      stock_quantity: v.stock_quantity === '' || v.stock_quantity === null ? 0 : v.stock_quantity
    }))
    emit('update:modelValue', sanitized)
  }, { deep: true })
</script>
