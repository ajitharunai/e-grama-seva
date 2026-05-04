"use client";

import { User, Menu, Leaf } from "lucide-react";
import { NotificationPopover } from "./NotificationPopover";

interface CitizenTopBarProps {
  onMenuClick?: () => void;
  userName?: string;
}

export function CitizenTopBar({ onMenuClick, userName }: CitizenTopBarProps) {
  return (
    <header className="h-[64px] bg-gradient-to-r from-teal-800 to-teal-950 flex items-center justify-between px-6 sticky top-0 z-30 shadow-md ml-0">
      
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-1 text-white md:hidden hover:bg-white/10 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 md:hidden">
          <Leaf className="w-6 h-6 text-teal-400" />
          <span className="font-bold text-white">E-Grama</span>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4">
        <NotificationPopover />
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">{userName || "Citizen"}</p>
            <p className="text-[10px] text-teal-300">Resident</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
