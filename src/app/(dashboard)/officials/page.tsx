import { ShieldCheck, Users } from "lucide-react";
import { getOfficials } from "@/app/actions/officials";
import { VillageOfficials } from "@/components/officials/VillageOfficials";
import { AddOfficialForm } from "@/components/officials/AddOfficialForm";

export default async function OfficialsPage() {
  const officials = await getOfficials();

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Village Governance</h1>
            <p className="text-slate-500 mt-1">Manage Panchayat President and Ward Member details.</p>
          </div>
        </div>
        <AddOfficialForm />
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
        <VillageOfficials officials={officials} />
      </div>
    </div>
  );
}
