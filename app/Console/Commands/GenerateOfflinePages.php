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
        
        // Progress Card HTML - matching ProgressCard.jsx styling
        $progressCardHtml = "
            <div class='relative bg-blue-500 rounded-2xl p-6 md:p-8 text-white overflow-hidden'>
                <span class='absolute top-0 left-6 bg-blue-600 text-blue-100 text-sm font-semibold px-3 py-1 rounded-b-lg'>
                    Terakhir Dilihat
                </span>

                <div class='absolute -right-4 -top-4 w-24 h-24 text-blue-400 opacity-50'>
                    <svg fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10 3.5c.6 0 1.1.4 1.2.9l.4 1.9c.1.4.4.7.8.8l1.9.4c.5.1.9.6.9 1.2s-.4 1.1-.9 1.2l-1.9.4c-.4.1-.7.4-.8.8l-.4 1.9c-.1.5-.6.9-1.2.9s-1.1-.4-1.2-.9l-.4-1.9c-.1-.4-.4-.7-.8-.8l-1.9-.4c-.5-.1-.9-.6-.9-1.2s.4-1.1.9-1.2l1.9-.4c.4-.1.7-.4.8-.8l.4-1.9c.1-.5.6-.9 1.2-.9z'></path>
                    </svg>
                </div>

                <div class='relative z-10'>
                    <h3 class='text-2xl font-bold mb-4 pr-10 mt-4'>Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan</h3>
                    <a href='/course/1' class='inline-flex items-center bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-100 transition'>
                        <svg class='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                            <path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clip-rule='evenodd'></path>
                        </svg>
                        Lanjutkan
                    </a>
                </div>
            </div>
        ";

        // Course Cards HTML - matching CourseCard.jsx styling with simple overflow-x
        $coursesHtml = '';
        foreach ($courses as $course) {
            $coursesHtml .= "
                <div class='shrink-0 w-80'>
                    <div class='bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]'>
                        <a href='/course/{$course->id}'>
                            <img
                                src='{$course->thumbnail_url}'
                                alt='{$course->title}'
                                class='w-full h-40 object-cover'
                            />
                            <div class='p-5'>
                                <h3 class='text-lg font-bold text-gray-800 truncate' title='{$course->title}'>
                                    {$course->title}
                                </h3>
                                <p class='text-sm text-gray-500 mt-2 h-10 overflow-hidden line-clamp-2'>
                                    {$course->description}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            ";
        }

        // Course Slider Section - matching CourseSlider.jsx styling (without carousel logic)
        $courseSliderHtml = "
            <div class='mt-12'>
                <div class='flex justify-between items-center mb-4'>
                    <h2 class='text-2xl font-bold text-gray-800'>
                        Kursus tersedia
                    </h2>
                    <div class='flex space-x-2'>
                        <button class='bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition disabled:opacity-50' disabled>
                            <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7'></path>
                            </svg>
                        </button>
                        <button class='bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition disabled:opacity-50' disabled>
                            <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class='overflow-x-auto'>
                    <div class='flex -ml-2 pb-4'>
                        {$coursesHtml}
                    </div>
                </div>
            </div>
        ";

        // PDF Documents HTML - matching PdfDocumentCard.jsx styling
        $pdfHtml = '';
        foreach ($pdfDocuments as $doc) {
            $pdfHtml .= "
                <div class='rounded-lg shadow-md overflow-hidden'>
                    <div class='flex w-full items-center p-4 bg-blue-600 text-white hover:bg-blue-700 transition'>
                        <svg class='w-6 h-6 mr-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                        </svg>
                        <div class='text-left flex-1'>
                            <span class='text-lg font-medium block'>{$doc->title}</span>
                            <span class='text-sm text-blue-100 block'>{$doc->description}</span>
                        </div>
                        <svg class='w-5 h-5 ml-auto transform transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'></path>
                        </svg>
                    </div>
                    <div class='p-4 bg-gray-50 border-t border-gray-200'>
                        <div class='space-y-3'>
                            <div class='flex justify-end'>
                                <a href='{$doc->file_url}' download class='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm'>
                                    <svg class='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                                    </svg>
                                    Download PDF
                                </a>
                            </div>
                            <div class='bg-white border rounded-lg p-4'>
                                <p class='text-sm text-gray-600'>📱 Mode 3T - PDF viewer tidak tersedia. Silakan download untuk melihat konten.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ";
        }

        $pdfSection = $pdfDocuments->count() > 0 ? "
            <div class='mt-8'>
                <div class='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <div class='p-6 md:p-8'>
                        <h2 class='text-2xl font-bold text-gray-800 mb-6'>
                            Dokumen Pembelajaran
                        </h2>
                        <div class='space-y-4'>
                            {$pdfHtml}
                        </div>
                    </div>
                </div>
            </div>
        " : '';

        $content = "
            <div class='py-8'>
                <div class='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <div class='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        <div class='p-6 md:p-8 text-gray-900'>
                            <h1 class='text-3xl font-bold text-gray-800'>
                                Halo {$user->name}!
                            </h1>
                            <p class='text-gray-500 mt-1'>
                                Selamat datang kembali di beranda
                            </p>

                            <div class='mt-8'>
                                {$progressCardHtml}
                            </div>

                            {$courseSliderHtml}
                        </div>
                    </div>

                    {$pdfSection}
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
                        <p class='text-sm text-yellow-800'>📱 Mode 3T - Untuk mengakses konten kursus, sambungkan ke internet</p>
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
                        <p class='text-sm text-yellow-800'>📱 Mode 3T - Untuk mengubah profil, sambungkan ke internet</p>
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
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
        .overflow-x-auto { overflow-x: auto; }
        .overflow-x-auto > .flex { gap: 1rem; padding-left: 0.5rem; padding-right: 0.5rem; }
        .shrink-0 { flex-shrink: 0; }
    </style>
</head>
<body class='font-sans antialiased bg-gray-100'>
    <div class='offline-indicator'>
        📱 Mode 3T Aktif - Beberapa fitur mungkin tidak tersedia
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
