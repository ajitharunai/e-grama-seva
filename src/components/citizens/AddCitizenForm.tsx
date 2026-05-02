"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { addCitizen } from "@/app/actions/citizen";
import { CheckCircle2, ChevronRight, ChevronLeft, User, MapPin, Briefcase } from "lucide-react";

export function AddCitizenForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phoneNumber: "",
    wardNumber: "",
    casteCategory: "",
    annualIncome: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    
    const res = await addCitizen({
      ...formData,
      wardNumber: parseInt(formData.wardNumber, 10),
      annualIncome: formData.annualIncome ? parseFloat(formData.annualIncome) : undefined,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setError(res.error || "An error occurred");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-teal-950 mb-2">Citizen Registered!</h2>
        <p className="text-slate-500">The citizen profile has been successfully created.</p>
        <p className="text-sm text-slate-400 mt-4">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Progress Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 z-0 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          
          {[
            { num: 1, label: "Personal", icon: User },
            { num: 2, label: "Location", icon: MapPin },
            { num: 3, label: "Details", icon: Briefcase },
            { num: 4, label: "Review", icon: CheckCircle2 }
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step >= s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-teal-600 text-white shadow-md shadow-teal-900/20' : 'bg-slate-200 text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-teal-800' : 'text-slate-400'}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-teal-950 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Number <span className="text-red-500">*</span></label>
                  <Input name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="12-digit Aadhaar" maxLength={12} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per Aadhaar" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                  <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender <span className="text-red-500">*</span></label>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-teal-950 mb-6">Location & Contact</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Residential Address <span className="text-red-500">*</span></label>
                  <Input name="address" value={formData.address} onChange={handleChange} placeholder="Door No, Street Name" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ward Number <span className="text-red-500">*</span></label>
                    <Input type="number" name="wardNumber" value={formData.wardNumber} onChange={handleChange} placeholder="e.g. 4" min={1} max={15} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="10-digit Mobile" maxLength={10} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Socio-Economic */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-teal-950 mb-6">Socio-Economic Details (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Caste Category</label>
                  <select 
                    name="casteCategory" 
                    value={formData.casteCategory} 
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="">Select Category</option>
                    <option value="GENERAL">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Annual Family Income (₹)</label>
                  <Input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} placeholder="e.g. 150000" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-teal-950 mb-6">Review Information</h3>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Full Name</p>
                    <p className="font-medium text-slate-900">{formData.fullName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Aadhaar</p>
                    <p className="font-medium text-slate-900">{formData.aadhaarNumber || "-"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Date of Birth</p>
                    <p className="font-medium text-slate-900">{formData.dateOfBirth || "-"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Ward Number</p>
                    <p className="font-medium text-slate-900">Ward {formData.wardNumber || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-500 mb-1">Address</p>
                    <p className="font-medium text-slate-900">{formData.address || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={step === 1 || isLoading}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          
          {step < 4 ? (
            <Button 
              variant="primary" 
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-white border-transparent"
            >
              {isLoading ? "Submitting..." : "Confirm & Register"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
