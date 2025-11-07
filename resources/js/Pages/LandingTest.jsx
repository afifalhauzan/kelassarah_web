import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Selamat Datang di Kak Sarah" />
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 selection:bg-indigo-500 selection:text-white">
                
                {/* Header for Login/Register Links */}
                <header className="absolute top-0 right-0 p-6 z-10">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-indigo-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-indigo-500"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-indigo-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </header>

                {/* Main Content Area */}
                <main>
                    {/* Section 1: Hero Page */}
                    <div className="relative w-full min-h-screen flex items-center justify-center px-6 lg:px-8">
                        {/* Background gradient (optional but nice) */}
                        <div
                            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                        </div>
                        
                        <div className="max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                Belajar Jadi Mudah Bersama <span className="text-indigo-600 dark:text-indigo-400">Kak Sarah</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Platform Learning Management System (LMS) yang dirancang untuk membuat proses belajar mengajar lebih interaktif, efisien, dan menyenangkan.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Daftar Sekarang
                                </Link>
                                <a href="#fitur" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Lihat Fitur <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Features */}
                    <div id="fitur" className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Fitur Unggulan</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                    Semua yang Anda Butuhkan untuk Belajar
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                    Kami menyediakan berbagai alat untuk mendukung perjalanan belajar Anda, dari materi hingga ruang diskusi.
                                </p>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                    {/* Feature 1 */}
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                {/* Heroicon: book-open */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                                </svg>
                                            </div>
                                            Manajemen Materi Terpusat
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                            Akses semua materi pelajaran, video, dan dokumen di satu tempat yang terorganisir dengan baik.
                                        </dd>
                                    </div>
                                    
                                    {/* Feature 2 */}
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                {/* Heroicon: chat-bubble-left-right */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.091-3.091c-1.153.24-2.384.363-3.64.363a18.415 18.415 0 01-14.49-7.105c0-1.017.31-2.009.87-2.816.595-.84 1.443-1.574 2.44-2.112v-2.053a.75.75 0 01.75-.75h.75c.108 0 .21.02.31.06a.75.75 0 01.44 1.22l-1.06 1.06c.27.13.53.27.78.424a18.09 18.09 0 018.25-2.103V3.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.511c.27.05.54.102.8.158zM12 18.363a16.515 16.515 0 008.25-2.223V12c0-.853-.54-1.6-1.32-1.875a16.5 16.5 0 00-6.93 4.23zM6.75 12a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-3z" />
                                                </svg>
                                            </div>
                                            Diskusi Interaktif
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                            Forum diskusi terintegrasi untuk setiap mata pelajaran, memungkinkan siswa dan guru berkolaborasi.
                                        </dd>
                                    </div>
                                    
                                    {/* Feature 3 */}
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                {/* Heroicon: clipboard-document-check */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9.099M16.875 4.5l-6 6M16.875 4.5l-1.875-1.875M16.875 4.5l1.875 1.875" />
                                                </svg>
                                            </div>
                                            Tugas dan Penilaian Online
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                            Kumpulkan tugas secara digital dan berikan nilai langsung melalui platform. Efisien dan tanpa kertas.
                                        </dd>
                                    </div>

                                    {/* Feature 4 */}
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                {/* Heroicon: chart-pie */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                                </svg>
                                            </div>
                                            Laporan Progres Belajar
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                            Pantau kemajuan belajar siswa dengan analitik dan laporan yang mudah dipahami.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                        <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Kak Sarah LMS. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}