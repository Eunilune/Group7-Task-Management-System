// components/admin/admin-history-recent.js

function renderRecentActivity() {
    const container = document.getElementById('admin-history-recent-container');
    if (!container) return;

    // 1. Fetch History
    // Reverse to show newest first
    const history = Storage.getHistory().reverse(); 

    // 2. Build HTML
    let html = `
        <div class="bg-[#D1D5DB] p-6 rounded-xl shadow-sm flex flex-col h-full">
            <h3 class="font-bold text-[#031926] mb-4 text-lg">Recent Activity</h3>
            
            <div class="h-[500px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
    `;

    if (history.length === 0) {
        html += `<p class="text-gray-500 italic text-sm">No recent activity logged.</p>`;
    } else {
        history.forEach(item => {
            // Only show non-completed items here (optional preference)
            if (item.type === 'complete') return;

            // Format Date (e.g., "2026 - 01 - 21")
            const dateObj = new Date(item.date);
            const dateStr = `${dateObj.getFullYear()} - ${String(dateObj.getMonth()+1).padStart(2,'0')} - ${String(dateObj.getDate()).padStart(2,'0')}`;

            html += `
                <div class="bg-[#9DBEBB] py-4 px-5 rounded-r-lg border-l-8 border-[#3A6B72] relative shadow-sm">
                    <h4 class="font-bold text-[#031926] text-sm">${item.title}</h4>
                    <p class="text-xs text-gray-800 italic mt-1 mb-8">${item.description}</p>
                    <p class="text-[10px] font-bold text-[#031926] absolute bottom-4 left-5">Last edited: ${dateStr}</p>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderRecentActivity);