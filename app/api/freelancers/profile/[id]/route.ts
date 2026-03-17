import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const profile = await prisma.freelancerProfile.findUnique({
      where: { id },
      include: {
        user: true,
        courses: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const client = await clerkClient();

    const clerkUser = await client.users.getUser(profile.userId);

    return NextResponse.json({
      ...profile,
      clerkEmail: clerkUser.emailAddresses[0]?.emailAddress || null,
      clerkName: clerkUser.fullName || null,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
