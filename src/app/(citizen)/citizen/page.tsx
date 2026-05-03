// Vercel Force Rebuild 1
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AlertCircle, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";

export default async function CitizenDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.role !== "CITIZEN") {
    return null;
  }

  // Auto-clear malformed cookies if the session ID didn't persist
  if (!session.user.id) {
    const { redirect } = await import("next/navigation");
    redirect("/api/auth/signout?callbackUrl=/login");
  }

  const citizen = await prisma.citizen.findUnique({
    where: { id: session.user.id },
    include: {
      taxes: {
        orderBy: { paymentDate: 'desc' }
      },
      complaints: {
        orderBy: { submittedDate: 'desc' }
      }
    }
  });

  if (!citizen) return <div>Citizen not found</div>;

  // Fetch village statistics
  const [totalCitizens, maleCitizens, femaleCitizens, totalHouseholds] = await Promise.all([
    prisma.citizen.count(),
    prisma.citizen.count({ where: { gender: 'Male' } }),
    prisma.citizen.count({ where: { gender: 'Female' } }),
    prisma.citizen.groupBy({
      by: ['houseNumber'],
      _count: true
    }).then(res => res.length)
  ]);

  const pendingTaxes = citizen.taxes.filter((t: any) => t.balanceDue > 0);
  const totalDue = pendingTaxes.reduce((sum: number, t: any) => sum + t.balanceDue, 0);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Hello, {citizen.fullName}</h1>
        <p className="text-teal-100 flex items-center gap-2 text-sm md:text-base">
          <MapPin className="w-4 h-4" /> Ward {citizen.wardNumber}, House {citizen.houseNumber}
        </p>
      </div>

      {/* Village Overview Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Citizens</p>
          <p className="text-2xl font-black text-teal-700">{totalCitizens.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Men</p>
          <p className="text-2xl font-black text-sky-600">{maleCitizens.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Women</p>
          <p className="text-2xl font-black text-pink-600">{femaleCitizens.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Households</p>
          <p className="text-2xl font-black text-amber-600">{totalHouseholds.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Taxes Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-teal-600" />
              Tax Dues
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${totalDue > 0 ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {totalDue > 0 ? 'Action Required' : 'All Clear'}
            </span>
          </div>

          {totalDue > 0 ? (
            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-orange-800 mb-1">Total Pending Amount</p>
              <h3 className="text-3xl font-black text-orange-600">₹{totalDue.toLocaleString()}</h3>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-emerald-700">No Pending Dues!</h3>
              <p className="text-sm text-emerald-600">Thank you for paying your taxes on time.</p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Recent Tax Records</h3>
            {citizen.taxes.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {citizen.taxes.map((tax: any) => (
                  <div key={tax.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-900">{tax.propertyId}</p>
                      <p className="text-xs text-slate-500">{tax.paymentDate ? new Date(tax.paymentDate).toLocaleDateString() : 'Unpaid'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">₹{tax.demandAmount}</p>
                      <p className="text-xs text-slate-500">
                        {tax.balanceDue > 0 ? <span className="text-orange-600">Due: ₹{tax.balanceDue}</span> : <span className="text-teal-600">Paid</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No tax records found.</p>
            )}
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-teal-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-teal-600" />
              My Complaints
            </h2>
            <Link href="/citizen/complaints/new" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              + New Complaint
            </Link>
          </div>

          <div className="space-y-4">
            {citizen.complaints.length > 0 ? (
              citizen.complaints.map(complaint => (
                <div key={complaint.id} className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {complaint.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      complaint.status === 'NEW' ? 'bg-red-50 text-red-700' :
                      complaint.status === 'IN_PROGRESS' ? 'bg-orange-50 text-orange-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{complaint.description}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    Submitted: {new Date(complaint.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500">You haven't filed any complaints yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
