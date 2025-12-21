// Complete theme.js

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Set theme on page load
function setInitialTheme() {
    let theme = 'light';
    
    // Check localStorage first
    if (currentTheme) {
        theme = currentTheme;
    } 
    // Then check system preference
    else if (prefersDarkScheme.matches) {
        theme = 'dark';
    }
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle button state
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
    
    // Save to localStorage if not already set
    if (!currentTheme) {
        localStorage.setItem('theme', theme);
    }
}

// Toggle theme on button click
function toggleTheme() {
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button state
        themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
        
        // Add animation class
        themeToggle.classList.add('theme-changing');
        setTimeout(() => {
            themeToggle.classList.remove('theme-changing');
        }, 300);
    });
}

// Listen for system theme changes
function watchSystemTheme() {
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            if (themeToggle) {
                themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
            }
        }
    });
}

// Initialize theme functionality
function initTheme() {
    setInitialTheme();
    toggleTheme();
    watchSystemTheme();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);