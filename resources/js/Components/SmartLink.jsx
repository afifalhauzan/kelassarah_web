import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

/**
 * Smart Link Component
 * 
 * Uses Inertia Link when online (SPA navigation)
 * Uses regular <a> tag when offline (browser navigation that Service Worker can intercept)
 */
export default function SmartLink({ href, children, className = '', ...props }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Event listeners for real-time internet status detection
        const handleOnline = () => {
            console.log('🌐 Browser detected ONLINE');
            setIsOnline(true);
        };
        
        const handleOffline = () => {
            console.log('📴 Browser detected OFFLINE');
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // MAGICAL LOGIC:
    // If Online -> Use Inertia Link (SPA, Fast, Smooth)
    // If Offline -> Use regular <a> (Hard Load) -> THIS IS WHAT THE SERVICE WORKER CAPTURES
    if (isOnline) {
        console.log(`🚀 Using Inertia Link for: ${href} (ONLINE)`);
        return (
            <Link href={href} className={className} {...props}>
                {children}
            </Link>
        );
    } else {
        console.log(`📄 Using regular <a> tag for: ${href} (OFFLINE)`);
        return (
            <a href={href} className={className} {...props}>
                {children}
            </a>
        );
    }
}