import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/ui/Navbar';
import Footer from '@/Components/ui/Footer';
import Features from '@/Components/LandingPage/Features';
import Hero from '@/Components/LandingPage/Hero';
import Mascot from '@/Components/LandingPage/Mascot';
import CTA from '@/Components/LandingPage/CTA';

export default function LandingPage({ auth }) {
    return (
        <>
            <Head title="Selamat Datang di Kak Sarah" />
            
            <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 selection:bg-indigo-500 selection:text-white">
                <Navbar auth={auth} />
                
                {/* Main Content Area */}
                <main>
                    <Hero />
                    <Mascot />
                    <Features />
                    <CTA />
                </main>

                <Footer />
            </div>
        </>
    );
}