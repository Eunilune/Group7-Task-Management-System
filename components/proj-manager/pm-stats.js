// components/pm-stats.js
function renderPMStats() {
    const container = document.getElementById('pm-stats-container');
    if (!container) return;

    container.innerHTML = `
        <div class="grid grid-cols-4 gap-6 mb-6">
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Total Task</h3>
                <p class="text-4xl font-bold mt-2">1</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="clipboard-list" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">In Progress</h3>
                <p class="text-4xl font-bold mt-2">2</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="clock" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">In Review</h3>
                <p class="text-4xl font-bold mt-2">1</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="file-check" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Completed</h3>
                <p class="text-4xl font-bold mt-2">0</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="check-circle" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
        </div>
    `;
    if(window.lucide) lucide.createIcons();
}
document.addEventListener('DOMContentLoaded', renderPMStats);