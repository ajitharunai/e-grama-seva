import { AddCitizenForm } from "@/components/citizens/AddCitizenForm";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddCitizenPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Register Citizen</h1>
            <p className="text-slate-500 mt-1">Add a new resident to the Gram Panchayat database.</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="pt-4">
        <AddCitizenForm />
      </div>
    </div>
  );
}
