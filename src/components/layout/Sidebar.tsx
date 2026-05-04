"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  BarChart3, 
  GraduationCap, 
  Droplets, 
  MessageSquareWarning, 
  FileBadge, 
  IndianRupee, 
  ScrollText, 
  UsersRound, 
  FileText, 
  Settings,
  LogOut,
  ShieldCheck
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", tamil: "டாஷ்போர்டு", path: "/", icon: LayoutDashboard },
  { name: "Citizens Registry", tamil: "குடிமக்கள் பதிவேடு", path: "/citizens", icon: Users },
  { name: "Add Citizen", tamil: "குடிமகன் சேர்க்கை", path: "/citizens/add", icon: UserPlus },
  { name: "Village Statistics", tamil: "கிராம புள்ளிவிவரம்", path: "/statistics", icon: BarChart3 },
  { name: "Education Records", tamil: "கல்வி பதிவுகள்", path: "/education", icon: GraduationCap },
  { name: "Water Bodies", tamil: "நீர் நிலைகள்", path: "/water-bodies", icon: Droplets },
  { name: "Complaints", tamil: "புகார்கள்", path: "/complaints", icon: MessageSquareWarning },
  { name: "Certificates", tamil: "சான்றிதழ்கள்", path: "/certificates", icon: FileBadge },
  { name: "Tax Collection", tamil: "வரி வசூல்", path: "/tax", icon: IndianRupee },
  { name: "Govt Schemes", tamil: "அரசு திட்டங்கள்", path: "/schemes", icon: ScrollText },
  { name: "Gram Sabha", tamil: "கிராம சபை", path: "/gram-sabha", icon: UsersRound },
  { name: "Village Governance", tamil: "கிராம ஆட்சி", path: "/officials", icon: ShieldCheck },
  { name: "Reports", tamil: "அறிக்கைகள்", path: "/reports", icon: FileText },
  { name: "Settings", tamil: "அமைப்புகள்", path: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`w-[260px] h-screen bg-[var(--color-primary-dark)] flex flex-col fixed left-0 top-0 overflow-y-auto z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className="flex-1 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-start px-4 py-3 border-l-4 transition-colors ${
                isActive 
                  ? "border-[var(--color-accent-orange)] bg-[var(--color-primary)]" 
                  : "border-transparent hover:bg-[#00594F]"
              }`}
            >
              <item.icon 
                className={`w-5 h-5 mt-0.5 mr-3 shrink-0 ${
                  isActive ? "text-[var(--color-accent-orange)]" : "text-white opacity-80"
                }`} 
              />
              <div>
                <div className={`text-[15px] ${isActive ? "text-white font-bold" : "text-white font-medium"}`}>
                  {item.name}
                </div>
                <div className="text-[10px] text-[var(--color-chart-6)] mt-0.5">
                  {item.tamil}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[var(--color-primary)]">
        <div className="flex items-center bg-[#003B31] p-3 rounded-xl">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--color-accent-orange)] bg-[var(--color-primary)] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">AO</span>
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="text-white font-medium text-sm truncate">Admin Officer</div>
            <div className="text-[11px] text-[var(--color-primary-pale)] truncate">Karungalipadipatti VP</div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-white opacity-70 hover:opacity-100 hover:text-[var(--color-accent-orange)] p-1"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
