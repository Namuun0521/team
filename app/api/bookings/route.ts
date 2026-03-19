// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Нэвтрэх шаардлагатай" },
//         { status: 401 },
//       );
//     }

//     const body = await req.json();

//     const { courseId, freelancerId, startAt, endAt } = body;

//     if (!courseId || !freelancerId || !startAt || !endAt) {
//       return NextResponse.json(
//         { error: "Мэдээлэл дутуу байна" },
//         { status: 400 },
//       );
//     }

//     const course = await prisma.course.findUnique({
//       where: { id: courseId },
//     });

//     if (!course) {
//       return NextResponse.json({ error: "Хичээл олдсонгүй" }, { status: 404 });
//     }

//     // Clerk user -> DB user
//     let dbUser = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           id: userId,
//           email: userId + "@clerk.temp",
//         },
//       });
//     }

//     // 🔒 Double booking protection
//     const existing = await prisma.booking.findFirst({
//       where: {
//         freelancerId,
//         startAt: new Date(startAt),
//       },
//     });

//     if (existing) {
//       return NextResponse.json(
//         { error: "Энэ цаг аль хэдийн захиалагдсан байна" },
//         { status: 409 },
//       );
//     }

//     // ✅ Booking + Notification хамт үүсгэх (transaction)
//     const booking = await prisma.$transaction(async (tx) => {
//       const newBooking = await tx.booking.create({
//         data: {
//           userId: dbUser.id,
//           courseId,
//           freelancerId,
//           startAt: new Date(startAt),
//           endAt: new Date(endAt),
//           status: "PENDING",
//         },
//       });

//       // 🔔 Notification үүсгэх
//       await tx.notification.create({
//         data: {
//           freelancerId,
//           bookingId: newBooking.id,
//           message: `"${course.title}" хичээлд шинэ захиалга ирлээ`,
//           isRead: false,
//         },
//       });

//       return newBooking;
//     });

//     return NextResponse.json(booking, { status: 201 });
//   } catch (error) {
//     console.error("Booking error:", error);

//     return NextResponse.json(
//       { error: "Захиалга үүсгэхэд алдаа гарлаа" },
//       { status: 500 },
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { courseId, freelancerId, startAt, endAt } = body;

    if (!courseId || !freelancerId || !startAt || !endAt) {
      return NextResponse.json(
        { error: "Мэдээлэл дутуу байна" },
        { status: 400 },
      );
    }

    console.log("1");

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Хичээл олдсонгүй" }, { status: 404 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    console.log("2");

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId,
          email: userId + "@clerk.temp",
        },
      });
    }

    console.log("jafgja;kdgja;djgfk;", {
      freelancerId,
      startAt: new Date(startAt),
    });

    // 🔒 Double booking protection
    const existing = await prisma.booking.findFirst({
      where: {
        freelancerId,
        startAt: new Date(startAt),
      },
    });

    console.log("3");

    if (existing) {
      return NextResponse.json(
        { error: "Энэ цаг аль хэдийн захиалагдсан байна" },
        { status: 409 },
      );
    }

    // ✅ Booking + Notification хамт үүсгэх
    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: dbUser.id,
          courseId,
          freelancerId,
          startAt: new Date(startAt),
          endAt: new Date(endAt),
          status: "PENDING",
          // isApproved = false (schema default) → хамаагүй, status="PENDING"-г л шалгана
        },
      });

      // 🔔 Freelancer-т notification илгээх
      await tx.notification.create({
        data: {
          freelancerId,
          bookingId: newBooking.id,
          message: `"${course.title}" хичээлд шинэ захиалга ирлээ`,
          isRead: false,
        },
      });

      return newBooking;
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);

    return NextResponse.json(
      { error: "Захиалга үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
