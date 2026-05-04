import { UsersRound, Calendar, Info, ShieldCheck } from "lucide-react";
import { getMeetings } from "@/app/actions/gram-sabha";
import { MeetingList } from "@/components/gram-sabha/MeetingList";

export default async function CitizenGramSabhaPage() {
  const meetings = await getMeetings();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 shadow-sm">
          <UsersRound className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gram Sabha</h1>
          <p className="text-slate-500 mt-1">Participate in your village council meetings and stay informed.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Upcoming & Recent Meetings
            </h2>
          </div>
          
          <MeetingList meetings={meetings} isAdmin={false} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm bg-gradient-to-br from-white to-orange-50/30">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-orange-500" />
              Your Rights
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every citizen in the village registry has the right to attend Gram Sabha meetings and vote on resolutions.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Right to ask questions",
                "Right to suggest projects",
                "Right to inspect accounts",
                "Right to vote on resolutions"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
            <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
            <h3 className="font-bold mb-2 relative z-10">Get Involved</h3>
            <p className="text-xs text-orange-50 leading-relaxed relative z-10 mb-4">
              Your voice matters. Attend the next Gram Sabha to contribute to your village's development.
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all relative z-10">
              Download Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
