import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],

    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },

    build: {
        // Output directory
        outDir: 'public/build',

        // Generate manifest for Laravel
        manifest: true,

        // Rollup options for optimization
        rollupOptions: {
            input: 'resources/js/app.js',

            output: {
                // Manual chunks for better code splitting
                manualChunks: {
                    // Vendor chunks
                    'vendor-vue': ['vue', 'vue-router', 'pinia'],
                    'vendor-ui': ['vue-toastification'],
                    'vendor-charts': ['chart.js', 'vue-chartjs'],

                    // Feature chunks
                    'seller': [
                        './resources/js/pages/seller/Dashboard.vue',
                        './resources/js/pages/seller/products/Index.vue',
                        './resources/js/pages/seller/orders/Index.vue',
                    ],
                    'admin': [
                        './resources/js/pages/admin/Dashboard.vue',
                        './resources/js/pages/admin/sellers/Index.vue',
                        './resources/js/pages/admin/orders/Index.vue',
                    ],
                },

                // Chunk file naming
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'css/[name]-[hash][extname]'
                    }
                    if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
                        return 'images/[name]-[hash][extname]'
                    }
                    return 'assets/[name]-[hash][extname]'
                },
            },
        },

        // Chunk size warnings
        chunkSizeWarningLimit: 1000,

        // Minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },

        // Source maps for production debugging
        sourcemap: false,
    },

    // Optimization
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            'pinia',
            'vue-toastification',
            'chart.js',
            'vue-chartjs',
        ],
    },

    // Server configuration
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
        },
    },
})
