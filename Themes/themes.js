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
  let currentTheme = 'dark';
  let isCustomTheme = false;

  const toggleThemeButton = document.getElementById('toggle-theme');
  const switchThemeButton = document.getElementById('switch-theme');

  if (!toggleThemeButton || !switchThemeButton) {
      console.error('Toggle theme or switch theme button not found.');
      return;
  }

  toggleThemeButton.addEventListener('click', toggleTheme);
  switchThemeButton.addEventListener('click', switchTheme);

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
      document.getElementById('theme-stylesheet').href = `/Themes/${theme}.css`;
      console.log(`Theme switched to ${theme}`);
  }
}
