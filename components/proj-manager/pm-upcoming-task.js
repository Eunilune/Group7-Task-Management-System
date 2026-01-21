// components/pm-upcoming-task.js

function renderUpcomingTaskWidget() {
    const container = document.getElementById('pm-upcoming-task-container');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm h-[280px] flex flex-col">
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-[#031926]">Upcoming Task</h3>
                <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1 text-[10px] font-bold text-[#031926]">
                        <i data-lucide="calendar" class="w-3 h-3"></i> 10 January
                    </div>
                    <i data-lucide="more-vertical" class="w-4 h-4 text-gray-500 cursor-pointer"></i>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar relative text-xs bg-[#D1D5DB] rounded-lg">
                
                <div class="flex flex-col">
                    ${renderTimeSlot('1 PM')}
                    ${renderTimeSlot('2 PM')}
                    ${renderTimeSlot('3 PM')}
                    ${renderTimeSlot('4 PM')}
                    ${renderTimeSlot('5 PM')}
                    ${renderTimeSlot('6 PM')}
                    ${renderTimeSlot('7 PM')}
                    ${renderTimeSlot('8 PM')}
                    ${renderTimeSlot('9 PM')}
                    ${renderTimeSlot('10 PM')}
                </div>

                <div class="absolute top-[88px] left-14 right-2 bg-[#468189] text-white p-2 rounded shadow-md text-[10px] h-16 flex flex-col justify-center hover:opacity-90 transition-opacity cursor-pointer border-l-4 border-[#031926]">
                    <p class="font-bold text-xs">Project 1</p>
                    <p class="opacity-90">Project Task</p>
                    <p class="opacity-75 mt-1 flex items-center gap-1"><i data-lucide="users" class="w-3 h-3"></i> 03 People</p>
                </div>

                <div class="absolute top-[264px] left-14 right-8 bg-[#5a9389] text-white p-2 rounded shadow-md text-[10px] h-16 flex flex-col justify-center hover:opacity-90 transition-opacity cursor-pointer border-l-4 border-[#031926]">
                    <p class="font-bold text-xs">Project 2</p>
                    <p class="opacity-90">Project Task</p>
                    <p class="opacity-75 mt-1 flex items-center gap-1"><i data-lucide="users" class="w-3 h-3"></i> 01 People</p>
                </div>

            </div>
        </div>
    `;

    // Re-init icons for the new HTML
    if (window.lucide) lucide.createIcons();
}

// Helper to generate time slot rows
function renderTimeSlot(time) {
    return `
        <div class="flex items-start h-11 border-b border-gray-400 last:border-0 relative group hover:bg-black/5 transition-colors">
            <span class="w-12 font-bold text-gray-700 text-[10px] pt-1 pl-1">${time}</span>
            <div class="flex-1 h-full border-l border-gray-400"></div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderUpcomingTaskWidget);