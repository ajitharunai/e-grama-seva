import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AddComplaintForm } from "@/components/complaints/AddComplaintForm";
import { ComplaintStatusUpdater } from "@/components/complaints/ComplaintStatusUpdater";

export default async function ComplaintsPage() {
  const complaints = await prisma.complaint.findMany({
    include: { citizen: true },
    orderBy: { submittedDate: 'desc' }
  });

  const citizens = await prisma.citizen.findMany({
    select: { id: true, fullName: true, citizenId: true },
    orderBy: { fullName: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Complaints & Grievances</h1>
            <p className="text-slate-500 mt-1">Manage, assign, and resolve citizen issues.</p>
          </div>
        </div>
        
        <AddComplaintForm citizens={citizens} />
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Open Complaints */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Open
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-xs font-medium text-slate-600">
              {complaints.filter(c => c.status === 'NEW').length}
            </span>
          </div>
          
          <div className="space-y-3">
            {complaints.filter(c => c.status === 'NEW').map(complaint => (
              <div key={complaint.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                    complaint.priority === 'HIGH' ? 'text-red-600 bg-red-50' : 
                    complaint.priority === 'MEDIUM' ? 'text-orange-600 bg-orange-50' : 
                    'text-teal-600 bg-teal-50'
                  }`}>
                    {complaint.priority} Priority
                  </span>
                  <ComplaintStatusUpdater complaintId={complaint.id} currentStatus={complaint.status} />
                </div>
                <h4 className="font-medium text-teal-950 mb-1">{complaint.category} (Ward {complaint.wardNumber})</h4>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{complaint.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(complaint.submittedDate).toLocaleDateString()}</span>
                  <span className="font-medium text-teal-700">{complaint.citizen.fullName}</span>
                </div>
              </div>
            ))}
            {complaints.filter(c => c.status === 'NEW').length === 0 && (
              <div className="text-center p-4 text-sm text-slate-400">No open complaints</div>
            )}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              In Progress
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-xs font-medium text-slate-600">
              {complaints.filter(c => c.status === 'IN_PROGRESS').length}
            </span>
          </div>
          
          <div className="space-y-3">
            {complaints.filter(c => c.status === 'IN_PROGRESS').map(complaint => (
              <div key={complaint.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                    complaint.priority === 'HIGH' ? 'text-red-600 bg-red-50' : 
                    complaint.priority === 'MEDIUM' ? 'text-orange-600 bg-orange-50' : 
                    'text-teal-600 bg-teal-50'
                  }`}>
                    {complaint.priority} Priority
                  </span>
                  <ComplaintStatusUpdater complaintId={complaint.id} currentStatus={complaint.status} />
                </div>
                <h4 className="font-medium text-teal-950 mb-1">Ward {complaint.wardNumber}</h4>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{complaint.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-orange-600 font-medium">Being Addressed</span>
                </div>
              </div>
            ))}
            {complaints.filter(c => c.status === 'IN_PROGRESS').length === 0 && (
              <div className="text-center p-4 text-sm text-slate-400">No complaints in progress</div>
            )}
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Resolved
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-xs font-medium text-slate-600">
              {complaints.filter(c => c.status === 'RESOLVED').length}
            </span>
          </div>

          <div className="space-y-3">
            {complaints.filter(c => c.status === 'RESOLVED').map(complaint => (
              <div key={complaint.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm opacity-60">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-1 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Closed
                  </span>
                  <ComplaintStatusUpdater complaintId={complaint.id} currentStatus={complaint.status} />
                </div>
                <h4 className="font-medium text-slate-700 mb-1 line-through">{complaint.category}</h4>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{complaint.description}</p>
              </div>
            ))}
            {complaints.filter(c => c.status === 'RESOLVED').length === 0 && (
              <div className="text-center p-4 text-sm text-slate-400">No resolved complaints</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
