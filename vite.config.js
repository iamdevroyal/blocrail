import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer(),
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        host: 'localhost',
        port: 5173,
        strictPort: true,
    },
});
