<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Course;
use App\Models\Informasi;

class GenerateOfflinePages extends Command
{
    protected $signature = 'offline:generate {--user-id=1}';
    protected $description = 'Generate offline HTML pages for PWA fallback';

    public function handle()
    {
        $userId = $this->option('user-id');
        $user = User::find($userId);
        
        if (!$user) {
            $this->error("User with ID {$userId} not found");
            return 1;
        }

        $this->info("Generating offline pages for user: {$user->name}");

        // Get the actual CSS and JS paths from Vite manifest
        $assetPaths = $this->getViteAssetPaths();
        if (!$assetPaths) {
            $this->error("Could not load Vite manifest. Make sure you've run 'npm run build'");
            return 1;
        }

        // Generate static data (same logic as your routes)
        $courses = Course::where('is_published', true)
            ->orderBy('order', 'asc')
            ->get();

        $pdfDocuments = Informasi::where('is_published', true)
            ->whereNull('access')
            ->orderBy('order', 'asc')
            ->get();

        // Generate pages
        $this->generateDashboard($courses, $pdfDocuments, $user, $assetPaths);
        $this->generateCourses($courses, $user, $assetPaths);
        $this->generateProfile($user, $assetPaths);

        $this->info('✅ Offline pages generated successfully!');
        return 0;
    }

    private function getViteAssetPaths()
    {
        $manifestPath = public_path('build/manifest.json');
        
        if (!file_exists($manifestPath)) {
            return null;
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);
        
        return [
            'css' => '/build/' . ($manifest['resources/js/app.jsx']['css'][0] ?? 'assets/app.css'),
            'js' => '/build/' . ($manifest['resources/js/app.jsx']['file'] ?? 'assets/app.js')
        ];
    }

    private function generateDashboard($courses, $pdfDocuments, $user, $assetPaths)
    {
        $html = $this->createBasePage('Dashboard - Kelas Sarah', 'dashboard', $assetPaths);
        
        $coursesHtml = '';
        foreach ($courses as $course) {
            $coursesHtml .= "
                <div class='bg-white rounded-lg shadow-md p-4 mb-4'>
                    <h3 class='text-lg font-semibold text-gray-800'>{$course->title}</h3>
                    <p class='text-gray-600 mt-2'>{$course->description}</p>
                    <div class='mt-4'>
                        <span class='text-sm text-gray-500'>Progress: 0%</span>
                        <div class='bg-gray-200 rounded-full h-2 mt-1'>
                            <div class='bg-blue-600 h-2 rounded-full' style='width: 0%'></div>
                        </div>
                    </div>
                    <a href='/course/{$course->id}' class='inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                        Lanjutkan Belajar
                    </a>
                </div>
            ";
        }

        $pdfHtml = '';
        foreach ($pdfDocuments as $doc) {
            $pdfHtml .= "
                <div class='bg-gray-50 border rounded-lg p-4 mb-3'>
                    <h4 class='font-medium text-gray-800'>{$doc->title}</h4>
                    <p class='text-sm text-gray-600 mt-1'>{$doc->description}</p>
                    <a href='{$doc->file_url}' class='text-blue-600 hover:underline text-sm mt-2 inline-block'>
                        📄 Lihat Dokumen
                    </a>
                </div>
            ";
        }

        $content = "
            <div class='py-8'>
                <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div class='bg-white rounded-lg shadow-sm p-6 mb-8'>
                        <h1 class='text-3xl font-bold text-gray-800'>Halo {$user->name}!</h1>
                        <p class='text-gray-500 mt-1'>Selamat datang kembali di beranda</p>
                        <div class='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                            <p class='text-sm text-yellow-800'>📱 Mode Offline - Data mungkin tidak terbaru</p>
                        </div>
                    </div>
                    
                    <div class='bg-white rounded-lg shadow-sm p-6 mb-8'>
                        <h2 class='text-2xl font-bold text-gray-800 mb-6'>Kursus Anda</h2>
                        {$coursesHtml}
                    </div>

                    <div class='bg-white rounded-lg shadow-sm p-6'>
                        <h2 class='text-2xl font-bold text-gray-800 mb-6'>Dokumen Pembelajaran</h2>
                        {$pdfHtml}
                    </div>
                </div>
            </div>
        ";

        $finalHtml = str_replace('{{CONTENT}}', $content, $html);
        file_put_contents(public_path('offline/dashboard.html'), $finalHtml);
        $this->info('📄 Generated: dashboard.html');
    }

