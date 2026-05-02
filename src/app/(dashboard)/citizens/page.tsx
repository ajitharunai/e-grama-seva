import { prisma } from "@/lib/prisma";
import { CitizensTable } from "@/components/citizens/CitizensTable";
import { Users, Plus } from "lucide-react";
import Link from "next/link";

export default async function CitizensRegistryPage() {
  const citizens = await prisma.citizen.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Citizens Registry</h1>
            <p className="text-slate-500 mt-1">Manage and view all registered residents of the village.</p>
          </div>
        </div>
        
        <Link 
          href="/citizens/add"
          className="inline-flex items-center justify-center h-10 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Register Citizen
        </Link>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <CitizensTable initialData={citizens} />
      </div>
    </div>
  );
}
