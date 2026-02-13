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

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const addNotification = (message, type = 'info') => {
    const newNotif = { 
      id: Math.max(...notifications.map(n => n.id), 0) + 1, 
      message, 
      type 
    };
    setNotifications([newNotif, ...notifications]);
    setTimeout(() => dismissNotification(newNotif.id), 5000);
  };

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

  const handleStatClick = (statName) => {
    setSelectedStat(statName);
    addNotification(`Viewing details for ${statName}`, 'info');
  };

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
      {/* 2. SPACING BUG A: Negative margin pulls the header up or subsequent content up, causing severe overlap. */}
      {/* FIX: className="mb-8 flex items-center justify-between" */}
      <div className="mb-[-50px] flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboard</h1>
          <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} text-sm mt-1`}>Welcome back! Here's your performance overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-2xl px-4 py-2 text-sm font-mono`}>
            {time.toLocaleTimeString()}
          </div>
          
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
            {/* ... settings inputs ... */}
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

      {/* BENTO GRID WRAPPER */}
      {/* 3. LAYOUT BUG A: Removed 'md:grid-cols-6', defaulting to 'grid-cols-1'. The Bento Grid becomes a single vertical column stack. */}
      {/* FIX: className="w-full grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-max" */}
      <div className="w-full grid grid-cols-1 gap-4 auto-rows-max">

        {/* ITEM 1: Profile */}
        <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between hover:scale-105 transition-transform border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">JM</div>
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-xs font-medium text-emerald-300">Active</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">Welcome back, Jofether</h3>
            <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} text-sm mt-1`}>Pro Member • Tier 5</p>
          </div>
        </div>

        {/* ITEM 2: Main Stats */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600' : 'bg-gradient-to-br from-indigo-500 to-purple-500'} rounded-3xl p-8 md:col-span-5 flex flex-col justify-between relative overflow-hidden hover:shadow-2xl transition-shadow`}>
           {/* ... stats content ... */}
           <div className="relative z-10">
             <div className="flex items-end justify-between mb-6">
               <div>
                 <p className="text-indigo-200 font-medium text-sm mb-2">Total Revenue</p>
                 <h2 className="text-5xl font-bold">${(revenue / 1000).toFixed(1)}K</h2>
               </div>
             </div>
           </div>
        </div>

        {/* ... Other items ... */}
        
        {/* ITEM 9: Activity Feed */}
        <div className="md:col-span-2">
          <ActivityFeed darkMode={darkMode} />
        </div>

        {/* ITEM 10: Calendar */}
        <div className="md:col-span-2">
          <Calendar darkMode={darkMode} />
        </div>

        {/* ITEM 11: Team Members */}
        <div className="md:col-span-2">
          <TeamMembers darkMode={darkMode} />
        </div>

        {/* ITEM 12: Storage Widget */}
        <div className="md:col-span-2">
          <StorageWidget darkMode={darkMode} />
        </div>

        {/* ITEM 13: Task List */}
        <div className="md:col-span-2">
          <TaskList darkMode={darkMode} />
        </div>

        {/* ITEM 14: Chart Data */}
        <div className="md:col-span-3">
          <Chart darkMode={darkMode} title="Performance Metrics" data={chartData} />
        </div>

        {/* ITEM 15-17: Small Stats */}
        <div onClick={() => handleStatClick('Avg Response Time')} className="cursor-pointer">
          <StatCard darkMode={darkMode} label="Avg Response Time" value="245ms" change={-3.1} icon="⚡" gradient="from-cyan-500 to-blue-500" />
        </div>

        {/* ... */}
      </div>
    </div>
  );
}

export default App;