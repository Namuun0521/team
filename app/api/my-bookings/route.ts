import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
        paymentStatus: { in: ["PAID", "COMPLETED"] },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            category: true,
            freelancer: {
              select: {
                user: { select: { name: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const courseIds = [...new Set(bookings.map((b) => b.courseId))];

    const existingReviews = await prisma.review.findMany({
      where: {
        userId,
        courseId: { in: courseIds },
      },
      select: {
        courseId: true,
        rating: true,
        comment: true,
      },
    });

    const reviewMap = new Map(existingReviews.map((r) => [r.courseId, r]));

    const bookingsWithReview = bookings.map((b) => ({
      ...b,
      existingReview: reviewMap.get(b.courseId) || null,
    }));

    return NextResponse.json(bookingsWithReview);
  } catch (error) {
    console.error("My bookings fetch error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
