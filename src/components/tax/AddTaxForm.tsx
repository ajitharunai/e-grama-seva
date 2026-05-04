"use client";

import { useState } from "react";
import { X, Receipt } from "lucide-react";
import { addTaxCollection } from "@/app/actions/tax";

export function AddTaxForm({ citizens }: { citizens: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    citizenId: "",
    propertyId: "",
    demandAmount: "",
    collectedAmount: "",
    paymentMode: "Cash",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await addTaxCollection({
      citizenId: formData.citizenId,
      propertyId: formData.propertyId,
      demandAmount: parseFloat(formData.demandAmount),
      collectedAmount: parseFloat(formData.collectedAmount),
      paymentMode: formData.paymentMode,
    });

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
      setFormData({
        citizenId: "",
        propertyId: "",
        demandAmount: "",
        collectedAmount: "",
        paymentMode: "Cash",
      });
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center h-10 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
      >
        <Receipt className="w-4 h-4 mr-2" />
        New Collection
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-teal-950">Record Tax Collection</h2>
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
                  {citizens?.map(c => {
                    const totalBalance = c.taxes?.reduce((sum: number, t: any) => sum + (t.balanceDue || 0), 0) || 0;
                    const taxInfo = totalBalance > 0 ? ` [Due: ₹${totalBalance}]` : " [Clear]";
                    return (
                      <option key={c.id} value={c.id}>
                        {c.fullName} ({c.citizenId}) {taxInfo}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Property / Assessment ID <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  name="propertyId"
                  value={formData.propertyId}
                  onChange={handleChange}
                  placeholder="e.g. PROP-2024-001"
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Demand Amount (₹) <span className="text-red-500">*</span></label>
                  <input 
                    type="number"
                    name="demandAmount"
                    value={formData.demandAmount}
                    onChange={handleChange}
                    min={0}
                    step={0.01}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Collected Amount (₹) <span className="text-red-500">*</span></label>
                  <input 
                    type="number"
                    name="collectedAmount"
                    value={formData.collectedAmount}
                    onChange={handleChange}
                    min={0}
                    step={0.01}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode <span className="text-red-500">*</span></label>
                <select 
                  name="paymentMode" 
                  value={formData.paymentMode} 
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online / UPI</option>
                  <option value="Cheque">Cheque</option>
                </select>
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
                  {isLoading ? "Saving..." : "Record Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
