import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // database connection test
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "ok",
      db: "connected",
      time: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        db: "disconnected",
      },
      { status: 500 },
    );
  }
}
