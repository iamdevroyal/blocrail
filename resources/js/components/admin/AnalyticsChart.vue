<template>
  <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-white">{{ title }}</h3>
      <div v-if="showPeriodSelector" class="flex items-center space-x-2">
        <button
          v-for="period in periods"
          :key="period.value"
          @click="selectedPeriod = period.value"
          :class="[
            'px-3 py-1 text-xs font-medium rounded-lg transition',
            selectedPeriod === period.value
              ? 'bg-purple-600 text-white'
              : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
          ]"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <div class="relative" :style="{ height: height + 'px' }">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'line', // 'line' or 'bar'
    validator: (value) => ['line', 'bar'].includes(value)
  },
  data: {
    type: Object,
    required: true
  },
  height: {
    type: Number,
    default: 300
  },
  showPeriodSelector: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['period-change'])

const chartCanvas = ref(null)
let chartInstance = null

const selectedPeriod = ref('7d')
const periods = [
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
  { label: '1Y', value: '1y' }
]

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#9CA3AF',
        font: {
          size: 12
        },
        padding: 15,
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: '#1E293B',
      titleColor: '#F3F4F6',
      bodyColor: '#D1D5DB',
      borderColor: '#475569',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.parsed.y !== null) {
            // Format as currency if it's a revenue chart
            if (props.title.toLowerCase().includes('revenue') || props.title.toLowerCase().includes('gmv')) {
              label += '₦' + context.parsed.y.toLocaleString()
            } else {
              label += context.parsed.y.toLocaleString()
            }
          }
          return label
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: '#334155',
        drawBorder: false
      },
      ticks: {
        color: '#9CA3AF',
        font: {
          size: 11
        }
      }
    },
    y: {
      grid: {
        color: '#334155',
        drawBorder: false
      },
      ticks: {
        color: '#9CA3AF',
        font: {
          size: 11
        },
        callback: function(value) {
          // Format as currency if it's a revenue chart
          if (props.title.toLowerCase().includes('revenue') || props.title.toLowerCase().includes('gmv')) {
            return '₦' + value.toLocaleString()
          }
          return value.toLocaleString()
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
}))

const destroyChart = () => {
  if (chartCanvas.value) {
    const existingChart = Chart.getChart(chartCanvas.value)
    if (existingChart) {
      existingChart.destroy()
    }
  }
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

const createChart = () => {
  if (!chartCanvas.value) return

  // Destroy existing chart
  destroyChart()

  const ctx = chartCanvas.value.getContext('2d')

  // Prepare datasets with styling
  const datasets = props.data.datasets.map((dataset, index) => {
    const colors = [
      { bg: 'rgba(147, 51, 234, 0.1)', border: 'rgb(147, 51, 234)' }, // Purple
      { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgb(59, 130, 246)' }, // Blue
      { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgb(16, 185, 129)' }, // Green
      { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgb(245, 158, 11)' }, // Yellow
    ]
    const color = colors[index % colors.length]

    return {
      ...dataset,
      backgroundColor: props.type === 'line' ? color.bg : color.border,
      borderColor: color.border,
      borderWidth: 2,
      fill: props.type === 'line',
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: color.border,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }
  })

  chartInstance = new Chart(ctx, {
    type: props.type,
    data: {
      labels: props.data.labels,
      datasets: datasets
    },
    options: chartOptions.value
  })
}

watch(() => props.data, () => {
  createChart()
}, { deep: true })

watch(selectedPeriod, (newPeriod) => {
  emit('period-change', newPeriod)
})

onMounted(() => {
  createChart()
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>
