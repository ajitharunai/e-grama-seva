"use client";

import { useState } from "react";
import { X, Calendar, Clock, MapPin, Plus } from "lucide-react";
import { scheduleMeeting } from "@/app/actions/gram-sabha";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ScheduleMeetingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await scheduleMeeting({
      ...formData,
      date: new Date(formData.date),
    });

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
      setFormData({ topic: "", date: "", time: "", venue: "", description: "" });
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-900/10"
      >
        <Plus className="w-4 h-4" /> Schedule Meeting
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Schedule Gram Sabha
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Meeting Topic / Agenda</label>
                  <Input 
                    placeholder="e.g. Annual Budget Discussion 2024"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                    <Input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                    <Input 
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Venue</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      className="pl-10"
                      placeholder="e.g. Panchayat Union Building"
                      value={formData.venue}
                      onChange={(e) => setFormData({...formData, venue: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Description (Optional)</label>
                  <textarea 
                    className="w-full p-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 min-h-[80px]"
                    placeholder="Provide meeting details or agenda items..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-900/10"
                >
                  {isLoading ? "Scheduling..." : "Schedule Meeting"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
