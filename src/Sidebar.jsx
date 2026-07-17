export default function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-800 flex flex-col hidden md:flex shrink-0 border-r border-indigo-700 h-full">
      
      {/* Top Section / Main Navigation container stretches to fill available space */}
      <nav className="flex-1 p-4 space-y-3">
        
        {/* Active Navigation Item Placeholder */}
        <div className="w-full h-10 bg-indigo-600/80 rounded-lg border border-indigo-500/50 flex items-center px-4 shadow-sm">
          {/* Icon placeholder */}
          <div className="w-5 h-5 bg-indigo-300/50 rounded-md mr-3 shrink-0"></div>
          {/* Text placeholder */}
          <div className="h-3 w-20 bg-indigo-200/80 rounded"></div>
        </div>

        {/* Inactive Navigation Item Placeholders */}
        <div className="w-full h-10 hover:bg-white/5 rounded-lg flex items-center px-4 transition-colors cursor-pointer">
          <div className="w-5 h-5 bg-indigo-400/30 rounded-md mr-3 shrink-0"></div>
          <div className="h-3 w-24 bg-indigo-300/50 rounded"></div>
        </div>

        <div className="w-full h-10 hover:bg-white/5 rounded-lg flex items-center px-4 transition-colors cursor-pointer">
          <div className="w-5 h-5 bg-indigo-400/30 rounded-md mr-3 shrink-0"></div>
          <div className="h-3 w-16 bg-indigo-300/50 rounded"></div>
        </div>
        
        <div className="w-full h-10 hover:bg-white/5 rounded-lg flex items-center px-4 transition-colors cursor-pointer">
          <div className="w-5 h-5 bg-indigo-400/30 rounded-md mr-3 shrink-0"></div>
          <div className="h-3 w-28 bg-indigo-300/50 rounded"></div>
        </div>

      </nav>

      {/* Bottom Section gets pushed to the bottom by the flex-1 nav */}
      <div className="p-4 border-t border-indigo-700/50 space-y-3">
        
        {/* Settings/Logout Item Placeholder */}
        <div className="w-full h-10 hover:bg-white/5 rounded-lg flex items-center px-4 transition-colors cursor-pointer">
          <div className="w-5 h-5 bg-indigo-400/30 rounded-md mr-3 shrink-0"></div>
          <div className="h-3 w-20 bg-indigo-300/50 rounded"></div>
        </div>

      </div>

    </aside>
  );
}