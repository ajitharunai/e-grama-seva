"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  GraduationCap, 
  Droplets, 
  MessageSquareWarning, 
  ScrollText, 
  UsersRound, 
  FileText, 
  LogOut,
  User
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { name: "My Dashboard", tamil: "என் டாஷ்போர்டு", path: "/citizen", icon: LayoutDashboard },
  { name: "Village Statistics", tamil: "கிராம புள்ளிவிவரம்", path: "/citizen/statistics", icon: BarChart3 },
  { name: "Education Records", tamil: "கல்வி பதிவுகள்", path: "/citizen/education", icon: GraduationCap },
  { name: "Water Bodies", tamil: "நீர் நிலைகள்", path: "/citizen/water-bodies", icon: Droplets },
  { name: "Govt Schemes", tamil: "அரசு திட்டங்கள்", path: "/citizen/schemes", icon: ScrollText },
  { name: "Gram Sabha", tamil: "கிராம சபை", path: "/citizen/gram-sabha", icon: UsersRound },
  { name: "Reports", tamil: "அறிக்கைகள்", path: "/citizen/reports", icon: FileText },
  { name: "File Complaint", tamil: "புகார் அளியுங்கள்", path: "/citizen/complaints/new", icon: MessageSquareWarning },
];

export function CitizenSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-[260px] h-screen bg-teal-900 flex flex-col fixed left-0 top-0 overflow-y-auto z-20 shadow-xl">
      <div className="p-6 flex items-center gap-3 border-b border-teal-800">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <User className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Citizen Portal</h1>
          <p className="text-[10px] text-teal-300 font-medium tracking-wider uppercase">E-Grama Seva</p>
        </div>
      </div>

      <div className="flex-1 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-start px-6 py-3 border-l-4 transition-all duration-200 ${
                isActive 
                  ? "border-teal-400 bg-teal-800 shadow-inner" 
                  : "border-transparent hover:bg-teal-800/50 hover:border-teal-700"
              }`}
            >
              <item.icon 
                className={`w-5 h-5 mt-0.5 mr-3 shrink-0 transition-colors ${
                  isActive ? "text-teal-300" : "text-teal-500"
                }`} 
              />
              <div>
                <div className={`text-[15px] transition-colors ${isActive ? "text-white font-bold" : "text-teal-100 font-medium"}`}>
                  {item.name}
                </div>
                <div className="text-[10px] text-teal-500 mt-0.5">
                  {item.tamil}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-teal-800 bg-teal-950">
        <div className="flex items-center p-2 rounded-xl">
          <div className="w-10 h-10 rounded-full border-2 border-teal-500 bg-teal-800 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-teal-300" />
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="text-white font-medium text-sm truncate">{session?.user?.name || "Citizen"}</div>
            <div className="text-[11px] text-teal-400 truncate">Resident</div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-teal-500 hover:opacity-100 hover:text-white p-2 rounded-lg hover:bg-teal-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
