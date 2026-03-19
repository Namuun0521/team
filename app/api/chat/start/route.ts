import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { freelancerId } = body;

    if (!freelancerId) {
      return NextResponse.json(
        { error: "freelancerId missing" },
        { status: 400 },
      );
    }

    const existing = await prisma.conversation.findFirst({
      where: {
        userId,
        freelancerId,
      },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        freelancerId,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
