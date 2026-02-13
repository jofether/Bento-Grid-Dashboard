import React, { useState, useEffect } from 'react';
import { Chart } from './components/Chart';
import { StatCard } from './components/StatCard';
import { ActivityFeed } from './components/ActivityFeed';
import { TeamMembers } from './components/TeamMembers';
import { Calendar } from './components/Calendar';
import { TaskList } from './components/TaskList';
import { StorageWidget } from './components/StorageWidget';
import { generateChartData, calculateMetrics } from './utils/analytics';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Database backup completed', type: 'success' },
    { id: 2, message: 'New user registered', type: 'info' },
    { id: 3, message: 'System update available', type: 'warning' }
  ]);
  const [chartData] = useState(() => generateChartData(10));
  const [selectedStat, setSelectedStat] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [cpuData, setCpuData] = useState(62);
  const [memoryData, setMemoryData] = useState(4.2);
  const [conversionRate, setConversionRate] = useState(3.8);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to dismiss notifications
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Function to add new notification
  const addNotification = (message, type = 'info') => {
    const newNotif = { 
      id: Math.max(...notifications.map(n => n.id), 0) + 1, 
      message, 
      type 
    };
    setNotifications([newNotif, ...notifications]);
    setTimeout(() => dismissNotification(newNotif.id), 5000);
  };

  // Function to refresh data
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCpuData(Math.floor(Math.random() * 100));
      setMemoryData((Math.random() * 8 + 2).toFixed(1));
      setConversionRate((Math.random() * 8 + 1).toFixed(1));
      setIsRefreshing(false);
      addNotification('Dashboard data refreshed', 'success');
    }, 1500);
  };

  // Function to export data
  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      revenue: 124592.00,
      activeUsers: 842,
      cpuUsage: cpuData,
      memoryUsage: memoryData,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${Date.now()}.json`;
    a.click();
    addNotification('Data exported successfully', 'success');
  };

  // Function to handle stat card click
  const handleStatClick = (statName) => {
    setSelectedStat(statName);
    addNotification(`Viewing details for ${statName}`, 'info');
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    addNotification('All notifications cleared', 'success');
  };

  const revenue = 124592.00;
  const revenueChange = 12.5;
  const activeUsers = 842;
  const usersChange = 8.3;
  const serverLoad = 94;

  return (

    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950' : 'bg-gradient-to-br from-gray-50 to-gray-100'} ${darkMode ? 'text-white' : 'text-gray-900'} p-8 font-sans flex flex-col`}>

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboard</h1>
          <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} text-sm mt-1`}>Welcome back! Here's your performance overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-2xl px-4 py-2 text-sm font-mono`}>
            {time.toLocaleTimeString()}
          </div>
          
          {/* Action Buttons */}
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-3 rounded-2xl transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Refresh data"
          >
            {isRefreshing ? '⟳' : '🔄'}
          </button>

          <button 
            onClick={handleExport}
            className={`p-3 rounded-2xl transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Export data"
          >
            📥
          </button>

          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-2xl transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Settings"
          >
            ⚙️
          </button>

          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-2xl transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2 max-h-40 overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center justify-between gap-4 rounded-2xl p-4 backdrop-blur-xl border animate-in fade-in slide-in-from-top-2 ${
                notif.type === 'success'
                  ? `${darkMode ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-emerald-50 border-emerald-200'} text-emerald-700`
                  : notif.type === 'warning'
                  ? `${darkMode ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-yellow-50 border-yellow-200'} text-yellow-700`
                  : `${darkMode ? 'bg-blue-500/20 border-blue-500/50' : 'bg-blue-50 border-blue-200'} text-blue-700`
              }`}
            >
              <span className="text-sm">{notif.message}</span>
              <button
                onClick={() => dismissNotification(notif.id)}
                className="text-xl hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* SETTINGS PANEL */}
      {showSettings && (
        <div className={`mb-6 rounded-2xl p-6 backdrop-blur-xl border ${darkMode ? 'bg-neutral-800/50 border-neutral-700/50' : 'bg-white border-gray-200/50'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Settings</h2>
            <button onClick={() => setShowSettings(false)} className="text-2xl">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">CPU Usage: {cpuData}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={cpuData}
                onChange={(e) => setCpuData(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Memory: {memoryData} GB</label>
              <input
                type="range"
                min="0"
                max="16"
                step="0.1"
                value={memoryData}
                onChange={(e) => setMemoryData(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Conversion Rate: {conversionRate}%</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={() => {
                setShowSettings(false);
                addNotification('Settings saved', 'success');
              }}
              className="col-span-2 mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg transition-shadow"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* SELECTED STAT DETAIL */}
      {selectedStat && (
        <div className={`mb-6 rounded-2xl p-6 backdrop-blur-xl border ${darkMode ? 'bg-neutral-800/50 border-neutral-700/50' : 'bg-white border-gray-200/50'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Details: {selectedStat}</h2>
            <button onClick={() => setSelectedStat(null)} className="text-2xl">✕</button>
          </div>
          <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} mt-2`}>
            Detailed analytics for {selectedStat} are displayed here. This section can be expanded with more metrics and visualizations.
          </p>
        </div>
      )}
      {/* BENTO GRID WRAPPER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-max">

        {/* ITEM 1: Profile (Spans 1 col) */}
        <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between hover:scale-105 transition-transform border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">JM</div>
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-xs font-medium text-emerald-300">Active</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">Welcome back, Jofether</h3>
            <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} text-sm mt-1`}>Pro Member • Tier 5</p>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* ITEM 2: Main Stats (Spans 5 cols) */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600' : 'bg-gradient-to-br from-indigo-500 to-purple-500'} rounded-3xl p-8 md:col-span-5 flex flex-col justify-between relative overflow-hidden hover:shadow-2xl transition-shadow`}>
           <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
           <div className="relative z-10">
             <div className="flex items-end justify-between mb-6">
               <div>
                 <p className="text-indigo-200 font-medium text-sm mb-2">Total Revenue</p>
                 <h2 className="text-5xl font-bold">${(revenue / 1000).toFixed(1)}K</h2>
               </div>
               <div className={`px-3 py-2 rounded-lg ${revenueChange > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'} text-sm font-semibold`}>
                 {revenueChange > 0 ? '↑' : '↓'} {Math.abs(revenueChange)}%
               </div>
             </div>
           </div>
           <div className="h-20 flex items-end space-x-1.5 relative z-10">
              {[40, 70, 50, 90, 60, 80, 50, 70, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-white/20 hover:bg-white/40 rounded-t transition-colors" style={{ height: `${h}%` }}></div>
              ))}
           </div>
        </div>

        {/* ITEM 3: Active Users */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center text-center border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} relative overflow-hidden`}>
           <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-green-500 via-transparent to-transparent rounded-3xl"></div>
           <div className="relative z-10 w-full">
             <div className="w-32 h-32 mx-auto rounded-full border-8 border-green-500/30 border-t-green-500 animate-spin mb-4"></div>
             <h3 className="text-3xl font-bold">{activeUsers.toLocaleString()}</h3>
             <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} mt-2 text-sm`}>Live Visitors</p>
             <div className="mt-3 flex gap-2 justify-center">
               <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">+{usersChange}%</span>
             </div>
           </div>
        </div>

        {/* ITEM 4: Conversion Rate */}
        <div onClick={() => handleStatClick('Conversion Rate')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="Conversion Rate" value={`${conversionRate}%`} change={5.2} icon="📈" gradient="from-emerald-500 to-teal-500" />
        </div>

        {/* ITEM 5: CPU Usage */}
        <div onClick={() => handleStatClick('CPU Usage')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="CPU Usage" value={`${cpuData}%`} change={-8.5} icon="⚙️" gradient="from-orange-500 to-amber-500" />
        </div>

        {/* ITEM 6: Memory Usage */}
        <div onClick={() => handleStatClick('Memory Usage')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="Memory Usage" value={`${memoryData} GB`} change={3.1} icon="💾" gradient="from-blue-500 to-cyan-500" />
        </div>

        {/* ITEM 7: System Uptime */}
        <div onClick={() => handleStatClick('System Uptime')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="System Uptime" value="99.9%" change={0} icon="✅" gradient="from-green-500 to-emerald-500" />
        </div>

        {/* ITEM 8: Notification Alert (Spans 2 cols) */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 md:col-span-2 flex flex-col justify-between border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} relative overflow-hidden hover:scale-105 transition-transform`}>
           <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-red-500 via-transparent to-transparent rounded-3xl"></div>
           <div className="relative z-10 flex items-center justify-between">
             <div>
               <div className="flex items-center space-x-3 mb-3">
                 <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500"></span>
                 <span className="font-bold text-red-400 uppercase text-xs tracking-wide">System Alert</span>
               </div>
               <p className="font-semibold text-base leading-tight">Server load at {serverLoad}% capacity.</p>
               <p className={`text-xs mt-2 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>Monitor closely</p>
             </div>
             <button
               onClick={() => addNotification('Alert dismissed', 'success')}
               className="text-2xl hover:opacity-70 transition-opacity flex-shrink-0"
             >
               ✕
             </button>
           </div>
        </div>

        {/* ITEM 9: Activity Feed (Spans 2 cols) */}
        <div className="md:col-span-2">
          <ActivityFeed darkMode={darkMode} />
        </div>

        {/* ITEM 10: Calendar (Spans 2 cols) */}
        <div className="md:col-span-2">
          <Calendar darkMode={darkMode} />
        </div>

        {/* ITEM 11: Team Members (Spans 2 cols) */}
        <div className="md:col-span-2">
          <TeamMembers darkMode={darkMode} />
        </div>

        {/* ITEM 12: Storage Widget (Spans 2 cols) */}
        <div className="md:col-span-2">
          <StorageWidget darkMode={darkMode} />
        </div>

        {/* ITEM 13: Task List (Spans 2 cols) */}
        <div className="md:col-span-2">
          <TaskList darkMode={darkMode} />
        </div>

        {/* ITEM 14: Chart Data (Spans 3 cols) */}
        <div className="md:col-span-3">
          <Chart darkMode={darkMode} title="Performance Metrics" data={chartData} />
        </div>

        {/* ITEM 15: Response Time */}
        <div onClick={() => handleStatClick('Avg Response Time')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="Avg Response Time" value="245ms" change={-3.1} icon="⚡" gradient="from-cyan-500 to-blue-500" />
        </div>

        {/* ITEM 16: Error Rate */}
        <div onClick={() => handleStatClick('Error Rate')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="Error Rate" value="0.12%" change={-2.4} icon="🛡️" gradient="from-pink-500 to-rose-500" />
        </div>

        {/* ITEM 17: Throughput */}
        <div onClick={() => handleStatClick('Throughput')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="Throughput" value="2.4K/s" change={12.8} icon="📊" gradient="from-purple-500 to-violet-500" />
        </div>

        {/* ITEM 18: Dark Mode Toggle (Spans 3 cols) */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 md:col-span-3 flex items-center justify-between border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} cursor-pointer hover:scale-105 transition-transform`}>
           <div>
             <span className="font-semibold">Dark Mode</span>
             <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-gray-500'}`}>{darkMode ? 'Enabled' : 'Disabled'}</p>
           </div>
           <button
             onClick={() => setDarkMode(!darkMode)}
             className={`w-14 h-8 rounded-full p-1 flex transition-all ${darkMode ? 'bg-green-500/30 justify-end' : 'bg-gray-300 justify-start'}`}
           >
             <div className={`w-6 h-6 ${darkMode ? 'bg-green-400' : 'bg-white'} rounded-full shadow-lg transition-all`}></div>
           </button>
        </div>

        {/* ITEM 19: Performance Goal (Spans full width) */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-neutral-800/50 via-neutral-750/50 to-neutral-700/50' : 'bg-gradient-to-r from-gray-100 to-gray-50'} backdrop-blur-xl rounded-3xl p-6 md:col-span-6 flex items-center justify-between border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
           <div className="flex-1">
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-semibold">Performance Goal</span>
               <span className={`text-xs font-mono ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>75%</span>
             </div>
             <div className={`h-2.5 ${darkMode ? 'bg-neutral-700' : 'bg-gray-300'} rounded-full overflow-hidden border ${darkMode ? 'border-neutral-600/50' : 'border-gray-300/50'}`}>
               <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"></div>
             </div>
           </div>
        </div>


      </div>

    </div>

  );

}

export default App;
