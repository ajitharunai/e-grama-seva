import { GraduationCap, BookOpen, Users, School, TrendingUp, Search, Filter, Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AddStudentRecordForm } from "@/components/education/AddStudentRecordForm";

export default async function EducationPage() {
  const citizens = await prisma.citizen.findMany({
    select: { id: true, fullName: true, citizenId: true },
    orderBy: { fullName: "asc" }
  });

  const studentRecords = await prisma.studentRecord.findMany({
    include: {
      citizen: {
        select: {
          fullName: true,
          citizenId: true,
          photoUrl: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const sslcRecords = studentRecords.filter(r => r.level === 'SSLC');
  const hscRecords = studentRecords.filter(r => r.level === 'HSC');
  const collegeRecords = studentRecords.filter(r => r.level === 'COLLEGE');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Education Records</h1>
            <p className="text-slate-500 mt-1">Village student enrollment and educational records tracking.</p>
          </div>
        </div>
        <AddStudentRecordForm citizens={citizens} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Students", value: studentRecords.length.toString(), icon: Users, color: "teal" },
          { label: "SSLC Level", value: sslcRecords.length.toString(), icon: BookOpen, color: "orange" },
          { label: "HSC Level", value: hscRecords.length.toString(), icon: BookOpen, color: "teal" },
          { label: "College Level", value: collegeRecords.length.toString(), icon: GraduationCap, color: "orange" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className={`p-3 ${stat.color === 'teal' ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-600'} rounded-lg w-fit mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {/* College Students Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-teal-950 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              College Students Registry
            </h2>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-500">
                {collegeRecords.length} Students
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50/30 border-b border-slate-100 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Stream / Category</th>
                  <th className="px-6 py-4 font-medium">Institution</th>
                  <th className="px-6 py-4 font-medium">Year</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {collegeRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {record.citizen.photoUrl ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={record.citizen.photoUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">
                            {record.citizen.fullName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{record.citizen.fullName}</p>
                          <p className="text-[10px] text-slate-500">{record.citizen.citizenId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        record.stream === 'Engineering' ? 'bg-blue-50 text-blue-700' :
                        record.stream === 'Medicine' ? 'bg-red-50 text-red-700' :
                        record.stream === 'Law' ? 'bg-slate-100 text-slate-700' :
                        'bg-teal-50 text-teal-700'
                      }`}>
                        {record.stream}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{record.institutionName}</td>
                    <td className="px-6 py-4 text-slate-600">{record.yearOfStudy}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-teal-600 hover:text-teal-800 font-medium">View</button>
                    </td>
                  </tr>
                ))}
                {collegeRecords.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">No college students registered.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* School Students Section (SSLC & HSC) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-md font-bold text-teal-950">HSC Students (11th & 12th)</h2>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-500">
                {hscRecords.length} Students
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
              {hscRecords.map(record => (
                <div key={record.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-100 text-orange-700 flex items-center justify-center text-[10px] font-bold">
                      {record.citizen.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{record.citizen.fullName}</p>
                      <p className="text-[10px] text-slate-500">{record.institutionName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">{record.yearOfStudy}</span>
                </div>
              ))}
              {hscRecords.length === 0 && <p className="p-8 text-center text-sm text-slate-400 italic">No HSC students registered.</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-md font-bold text-teal-950">SSLC Students (10th)</h2>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-500">
                {sslcRecords.length} Students
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
              {sslcRecords.map(record => (
                <div key={record.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">
                      {record.citizen.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{record.citizen.fullName}</p>
                      <p className="text-[10px] text-slate-500">{record.institutionName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">{record.yearOfStudy}</span>
                </div>
              ))}
              {sslcRecords.length === 0 && <p className="p-8 text-center text-sm text-slate-400 italic">No SSLC students registered.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
