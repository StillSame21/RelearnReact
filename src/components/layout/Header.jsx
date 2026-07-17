export default function Header() {
  return (
    <header className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md flex items-center justify-between px-6 text-white shrink-0">
      
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold shadow-inner">
          O
        </div>
        <h1 className="text-xl font-semibold tracking-wide">
          OmniWave Dashboard
        </h1>
      </div>

      {/* Right side: Actions / Profile */}
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium hover:text-indigo-200 transition-colors">
          Notifications
        </button>
        <div className="w-9 h-9 bg-purple-400 rounded-full border-2 border-purple-300 shadow-sm cursor-pointer hover:border-white transition-all">
          {/* Avatar placeholder */}
        </div>
      </div>
      
    </header>
  );
}