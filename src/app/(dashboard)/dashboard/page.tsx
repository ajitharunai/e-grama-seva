import { prisma } from "@/lib/prisma";
import { Users, FileText, AlertTriangle, IndianRupee, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  // Fetch stats from Prisma
  const [citizenCount, complaintCount, certificateCount, taxCount] = await Promise.all([
    prisma.citizen.count(),
    prisma.complaint.count(),
    prisma.certificateApplication.count(),
    prisma.taxRecord.count(),
  ]);

  // Fetch recent activity
  const [recentComplaints, recentTaxes] = await Promise.all([
    prisma.complaint.findMany({ take: 3, orderBy: { submittedDate: 'desc' } }),
    prisma.taxRecord.findMany({ take: 2, orderBy: { paymentDate: 'desc' }, include: { citizen: true } }),
  ]);

  const stats = [
    { label: "Total Citizens", value: citizenCount.toString(), icon: Users, color: "bg-teal-100 text-teal-700" },
    { label: "Pending Complaints", value: complaintCount.toString(), icon: AlertTriangle, color: "bg-orange-100 text-orange-700" },
    { label: "Certificates Issued", value: certificateCount.toString(), icon: FileText, color: "bg-blue-100 text-blue-700" },
    { label: "Tax Records", value: taxCount.toString(), icon: IndianRupee, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-teal-950 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">Welcome back. Here's what's happening in your village today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-teal-950">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-teal-950">Recent Activity</h2>
            <Link href="/reports" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentComplaints.map(c => (
              <div key={c.id} className="flex items-start gap-4 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{c.category}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{c.description}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{new Date(c.submittedDate).toLocaleDateString()}</span>
              </div>
            ))}
            {recentTaxes.map(t => (
              <div key={t.id} className="flex items-start gap-4 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Tax Received from {t.citizen.fullName}</p>
                  <p className="text-xs text-slate-500">Receipt: {t.receiptNumber || 'N/A'}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400">₹{t.collectedAmount}</span>
              </div>
            ))}
            {recentComplaints.length === 0 && recentTaxes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <FileText className="w-12 h-12 mb-3 text-slate-200" />
                <p>No recent activity found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-teal-950 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/citizens/add" className="block w-full text-left px-4 py-3 rounded-lg bg-teal-50 text-teal-700 font-medium hover:bg-teal-100 transition-colors">
                + Register New Citizen
              </Link>
              <Link href="/complaints" className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 text-orange-700 font-medium hover:bg-orange-100 transition-colors">
                + Manage Complaints
              </Link>
              <Link href="/certificates" className="block w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
                + Issue Certificate
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            <h3 className="font-bold mb-2">Panchayat Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Access administrative guidelines and government directives for village officers.
            </p>
            <button className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors">
              Read Documentation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
