"use client";

import { useState } from "react";
import { X, Settings2, BarChart3, School, Library } from "lucide-react";
import { updateEducationStats } from "@/app/actions/education";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function UpdateEducationStatsForm({ initialStats }: { initialStats: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    totalSchools: initialStats?.totalSchools?.toString() || "0",
    totalLibraries: initialStats?.totalLibraries?.toString() || "0",
    maleLiteracyRate: initialStats?.maleLiteracyRate?.toString() || "0",
    femaleLiteracyRate: initialStats?.femaleLiteracyRate?.toString() || "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await updateEducationStats({
      totalSchools: parseInt(formData.totalSchools),
      totalLibraries: parseInt(formData.totalLibraries),
      maleLiteracyRate: parseFloat(formData.maleLiteracyRate),
      femaleLiteracyRate: parseFloat(formData.femaleLiteracyRate),
    });

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="flex items-center gap-2 border-teal-200 text-teal-700 hover:bg-teal-50"
      >
        <Settings2 className="w-4 h-4" /> Update Village Stats
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                Update Village Stats
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <School className="w-3 h-3" /> Total Schools
                  </label>
                  <Input 
                    type="number"
                    value={formData.totalSchools}
                    onChange={(e) => setFormData({...formData, totalSchools: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Library className="w-3 h-3" /> Total Libraries
                  </label>
                  <Input 
                    type="number"
                    value={formData.totalLibraries}
                    onChange={(e) => setFormData({...formData, totalLibraries: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Literacy Rates (%)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Men Literacy</label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={formData.maleLiteracyRate}
                      onChange={(e) => setFormData({...formData, maleLiteracyRate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Women Literacy</label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={formData.femaleLiteracyRate}
                      onChange={(e) => setFormData({...formData, femaleLiteracyRate: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-3 border-t border-slate-100">
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
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-900/10"
                >
                  {isLoading ? "Updating..." : "Save Statistics"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
