// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json([], { status: 200 });
//     }

//     const bookings = await prisma.booking.findMany({
//       where: { userId },
//       include: {
//         course: {
//           include: {
//             freelancer: {
//               include: {
//                 user: true,
//               },
//             },
//             reviews: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     const cartItems = bookings.map((booking) => ({
//       id: booking.id,
//       course: booking.course,
//     }));

//     return NextResponse.json(cartItems);
//   } catch (error) {
//     console.error("Failed to fetch shopping cart:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch shopping cart" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Нэвтрэх шаардлагатай" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();
//     const { courseId } = body;

//     if (!courseId) {
//       return NextResponse.json(
//         { error: "Course сонгоно уу" },
//         { status: 400 }
//       );
//     }

//     const course = await prisma.course.findUnique({
//       where: { id: courseId },
//     });

//     if (!course) {
//       return NextResponse.json(
//         { error: "Course олдсонгүй" },
//         { status: 404 }
//       );
//     }

//     const existing = await prisma.booking.findFirst({
//       where: {
//         userId,
//         courseId,
//       },
//     });

//     if (existing) {
//       return NextResponse.json(
//         { error: "Already in cart" },
//         { status: 409 }
//       );
//     }

//     const now = new Date();
//     const endAt = new Date(now.getTime() + 60 * 60 * 1000);

//     const booking = await prisma.booking.create({
//       data: {
//         userId,
//         courseId,
//         freelancerId: course.freelancerId,
//         startAt: now,
//         endAt,
//         status: "PENDING",
//       },
//     });

//     return NextResponse.json(booking, { status: 201 });
//   } catch (error) {
//     console.error("Add to cart error:", error);
//     return NextResponse.json(
//       { error: "Сагсанд нэмэхэд алдаа гарлаа" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    // Get user's bookings with course and freelancer details
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          include: {
            freelancer: {
              include: {
                user: {
                  select: {
                    name: true,
                    // firstName: true,
                    // lastName: true,
                  },
                },
              },
            },
          },
        },
        freelancer: {
          include: {
            user: {
              select: {
                name: true,
                // firstName: true,
                // lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Shopping cart fetch error:", error);
    return NextResponse.json(
      { error: "Сагс ачаалахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
