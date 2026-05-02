"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"CITIZEN" | "OFFICER">("CITIZEN");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        type: activeTab,
        identifier,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        if (activeTab === "OFFICER") {
          router.push("/");
        } else {
          router.push("/citizen");
        }
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-teal-950">
          E-Grama Seva
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Select your portal to log in
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => { setActiveTab("CITIZEN"); setIdentifier(""); setPassword(""); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "CITIZEN" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <UserCheck className="w-4 h-4" /> Citizen
            </button>
            <button
              onClick={() => { setActiveTab("OFFICER"); setIdentifier(""); setPassword(""); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "OFFICER" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Officer
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                {activeTab === "CITIZEN" ? "Aadhaar Number" : "Employee ID"}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-colors"
                  placeholder={activeTab === "CITIZEN" ? "12 Digit Aadhaar" : "e.g. EMP001"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" title="Go to forgot password page" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            
            {activeTab === "CITIZEN" && (
              <div className="text-center mt-4">
                <p className="text-sm text-slate-600">
                  Not registered yet?{" "}
                  <a href="/register" className="font-medium text-teal-600 hover:text-teal-500">
                    Register
                  </a>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
