import { Briefcase, ArrowRight, ShieldCheck, HeartHandshake, Home as HomeIcon } from "lucide-react";

export default function SchemesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Government Schemes</h1>
            <p className="text-slate-500 mt-1">Manage and track beneficiaries for state and central schemes.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Scheme 1 */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 flex-1">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-teal-950 mb-2">MGNREGA</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">Mahatma Gandhi National Rural Employment Guarantee Act. Providing 100 days of wage employment.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-slate-900">342</span>
              <span className="text-slate-500">Active Beneficiaries</span>
            </div>
          </div>
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
              View List <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scheme 2 */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 flex-1">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-teal-950 mb-2">PM Awas Yojana</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">Pradhan Mantri Awas Yojana - Gramin. Housing for all scheme for rural poor.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-slate-900">45</span>
              <span className="text-slate-500">Houses Sanctioned</span>
            </div>
          </div>
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
              View List <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scheme 3 */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 flex-1">
            <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-teal-950 mb-2">Pudhumai Penn</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme for girl students.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-slate-900">28</span>
              <span className="text-slate-500">Girl Students Enrolled</span>
            </div>
          </div>
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
              View List <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
