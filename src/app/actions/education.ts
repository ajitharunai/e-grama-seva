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

export async function updateEducationStats(data: {
  totalSchools: number;
  totalLibraries: number;
  maleLiteracyRate: number;
  femaleLiteracyRate: number;
}) {
  try {
    const totalLiteracy = (data.maleLiteracyRate + data.femaleLiteracyRate) / 2;
    
    const stats = await prisma.educationStats.upsert({
      where: { id: "VILLAGE_STATS" },
      update: {
        totalSchools: data.totalSchools,
        totalLibraries: data.totalLibraries,
        maleLiteracyRate: data.maleLiteracyRate,
        femaleLiteracyRate: data.femaleLiteracyRate,
        totalLiteracyRate: totalLiteracy,
      },
      create: {
        id: "VILLAGE_STATS",
        totalSchools: data.totalSchools,
        totalLibraries: data.totalLibraries,
        maleLiteracyRate: data.maleLiteracyRate,
        femaleLiteracyRate: data.femaleLiteracyRate,
        totalLiteracyRate: totalLiteracy,
      },
    });

    revalidatePath("/education");
    return { success: true, data: stats };
  } catch (error) {
    console.error("Failed to update education stats:", error);
    return { success: false, error: "Failed to update statistics." };
  }
}

export async function getEducationStats() {
  try {
    const stats = await prisma.educationStats.findUnique({
      where: { id: "VILLAGE_STATS" }
    });
    
    if (!stats) {
      return {
        totalSchools: 0,
        totalLibraries: 0,
        maleLiteracyRate: 0,
        femaleLiteracyRate: 0,
        totalLiteracyRate: 0,
      };
    }
    
    return stats;
  } catch (error) {
    console.error("Failed to fetch education stats:", error);
    return null;
  }
}

export async function addSchool(data: {
  name: string;
  type: string;
  wardNumber: string;
  address: string;
  studentCount: number;
  teacherCount: number;
}) {
  try {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        type: data.type,
        wardNumber: data.wardNumber,
        address: data.address,
        studentCount: data.studentCount,
        teacherCount: data.teacherCount,
      },
    });

    revalidatePath("/education");
    return { success: true, data: school };
  } catch (error) {
    console.error("Failed to add school:", error);
    return { success: false, error: "Failed to add institution." };
  }
}

export async function getSchools() {
  try {
    return await prisma.school.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch schools:", error);
    return [];
  }
}

export async function addEducationUpdate(data: {
  title: string;
  description: string;
  date?: Date;
}) {
  try {
    const update = await prisma.educationUpdate.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date || new Date(),
      },
    });

    revalidatePath("/education");
    return { success: true, data: update };
  } catch (error) {
    console.error("Failed to add update:", error);
    return { success: false, error: "Failed to add update." };
  }
}

export async function getEducationUpdates() {
  try {
    return await prisma.educationUpdate.findMany({
      orderBy: { date: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch updates:", error);
    return [];
  }
}
