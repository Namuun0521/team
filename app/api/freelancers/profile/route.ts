import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { userId, bio, skills, category, phone, imageUrl } = body;

  const profile = await prisma.freelancerProfile.upsert({
    where: {
      userId,
    },
    update: {
      bio,
      skills,
      category,
      phone,
      imageUrl,
    },
    create: {
      userId,
      bio,
      skills,
      category,
      phone,
      imageUrl,
    },
  });

  return NextResponse.json(profile);
}
