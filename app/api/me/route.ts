import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

// export async function POST() {
//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const u = await currentUser();
//   const email = u?.emailAddresses?.[0]?.emailAddress;
//   if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

//   const name =
//     [u?.firstName, u?.lastName].filter(Boolean).join(" ").trim() ||
//     u?.username ||
//     null;

//   const dbUser = await prisma.user.upsert({
//     where: { email },
//     update: { name },
//     create: {
//       email,
//       name,
//       role: "USER",
//     },
//   });

//   return NextResponse.json({ user: dbUser });
// }
export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const u = await currentUser();
  const email = u?.emailAddresses?.[0]?.emailAddress;
  if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

  const dbUser = await prisma.user.findUnique({
    where: { email },
    select: { role: true },
  });

  if (!dbUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ role: dbUser.role });
}
