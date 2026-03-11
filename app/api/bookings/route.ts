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
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Хичээл сонгоно уу" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { freelancer: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Хичээл олдсонгүй" }, { status: 404 });
    }

    // Find or create user by Clerk userId
    let dbUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId,
          email: userId + "@clerk.temp",
        },
      });
    }

    const now = new Date();
    const endAt = new Date(now.getTime() + 60 * 60 * 1000);

    const booking = await prisma.booking.create({
      data: {
        userId: dbUser.id,
        courseId: course.id,
        freelancerId: course.freelancerId,
        startAt: now,
        endAt: endAt,
        status: "PENDING",
      },
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
