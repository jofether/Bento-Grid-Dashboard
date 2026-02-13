import React from 'react';

export function TeamMembers({ darkMode }) {
  const team = [
    { id: 1, name: 'Alex Johnson', role: 'Frontend', avatar: '👨‍💼', status: 'online' },
    { id: 2, name: 'Maria Garcia', role: 'Backend', avatar: '👩‍💼', status: 'online' },
    { id: 3, name: 'Chen Wei', role: 'DevOps', avatar: '🧑‍💻', status: 'away' },
    { id: 4, name: 'Sophie Martin', role: 'Design', avatar: '👩‍🎨', status: 'online' },
  ];

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <h3 className="font-semibold text-lg mb-4">Team Members</h3>
      <div className="space-y-3">
        {team.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="text-2xl relative">
              {member.avatar}
              <div className={`w-2.5 h-2.5 rounded-full absolute bottom-0 right-0 ${member.status === 'online' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{member.name}</p>
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{member.role}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${member.status === 'online' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
