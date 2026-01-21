// components/pm-sidebar.js

function renderPMSidebar(activePage) {
    const sidebarContainer = document.getElementById('sidebar-container');
    
    if (!sidebarContainer) return;

    const sidebarHTML = `
    <aside class="w-64 bg-[#D1D5DB] flex flex-col justify-between border-r border-gray-300 flex-shrink-0 h-screen sticky top-0">
        <div class="p-6">
            <a href="../../landing.html" class="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                <div class="w-8 h-8">
                    <svg viewBox="0 0 120 120" class="w-full h-full">
                        <path d="M60 15 A45 45 0 1 1 20 60" fill="none" stroke="#468189" stroke-width="10" stroke-linecap="round" />
                        <polygon points="15,35 35,35 25,15" fill="#468189" transform="rotate(-30 25 30)" />
                        <path d="M40 60 L55 75 L85 40" fill="none" stroke="#468189" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <span class="text-xl font-bold text-[#031926]">ExecuTask</span>
            </a>

            <nav class="space-y-2">
                
                <a href="../dashboard/index.html" class="${activePage === 'dashboard' 
                    ? 'flex items-center gap-3 px-4 py-3 bg-[#9DBEBB] rounded-lg text-[#031926] font-bold shadow-sm' 
                    : 'flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium'}">
                    <i data-lucide="layout-dashboard" class="w-5 h-5"></i> Dashboard
                </a>

                <a href="../projects/index.html" class="${activePage === 'projects' 
                    ? 'flex items-center gap-3 px-4 py-3 bg-[#9DBEBB] rounded-lg text-[#031926] font-bold shadow-sm' 
                    : 'flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium'}">
                    <i data-lucide="folder-kanban" class="w-5 h-5"></i> Projects
                </a>

                <a href="../history/index.html" class="${activePage === 'history' 
                    ? 'flex items-center gap-3 px-4 py-3 bg-[#9DBEBB] rounded-lg text-[#031926] font-bold shadow-sm' 
                    : 'flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium'}">
                    <i data-lucide="history" class="w-5 h-5"></i> History
                </a>

            </nav>
        </div>

        <div class="p-6 border-t border-gray-400">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                    <i data-lucide="user" class="w-6 h-6 text-[#031926]"></i>
                </div>
                <div>
                    <p class="text-sm font-bold text-[#031926]">PM User</p>
                    <p class="text-xs text-gray-600">ID: PM000001</p>
                </div>
            </div>
            <a href="../../landing.html" class="flex items-center gap-2 text-[#031926] font-bold hover:text-[#468189] transition-colors text-sm">
                <i data-lucide="log-out" class="w-4 h-4"></i> Logout
            </a>
        </div>
    </aside>
    `;

    sidebarContainer.innerHTML = sidebarHTML;
    
    // Re-initialize icons
    if(window.lucide) lucide.createIcons();
}