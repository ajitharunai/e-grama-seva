"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function issueCertificate(data: {
  citizenId: string;
  type: string;
  purpose: string;
}) {
  try {
    const application = await prisma.certificateApplication.create({
      data: {
        type: data.type,
        purpose: data.purpose,
        status: "ISSUED", // Direct issuance by admin
        citizenId: data.citizenId,
        issuedDate: new Date(),
      },
    });

    revalidatePath("/certificates");
    revalidatePath("/dashboard");
    
    return { success: true, data: application };
  } catch (error: any) {
    console.error("Failed to issue certificate:", error);
    return { success: false, error: "Failed to issue certificate. Please try again." };
  }
}

export async function updateCertificateStatus(id: string, status: string) {
  try {
    const updated = await prisma.certificateApplication.update({
      where: { id },
      data: { 
        status,
        issuedDate: status === "ISSUED" ? new Date() : null
      },
    });

    revalidatePath("/certificates");
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Failed to update certificate status:", error);
    return { success: false, error: "Failed to update status." };
  }
}
