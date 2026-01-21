// components/pm-total-task-chart.js

document.addEventListener('DOMContentLoaded', function() {
    const chartElement = document.getElementById('totalTaskChart');
    
    // Safety check to ensure the canvas exists on the page
    if (!chartElement) return;

    const ctxTotal = chartElement.getContext('2d');
    
    new Chart(ctxTotal, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Tasks',
                data: [5, 12, 18, 11, 22, 12, 17, 16, 28, 22, 25, 20],
                borderColor: '#3A6B72',
                borderWidth: 2,
                tension: 0.4, // Smooth curves
                pointRadius: 0, // Hides dots until hovered
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#031926',
                    titleColor: '#F4E9CD',
                    bodyColor: '#fff',
                    displayColors: false,
                }
            },
            scales: {
                x: { 
                    grid: { display: false }, 
                    ticks: { font: { size: 10 }, color: '#031926' } 
                },
                y: { 
                    display: true, 
                    grid: { color: '#bbb' }, 
                    ticks: { font: { size: 10 }, color: '#031926' } 
                }
            }
        }
    });
});