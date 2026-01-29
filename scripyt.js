document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!toggle) return;

    // Accessibility
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');

    function updateUI(isDark) {
        if (isDark) {
            body.classList.add('dark');
            toggle.classList.remove('fa-moon');
            toggle.classList.add('fa-sun');
            toggle.setAttribute('aria-pressed', 'true');
            toggle.setAttribute('title', 'Switch to light mode');
        } else {
            body.classList.remove('dark');
            toggle.classList.remove('fa-sun');
            toggle.classList.add('fa-moon');
            toggle.setAttribute('aria-pressed', 'false');
            toggle.setAttribute('title', 'Switch to dark mode');
        }
    }

    // Initialize from localStorage or system preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const startDark = saved === 'dark' || (saved === null && prefersDark);
    updateUI(startDark);

    function toggleTheme() {
        const isDark = body.classList.toggle('dark');
        updateUI(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    toggle.addEventListener('click', toggleTheme);

    // Keyboard support: Enter or Space
    toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            toggleTheme();
        }
    });
});
