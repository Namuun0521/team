// app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
    const { courseId, rating, comment } = body;

    if (!courseId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Мэдээлэл дутуу байна" },
        { status: 400 },
      );
    }

    // Verify user actually has a completed booking for this course
    const completedBooking = await prisma.booking.findFirst({
      where: {
        userId,
        courseId,
        paymentStatus: "COMPLETED",
      },
    });

    if (!completedBooking) {
      return NextResponse.json(
        { error: "Та энэ хичээлийг дуусгаагүй байна" },
        { status: 403 },
      );
    }

    // Upsert review (one per user per course)
    const review = await prisma.review.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { rating, comment: comment || null },
      create: { userId, courseId, rating, comment: comment || null },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review submit error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
