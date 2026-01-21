// components/admin/project-list.js

// 1. We no longer need the hardcoded 'projectsData' array at the top.
// We will fetch it inside the functions.

// Helper to get color based on status
function getStatusColor(status) {
    switch(status.toLowerCase()) {
        case 'active': return "bg-[#468189] text-white";
        case 'completed': return "bg-[#77ACA2] text-white";
        case 'on hold': return "bg-yellow-600 text-white";
        default: return "bg-gray-500 text-white";
    }
}

function renderProjectList() {
    const container = document.getElementById('admin-project-list-container');
    if (!container) return;

    // Standard Header Layout
    let html = `
        <div class="flex justify-between items-end mb-4">
            <div>
                <label class="block text-sm font-bold text-[#031926] mb-1 flex items-center gap-1">
                    <i data-lucide="filter" class="w-4 h-4"></i> Filter by Date
                </label>
                <div class="relative">
                    <select id="project-filter" onchange="filterProjects(this.value)" class="appearance-none bg-[#D1D5DB] text-[#031926] font-medium px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none cursor-pointer w-40">
                        <option value="All">All</option>
                        <option value="Week">This Week</option>
                        <option value="Month">This Month</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#031926]">
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </div>
                </div>
            </div>
            
            <a href="create.html" class="bg-[#468189] hover:bg-[#3A6B72] text-white font-bold px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors">
                <i data-lucide="plus" class="w-4 h-4"></i>
                Create Task
            </a>
        </div>

        <div id="project-cards-grid" class="grid grid-cols-2 gap-4 overflow-y-auto pb-4 custom-scrollbar flex-1">
            </div>
    `;

    container.innerHTML = html;
    filterProjects('All');
}

function filterProjects(filterType) {
    const grid = document.getElementById('project-cards-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; 

    // --- HERE IS THE CONNECTION ---
    // Fetch data from our new Storage utility
    const projects = Storage.getProjects(); 
    // ------------------------------

    const today = new Date(); // Use real date

    const filtered = projects.filter(p => {
        if (filterType === 'All') return true;
        
        const pDate = new Date(p.startDate);
        const diffTime = Math.abs(today - pDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (filterType === 'Week') return diffDays <= 7;
        if (filterType === 'Month') return pDate.getMonth() === today.getMonth();
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="col-span-2 text-center text-gray-500 italic mt-10">No projects found.</p>`;
        return;
    }

    filtered.forEach(p => {
        const statusClass = getStatusColor(p.status);
        
        const card = `
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm border border-transparent hover:border-[#468189] transition-all relative group">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-[#031926] text-lg">${p.name}</h4>
                    <span class="${statusClass} text-[10px] font-bold px-2 py-1 rounded-full select-none">
                        ${p.status}
                    </span>
                </div>
                <p class="text-gray-600 text-sm mb-4 h-10 overflow-hidden text-ellipsis">${p.desc}</p>
                
                <div class="flex items-center gap-1 text-[10px] font-bold text-[#031926] mb-1">
                    <i data-lucide="user" class="w-3 h-3"></i> Created by: ${p.createdBy}
                </div>
                <div class="flex items-center gap-1 text-[10px] font-bold text-[#031926] mb-3">
                    <i data-lucide="calendar" class="w-3 h-3"></i> Start Date: ${p.startDate}
                </div>
                
                <div class="flex justify-end gap-2">
                    <a href="edit.html?id=${p.id}" class="text-gray-600 hover:text-[#031926]">
                        <i data-lucide="file-edit" class="w-4 h-4"></i>
                    </a>
                    
                    <a href="delete.html?id=${p.id}" class="text-gray-600 hover:text-red-600">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });

    if(window.lucide) lucide.createIcons();
}

// Temporary Delete Handler (Until we build the delete page)
function deleteProjectHandler(id) {
    if(confirm('Are you sure you want to delete this project?')) {
        Storage.deleteProject(id); // Delete from LocalStorage
        filterProjects('All');     // Refresh the UI
    }
}

document.addEventListener('DOMContentLoaded', renderProjectList);