"use client";

import { useState } from "react";
import { X, GraduationCap, Plus, Search } from "lucide-react";
import { addStudentRecord } from "@/app/actions/education";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AddStudentRecordForm({ citizens }: { citizens: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    citizenId: "",
    level: "SSLC",
    stream: "",
    institutionName: "",
    yearOfStudy: "",
    completionYear: "",
  });

  const filteredCitizens = citizens.filter(c => 
    c.fullName.toLowerCase().includes(search.toLowerCase()) || 
    c.citizenId.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.citizenId) {
      setError("Please select a citizen");
      return;
    }
    
    setIsLoading(true);
    setError("");

    const res = await addStudentRecord({
      ...formData,
      completionYear: formData.completionYear ? parseInt(formData.completionYear) : undefined,
    });

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
      setFormData({
        citizenId: "",
        level: "SSLC",
        stream: "",
        institutionName: "",
        yearOfStudy: "",
        completionYear: "",
      });
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Student Record
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                Add Student Record
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Search Citizen</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search name or ID..." 
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {search && filteredCitizens.length > 0 && (
                  <div className="mt-2 border border-slate-100 rounded-lg overflow-hidden divide-y divide-slate-100 shadow-sm bg-slate-50">
                    {filteredCitizens.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, citizenId: c.id});
                          setSearch(c.fullName);
                        }}
                        className={`w-full p-2 text-left text-sm hover:bg-teal-50 transition-colors flex items-center justify-between ${formData.citizenId === c.id ? 'bg-teal-50' : ''}`}
                      >
                        <span>{c.fullName}</span>
                        <span className="text-xs text-slate-400">{c.citizenId}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select 
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value, stream: ""})}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                  >
                    <option value="SSLC">SSLC</option>
                    <option value="HSC">HSC</option>
                    <option value="COLLEGE">College</option>
                  </select>
                </div>

                {formData.level === "COLLEGE" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Stream</label>
                    <select 
                      value={formData.stream}
                      onChange={(e) => setFormData({...formData, stream: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                      required
                    >
                      <option value="">Select Stream</option>
                      <option value="Arts and Science">Arts and Science</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Law">Law</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Institution Name</label>
                <Input 
                  required
                  value={formData.institutionName}
                  onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                  placeholder="e.g. Govt Higher Secondary School"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Year of Study</label>
                  <Input 
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
                    placeholder="e.g. 1st Year, 10th Standard"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Exp. Completion Year</label>
                  <Input 
                    type="number"
                    value={formData.completionYear}
                    onChange={(e) => setFormData({...formData, completionYear: e.target.value})}
                    placeholder="e.g. 2027"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
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
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {isLoading ? "Adding..." : "Save Record"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
