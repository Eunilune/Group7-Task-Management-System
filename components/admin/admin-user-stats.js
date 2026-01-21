// components/admin-user-stats.js

function renderAdminUserStats() {
    const container = document.getElementById('admin-user-stats-container');
    if (!container) return;

    container.innerHTML = `
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Total Users</h3>
                <p class="text-4xl font-bold mt-2">7</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="clipboard-list" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Admin</h3>
                <p class="text-4xl font-bold mt-2">1</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="pie-chart" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Project Manager</h3>
                <p class="text-4xl font-bold mt-2">1</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="file-user" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
            <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm relative">
                <h3 class="font-bold text-[#031926]">Team Member</h3>
                <p class="text-4xl font-bold mt-2">7</p>
                <div class="absolute top-4 right-4 w-10 h-10 bg-[#9DBEBB] rounded-full flex items-center justify-center">
                    <i data-lucide="check-circle" class="w-5 h-5 text-[#031926]"></i>
                </div>
            </div>
        </div>
    `;

    if(window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderAdminUserStats);