import React, { useState } from 'react';

export function TaskList({ darkMode }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Update dashboard components', completed: true, priority: 'high' },
    { id: 2, title: 'Review pull requests', completed: false, priority: 'high' },
    { id: 3, title: 'Write unit tests', completed: false, priority: 'medium' },
    { id: 4, title: 'Deploy to production', completed: false, priority: 'high' },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Tasks</h3>
        <div className={`h-2 ${darkMode ? 'bg-neutral-700' : 'bg-gray-300'} rounded-full overflow-hidden`}>
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all" style={{ width: `${progress}%` }}></div>
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{completedCount}/{tasks.length} completed</p>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <label key={task.id} className="flex items-center gap-3 cursor-pointer hover:opacity-75 transition-opacity p-2 rounded-lg">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 rounded"
            />
            <span className={`flex-1 text-sm ${task.completed ? `${darkMode ? 'text-neutral-500' : 'text-gray-500'} line-through` : ''}`}>
              {task.title}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
              {task.priority}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
