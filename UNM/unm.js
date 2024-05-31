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
        })
        .catch(error => console.error('Error loading unm.html:', error));
});
