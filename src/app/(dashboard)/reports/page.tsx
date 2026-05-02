import { BarChart, FileSpreadsheet, Download, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <BarChart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Consolidated Reports</h1>
            <p className="text-slate-500 mt-1">Generate and export official data for state departments.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-teal-950">Financial Report (Tax & Revenue)</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Generates a detailed ledger of all taxes collected, pending dues, and panchayat expenses for the selected financial year.</p>
          <div className="flex items-center gap-3">
            <select className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-teal-500">
              <option>FY 2025-2026</option>
              <option>FY 2024-2025</option>
            </select>
            <button className="h-10 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-teal-950">Demographics & Census</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Comprehensive data on population, gender ratio, literacy, and socio-economic status across all wards.</p>
          <div className="flex items-center gap-3">
            <button className="flex-1 h-10 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" /> Filter Wards
            </button>
            <button className="h-10 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
