import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CitizenSidebar } from "@/components/layout/CitizenSidebar";

export default async function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "CITIZEN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen antialiased font-sans bg-slate-50">
      <CitizenSidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-[260px]">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
