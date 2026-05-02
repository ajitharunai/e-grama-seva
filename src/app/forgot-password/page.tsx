"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck, Lock, Phone } from "lucide-react";
import { resetPasswordCitizen } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"CITIZEN" | "OFFICER">("CITIZEN");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    aadhaar: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    const res = await resetPasswordCitizen({
      aadhaar: formData.aadhaar,
      dob: formData.dob,
      passwordRaw: formData.password,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccess(res.message || "Password reset successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(res.error || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Choose your account type to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-100">
          
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => { setActiveTab("CITIZEN"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "CITIZEN" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <UserCheck className="w-4 h-4" /> Citizen
            </button>
            <button
              onClick={() => { setActiveTab("OFFICER"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "OFFICER" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Officer
            </button>
          </div>

          {activeTab === "CITIZEN" ? (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-teal-50 text-teal-700 rounded-lg text-sm border border-teal-100 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 mt-0.5" />
                  <span>{success} Redirecting to login...</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="aadhaar" className="block text-sm font-medium text-slate-700">
                    Aadhaar Number (12 Digits)
                  </label>
                  <div className="mt-1">
                    <input
                      id="aadhaar"
                      name="aadhaar"
                      type="text"
                      required
                      value={formData.aadhaar}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="e.g. 1234 5678 9012"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-slate-700">
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      required
                      value={formData.dob}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-600" />
                    New Password
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? "Verifying..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Officer Password Reset</h3>
              <p className="text-sm text-slate-600 mb-6 px-4">
                For security reasons, Officer passwords can only be reset by the System Administrator.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 inline-flex flex-col gap-2">
                <div className="flex items-center gap-2 text-teal-700 font-medium">
                  <Phone className="w-4 h-4" />
                  <span>Call: 044-12345678</span>
                </div>
                <div className="text-xs text-slate-500">Panchayat IT Support (Mon-Fri)</div>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
