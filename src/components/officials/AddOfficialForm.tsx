"use client";

import { useState } from "react";
import { X, Plus, User, Camera, Phone, MapPin } from "lucide-react";
import { addOfficial } from "@/app/actions/officials";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AddOfficialForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "Ward Member",
    wardNumber: "",
    phoneNumber: "",
    photoUrl: "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setFormData({ ...formData, photoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await addOfficial(formData);

    setIsLoading(false);

    if (res.success) {
      setIsOpen(false);
      setFormData({ name: "", designation: "Ward Member", wardNumber: "", phoneNumber: "", photoUrl: "" });
      setPhotoPreview(null);
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
      >
        <Plus className="w-4 h-4" /> Add Official
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-teal-950">Add Village Official</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-300" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                    <Camera className="w-6 h-6" />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Upload Photo</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <Input 
                    placeholder="e.g. Mr. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Designation</label>
                    <select 
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500"
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    >
                      <option value="President">President</option>
                      <option value="Ward Member">Ward Member</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Ward (if member)</label>
                    <Input 
                      placeholder="e.g. 1"
                      disabled={formData.designation === "President"}
                      value={formData.wardNumber}
                      onChange={(e) => setFormData({...formData, wardNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                  <Input 
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
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
                  {isLoading ? "Saving..." : "Save Details"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
