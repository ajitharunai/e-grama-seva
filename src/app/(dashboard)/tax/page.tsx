import { IndianRupee, TrendingUp, Download, Search, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AddTaxForm } from "@/components/tax/AddTaxForm";

export default async function TaxPage() {
  const taxRecords = await prisma.taxRecord.findMany({
    include: { citizen: true },
    orderBy: { paymentDate: 'desc' }
  });

  const citizens = await prisma.citizen.findMany({
    select: { id: true, fullName: true, citizenId: true },
    orderBy: { fullName: 'asc' }
  });

  const totalCollected = taxRecords.reduce((sum, record) => sum + record.collectedAmount, 0);
  const totalPending = taxRecords.reduce((sum, record) => sum + record.balanceDue, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Tax Collection</h1>
            <p className="text-slate-500 mt-1">Manage Property Tax, Water Tax, and Professional Tax records.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <AddTaxForm citizens={citizens} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl p-6 text-white shadow-lg shadow-teal-900/20">
          <p className="text-teal-100 text-sm font-medium mb-1">Total Collection</p>
          <h3 className="text-4xl font-bold mb-4 flex items-center">
            <IndianRupee className="w-8 h-8 mr-1 opacity-80" /> {totalCollected.toLocaleString()}
          </h3>
          <div className="flex items-center gap-2 text-sm text-teal-100">
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <span>Updated live</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Pending Dues</p>
            <h3 className="text-3xl font-bold text-orange-600 flex items-center">
              <IndianRupee className="w-6 h-6 mr-1" /> {totalPending.toLocaleString()}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-4">Calculated from total demands</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Collection Target</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-teal-950">
                {totalCollected + totalPending > 0 ? Math.round((totalCollected / (totalCollected + totalPending)) * 100) : 0}%
              </h3>
              <span className="text-sm text-slate-500 mb-1">achieved</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-teal-500 h-full rounded-full"
              style={{ width: `${totalCollected + totalPending > 0 ? (totalCollected / (totalCollected + totalPending)) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search receipt or citizen name..." 
              className="w-full pl-9 h-9 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-700 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Receipt No</th>
                <th className="px-6 py-4 font-medium">Citizen Name</th>
                <th className="px-6 py-4 font-medium">Property ID</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {taxRecords.map(record => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-medium text-slate-900">{record.receiptNumber || 'N/A'}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{record.citizen.fullName}</td>
                  <td className="px-6 py-4 text-slate-600">{record.propertyId}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{record.collectedAmount}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      record.balanceDue > 0 ? 'bg-orange-50 text-orange-700' : 'bg-teal-50 text-teal-700'
                    }`}>
                      {record.balanceDue > 0 ? 'Partial' : 'Paid'}
                    </span>
                  </td>
                </tr>
              ))}
              {taxRecords.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No tax records found
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
