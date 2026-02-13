import React from 'react';

export function StorageWidget({ darkMode }) {
  const storageData = [
    { name: 'Documents', size: 35, color: 'bg-blue-500' },
    { name: 'Media', size: 40, color: 'bg-purple-500' },
    { name: 'Code', size: 15, color: 'bg-emerald-500' },
    { name: 'Other', size: 10, color: 'bg-orange-500' },
  ];

  const totalSize = storageData.reduce((sum, item) => sum + item.size, 0);

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <h3 className="font-semibold text-lg mb-4">Storage Usage</h3>
      <div className="mb-4">
        <div className="flex h-6 gap-1 rounded-full overflow-hidden bg-neutral-700/30">
          {storageData.map((item, i) => (
            <div
              key={i}
              className={item.color}
              style={{ width: `${(item.size / totalSize) * 100}%` }}
              title={`${item.name}: ${item.size}%`}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {storageData.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span>{item.name}</span>
            </div>
            <span className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{item.size}%</span>
          </div>
        ))}
      </div>
      <p className={`text-xs mt-4 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>Using 850 GB of 1 TB</p>
    </div>
  );
}
