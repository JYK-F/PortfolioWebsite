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
          setupThemeSwitcher(); // Move setupThemeSwitcher inside the then block
      })
      .catch(error => console.error('Error loading unm.html:', error));
}

function addUNMEventListeners() {
  document.querySelector('.unm-icon').addEventListener('click', toggleUNMTree);
  document.querySelectorAll('.language-button').forEach(button => {
      button.addEventListener('click', () => {
          const language = button.getAttribute('data-lang');
          setLanguage(language);
      });
  });
}

function toggleUNMTree() {
  const unmTree = document.querySelector('.unm-tree');
  unmTree.style.display = unmTree.style.display === 'block' ? 'none' : 'block';
}

function setupThemeSwitcher() {
  const themeElements = {
      toggleButton: document.getElementById('toggle-theme'),
      switchButton: document.getElementById('switch-theme')
  };

  if (!themeElements.toggleButton || !themeElements.switchButton) {
      console.error('Toggle theme or switch theme button not found.');
      return;
  }

  let currentTheme = localStorage.getItem('theme') || 'dark'; // Retrieve the stored theme
  let isCustomTheme = false;

  updateTheme(currentTheme); // Set the initial theme

  themeElements.toggleButton.addEventListener('click', toggleTheme);
  themeElements.switchButton.addEventListener('click', switchTheme);

  function toggleTheme() {
      console.log('Toggle theme button clicked');
      if (isCustomTheme) {
          isCustomTheme = false;
          console.log('Custom theme reset');
      }
      currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      updateTheme(currentTheme);
  }

  function switchTheme() {
      console.log('Switch theme button clicked');
      if (isCustomTheme) {
          updateTheme(currentTheme);
          console.log(`Switched back to ${currentTheme} theme`);
      } else {
          updateTheme('Y2K');
          console.log('Switched to custom Y2K theme');
      }
      isCustomTheme = !isCustomTheme;
  }

  function updateTheme(theme) {
      document.getElementById('theme-stylesheet').href = `Themes/${theme}.css`;
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
