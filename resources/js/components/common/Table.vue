<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <!-- Header -->
      <thead>
        <tr class="border-b border-slate-700">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'py-3 px-4 text-gray-400 font-medium',
              column.align === 'right' ? 'text-right' : 'text-left'
            ]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="getRowKey(row, index)"
          class="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
          :class="{ 'cursor-pointer': clickable }"
          @click="handleRowClick(row)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[
              'py-3 px-4',
              column.align === 'right' ? 'text-right' : 'text-left'
            ]"
          >
            <!-- Custom slot for column -->
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ formatCell(row[column.key], column) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty State -->
    <div v-if="data.length === 0" class="text-center py-12">
      <slot name="empty">
        <p class="text-gray-400">No data available</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    // Example: [{ key: 'name', label: 'Name', align: 'left', format: 'text' }]
  },
  data: {
    type: Array,
    required: true,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  clickable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['row-click'])

const getRowKey = (row, index) => {
  return row[props.rowKey] || index
}

const handleRowClick = (row) => {
  if (props.clickable) {
    emit('row-click', row)
  }
}

const formatCell = (value, column) => {
  if (value === null || value === undefined) {
    return '-'
  }

  if (column.format === 'currency') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(value)
  }

  if (column.format === 'date') {
    return new Date(value).toLocaleDateString()
  }

  if (column.format === 'datetime') {
    return new Date(value).toLocaleString()
  }

  return value
}
</script>
