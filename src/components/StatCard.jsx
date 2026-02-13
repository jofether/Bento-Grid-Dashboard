import React from 'react';

export function StatCard({ darkMode, label, value, change, icon = '📊', gradient = 'from-blue-500 to-cyan-500' }) {
  const isPositive = change >= 0;

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} hover:scale-105 transition-transform`}>
      <div className="flex items-start justify-between mb-4">
        {/* 4. TYPO BUG A: 'text-33xl' is invalid. The icon will revert to default small size (1rem). */}
        {/* FIX: className={`text-3xl w-12 h-12 bg-gradient-to-br ...`} */}
        <div className={`text-33xl w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
      <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} text-sm mb-1`}>{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}