"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerCitizen(data: {
  aadhaar: string;
  dob: string;
  passwordRaw: string;
}) {
  try {
    // 1. Find the citizen by Aadhaar
    const citizen = await prisma.citizen.findUnique({
      where: { aadhaar: data.aadhaar },
    });

    // 2. If not found, they are not registered in the village
    if (!citizen) {
      return { success: false, error: "Aadhaar number not found in Panchayat records. Please contact the Admin." };
    }

    // 3. Verify Date of Birth
    const dobInput = new Date(data.dob).toISOString().split('T')[0];
    const dobDB = citizen.dob.toISOString().split('T')[0];

    if (dobInput !== dobDB) {
      return { success: false, error: "Date of Birth does not match our records." };
    }

    // 4. Check if they already have a password (already registered)
    if (citizen.passwordHash) {
      return { success: false, error: "This citizen has already registered. Please go to Login." };
    }

    // 5. Hash the password and save
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.passwordRaw, salt);

    await prisma.citizen.update({
      where: { id: citizen.id },
      data: { passwordHash: hashedPassword },
    });

    return { success: true, message: "Registration successful! You can now log in." };

  } catch (error: any) {
    console.error("Failed to register citizen:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
