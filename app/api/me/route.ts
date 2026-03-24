import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.freelancerProfile.findUnique({
    where: { userId },
    include: { user: { select: { role: true } } },
  });

  if (profile) {
    return NextResponse.json({ role: profile.user.role });
  }

  return NextResponse.json({ role: "USER" });
}
