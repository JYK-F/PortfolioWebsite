document.addEventListener("DOMContentLoaded", function() {
    // Set the initial theme based on local storage or default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add event listeners for theme buttons
    document.querySelectorAll('.theme-button').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            setTheme(theme);
        });
    });
});

function setTheme(themeName) {
    // Remove any existing theme classes
    document.documentElement.classList.remove('light-theme', 'dark-theme', 'special-theme');

    // Apply the selected theme class
    document.documentElement.classList.add(themeName + '-theme');

    // Update the theme-specific CSS file
    document.getElementById('theme').setAttribute('href', '/Themes/' + themeName + '.css');

    // Save the selected theme to local storage
    localStorage.setItem('theme', themeName);
}
