import React, { useState, useEffect } from 'react';

export function Chart({ darkMode, title, data = [] }) {
  const maxValue = Math.max(...data, 100);

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="h-40 flex items-end space-x-2">
        {data.map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t hover:opacity-80 transition-opacity"
            style={{ height: `${(value / maxValue) * 100}%` }}
            title={`${value}%`}
          />
        ))}
      </div>
    </div>
  );
}
