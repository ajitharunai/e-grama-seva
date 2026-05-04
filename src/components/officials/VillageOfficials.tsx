"use client";

import { User, Phone, MapPin, ShieldCheck, Trash2 } from "lucide-react";
import { deleteOfficial } from "@/app/actions/officials";
import { useState } from "react";

interface Official {
  id: string;
  name: string;
  designation: string;
  wardNumber: string | null;
  phoneNumber: string | null;
  photoUrl: string | null;
}

export function VillageOfficials({ officials, isAdmin = false }: { officials: Official[], isAdmin?: boolean }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this official?")) return;
    
    setIsDeleting(id);
    await deleteOfficial(id);
    setIsDeleting(null);
  };

  const president = officials.find(o => o.designation === "President");
  const wardMembers = officials.filter(o => o.designation !== "President");

  return (
    <div className="space-y-8">
      {/* President Section */}
      {president && (
        <div className="bg-white rounded-2xl p-8 border border-teal-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <ShieldCheck className="w-12 h-12 text-teal-500/10" />
          </div>

          {isAdmin && (
            <button 
              onClick={() => handleDelete(president.id)}
              disabled={isDeleting === president.id}
              className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-20"
              title="Delete Official"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-teal-50 border-4 border-white shadow-lg">
              {president.photoUrl ? (
                <img 
                  src={president.photoUrl} 
                  alt={president.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-teal-600">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left space-y-2">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full uppercase tracking-widest">
                Panchayat Thalaivar
              </span>
              <h2 className="text-3xl font-bold text-teal-950">{president.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 text-sm">
                {president.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>{president.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Village Head Office</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ward Members Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wardMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
            {isAdmin && (
              <button 
                onClick={() => handleDelete(member.id)}
                disabled={isDeleting === member.id}
                className="absolute top-3 right-3 p-1.5 bg-red-50 text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-20"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                {member.photoUrl ? (
                  <img 
                    src={member.photoUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full uppercase">
                    Ward {member.wardNumber}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 truncate">{member.name}</h3>
                {member.phoneNumber && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                    <Phone className="w-3 h-3" />
                    <span>{member.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
