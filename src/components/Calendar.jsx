import React, { useState } from 'react';

export function Calendar({ darkMode }) {
  const [currentDate] = useState(new Date());
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const days = [];
  const totalDays = daysInMonth(currentDate);
  const startDay = firstDayOfMonth(currentDate);

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  const isToday = (day) => day === currentDate.getDate();

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <h3 className="font-semibold text-lg mb-4">
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h3>
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-semibold text-neutral-400 py-2">
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={`py-2 rounded-lg text-sm ${
              day === null
                ? ''
                : isToday(day)
                ? 'bg-neutral-800 font-bold'
                : 'hover:bg-neutral-700/50'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}