import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Database backup completed', type: 'success' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-2xl transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* BENTO GRID WRAPPER */}

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-4 h-[650px] auto-rows-fr">

        

        {/* ITEM 1: Profile (Top Left, 1x1) */}

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



        {/* ITEM 2: Main Stats (Top Right, Spans 2 cols) */}

        {/* FUTURE BUG: Change 'md:col-span-2' to 'md:col-span-1' to break the puzzle layout */}

        <div className={`${darkMode ? 'bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600' : 'bg-gradient-to-br from-indigo-500 to-purple-500'} rounded-3xl p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden hover:shadow-2xl transition-shadow`}>

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



        {/* ITEM 3: Active Users (Middle Left, Spans 2 rows) */}

        <div className={`${darkMode ? 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-8 md:row-span-2 flex flex-col items-center justify-center text-center border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} relative overflow-hidden`}>

           <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-green-500 via-transparent to-transparent rounded-3xl"></div>

           <div className="relative z-10 w-full">
             <div className="w-40 h-40 mx-auto rounded-full border-8 ${darkMode ? 'border-green-500/30 border-t-green-500' : 'border-green-500/20 border-t-green-500'} animate-spin mb-6"></div>

             <h3 className="text-4xl font-bold">{activeUsers.toLocaleString()}</h3>

             <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-600'} mt-2 text-sm`}>Live Visitors</p>

             <div className="mt-4 flex gap-2 justify-center">
               <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">+{usersChange}% today</span>
             </div>
           </div>

        </div>



        {/* ITEM 4: Notification (Middle Center, 1x1) */}

        <div className={`${darkMode ? 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform`}>

           <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-red-500 via-transparent to-transparent rounded-3xl"></div>

           <div className="relative z-10">
             <div className="flex items-center space-x-3 mb-3">

               <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500"></span>

               <span className="font-bold text-red-400 uppercase text-xs tracking-wide">System Alert</span>

             </div>

             <p className="font-semibold text-base leading-tight">Server load at {serverLoad}% capacity.</p>

             <p className={`text-xs mt-2 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>Monitor closely</p>
           </div>

        </div>



        {/* ITEM 5: Toggle (Middle Right, 1x1) */}

        <div className={`${darkMode ? 'bg-gradient-to-br from-neutral-800/50 to-neutral-700/50' : 'bg-white'} backdrop-blur-xl rounded-3xl p-6 flex items-center justify-between border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'} cursor-pointer hover:scale-105 transition-transform`}>

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



        {/* ITEM 6: Footer Widget (Bottom Center, Spans 2 cols) */}

        <div className={`${darkMode ? 'bg-gradient-to-r from-neutral-800/50 via-neutral-750/50 to-neutral-700/50' : 'bg-gradient-to-r from-gray-100 to-gray-50'} backdrop-blur-xl rounded-3xl p-6 md:col-span-2 flex items-center justify-between border ${darkMode ? 'border-neutral-700/50' : 'border-gray-200/50'}`}>

           <div className="flex-1">
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-semibold">Performance Goal</span>
               <span className="text-xs font-mono ${darkMode ? 'text-neutral-400' : 'text-gray-600'}">75%</span>
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
