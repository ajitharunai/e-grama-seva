import { Leaf, Landmark, RefreshCw, Menu } from "lucide-react";
import { NotificationPopover } from "./NotificationPopover";

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-[64px] bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] flex items-center justify-between px-6 sticky top-0 z-30 shadow-md md:ml-[260px] ml-0">
      
      {/* Left: Menu Toggle (Mobile) & Logo */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-1 text-white md:hidden hover:bg-white/10 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-white font-bold text-[18px] tracking-tight">Gram Seva</h1>
        </div>
      </div>

      {/* Center: Village Info */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-black/10 rounded-full">
        <Landmark className="w-4 h-4 text-[var(--color-primary-pale)]" />
        <span className="text-white text-[13px] font-medium">
          Karungalipadipatti Village Panchayat, Tiruvannamalai District
        </span>
      </div>

      {/* Right: Sync, Notifications, Profile */}
      <div className="flex items-center gap-6">
        
        {/* Sync Status */}
        <div className="hidden lg:flex items-center gap-1.5 opacity-80">
          <RefreshCw className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-[11px]">Synced: Just now</span>
        </div>

        {/* Notifications */}
        <NotificationPopover />

        {/* Admin Profile */}
        <div className="flex items-center gap-3 border-l border-white/20 pl-6">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent-orange)] bg-[var(--color-primary-dark)] flex items-center justify-center overflow-hidden">
             <span className="text-white font-bold text-xs">AO</span>
          </div>
          <span className="text-white text-[13px] font-medium hidden sm:block">Admin Officer</span>
        </div>
      </div>
    </header>
  );
}
