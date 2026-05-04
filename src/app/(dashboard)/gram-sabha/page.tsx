import { UsersRound, Calendar, Plus, MessageSquare, ShieldCheck, Info } from "lucide-react";
import { getMeetings } from "@/app/actions/gram-sabha";
import { MeetingList } from "@/components/gram-sabha/MeetingList";
import { ScheduleMeetingForm } from "@/components/gram-sabha/ScheduleMeetingForm";

export default async function GramSabhaPage() {
  const meetings = await getMeetings();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 shadow-sm">
            <UsersRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gram Sabha</h1>
            <p className="text-slate-500 mt-1">Village council meetings, agenda, and public resolutions.</p>
          </div>
        </div>
        <ScheduleMeetingForm />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Scheduled Meetings
            </h2>
          </div>
          
          <MeetingList meetings={meetings} isAdmin={true} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm bg-gradient-to-br from-white to-orange-50/30">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-orange-500" />
              What is Gram Sabha?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gram Sabha is the primary body of the Panchayati Raj system. It is a forum where the village community participates in local governance and decision-making.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Approval of village budget",
                "Identification of beneficiaries",
                "Social audit of works",
                "Resolution of local issues"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
            <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
            <h3 className="font-bold mb-2 relative z-10">Meeting Protocols</h3>
            <p className="text-xs text-slate-400 leading-relaxed relative z-10 mb-4">
              Meetings must be announced at least 7 days in advance. Quorum requirements apply.
            </p>
            <button className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors">
              View Guidelines →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
