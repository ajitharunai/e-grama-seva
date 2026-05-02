"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addWaterBody(data: {
  name: string;
  type: string;
  wardNumber: string;
  capacity: string;
  status: string;
  lastMaintenance?: string;
}) {
  try {
    const waterBody = await prisma.waterBody.create({
      data: {
        name: data.name,
        type: data.type,
        wardNumber: data.wardNumber,
        capacity: data.capacity,
        status: data.status,
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : null,
      },
    });

    revalidatePath("/water-bodies");
    revalidatePath("/dashboard");
    
    return { success: true, data: waterBody };
  } catch (error: any) {
    console.error("Failed to add water body:", error);
    return { success: false, error: "Failed to record water body. Please try again." };
  }
}
