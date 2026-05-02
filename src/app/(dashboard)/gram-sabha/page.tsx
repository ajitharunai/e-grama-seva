import { CalendarDays, Users, FileText, CheckCircle } from "lucide-react";

export default function GramSabhaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Gram Sabha</h1>
            <p className="text-slate-500 mt-1">Schedules, agendas, and minutes for village council meetings.</p>
          </div>
        </div>
        <button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          Schedule Meeting
        </button>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-orange-50 mb-3 uppercase tracking-wider">
              Upcoming Meeting
            </span>
            <h2 className="text-2xl font-bold mb-2">Independence Day Special Gram Sabha</h2>
            <div className="flex flex-wrap items-center gap-4 text-orange-100 text-sm">
              <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Aug 15, 2026, 10:00 AM</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Expected: 500+ Citizens</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
              View Agenda
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <h3 className="text-xl font-bold text-teal-950 mt-8 mb-4">Past Meetings & Minutes</h3>
      <div className="space-y-4">
        {[
          { title: "Republic Day Gram Sabha", date: "Jan 26, 2026", attendees: 412, status: "Minutes Published" },
          { title: "Gandhi Jayanti Gram Sabha", date: "Oct 02, 2025", attendees: 385, status: "Minutes Published" },
          { title: "May Day Special Gram Sabha", date: "May 01, 2025", attendees: 450, status: "Minutes Published" }
        ].map((meeting, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-teal-100 transition-colors">
            <div>
              <h4 className="font-bold text-slate-900 mb-1">{meeting.title}</h4>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {meeting.date}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {meeting.attendees} attended</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" /> {meeting.status}
              </span>
              <button className="text-slate-400 hover:text-teal-600 transition-colors">
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
