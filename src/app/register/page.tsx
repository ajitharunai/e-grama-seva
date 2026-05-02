"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck, Lock } from "lucide-react";
import { registerCitizen } from "@/app/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
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

    const res = await registerCitizen({
      aadhaar: formData.aadhaar,
      dob: formData.dob,
      passwordRaw: formData.password,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccess(res.message || "Registration successful!");
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
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-600/20">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Citizen Registration
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Verify your identity to create your portal password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-100">
          
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
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Must match the exact DOB registered in Panchayat records.</p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-600" />
                Create Password
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
            
            <div className="text-center">
              <a href="/login" className="text-sm text-teal-600 hover:text-teal-500 font-medium">
                Already registered? Go to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
