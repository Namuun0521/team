import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ count: 0 });

  const profile = await prisma.freelancerProfile.findUnique({
    where: { userId },
  });
  if (!profile) return NextResponse.json({ count: 0 });

  const count = await prisma.notification.count({
    where: { freelancerId: profile.id, isRead: false },
  });

  return NextResponse.json({ count });
}
