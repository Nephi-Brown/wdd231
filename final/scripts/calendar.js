document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();
  
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
  
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `${monthNames[currentMonth]} ${currentYear}`;
    calendar.appendChild(header);
  
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayHeader = document.createElement('div');
    weekdayHeader.className = 'weekdays';
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'weekday';
        dayElement.textContent = day;
        weekdayHeader.appendChild(dayElement);
    });
    calendar.appendChild(weekdayHeader);
  
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';
  
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysGrid.appendChild(emptyDay);
    }
  
    for (let day = 1; day <= lastDay; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        if (day === currentDay) {
            dayElement.className += ' current';
        }
        dayElement.textContent = day;
        daysGrid.appendChild(dayElement);
    }
  
    calendar.appendChild(daysGrid);
  });