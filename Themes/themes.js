// /Themes/themes.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to set the theme
    function setTheme(theme) {
        document.body.className = theme + '-theme';
        // Store theme in local storage to persist across sessions
        localStorage.setItem('theme', theme);
    }

    // Apply stored theme on page load
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
    setTheme(savedTheme);

    // Theme button event listeners
    document.querySelectorAll('.theme-button').forEach(button => {
        button.addEventListener('click', () => setTheme(button.dataset.theme));
    });
});
