import { Clock, CheckCircle2, Info } from "lucide-react";

interface EducationUpdate {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export function RecentUpdates({ updates }: { updates: EducationUpdate[] }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).format(new Date(date));
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" />
          Recent Updates
        </h2>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-slate-100">
        {updates.length === 0 ? (
          <p className="text-sm text-slate-400 italic py-4 pl-6">No recent updates.</p>
        ) : (
          updates.map((update, i) => (
            <div key={update.id} className="relative pl-8">
              <div className={`absolute left-0 top-1.5 -ml-1.5 h-3 w-3 rounded-full border-2 border-white ring-2 ${
                i === 0 ? 'bg-teal-500 ring-teal-100' : 'bg-orange-500 ring-orange-100'
              }`} />
              
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {formatDate(update.date)}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{update.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {update.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
