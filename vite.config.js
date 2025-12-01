import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'resources/js',
            filename: 'sw.js',
            registerType: 'prompt',
            injectRegister: false, // We'll register manually
            scope: '/', // Set scope to root to intercept all requests
            outDir: 'public', // Output SW to public root, not build folder
            workbox: {
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,woff,woff2}',
                    'offline/**/*.html'
                ],
                globIgnores: [
                    '**/node_modules/**/*',
                    '**/vendor/**/*'
                ]
            },
            devOptions: {
                enabled: true,
                type: 'module'
            }
        })
    ],
});
