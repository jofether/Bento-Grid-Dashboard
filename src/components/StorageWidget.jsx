import React from 'react';

export function StorageWidget({ darkMode }) {
  const storageData = [
    { name: 'Documents', size: 35, color: 'bg-blue-500' },
    { name: 'Media', size: 40, color: 'bg-purple-500' },
  ];
  const totalSize = storageData.reduce((sum, item) => sum + item.size, 0);

  return (
    <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
      <h3 className="font-semibold text-lg mb-4">Storage Usage</h3>
      <div className="mb-4">
        {/* 10. LAYERS BUG B: Added 'z-10' to container but 'z-[-1]' to segments. Segments disappear behind the container's background/overflow clipping. */}
        {/* FIX: className="flex h-6 gap-1 rounded-full overflow-hidden bg-neutral-700/30" (without explicit z-index issues) */}
        <div className="flex h-6 gap-1 rounded-full overflow-hidden bg-neutral-700/30 relative z-0">
          {storageData.map((item, i) => (
            <div
              key={i}
              className={`${item.color} relative z-[-1]`}
              style={{ width: `${(item.size / totalSize) * 100}%` }}
              title={`${item.name}: ${item.size}%`}
            />
          ))}
        </div>
      </div>
      {/* ... details ... */}
    </div>
  );
}