import { Droplets, MapPin, Activity, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AddWaterBodyForm } from "@/components/water-bodies/AddWaterBodyForm";

export default async function WaterBodiesPage() {
  const waterBodies = await prisma.waterBody.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const activeOHTs = waterBodies.filter(w => w.type.includes('Tank') && w.status === 'ACTIVE').length;
  const needsMaintenance = waterBodies.filter(w => w.status === 'NEEDS_MAINTENANCE').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Water Bodies</h1>
            <p className="text-slate-500 mt-1">Status and maintenance of lakes, ponds, and public water tanks.</p>
          </div>
        </div>
        <AddWaterBodyForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Water Bodies", value: waterBodies.length, text: "Maintained by Panchayat" },
          { label: "Active OHTs", value: activeOHTs, text: "Supplying water" },
          { label: "Needs Maintenance", value: needsMaintenance, text: "Requires attention" },
          { label: "Water Quality Check", value: "98%", text: "Passed this month" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-teal-950 mb-2">{stat.value}</h3>
            <p className="text-xs text-slate-400">{stat.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-teal-950">Water Infrastructure Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Name / Type</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Capacity</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Maintenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {waterBodies.map(wb => (
                <tr key={wb.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{wb.name}</p>
                    <p className="text-xs text-slate-500">{wb.type}</p>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-1 text-slate-600"><MapPin className="w-3 h-3"/> Ward {wb.wardNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{wb.capacity}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      wb.status === 'NEEDS_MAINTENANCE' ? 'bg-red-50 text-red-700' : 
                      wb.status === 'INACTIVE' ? 'bg-slate-100 text-slate-600' :
                      'bg-teal-50 text-teal-700'
                    }`}>
                      {wb.status === 'NEEDS_MAINTENANCE' ? <><AlertTriangle className="w-3 h-3 mr-1" /> Needs Desilting</> : 
                       wb.status === 'INACTIVE' ? 'Inactive' :
                       <><Activity className="w-3 h-3 mr-1" /> Active</>}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {wb.lastMaintenance ? new Date(wb.lastMaintenance).toLocaleDateString() : 'No record'}
                  </td>
                </tr>
              ))}
              {waterBodies.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No water bodies recorded yet. Click "Add Water Body" to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
