"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function scheduleMeeting(data: {
  topic: string;
  date: Date;
  time: string;
  venue: string;
  description?: string;
}) {
  try {
    const meeting = await prisma.gramSabhaMeeting.create({
      data: {
        topic: data.topic,
        date: data.date,
        time: data.time,
        venue: data.venue,
        description: data.description,
        status: "SCHEDULED",
      },
    });

    revalidatePath("/gram-sabha");
    revalidatePath("/citizen/gram-sabha");
    return { success: true, data: meeting };
  } catch (error) {
    console.error("Failed to schedule meeting:", error);
    return { success: false, error: "Failed to schedule meeting." };
  }
}

export async function getMeetings() {
  try {
    return await prisma.gramSabhaMeeting.findMany({
      orderBy: { date: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch meetings:", error);
    return [];
  }
}

export async function updateMeetingStatus(id: string, status: string) {
  try {
    await prisma.gramSabhaMeeting.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/gram-sabha");
    return { success: true };
  } catch (error) {
    console.error("Failed to update meeting:", error);
    return { success: false, error: "Failed to update meeting." };
  }
}

export async function deleteMeeting(id: string) {
  try {
    await prisma.gramSabhaMeeting.delete({
      where: { id }
    });
    revalidatePath("/gram-sabha");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete meeting:", error);
    return { success: false, error: "Failed to delete meeting." };
  }
}
