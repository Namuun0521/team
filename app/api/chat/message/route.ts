import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { conversationId, text } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        text,
      },
    });

    return NextResponse.json(message);
  } catch (e) {
    console.error("MESSAGE ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
