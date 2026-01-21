// components/current-date.js

document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('header-date');
    
    if (dateElement) {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        
        // Format: "21 January 2026"
        dateElement.innerText = `${day} ${month} ${year}`;
    }
});