"use client";

import { useState } from "react";
import { X, Plus, School, Clock, MapPin, Users, UserCheck } from "lucide-react";
import { addSchool, addEducationUpdate } from "@/app/actions/education";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AddEducationMetaForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"SCHOOL" | "UPDATE">("SCHOOL");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [schoolData, setSchoolData] = useState({
    name: "",
    type: "Primary",
    wardNumber: "",
    address: "",
    studentCount: "",
    teacherCount: "",
  });

  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let res;
    if (type === "SCHOOL") {
      res = await addSchool({
        ...schoolData,
        studentCount: parseInt(schoolData.studentCount),
        teacherCount: parseInt(schoolData.teacherCount),
      });
    } else {
      res = await addEducationUpdate(updateData);
    }

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
      setSchoolData({ name: "", type: "Primary", wardNumber: "", address: "", studentCount: "", teacherCount: "" });
      setUpdateData({ title: "", description: "" });
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-900/10"
      >
        <Plus className="w-4 h-4" /> Add Detail
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-600" />
                Add Education Detail
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
                <button 
                  onClick={() => setType("SCHOOL")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${type === "SCHOOL" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  <School className="w-4 h-4" /> Institution
                </button>
                <button 
                  onClick={() => setType("UPDATE")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${type === "UPDATE" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  <Clock className="w-4 h-4" /> Recent Update
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                    {error}
                  </div>
                )}

                {type === "SCHOOL" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Institution Name</label>
                        <Input 
                          placeholder="e.g. Panchayat Union Primary School"
                          value={schoolData.name}
                          onChange={(e) => setSchoolData({...schoolData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                        <select 
                          className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                          value={schoolData.type}
                          onChange={(e) => setSchoolData({...schoolData, type: e.target.value})}
                        >
                          <option value="Primary">Primary</option>
                          <option value="Middle">Middle</option>
                          <option value="High School">High School</option>
                          <option value="Higher Sec.">Higher Sec.</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Ward Number</label>
                        <Input 
                          placeholder="e.g. 2"
                          value={schoolData.wardNumber}
                          onChange={(e) => setSchoolData({...schoolData, wardNumber: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Address / Street</label>
                        <Input 
                          placeholder="e.g. Main Street"
                          value={schoolData.address}
                          onChange={(e) => setSchoolData({...schoolData, address: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Student Count</label>
                        <Input 
                          type="number"
                          placeholder="210"
                          value={schoolData.studentCount}
                          onChange={(e) => setSchoolData({...schoolData, studentCount: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Teacher Count</label>
                        <Input 
                          type="number"
                          placeholder="12"
                          value={schoolData.teacherCount}
                          onChange={(e) => setSchoolData({...schoolData, teacherCount: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Update Title</label>
                        <Input 
                          placeholder="e.g. New computers installed"
                          value={updateData.title}
                          onChange={(e) => setUpdateData({...updateData, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                        <textarea 
                          className="w-full p-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500 min-h-[100px]"
                          placeholder="Provide details about this update..."
                          value={updateData.description}
                          onChange={(e) => setUpdateData({...updateData, description: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

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
                    {isLoading ? "Saving..." : "Add Record"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
