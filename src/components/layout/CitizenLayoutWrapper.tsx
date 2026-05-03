"use client";

import { useState } from "react";
import { CitizenSidebar } from "./CitizenSidebar";
import { CitizenTopBar } from "./CitizenTopBar";

interface CitizenLayoutWrapperProps {
  children: React.ReactNode;
  userName?: string;
}

export function CitizenLayoutWrapper({ children, userName }: CitizenLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen antialiased font-sans bg-slate-50 overflow-x-hidden">
      <CitizenSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen md:ml-[260px] ml-0 transition-all duration-300">
        <CitizenTopBar onMenuClick={() => setIsSidebarOpen(true)} userName={userName} />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
