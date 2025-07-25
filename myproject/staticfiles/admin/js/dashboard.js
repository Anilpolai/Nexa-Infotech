// Theme toggle logic
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('theme-dark');
        const btn = document.getElementById('themeToggle');
        if (btn) btn.innerText = '☀️';
    } else {
        document.body.classList.remove('theme-dark');
        const btn = document.getElementById('themeToggle');
        if (btn) btn.innerText = '🌙';
    }
}

function getPreferredTheme() {
    // Force dark theme on mobile
    if (window.innerWidth <= 767) {
        return 'dark';
    }
    return localStorage.getItem('theme') || 'light';
}

function toggleTheme() {
    // Only allow toggle on desktop
    if (window.innerWidth > 767) {
        const current = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Apply preferred theme
    applyTheme(getPreferredTheme());
    // Theme toggle button
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});

// Listen for resize to re-apply theme on screen size change
window.addEventListener('resize', function() {
    applyTheme(getPreferredTheme());
});

// Logout handler - updated to work with Django URLs
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Let the Django view handle the logout
        window.location.href = logoutBtn.getAttribute('href');
    });
} 