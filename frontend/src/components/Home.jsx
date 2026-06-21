import React, { useState } from 'react';

export default function Home() {
  // Simulating authentication state
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Mock user data
  const user = {
    name: 'Alex Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* HEADER / NAVIGATION */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transform group-hover:scale-105 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.143m7.414-7.414a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Link<span className="text-indigo-400">Pilot</span>
            </span>
          </div>

          {/* Dynamic Auth Section */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-3 bg-slate-800/60 pl-3 pr-2 py-1.5 rounded-full border border-slate-700/50">
                <span className="text-sm font-medium text-slate-300 hidden sm:inline">
                  {user.name}
                </span>
                <img 
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-500/50 object-cover" 
                  src={user.avatar} 
                  alt="User Profile" 
                />
                <button 
                  onClick={() => setIsSignedIn(false)}
                  className="ml-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSignedIn(true)}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-indigo-500 to-violet-500 group-hover:from-indigo-500 group-hover:to-violet-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-indigo-800 transition-all"
              >
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-medium group-hover:bg-opacity-0 rounded-[10px]">
                  Sign In
                </span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-20 relative overflow-hidden">
        
        {/* Ambient Decorative Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          Next-Gen URL Shortening
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-tight">
          Navigate your links with <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Absolute Precision
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          LinkPilot transforms your long, cluttered URLs into clean, powerful, and trackable micro-links in seconds. Optimize your digital reach.
        </p>

        {/* DYNAMIC ACTION BUTTON */}
        <div className="h-16 flex items-center justify-center">
          {isSignedIn ? (
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              Let's Proceed
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <p className="text-sm font-medium text-slate-500 border border-dashed border-slate-800 rounded-xl px-6 py-3 bg-slate-950/40">
              💡 Please <span className="text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => setIsSignedIn(true)}>Sign In</span> at the top right to start shortening URLs.
            </p>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 w-full border-t border-slate-800/60 pt-12">
          <div className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800 text-left">
            <h3 className="text-white font-semibold mb-2">⚡ Lightning Fast</h3>
            <p className="text-sm text-slate-400">Generate instantly short aliases optimized for social sharing and clean routing.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800 text-left">
            <h3 className="text-white font-semibold mb-2">📊 Deep Analytics</h3>
            <p className="text-sm text-slate-400">Track click rates, geographic location data, and referrers globally.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800 text-left">
            <h3 className="text-white font-semibold mb-2">🛡️ Secure Redirection</h3>
            <p className="text-sm text-slate-400">Every single link is filtered through active spam prevention filters seamlessly.</p>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        &copy; 2026 LinkPilot. Navigation simplified.
      </footer>

    </div>
  );
}
