// components/admin-user-list.js

// Helper to style badges based on role
function getRoleBadge(role) {
    switch(role) {
        case 'Admin': return "bg-[#468189] text-white";
        case 'Project Manager': return "bg-[#77ACA2] text-[#031926]";
        case 'Team Member': return "bg-[#9DBEBB] text-[#031926]";
        default: return "bg-gray-300 text-black";
    }
}

function renderAdminUserList() {
    const container = document.getElementById('admin-user-list-container');
    if (!container) return;

    // 1. Fetch Users from Storage (The Brain)
    const usersData = Storage.getUsers();

    // 2. Build HTML Header
    let html = `
        <div class="flex justify-end mb-4">
            <a href="create.html" class="bg-[#468189] hover:bg-[#3A6B72] text-white font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors">
                <i data-lucide="plus" class="w-4 h-4"></i>
                Create User
            </a>
        </div>

        <div class="bg-[#D1D5DB] rounded-xl shadow-sm overflow-hidden min-h-[400px]">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-[#D1D5DB] border-b border-gray-400">
                        <th class="p-4 font-bold text-[#031926]">ID</th>
                        <th class="p-4 font-bold text-[#031926]">Name</th>
                        <th class="p-4 font-bold text-[#031926]">Email</th>
                        <th class="p-4 font-bold text-[#031926] text-center">Role</th>
                        <th class="p-4 font-bold text-[#031926] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // 3. Build Rows
    if (usersData.length === 0) {
        html += `<tr><td colspan="5" class="p-8 text-center text-gray-600 italic">No users found.</td></tr>`;
    } else {
        usersData.forEach(user => {
            const badgeClass = getRoleBadge(user.role);
            
            html += `
                <tr class="border-b border-gray-400 hover:bg-gray-300 transition-colors">
                    <td class="p-4 text-sm font-bold text-[#031926]">${user.id}</td>
                    <td class="p-4 text-sm font-bold text-[#031926]">${user.name}</td>
                    <td class="p-4 text-sm font-bold text-[#031926]">${user.email}</td>
                    <td class="p-4 text-center">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeClass}">${user.role}</span>
                    </td>
                    <td class="p-4 text-center">
                        <div class="flex justify-center gap-3">
                            <a href="delete.html?id=${user.id}" class="text-gray-700 hover:text-red-600"><i data-lucide="trash-2" class="w-4 h-4"></i></a>
                            <a href="edit.html?id=${user.id}" class="text-gray-700 hover:text-[#031926]"><i data-lucide="file-edit" class="w-4 h-4"></i></a>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    // 4. Close Table
    html += `
            <tr class="border-b border-gray-400 h-10"><td colspan="5"></td></tr>
        </tbody>
    </table>
    </div>
    `;

    container.innerHTML = html;

    // Refresh icons
    if(window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderAdminUserList);