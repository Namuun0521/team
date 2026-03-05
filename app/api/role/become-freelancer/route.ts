import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function POST() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const u = await currentUser();
  const email = u?.emailAddresses?.[0]?.emailAddress;
  if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

  // Ensure USER exists first
  const dbUser = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, role: "USER" },
  });

  // Update role -> FREELANCER
  const updated = await prisma.user.update({
    where: { id: dbUser.id },
    data: { role: "FREELANCER" },
  });

  return NextResponse.json({ user: updated });
}
