"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addComplaint(data: {
  citizenId: string; // The UUID of the citizen from DB
  category: string;
  description: string;
  wardNumber: string;
  priority: string;
}) {
  try {
    // Generate a unique complaint ID like COMP-2024-XXXX
    const complaintId = `COMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const complaint = await prisma.complaint.create({
      data: {
        complaintId,
        category: data.category,
        description: data.description,
        wardNumber: data.wardNumber,
        priority: data.priority,
        citizenId: data.citizenId,
        status: "NEW",
      },
    });

    revalidatePath("/complaints");
    revalidatePath("/dashboard");
    
    return { success: true, data: complaint };
  } catch (error: any) {
    console.error("Failed to log complaint:", error);
    return { success: false, error: "Failed to log complaint. Please try again." };
  }
}

export async function updateComplaintStatus(id: string, newStatus: string) {
  try {
    const updated = await prisma.complaint.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/complaints");
    revalidatePath("/dashboard");
    
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Failed to update complaint status:", error);
    return { success: false, error: "Failed to update status." };
  }
}
