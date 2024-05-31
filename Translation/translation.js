document.addEventListener('DOMContentLoaded', () => {
    // Fetch translations based on selected language
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    setLanguage(userLang); // Set default language based on browser settings

    // Add event listener for language buttons
    document.querySelectorAll('.language-button').forEach(button => {
        button.addEventListener('click', () => {
            const language = button.getAttribute('data-lang');
            setLanguage(language);
        });
    });    
});

function setLanguage(language) {
    fetch(`/Translation/language-${language}.json`)
        .then(response => response.json())
        .then(translations => {
            window.translations = translations;
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
