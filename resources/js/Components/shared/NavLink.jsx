export default function NavLink({ children, href, className = "", onClick, ...props }) {
    const handleNavClick = () => {
        // Centralized navigation logic
        if (onClick) {
            onClick();
        }
        
        // Add your centralized navigation logic here
        // For example: analytics tracking, route handling, etc.
        console.log(`Navigating to: ${href || children}`);
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