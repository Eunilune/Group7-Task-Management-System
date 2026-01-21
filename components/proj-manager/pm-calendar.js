// components/pm-calendar.js
let pmCurrentDate = new Date();

function renderPMCalendar() {
    const container = document.getElementById('pm-calendar-container');
    if (!container) return;

    // Inject Structure
    container.innerHTML = `
        <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm h-[280px] flex flex-col">
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-[#031926] text-sm" id="pm-calendar-month-year">Calendar</h3>
                <div class="flex gap-1">
                    <button onclick="changePMMonth(-1)" class="hover:bg-gray-300 rounded p-1"><i data-lucide="chevron-left" class="w-3 h-3"></i></button>
                    <button onclick="changePMMonth(1)" class="hover:bg-gray-300 rounded p-1"><i data-lucide="chevron-right" class="w-3 h-3"></i></button>
                </div>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center text-xs mb-1">
                <div class="text-[10px] font-bold text-gray-500">Sun</div>
                <div class="text-[10px] font-bold text-gray-500">Mon</div>
                <div class="text-[10px] font-bold text-gray-500">Tue</div>
                <div class="text-[10px] font-bold text-gray-500">Wed</div>
                <div class="text-[10px] font-bold text-gray-500">Thu</div>
                <div class="text-[10px] font-bold text-gray-500">Fri</div>
                <div class="text-[10px] font-bold text-gray-500">Sat</div>
            </div>

            <div id="pm-calendar-days" class="grid grid-cols-7 gap-1 text-center text-xs flex-1"></div>
        </div>
    `;

    renderPMCalendarDays();
    if(window.lucide) lucide.createIcons();
}

function renderPMCalendarDays() {
    const daysContainer = document.getElementById('pm-calendar-days');
    const label = document.getElementById('pm-calendar-month-year');
    if(!daysContainer) return;

    daysContainer.innerHTML = '';
    const year = pmCurrentDate.getFullYear();
    const month = pmCurrentDate.getMonth();
    
    label.innerText = new Date(year, month).toLocaleString('default', { month: 'long' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().getDate();
    const isCurrentMonth = new Date().getMonth() === month;

    for(let i=0; i<firstDay; i++) {
        daysContainer.appendChild(document.createElement('div'));
    }
    for(let i=1; i<=daysInMonth; i++) {
        const day = document.createElement('div');
        day.innerText = i;
        day.className = 'calendar-day text-[#031926]';
        if(isCurrentMonth && i === today) day.classList.add('calendar-today');
        daysContainer.appendChild(day);
    }
}

function changePMMonth(dir) {
    pmCurrentDate.setMonth(pmCurrentDate.getMonth() + dir);
    renderPMCalendarDays();
}

document.addEventListener('DOMContentLoaded', renderPMCalendar);