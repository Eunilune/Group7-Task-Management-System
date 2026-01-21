// components/pm-work-progress.js

function renderWorkProgressWidget() {
    const container = document.getElementById('pm-work-progress-container');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-[#D1D5DB] p-4 rounded-xl shadow-sm h-[280px] flex flex-col">
            <h3 class="font-bold text-[#031926] mb-2">Work Progress</h3>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                
                <div class="bg-[#9DBEBB] p-3 rounded-lg border-l-4 border-[#031926]">
                    <h4 class="font-bold text-[#031926] text-sm">Project 1</h4>
                    <div class="w-full bg-gray-300 h-2 rounded-full mt-2 mb-1">
                        <div class="bg-[#031926] h-2 rounded-full" style="width: 50%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold text-[#031926]">
                        <span>50% Complete</span>
                        <span>End: 20 Jan</span>
                    </div>
                </div>

                <div class="bg-[#9DBEBB] p-3 rounded-lg border-l-4 border-[#031926]">
                    <h4 class="font-bold text-[#031926] text-sm">Project 2</h4>
                    <div class="w-full bg-gray-300 h-2 rounded-full mt-2 mb-1">
                        <div class="bg-[#031926] h-2 rounded-full" style="width: 25%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold text-[#031926]">
                        <span>25% Complete</span>
                        <span>End: 25 Jan</span>
                    </div>
                </div>

                <div class="bg-[#9DBEBB] p-3 rounded-lg border-l-4 border-[#031926]">
                    <h4 class="font-bold text-[#031926] text-sm">Project 3</h4>
                    <div class="w-full bg-gray-300 h-2 rounded-full mt-2 mb-1">
                        <div class="bg-[#031926] h-2 rounded-full" style="width: 10%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold text-[#031926]">
                        <span>10% Complete</span>
                        <span>End: 30 Jan</span>
                    </div>
                </div>

            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderWorkProgressWidget);