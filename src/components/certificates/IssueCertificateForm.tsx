"use client";

import { useState, useEffect } from "react";
import { X, FileText, CheckCircle2 } from "lucide-react";
import { issueCertificate } from "@/app/actions/certificates";

export function IssueCertificateForm({ citizens }: { citizens: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    citizenId: "",
    type: "Income Certificate",
    purpose: "Education",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await issueCertificate(formData);

    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
      >
        <FileText className="w-4 h-4" />
        Issue Certificate
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                Issue New Certificate
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select Citizen</label>
                <select 
                  required
                  value={formData.citizenId}
                  onChange={(e) => setFormData({...formData, citizenId: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">-- Choose a Citizen --</option>
                  {citizens?.length === 0 && <option disabled>DEBUG: No citizens found in array</option>}
                  {citizens?.map(c => {
                    const totalBalance = c.taxes?.reduce((sum: number, t: any) => sum + (t.balanceDue || 0), 0) || 0;
                    const taxInfo = totalBalance > 0 ? ` [Due: ₹${totalBalance}]` : " [Clear]";
                    const displayName = c.fullName || "Unnamed Citizen";
                    const displayId = c.citizenId || c.id?.substring(0, 8);
                    return (
                      <option key={c.id} value={c.id}>
                        {displayName} ({displayId}) {taxInfo}
                      </option>
                    );
                  })}
                </select>
                {(!citizens || citizens.length === 0) && (
                  <p className="text-xs text-orange-600 mt-1">Note: No citizens registered in the system.</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Certificate Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>Income Certificate</option>
                  <option>Community Certificate</option>
                  <option>Nativity Certificate</option>
                  <option>First Graduate Certificate</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Purpose</label>
                <input 
                  type="text"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  placeholder="e.g. Higher Education, Job Application"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? "Issuing..." : "Issue Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
