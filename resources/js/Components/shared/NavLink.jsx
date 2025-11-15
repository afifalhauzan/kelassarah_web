export default function NavLink({ children, href, className = "", onClick, ...props }) {
    const handleNavClick = () => {
        // Handle section scrolling based on href
        if (href && href.startsWith('#')) {
            // Check if user is on /credits page
            if (window.location.pathname === '/credits') {
                // Redirect to home page first, then scroll after a short delay
                window.location.href = '/';
                setTimeout(() => {
                    executeScrollLogic(href);
                }, 100);
                return;
            }
            
            // Execute scroll logic directly if already on home page
            executeScrollLogic(href);
        }
        
        // Execute custom onClick if provided
        if (onClick) {
            onClick();
        }

        console.log(`Navigating to: ${href || children}`);
    };

    const executeScrollLogic = (href) => {
        // Remove the # to get the section ID
        const sectionId = href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback: scroll to section by common names
            let targetElement = null;
            switch (sectionId.toLowerCase()) {
                case 'hero':
                case 'beranda':
                    targetElement = document.querySelector('main > section:first-child');
                    break;
                case 'mascot':
                case 'tentang':
                    targetElement = document.querySelector('main > section:nth-child(2)');
                    break;
                case 'features':
                case 'fitur':
                    targetElement = document.getElementById('fitur') || document.querySelector('main > section:nth-child(3)');
                    break;
                case 'cta':
                case 'daftar':
                    targetElement = document.querySelector('main > section:last-child');
                    break;
                default:
                    console.log(`Section not found: ${sectionId}`);
            }
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const baseClassName = "font-medium transition-colors duration-200";
    const combinedClassName = `${baseClassName} ${className}`;

    return (
        <button
            onClick={handleNavClick}
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
}