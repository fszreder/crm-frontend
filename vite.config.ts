/// <reference types="vitest" />

import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/_redirects',
                    dest: '.',
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
    },
});
