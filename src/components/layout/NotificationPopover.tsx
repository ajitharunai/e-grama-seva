"use client";

import { useState } from "react";
import { Bell, Info, CheckCircle2, MessageSquareWarning, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  time: string;
  type: 'complaint' | 'tax' | 'general';
  message: string;
  link: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Complaint Received",
    time: "5 mins ago",
    type: "complaint",
    message: "Street light not working in Ward 4",
    link: "/complaints"
  },
  {
    id: "2",
    title: "Tax Collection Update",
    time: "2 hours ago",
    type: "tax",
    message: "Monthly tax collection reached 85% of target",
    link: "/tax"
  },
  {
    id: "3",
    title: "Gram Sabha Meeting",
    time: "1 day ago",
    type: "general",
    message: "Agenda for next meeting has been published",
    link: "/gram-sabha"
  }
];

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-all ${
          isOpen ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-[var(--color-primary)]"></span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Notifications</h3>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase">3 New</span>
            </div>
            
            <div className="max-h-[360px] overflow-y-auto">
              {mockNotifications.map((n) => (
                <Link 
                  key={n.id} 
                  href={n.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.type === 'complaint' ? 'bg-orange-100 text-orange-600' :
                    n.type === 'tax' ? 'bg-teal-100 text-teal-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {n.type === 'complaint' ? <MessageSquareWarning className="w-5 h-5" /> :
                     n.type === 'tax' ? <CheckCircle2 className="w-5 h-5" /> :
                     <Info className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-sm font-bold text-slate-900 truncate">{n.title}</p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{n.message}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="p-3 bg-slate-50 block text-center text-xs font-bold text-slate-600 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
            >
              View All Notifications <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
