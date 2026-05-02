"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCitizen(data: {
  aadhaarNumber: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber?: string;
  wardNumber: number;
  casteCategory?: string;
  annualIncome?: number;
}) {
  try {
    const citizenId = `CIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const citizen = await prisma.citizen.create({
      data: {
        citizenId,
        aadhaar: data.aadhaarNumber,
        fullName: data.fullName,
        dob: new Date(data.dateOfBirth),
        gender: data.gender,
        maritalStatus: "SINGLE",
        fathersName: "Not Provided",
        mobileNumber: data.phoneNumber || null,
        caste: data.casteCategory || null,
        wardNumber: data.wardNumber.toString(),
        houseNumber: data.address.substring(0, 50), // Using address as houseNumber
        pincode: "600000",
        houseOwnership: "OWNED",
        rationCardType: "APL",
        familyMembersCount: 1,
        annualIncome: data.annualIncome || 0,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/citizens");
    
    return { success: true, data: citizen };
  } catch (error: any) {
    console.error("Failed to add citizen:", error);
    
    // Check for unique constraint violation (Aadhaar)
    if (error.code === 'P2002') {
      return { success: false, error: "A citizen with this Aadhaar number already exists." };
    }
    
    return { success: false, error: "Failed to register citizen. Please try again." };
  }
}
