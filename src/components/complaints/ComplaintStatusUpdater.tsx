"use client";

import { useTransition } from "react";
import { updateComplaintStatus } from "@/app/actions/complaints";

export function ComplaintStatusUpdater({ 
  complaintId, 
  currentStatus 
}: { 
  complaintId: string; 
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateComplaintStatus(complaintId, newStatus);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isPending}
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border-none outline-none cursor-pointer hover:opacity-80 transition-opacity ${
        currentStatus === 'NEW' ? 'bg-red-50 text-red-700' :
        currentStatus === 'IN_PROGRESS' ? 'bg-orange-50 text-orange-700' :
        'bg-teal-50 text-teal-700'
      } ${isPending ? 'opacity-50' : ''}`}
    >
      <option value="NEW">New (Open)</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="RESOLVED">Resolved</option>
    </select>
  );
}
