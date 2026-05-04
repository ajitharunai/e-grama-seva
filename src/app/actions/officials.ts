"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addOfficial(data: {
  name: string;
  designation: string;
  wardNumber?: string;
  phoneNumber?: string;
  photoUrl?: string;
}) {
  try {
    const official = await prisma.villageOfficial.create({
      data: {
        name: data.name,
        designation: data.designation,
        wardNumber: data.wardNumber || null,
        phoneNumber: data.phoneNumber || null,
        photoUrl: data.photoUrl || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/citizen/statistics"); // Assuming officials are shown here
    return { success: true, data: official };
  } catch (error) {
    console.error("Failed to add official:", error);
    return { success: false, error: "Failed to add official details." };
  }
}

export async function getOfficials() {
  try {
    return await prisma.villageOfficial.findMany({
      orderBy: [
        { designation: "asc" }, // President first
        { wardNumber: "asc" }
      ]
    });
  } catch (error) {
    console.error("Failed to fetch officials:", error);
    return [];
  }
}

export async function deleteOfficial(id: string) {
  try {
    await prisma.villageOfficial.delete({
      where: { id }
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete official:", error);
    return { success: false, error: "Failed to delete official." };
  }
}
