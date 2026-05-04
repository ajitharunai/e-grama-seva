"use client";

import { Calendar, Clock, MapPin, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { updateMeetingStatus, deleteMeeting } from "@/app/actions/gram-sabha";
import { useState } from "react";

interface Meeting {
  id: string;
  topic: string;
  date: Date;
  time: string;
  venue: string;
  status: string;
  description: string | null;
}

export function MeetingList({ meetings, isAdmin = false }: { meetings: Meeting[], isAdmin?: boolean }) {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, status: string) => {
    setIsProcessing(id);
    await updateMeetingStatus(id, status);
    setIsProcessing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meeting schedule?")) return;
    setIsProcessing(id);
    await deleteMeeting(id);
    setIsProcessing(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).format(new Date(date));
  };

  return (
    <div className="space-y-4">
      {meetings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
          <Calendar className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No Meetings Scheduled</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-1">There are no Gram Sabha meetings currently scheduled for the village.</p>
        </div>
      ) : (
        meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex flex-col items-center justify-center text-orange-600 shrink-0 border border-orange-100">
                    <span className="text-[10px] font-bold uppercase">{new Date(meeting.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-black leading-none">{new Date(meeting.date).getDate()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        meeting.status === 'COMPLETED' ? 'bg-teal-100 text-teal-700' :
                        meeting.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{meeting.topic}</h3>
                    <p className="text-sm text-slate-500 mt-1">{meeting.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-slate-600">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>{meeting.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{formatDate(meeting.date)}</span>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                  {meeting.status === 'SCHEDULED' && (
                    <button 
                      onClick={() => handleStatusUpdate(meeting.id, 'COMPLETED')}
                      disabled={isProcessing === meeting.id}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg font-bold text-sm hover:bg-teal-600 hover:text-white transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Mark Completed
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(meeting.id)}
                    disabled={isProcessing === meeting.id}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Schedule"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
