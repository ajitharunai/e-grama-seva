import { FileText, CheckCircle2, Clock, XCircle, Search, Filter, Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { IssueCertificateForm } from "@/components/certificates/IssueCertificateForm";

export const dynamic = 'force-dynamic';

export default async function CertificatesPage() {
  const applications = await prisma.certificateApplication.findMany({
    include: { citizen: true },
    orderBy: { appliedDate: 'desc' }
  });

  const citizens = await prisma.citizen.findMany({
    orderBy: { fullName: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Certificate Issuance</h1>
            <p className="text-slate-500 mt-1">Process and issue Income, Community, and Nativity certificates.</p>
          </div>
        </div>
        <IssueCertificateForm citizens={citizens} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Pending Approval</p>
            <h3 className="text-3xl font-bold text-orange-600">
              {applications.filter(a => a.status === 'PENDING').length}
            </h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-full text-orange-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Issued</p>
            <h3 className="text-3xl font-bold text-teal-600">
              {applications.filter(a => a.status === 'ISSUED').length}
            </h3>
          </div>
          <div className="p-3 bg-teal-50 rounded-full text-teal-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Rejected</p>
            <h3 className="text-3xl font-bold text-red-600">
              {applications.filter(a => a.status === 'REJECTED').length}
            </h3>
          </div>
          <div className="p-3 bg-red-50 rounded-full text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search application ID or Name..." 
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
                <th className="px-6 py-4 font-medium">Application ID</th>
                <th className="px-6 py-4 font-medium">Citizen ID</th>
                <th className="px-6 py-4 font-medium">Citizen Name</th>
                <th className="px-6 py-4 font-medium">Certificate Type</th>
                <th className="px-6 py-4 font-medium">Date Applied</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-slate-900">
                      APP-{app.id.substring(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{app.citizen.citizenId}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{app.citizen.fullName}</td>
                    <td className="px-6 py-4 text-slate-600">{app.type}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'ISSUED' ? 'bg-teal-50 text-teal-700' :
                        app.status === 'REJECTED' ? 'bg-red-50 text-red-700' :
                        'bg-orange-50 text-orange-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {app.status === 'ISSUED' ? (
                        <button className="flex items-center justify-end gap-1 text-slate-500 hover:text-teal-700 font-medium text-xs ml-auto">
                          <Download className="w-3 h-3" /> Download
                        </button>
                      ) : (
                        <button className="text-teal-600 hover:text-teal-800 font-medium text-xs">Review</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No certificate applications found.
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
