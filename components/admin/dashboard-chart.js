// components/admin-chart.js

function renderProjectChart() {
    const canvas = document.getElementById('projectChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 1. FETCH REAL DATA
    // We get the list of projects from our Storage utility
    const projects = Storage.getProjects();

    // 2. PROCESS DATA
    // Initialize an array of 12 zeros (one for each month: Jan-Dec)
    const monthlyCounts = new Array(12).fill(0);
    const currentYear = new Date().getFullYear(); // e.g., 2026

    // Loop through projects and increment the count for the correct month
    projects.forEach(project => {
        if (!project.startDate) return;

        const date = new Date(project.startDate);
        
        // Only count projects for the current year to keep the chart relevant
        if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth(); // 0 is Jan, 11 is Dec
            monthlyCounts[monthIndex]++;
        }
    });

    // 3. RENDER CHART
    const projectChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: `Projects Started in ${currentYear}`, // Dynamic Label
                data: monthlyCounts, // <--- THE REAL DATA IS HERE
                borderColor: '#468189',
                backgroundColor: 'rgba(70, 129, 137, 0.1)',
                borderWidth: 3,
                tension: 0.4, 
                pointRadius: 3, 
                pointHoverRadius: 6,
                fill: true
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
                    callbacks: {
                        label: function(context) {
                            return `Projects: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false }, 
                    ticks: {
                        color: '#031926',
                        font: { family: 'Arimo', weight: 'bold' }
                    }
                },
                y: {
                    grid: { 
                        color: '#9CA3AF', 
                        borderDash: [5, 5] 
                    },
                    beginAtZero: true,
                    suggestedMax: 5, // Ensures the chart doesn't look flat if you only have 1 project
                    ticks: {
                        stepSize: 1, // Forces integers (you can't have 1.5 projects)
                        color: '#031926',
                        font: { family: 'Arimo', weight: 'bold' }
                    }
                }
            }
        }
    });
}

// Ensure the function runs after the DOM is ready
document.addEventListener('DOMContentLoaded', renderProjectChart);