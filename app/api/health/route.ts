import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.user.findFirst().catch(() => null);
  return NextResponse.json({ ok: true });
}
