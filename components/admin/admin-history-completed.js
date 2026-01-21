// components/admin/admin-history-completed.js

function renderCompletedHistory() {
    const container = document.getElementById('admin-history-completed-container');
    if (!container) return;

    // 1. Fetch History & Filter for Completed only
    const history = Storage.getHistory().reverse().filter(item => item.type === 'complete');

    // 2. Build HTML
    let html = `
        <div class="bg-[#D1D5DB] p-6 rounded-xl shadow-sm flex flex-col h-full">
            <h3 class="font-bold text-[#031926] mb-4 text-lg">Completed Task</h3>
            
            <div class="h-[500px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
    `;

    if (history.length === 0) {
        html += `<p class="text-gray-500 italic text-sm">No completed projects yet.</p>`;
    } else {
        history.forEach(item => {
            const dateObj = new Date(item.date);
            const dateStr = `${dateObj.getFullYear()} - ${String(dateObj.getMonth()+1).padStart(2,'0')} - ${String(dateObj.getDate()).padStart(2,'0')}`;

            html += `
                <div class="bg-[#9DBEBB] py-4 px-5 rounded-r-lg border-l-8 border-[#3A6B72] relative shadow-sm">
                    <h4 class="font-bold text-[#031926] text-sm">${item.title}</h4>
                    <p class="text-xs text-gray-800 italic mt-1 mb-8">${item.description}</p>
                    <p class="text-[10px] font-bold text-[#031926] absolute bottom-4 left-5">Completed: ${dateStr}</p>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderCompletedHistory);