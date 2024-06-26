// Main UNM function: Load content and set up event listeners
document.addEventListener("DOMContentLoaded", function() {
    fetch('/unm.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('unm').innerHTML = data;

            // Add event listener for the unm-icon click event
            document.querySelector('.unm-icon').addEventListener('click', () => {
                const unmView = document.querySelector('.unm-view');
                unmView.style.display = unmView.style.display === 'block' ? 'none' : 'block';
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

function addUNMEventListeners() {
    document.querySelector('.unm-icon').addEventListener('click', toggleUNMView);
}

function toggleUNMView() {
    const unmView = document.querySelector('.unm-view');
    unmView.style.display = unmView.style.display === 'block' ? 'none' : 'block';
}

// Translation function: Manage language translation
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
