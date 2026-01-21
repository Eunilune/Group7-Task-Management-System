// components/admin/admin-progress.js

function renderAdminProgress() {
    // 1. Target the container
    const container = document.getElementById('admin-progress-container') || document.getElementById('admin-progress-widget-container');
    if (!container) return;

    // 2. Fetch Real Projects
    const projects = Storage.getProjects();

    // 3. Helpers
    function getProgress(status) {
        switch(status.toLowerCase()) {
            case 'completed': return 100;
            case 'active': return 65;
            case 'in progress': return 45;
            case 'in review': return 85;
            case 'on hold': return 25;
            case 'planned': return 0;
            default: return 0;
        }
    }

    function formatDate(dateString) {
        if (!dateString) return 'TBD';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); // e.g., "10 Jan"
    }

    // 4. Generate HTML
    let html = `
        <h3 class="font-bold text-[#031926] mb-4 text-lg">Project Progress</h3>
        <div class="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
    `;

    if (projects.length === 0) {
        html += `<p class="text-sm text-gray-500 italic">No active projects.</p>`;
    } else {
        // Sort by most recent first
        const recentProjects = projects.reverse();

        recentProjects.forEach(p => {
            const progress = getProgress(p.status);
            // Mocking tasks count for now until we build the Task module
            const taskCount = progress === 100 ? "Completed" : "2/5 Tasks"; 
            
            // Calculate a mock End Date (Start Date + 10 days) for display purposes
            // In a real app, this would come from p.endDate
            let endDate = "TBD";
            if (p.startDate) {
                const start = new Date(p.startDate);
                start.setDate(start.getDate() + 10);
                endDate = formatDate(start.toISOString());
            }
            const startDate = formatDate(p.startDate);

            html += `
            <div class="bg-[#9DBEBB] p-4 rounded-lg shadow-sm relative group hover:shadow-md transition-all">
                
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-[#031926] text-sm">${p.name}</h4>
                    <span class="text-[10px] font-bold text-[#031926] opacity-70">${taskCount}</span>
                </div>

                <div class="w-full h-2.5 bg-[#77ACA2] rounded-full overflow-hidden mb-1">
                    <div class="bg-[#031926] h-full rounded-full transition-all duration-1000" style="width: ${progress}%"></div>
                </div>

                <div class="text-[10px] font-bold text-[#031926] mb-4">
                    ${progress}% Complete
                </div>

                <div class="border-t border-[#031926] opacity-10 mb-2"></div>

                <div class="flex justify-between items-center text-[10px] font-bold text-[#031926]">
                    <span>Start Date: ${startDate}</span>
                    <span>End Date: ${endDate}</span>
                </div>
                
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#3A6B72] rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            `;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderAdminProgress);