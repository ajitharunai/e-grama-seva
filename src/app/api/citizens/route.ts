import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const citizens = await prisma.citizen.findMany({
      select: {
        id: true,
        fullName: true,
        aadhaarNumber: true,
      },
      orderBy: { fullName: "asc" },
    });
    return NextResponse.json(citizens);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch citizens" }, { status: 500 });
  }
}
