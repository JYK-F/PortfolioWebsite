document.addEventListener("DOMContentLoaded", function() {
    setupUNMContent();
});

function setupUNMContent() {
    fetch('/unm.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('unm').innerHTML = data;
            console.log('UNM HTML loaded and added to the document');
            addUNMEventListeners();
            setupThemeSwitcher(); // Call setupThemeSwitcher after loading the content
        })
        .catch(error => console.error('Error loading unm.html:', error));
}

function setupThemeSwitcher() {
    const themeElements = {
        toggleButton: document.getElementById('toggle-theme'),
        switchButton: document.getElementById('switch-theme'),
        batteryIcon: document.getElementById('battery-icon')
    };

    if (!themeElements.toggleButton || !themeElements.switchButton) {
        console.error('Toggle theme or switch theme button not found.');
        return;
    }

    let currentTheme = localStorage.getItem('theme') || 'dark'; // Retrieve the stored theme
    let isY2KTheme = false;

    updateTheme(currentTheme); // Set the initial theme

    themeElements.toggleButton.addEventListener('click', toggleTheme);
    themeElements.switchButton.addEventListener('click', switchTheme);

    function toggleTheme() {
        console.log('Toggle theme button clicked');
        if (isY2KTheme) {
            isY2KTheme = false;
            console.log('Y2K theme reset');
        }
        currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
        updateTheme(currentTheme);
    }

    function switchTheme() {
        console.log('Switch theme button clicked'); // have to change this to when theme is active
        if (isY2KTheme) {
            updateTheme(currentTheme);
            console.log(`Switched back to ${currentTheme} theme`);
            themeElements.switchButton.src = '/UNM/Icons/heart-empty.svg';
            themeElements.batteryIcon.style.display = 'none';
        } else {
            updateTheme('Y2K');
            console.log('Switched to Y2K theme');
            themeElements.switchButton.src = '/UNM/Icons/heart-filled.svg';
            themeElements.batteryIcon.style.display = 'block';
        }
        isY2KTheme = !isY2KTheme;
    }

    function updateTheme(theme) {
        const themeStylesheet = document.getElementById('theme-stylesheet');
        if (themeStylesheet) {
            // Adjust the path to the correct relative location
            themeStylesheet.href = `/Themes/${theme}.css`;
        } else {
            console.error('Element with ID "theme-stylesheet" not found.');
        }
        document.documentElement.className = `${theme}-theme`; // Add class to document element
        console.log(`Theme switched to ${theme}`);
        localStorage.setItem('theme', theme); // Store the selected theme
        updateUNMTheme(`${theme}-theme`); // Update UNM content
    }

    function updateUNMTheme(themeClass) {
        const unmElement = document.getElementById('unm');
        if (unmElement) {
            unmElement.className = `${themeClass} unm-container`; // Set the class of the UNM content
            console.log(`UNM content theme updated to ${themeClass}`);
        }
    }
}
