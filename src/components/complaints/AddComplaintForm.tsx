"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { addComplaint } from "@/app/actions/complaints";

export function AddComplaintForm({ citizens }: { citizens: { id: string, fullName: string, citizenId: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    citizenId: "",
    category: "",
    description: "",
    wardNumber: "",
    priority: "MEDIUM",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await addComplaint(formData);

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
      setFormData({
        citizenId: "",
        category: "",
        description: "",
        wardNumber: "",
        priority: "MEDIUM",
      });
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center h-10 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Log Complaint
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-teal-950">Log New Complaint</h2>
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Citizen <span className="text-red-500">*</span></label>
                <select 
                  name="citizenId" 
                  value={formData.citizenId} 
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                  required
                >
                  <option value="">-- Choose Citizen --</option>
                  {citizens.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.citizenId})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category <span className="text-red-500">*</span></label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Road Infrastructure">Road Infrastructure</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Electricity & Lighting">Electricity & Lighting</option>
                    <option value="Sanitation & Garbage">Sanitation & Garbage</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority <span className="text-red-500">*</span></label>
                  <select 
                    name="priority" 
                    value={formData.priority} 
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                    required
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ward Number <span className="text-red-500">*</span></label>
                <input 
                  type="number"
                  name="wardNumber"
                  value={formData.wardNumber}
                  onChange={handleChange}
                  min={1}
                  max={15}
                  placeholder="e.g. 4"
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe the issue in detail..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500 resize-none"
                  required
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  {isLoading ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
