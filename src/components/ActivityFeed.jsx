import React, { useState } from 'react';

export function ActivityFeed({ darkMode }) {
  const [activities] = useState([
    { id: 1, user: 'Sarah Chen', action: 'deployed', time: '5m ago', icon: '🚀' },
    { id: 2, user: 'Alex Kumar', action: 'fixed bug', time: '15m ago', icon: '🐛' },
  ]);

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          /* 9. SPACING BUG B: Removed 'gap-3'. The Icon, Name, and Time will touch each other immediately. */
          /* FIX: className="flex items-center gap-3 pb-3 border-b ..." */
          <div key={activity.id} className="flex items-center gap-0 pb-3 border-b border-neutral-700/30 last:border-0">
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.user}</p>
              <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} text-xs`}>{activity.action}</p>
            </div>
            <span className={`${darkMode ? 'text-neutral-400' : 'text-gray-500'} text-xs whitespace-nowrap`}>{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}