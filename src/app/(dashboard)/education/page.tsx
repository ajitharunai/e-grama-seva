import { GraduationCap, BookOpen, Users, School, TrendingUp } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Education Records</h1>
            <p className="text-slate-500 mt-1">Village school enrollment, literacy rates, and educational infrastructure.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Schools", value: "3", icon: School, color: "teal" },
          { label: "Enrolled Students", value: "482", icon: Users, color: "orange" },
          { label: "Teaching Staff", value: "24", icon: BookOpen, color: "teal" },
          { label: "Literacy Rate", value: "82.5%", icon: TrendingUp, color: "orange" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className={`p-3 bg-${stat.color}-50 rounded-lg text-${stat.color}-600 w-fit mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-teal-950 mb-4">Educational Institutions</h3>
          <div className="space-y-4">
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-900">Panchayat Union Primary School</h4>
                <span className="text-xs font-medium px-2 py-1 bg-teal-50 text-teal-700 rounded-full">Primary</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">Ward 2, Main Street</p>
              <div className="flex gap-4 text-sm text-slate-600">
                <span><strong>210</strong> Students</span>
                <span><strong>12</strong> Teachers</span>
              </div>
            </div>
            
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-900">Government Higher Secondary School</h4>
                <span className="text-xs font-medium px-2 py-1 bg-orange-50 text-orange-700 rounded-full">Higher Sec.</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">Ward 4, Temple Road</p>
              <div className="flex gap-4 text-sm text-slate-600">
                <span><strong>272</strong> Students</span>
                <span><strong>12</strong> Teachers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-teal-950 mb-4">Recent Updates</h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-teal-100 pb-2">
              <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-1 border-2 border-white"></div>
              <p className="text-sm text-slate-500 mb-1">May 02, 2026</p>
              <h4 className="font-medium text-slate-900">New computers installed</h4>
              <p className="text-sm text-slate-600 mt-1">10 new computers provided to the Higher Secondary School under the state tech initiative.</p>
            </div>
            <div className="relative pl-6 border-l-2 border-teal-100 pb-2">
              <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1 border-2 border-white"></div>
              <p className="text-sm text-slate-500 mb-1">Apr 15, 2026</p>
              <h4 className="font-medium text-slate-900">Mid-day meal audit completed</h4>
              <p className="text-sm text-slate-600 mt-1">Quality check passed for both primary and secondary schools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
