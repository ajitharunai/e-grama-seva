"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTaxCollection(data: {
  citizenId: string;
  propertyId: string;
  demandAmount: number;
  collectedAmount: number;
  paymentMode: string;
}) {
  try {
    const balanceDue = data.demandAmount - data.collectedAmount;
    const receiptNumber = `RCPT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const taxRecord = await prisma.taxRecord.create({
      data: {
        citizenId: data.citizenId,
        propertyId: data.propertyId,
        demandAmount: data.demandAmount,
        collectedAmount: data.collectedAmount,
        balanceDue: balanceDue,
        paymentMode: data.paymentMode,
        receiptNumber: data.collectedAmount > 0 ? receiptNumber : null,
        paymentDate: data.collectedAmount > 0 ? new Date() : null,
      },
    });

    revalidatePath("/tax");
    revalidatePath("/dashboard");
    
    return { success: true, data: taxRecord };
  } catch (error: any) {
    console.error("Failed to add tax collection:", error);
    return { success: false, error: "Failed to record tax payment. Please try again." };
  }
}
