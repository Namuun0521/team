// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const { conversationId, text } = await req.json();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const message = await prisma.message.create({
//       data: {
//         conversationId,
//         senderId: userId,
//         text,
//       },
//     });

//     return NextResponse.json(message);
//   } catch (e) {
//     console.error("MESSAGE ERROR:", e);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { ablyServer } from "@/app/lib/ably";
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

    // DB-д хадгалах
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        text,
      },
    });

    // Ably-р real-time илгээх
    try {
      const channel = ablyServer.channels.get(`chat:${conversationId}`);
      await channel.publish("new-message", {
        id: message.id,
        text: message.text,
        senderId: message.senderId,
        createdAt: message.createdAt.toISOString(),
      });
    } catch (ablyError) {
      // Ably алдаа гарсан ч message DB-д хадгалагдсан тул амжилттай гэж тооцно
      console.error("Ably publish error:", ablyError);
    }

    return NextResponse.json(message);
  } catch (e) {
    console.error("MESSAGE ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
