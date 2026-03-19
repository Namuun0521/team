// import { prisma } from "@/lib/prisma";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// type MessageType = {
//   id: string;
//   senderId: string;
//   text: string;
//   createdAt: Date;
// };

// type ConversationType = {
//   id: string;
//   userId: string;
//   freelancerId: string;
//   messages: MessageType[];
// };

// type Chat = {
//   id: string;
//   name: string;
//   lastMessage: string;
// };

// export async function GET() {
//   try {
//     const { userId } = await auth();
//     if (!userId) return NextResponse.json({ chats: [], count: 0 });

//     const profile = await prisma.freelancerProfile.findUnique({
//       where: { userId },
//     });

//     const conversations = await prisma.conversation.findMany({
//       where: profile ? { freelancerId: profile.id } : { userId },
//       include: {
//         messages: {
//           orderBy: { createdAt: "desc" },
//         },
//       },
//     });

//     const client = await clerkClient();

//     let unreadCount = 0;

//     const chats: Chat[] = await Promise.all(
//       conversations.map(async (c: ConversationType) => {
//         const incoming = c.messages.find(
//           (m: MessageType) => m.senderId !== userId,
//         );

//         if (!incoming) return null;

//         let name = "User";

//         if (profile) {
//           const u = await client.users.getUser(c.userId);
//           name = u.fullName || "User";
//         } else {
//           const f = await prisma.freelancerProfile.findUnique({
//             where: { id: c.freelancerId },
//             include: { user: true },
//           });
//           name = f?.user?.name || "Freelancer";
//         }

//         return {
//           id: c.id,
//           name,
//           lastMessage: incoming.text,
//         };
//       }),
//     );
//     return NextResponse.json({
//       chats: chats.filter(Boolean),
//       count: unreadCount,
//     });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ chats: [], count: 0 });
//   }
// }
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type MessageType = {
  id: string;
  senderId: string;
  text: string;
  createdAt: Date;
};

type ConversationType = {
  id: string;
  userId: string;
  freelancerId: string;
  messages: MessageType[];
};

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
};

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ chats: [], count: 0 });

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    const conversations = await prisma.conversation.findMany({
      where: profile ? { freelancerId: profile.id } : { userId },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const client = await clerkClient();

    let unreadCount = 0;

    const chatsRaw = await Promise.all(
      conversations.map(async (c: ConversationType) => {
        const lastMessage = c.messages[0];

        if (!lastMessage) return null;

        const isUnread = lastMessage.senderId !== userId;

        if (isUnread) unreadCount++;

        let name = "User";

        if (profile) {
          const u = await client.users.getUser(c.userId);
          name = u.fullName || "User";
        } else {
          const f = await prisma.freelancerProfile.findUnique({
            where: { id: c.freelancerId },
            include: { user: true },
          });
          name = f?.user?.name || "Freelancer";
        }

        return {
          id: c.id,
          name,
          lastMessage: lastMessage.text,
        };
      }),
    );

    const chats: Chat[] = chatsRaw.filter((c): c is Chat => c !== null);

    return NextResponse.json({
      chats,
      count: unreadCount,
    });
  } catch (e) {
    console.error("CHAT LIST ERROR:", e);
    return NextResponse.json({ chats: [], count: 0 });
  }
}
