export default function Footer() {
  return (
    <footer className="h-16 bg-indigo-900 text-indigo-300 flex items-center justify-between px-6 border-t border-indigo-950 shrink-0 text-sm">
      
      {/* Left side: Copyright */}
      <div>
        <p>&copy; {new Date().getFullYear()} OmniWave Platform. All rights reserved.</p>
      </div>

      {/* Right side: Links */}
      <div className="flex gap-6 font-medium">
        <a href="#" className="hover:text-white transition-colors">Documentation</a>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Support</a>
      </div>
      
    </footer>
  );
}