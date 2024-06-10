document.addEventListener("DOMContentLoaded", async function() {
  try {
      const response = await fetch('/unm.html');
      const data = await response.text();
      document.getElementById('unm').innerHTML = data;
      console.log('UNM HTML loaded and added to the document');
      addUNMEventListeners();
      setupThemeSwitcher();
  } catch (error) {
      console.error('Error loading unm.html:', error);
  }
});

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
      isCustomTheme = isCustomTheme ? false : isCustomTheme;
      currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      updateTheme(currentTheme);
  }

  function switchTheme() {
      console.log('Switch theme button clicked');
      updateTheme(isCustomTheme ? currentTheme : 'Y2K');
      console.log(isCustomTheme ? `Switched back to ${currentTheme} theme` : 'Switched to custom Y2K theme');
      isCustomTheme = !isCustomTheme;
  }

  function updateTheme(theme) {
      document.getElementById('theme-stylesheet').href = `/Themes/${theme}.css`;
      console.log(`Theme switched to ${theme}`);
      localStorage.setItem('theme', theme); // Store the selected theme
  }
}
