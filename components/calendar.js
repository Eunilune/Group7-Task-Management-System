// components/admin-calendar.js

let currentDate = new Date();

function renderCalendarComponent() {
    // 1. Target the placeholder in dashboard.html
    // We renamed the ID in the previous step to match the grid layout
    // This targets the container we created: <div id="admin-calendar-widget"></div>
    const calendarContainer = document.getElementById('admin-calendar-widget');
    
    if (!calendarContainer) return;

    // 2. Inject the HTML Structure
    calendarContainer.innerHTML = `
        <div class="h-full flex flex-col">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-[#031926] text-lg" id="calendar-month-year">Calendar</h3>
                <div class="flex gap-1">
                    <button onclick="changeMonth(-1)" class="hover:bg-gray-400/50 rounded p-1 transition-colors">
                        <i data-lucide="chevron-left" class="w-5 h-5 cursor-pointer text-[#031926]"></i>
                    </button>
                    <button onclick="changeMonth(1)" class="hover:bg-gray-400/50 rounded p-1 transition-colors">
                        <i data-lucide="chevron-right" class="w-5 h-5 cursor-pointer text-[#031926]"></i>
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-600 font-bold uppercase">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div id="calendar-days" class="grid grid-cols-7 gap-1 text-center text-sm flex-1">
                </div>
            
            <div class="mt-4 flex items-center gap-2 text-xs text-gray-600">
                <div class="w-2 h-2 rounded-full bg-[#468189]"></div>
                <span>Project Start Date</span>
            </div>
        </div>
    `;

    renderCalendarDays();
    if(window.lucide) lucide.createIcons();
}

function renderCalendarDays() {
    const container = document.getElementById('calendar-days');
    const monthYearDisplay = document.getElementById('calendar-month-year');
    
    if (!container || !monthYearDisplay) return;

    container.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Display Month & Year (e.g., "January 2026")
    monthYearDisplay.innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Calendar Math
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const todayDate = new Date();
    const isCurrentMonth = todayDate.getMonth() === month && todayDate.getFullYear() === year;
    const todayDay = todayDate.getDate();

    // 1. FETCH PROJECTS FROM STORAGE
    const projects = Storage.getProjects();

    // Empty slots for previous month
    for(let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement('div');
        container.appendChild(empty);
    }

    // Days
    for(let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'h-8 w-8 flex flex-col items-center justify-center rounded-full text-[#031926] relative mx-auto hover:bg-white/40 cursor-pointer transition-colors';
        
        // Inner text is the date number
        const dateNum = document.createElement('span');
        dateNum.innerText = i;
        dayCell.appendChild(dateNum);

        // Highlight "Today"
        if(isCurrentMonth && i === todayDay) {
            dayCell.classList.add('bg-[#031926]', 'text-[#F4E9CD]', 'font-bold');
        }

        // --- THE UPGRADE: CHECK FOR PROJECTS ON THIS DAY ---
        // Construct date string matching input format "YYYY-MM-DD"
        const checkDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        // Find if any project starts on this date
        const hasProject = projects.some(p => p.startDate === checkDate);

        if (hasProject) {
            // Add a small teal dot under the number
            const dot = document.createElement('div');
            dot.className = 'w-1.5 h-1.5 bg-[#468189] rounded-full absolute bottom-1';
            
            // If it's "today", make the dot contrasting (light)
            if (isCurrentMonth && i === todayDay) {
                dot.classList.remove('bg-[#468189]');
                dot.classList.add('bg-[#F4E9CD]');
            }
            
            dayCell.appendChild(dot);
            
            // Optional: Add tooltip title
            const projsOnDay = projects.filter(p => p.startDate === checkDate).map(p => p.name).join(', ');
            dayCell.title = `Projects starting: ${projsOnDay}`;
        }
        // --------------------------------------------------

        container.appendChild(dayCell);
    }
}

function changeMonth(dir) {
    currentDate.setMonth(currentDate.getMonth() + dir);
    renderCalendarDays();
}

document.addEventListener('DOMContentLoaded', renderCalendarComponent);