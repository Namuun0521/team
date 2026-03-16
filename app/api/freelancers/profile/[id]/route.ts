import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
