import { School, MapPin, Users, UserCheck } from "lucide-react";

interface EducationalInstitution {
  id: string;
  name: string;
  type: string;
  wardNumber: string;
  address: string;
  studentCount: number;
  teacherCount: number;
}

export function EducationalInstitutions({ institutions }: { institutions: EducationalInstitution[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
          <School className="w-5 h-5 text-teal-600" />
          Educational Institutions
        </h2>
      </div>

      <div className="space-y-4">
        {institutions.length === 0 ? (
          <p className="text-sm text-slate-400 italic py-4">No institutions registered yet.</p>
        ) : (
          institutions.map((inst) => (
            <div key={inst.id} className="p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900">{inst.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  inst.type.includes('Primary') ? 'bg-teal-100 text-teal-700' : 
                  inst.type.includes('Higher') ? 'bg-orange-100 text-orange-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {inst.type}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                <MapPin className="w-3 h-3" />
                <span>Ward {inst.wardNumber}, {inst.address}</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{inst.studentCount}</span>
                  <span className="text-xs text-slate-500">Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{inst.teacherCount}</span>
                  <span className="text-xs text-slate-500">Teachers</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
