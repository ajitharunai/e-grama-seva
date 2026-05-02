"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, X, MapPin, Calendar, Phone, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/Input";

type Citizen = {
  id: string;
  citizenId: string;
  fullName: string;
  aadhaar: string;
  dob: Date;
  gender: string;
  mobileNumber: string | null;
  wardNumber: string;
  address?: string; // Derived or not explicitly in schema but houseNumber is
  houseNumber: string;
  caste: string | null;
  annualIncome: number;
};

export function CitizensTable({ initialData }: { initialData: Citizen[] }) {
  const [search, setSearch] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);

  const filteredData = initialData.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.citizenId.toLowerCase().includes(search.toLowerCase()) ||
      c.aadhaar.includes(search)
  );

  return (
    <div className="flex relative">
      {/* Main Table Area */}
      <div className={`flex-1 transition-all duration-300 ${selectedCitizen ? 'lg:mr-80' : ''}`}>
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by Name, ID, or Aadhaar..." 
              className="pl-9 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-700 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Citizen Details</th>
                <th className="px-6 py-4 font-medium">Citizen ID</th>
                <th className="px-6 py-4 font-medium">Aadhaar</th>
                <th className="px-6 py-4 font-medium">Ward</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No citizens found matching your search.
                  </td>
                </tr>
              ) : (
                filteredData.map((citizen) => (
                  <tr 
                    key={citizen.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCitizen(citizen)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                          {citizen.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{citizen.fullName}</p>
                          <p className="text-xs text-slate-500">{citizen.gender} • {new Date(citizen.dob).getFullYear()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{citizen.citizenId}</td>
                    <td className="px-6 py-4 text-slate-600">
                      •••• •••• {citizen.aadhaar.slice(-4)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                        Ward {citizen.wardNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Simple Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Showing {filteredData.length} entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Slide-out Details Pane */}
      {selectedCitizen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-100 shadow-2xl z-20 transform transition-transform duration-300 overflow-y-auto pt-16">
          <div className="p-6">
            <button 
              onClick={() => setSelectedCitizen(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center mt-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-3xl mb-4 shadow-inner">
                {selectedCitizen.fullName.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-teal-950">{selectedCitizen.fullName}</h2>
              <p className="text-sm text-slate-500 font-mono mt-1">{selectedCitizen.citizenId}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Identity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-4 h-4 text-teal-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Aadhaar Number</p>
                      <p className="text-sm font-medium text-slate-900">{selectedCitizen.aadhaar}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-teal-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Date of Birth</p>
                      <p className="text-sm font-medium text-slate-900">{new Date(selectedCitizen.dob).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Contact & Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Mobile Number</p>
                      <p className="text-sm font-medium text-slate-900">{selectedCitizen.mobileNumber || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Address</p>
                      <p className="text-sm font-medium text-slate-900">{selectedCitizen.houseNumber}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Ward {selectedCitizen.wardNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-sm font-medium transition-colors">
                Edit Details
              </button>
              <button className="px-4 py-2 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg text-sm font-medium transition-colors">
                Issue Cert.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {selectedCitizen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setSelectedCitizen(null)}
        />
      )}
    </div>
  );
}
