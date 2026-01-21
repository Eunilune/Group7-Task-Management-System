// components/dashboard-stats.js

function renderDashboardStats() {
    const container = document.getElementById('admin-stats-container');
    if (!container) return;

    // 1. Get Data
    const projects = Storage.getProjects();

    // 2. Calculate Counts
    const totalProjects = projects.length;
    const inProgressCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Active').length;
    const reviewCount = projects.filter(p => p.status === 'In Review' || p.status === 'On Hold').length; // Grouping 'Hold' with 'Review' for now
    const completedCount = projects.filter(p => p.status === 'Completed').length;

    // 3. Render HTML
    container.innerHTML = `
        <div class="grid grid-cols-4 gap-6 mb-8">
            
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Total Projects</h3>
                <p class="text-4xl font-bold mt-2">${totalProjects}</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="clipboard-list" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>

            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">In Progress</h3>
                <p class="text-4xl font-bold mt-2">${inProgressCount}</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="clock" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>

            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">In Review</h3>
                <p class="text-4xl font-bold mt-2">${reviewCount}</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="file-search" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>

            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Completed</h3>
                <p class="text-4xl font-bold mt-2">${completedCount}</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="check-circle-2" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
        </div>
    `;

    if(window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderDashboardStats);