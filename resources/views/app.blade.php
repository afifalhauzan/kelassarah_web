<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- PWA Manifest -->
        <link rel="manifest" href="/manifest.webmanifest">
        <meta name="theme-color" content="#000000">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <!-- Service Worker Registration -->
        <script>
            console.log('🔧 Checking for service worker support...');
            if ('serviceWorker' in navigator) {
                console.log('✅ Service Worker is supported');
                window.addEventListener('load', function() {
                    console.log('🚀 Window loaded, registering service worker...');
                    
                    navigator.serviceWorker.register('/build/sw.js')
                        .then(function(registration) {
                            console.log('✅ SW registered successfully:', registration);
                            console.log('📍 SW scope:', registration.scope);
                            
                            // Check if there's an existing service worker
                            if (registration.active && registration.waiting) {
                                console.log('🔄 New SW waiting, activating...');
                                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                            }
                            
                            // Listen for updates
                            registration.addEventListener('updatefound', () => {
                                console.log('🔄 SW update found');
                                const newWorker = registration.installing;
                                
                                newWorker.addEventListener('statechange', () => {
                                    if (newWorker.state === 'installed') {
                                        console.log('🔄 New SW installed, activating...');
                                        newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    }
                                });
                            });
                            
                            // Force immediate activation
                            if (registration.installing) {
                                console.log('🔄 SW installing, will activate when ready');
                            } else if (registration.waiting) {
                                console.log('🔄 SW waiting, activating now');
                                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                            } else if (registration.active) {
                                console.log('✅ SW is active and ready');
                            }
                        })
                        .catch(function(registrationError) {
                            console.error('❌ SW registration failed:', registrationError);
                        });
                    
                    // Listen for service worker controller changes
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        console.log('🔄 SW controller changed - reloading page');
                        window.location.reload();
                    });
                });
            } else {
                console.log('❌ Service Worker not supported in this browser');
            }
        </script>
    </body>
</html>
