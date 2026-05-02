"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addComplaint } from "@/app/actions/complaints";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";

export default function NewComplaintPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    category: "Road",
    description: "",
    wardNumber: "1", // Ideally this could be pre-filled from the session or citizen profile, but we allow selection for now
    priority: "MEDIUM",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setError("You must be logged in to submit a complaint.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const res = await addComplaint({
      citizenId: session.user.id,
      category: formData.category,
      description: formData.description,
      wardNumber: formData.wardNumber,
      priority: formData.priority,
    });

    setIsSubmitting(false);

    if (res.success) {
      router.push("/citizen");
      router.refresh(); // Ensure the dashboard updates
    } else {
      setError(res.error || "Failed to submit complaint.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-slate-500 hover:text-teal-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">File a New Complaint</h1>
            <p className="text-sm text-slate-500">Report an issue in your ward directly to the Panchayat.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select 
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
              >
                <option value="Road">Road & Transport</option>
                <option value="Water">Water Supply</option>
                <option value="Electricity">Electricity & Lighting</option>
                <option value="Sanitation">Sanitation & Garbage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Ward Number</label>
              <select 
                name="wardNumber"
                required
                value={formData.wardNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={String(i+1)}>Ward {i+1}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Priority Level</label>
            <div className="flex gap-4">
              {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="priority" 
                    value={p}
                    checked={formData.priority === p}
                    onChange={handleChange}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-slate-700 capitalize">{p.toLowerCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Detailed Description</label>
            <textarea 
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide specific details about the issue..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Complaint
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