    private function generateCourses($courses, $user, $assetPaths)
    {
        $html = $this->createBasePage('Kursus - Kelas Sarah', 'courses', $assetPaths);
        
        $coursesHtml = '';
        foreach ($courses as $course) {
            $coursesHtml .= "
                <div class='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
                    <div class='p-6'>
                        <h3 class='text-xl font-semibold text-gray-800'>{$course->title}</h3>
                        <p class='text-gray-600 mt-3'>{$course->description}</p>
                        <div class='mt-4 flex items-center justify-between'>
                            <span class='text-sm text-gray-500'>0 dari X modul selesai</span>
                            <a href='/course/{$course->id}' class='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                                Mulai Belajar
                            </a>
                        </div>
                    </div>
                </div>
            ";
        }

        $content = "
            <div class='py-8'>
                <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div class='mb-8'>
                        <h1 class='text-3xl font-bold text-gray-800'>Semua Kursus</h1>
                        <p class='text-gray-600 mt-2'>Pilih kursus yang ingin Anda pelajari</p>
                    </div>
                    
                    <div class='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8'>
                        <p class='text-sm text-yellow-800'>📱 Mode Offline - Untuk mengakses konten kursus, sambungkan ke internet</p>
                    </div>
                    
                    {$coursesHtml}
                </div>
            </div>
        ";

        $finalHtml = str_replace('{{CONTENT}}', $content, $html);
        file_put_contents(public_path('offline/courses.html'), $finalHtml);
        $this->info('📄 Generated: courses.html');
    }

    private function generateProfile($user, $assetPaths)
    {
        $html = $this->createBasePage('Profil - Kelas Sarah', 'profile', $assetPaths);
        
        $content = "
            <div class='py-8'>
                <div class='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 class='text-3xl font-bold text-gray-800 mb-8'>Profil</h1>
                    
                    <div class='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8'>
                        <p class='text-sm text-yellow-800'>📱 Mode Offline - Untuk mengubah profil, sambungkan ke internet</p>
                    </div>
                    
                    <div class='bg-white rounded-lg shadow-sm p-6 mb-6'>
                        <h2 class='text-lg font-medium text-gray-900 mb-6'>Informasi Profil</h2>
                        <div class='space-y-4'>
                            <div>
                                <label class='block text-sm font-medium text-gray-700'>Nama</label>
                                <div class='mt-1 p-3 bg-gray-50 rounded-md text-gray-800'>{$user->name}</div>
                            </div>
                            <div>
                                <label class='block text-sm font-medium text-gray-700'>Email</label>
                                <div class='mt-1 p-3 bg-gray-50 rounded-md text-gray-800'>{$user->email}</div>
                            </div>
                            <p class='text-sm text-gray-500 mt-4'>
                                Untuk mengubah informasi profil, sambungkan ke internet dan kunjungi halaman profil.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ";

        $finalHtml = str_replace('{{CONTENT}}', $content, $html);
        file_put_contents(public_path('offline/profile.html'), $finalHtml);
        $this->info('📄 Generated: profile.html');
    }

    private function createBasePage($title, $activeRoute, $assetPaths)
    {
        return "<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>{$title}</title>
    <link rel='stylesheet' href='{$assetPaths['css']}'>
    <style>
        .offline-indicator { position: fixed; top: 0; left: 0; right: 0; background-color: #fbbf24; color: #92400e; padding: 8px; text-align: center; font-size: 14px; z-index: 50; }
    </style>
</head>
<body class='font-sans antialiased bg-gray-100'>
    <div class='offline-indicator'>
        📱 Mode Offline Aktif - Beberapa fitur mungkin tidak tersedia
    </div>
    
    <nav class='bg-white shadow-sm border-b border-gray-200 mt-8'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div class='flex justify-between h-16'>
                <div class='flex'>
                    <div class='flex-shrink-0 flex items-center'>
                        <h2 class='font-semibold text-xl text-gray-800'>Kelas Sarah</h2>
                    </div>
                    <div class='hidden space-x-8 sm:-my-px sm:ml-10 sm:flex'>
                        <a href='/dashboard' class='inline-flex items-center px-1 pt-1 text-sm font-medium " . ($activeRoute === 'dashboard' ? 'border-b-2 border-indigo-400 text-gray-900' : 'text-gray-500 hover:text-gray-700') . "'>
                            Dashboard
                        </a>
                        <a href='/courses' class='inline-flex items-center px-1 pt-1 text-sm font-medium " . ($activeRoute === 'courses' ? 'border-b-2 border-indigo-400 text-gray-900' : 'text-gray-500 hover:text-gray-700') . "'>
                            Kursus
                        </a>
                        <a href='/profile' class='inline-flex items-center px-1 pt-1 text-sm font-medium " . ($activeRoute === 'profile' ? 'border-b-2 border-indigo-400 text-gray-900' : 'text-gray-500 hover:text-gray-700') . "'>
                            Profil
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    <main>
        {{CONTENT}}
    </main>
    
    <script>
        // Simple offline navigation
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.href) {
                const url = new URL(e.target.href);
                const offlineRoutes = {
                    '/dashboard': '/offline/dashboard.html',
                    '/courses': '/offline/courses.html',
                    '/profile': '/offline/profile.html'
                };
                
                if (offlineRoutes[url.pathname]) {
                    e.preventDefault();
                    window.location.href = offlineRoutes[url.pathname];
                }
            }
        });
    </script>
</body>
</html>";
    }
}
