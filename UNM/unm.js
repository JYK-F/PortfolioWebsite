document.addEventListener("DOMContentLoaded", function() {
    fetch('/UNM/unm.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('unm').innerHTML = data;

            // Add event listener for the unm-icon click event
            document.querySelector('.unm-icon').addEventListener('click', () => {
                const unmTree = document.querySelector('.unm-tree');
                unmTree.style.display = unmTree.style.display === 'block' ? 'none' : 'block';
            });

            // Add event listeners for theme buttons
            document.querySelectorAll('.theme-button').forEach(button => {
                button.addEventListener('click', () => {
                    const theme = button.getAttribute('data-theme');
                    setTheme(theme);
                });
            });

            // Add event listeners for language buttons
            document.querySelectorAll('.language-button').forEach(button => {
                button.addEventListener('click', () => {
                    const language = button.getAttribute('data-lang');
                    setLanguage(language);
                });
            });
        })
        .catch(error => console.error('Error loading unm.html:', error));
});

function setLanguage(language) {
    fetch(`/Translation/language-${language}.json`)
        .then(response => response.json())
        .then(translations => {
            window.translations = translations[language];
            translatePage();
        })
        .catch(error => console.error('Error loading translations:', error));
}

function translatePage() {
    if (!window.translations) return;

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (window.translations[key]) {
            element.textContent = window.translations[key];
        }
    });
}
