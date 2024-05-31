document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const blurAmount = Math.min(scrollPosition / 100, 10); // Cap the blur at 10px
    document.querySelector('.browser-window').style.setProperty('--blur-amount', `${blurAmount}px`);
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const blurClass = 'scroll-blur';
    const body = document.querySelector('body');
    
    if (scrollY > 0) {
        body.classList.add(blurClass);
    } else {
        body.classList.remove(blurClass);
    }
});

function showTab(event, tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

