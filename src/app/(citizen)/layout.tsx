import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CitizenLayoutWrapper } from "@/components/layout/CitizenLayoutWrapper";

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
    <CitizenLayoutWrapper userName={session.user.name ?? undefined}>
      {children}
    </CitizenLayoutWrapper>
  );
}
