"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addStudentRecord(data: {
  citizenId: string;
  level: string;
  stream?: string;
  institutionName: string;
  yearOfStudy?: string;
  completionYear?: number;
}) {
  try {
    const studentRecord = await prisma.studentRecord.create({
      data: {
        citizenId: data.citizenId,
        level: data.level,
        stream: data.stream || null,
        institutionName: data.institutionName,
        yearOfStudy: data.yearOfStudy || null,
        completionYear: data.completionYear || null,
      },
    });

    revalidatePath("/education");
    revalidatePath("/dashboard");
    
    return { success: true, data: studentRecord };
  } catch (error: any) {
    console.error("Failed to add student record:", error);
    return { success: false, error: "Failed to add student record. Please try again." };
  }
}

export async function getStudentRecords() {
  try {
    return await prisma.studentRecord.findMany({
      include: {
        citizen: {
          select: {
            fullName: true,
            citizenId: true,
            photoUrl: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Failed to fetch student records:", error);
    return [];
  }
}
