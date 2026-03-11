// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: NextRequest) {
//   const body = await req.json();

//   const { userId, bio, skills, category, phone, imageUrl } = body;

//   let user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!user) {
//     user = await prisma.user.create({
//       data: {
//         id: userId,
//         email: `${userId}@temp.com`,
//       },
//     });
//   }

//   const profile = await prisma.freelancerProfile.upsert({
//     where: { userId },
//     update: {
//       bio,
//       skills,
//       category,
//       phone,
//       imageUrl,
//     },
//     create: {
//       userId,
//       bio,
//       skills,
//       category,
//       phone,
//       imageUrl,
//     },
//   });

//   return NextResponse.json(profile);
// }

// export async function GET(req: NextRequest) {
//   try {
//     const userId = req.nextUrl.searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json({ error: "userId required" }, { status: 400 });
//     }

//     const profile = await prisma.freelancerProfile.findUnique({
//       where: {
//         userId: userId,
//       },
//     });

//     return NextResponse.json(profile);
//   } catch (error) {
//     console.error("GET PROFILE ERROR:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, name, bio, skills, category, phone, imageUrl } = body;

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        name: name || null,
        email: userId + "@temp.com",
      },
    });
  } else {
    user = await prisma.user.update({
      where: { id: userId },
      data: { name: name || user.name },
    });
  }

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: `${userId}@temp.com`,
      },
    });
  }

  const profile = await prisma.freelancerProfile.upsert({
    where: { userId },
    update: { bio, skills, category, phone, imageUrl },
    create: { userId, bio, skills, category, phone, imageUrl },
  });

  return NextResponse.json(profile);
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { name: true } },
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
