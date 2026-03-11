import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        freelancer: {
          include: {
            user: { select: { name: true } },
          },
        },
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { bookings: true, reviews: true } },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Хичээл олдсонгүй" }, { status: 404 });
    }

    const avgRating =
      course.reviews.length > 0
        ? course.reviews.reduce((s, r) => s + r.rating, 0) /
          course.reviews.length
        : 0;

    return NextResponse.json({
      ...course,
      avgRating: Math.round(avgRating * 10) / 10,
    });
  } catch (error) {
    console.error("Course fetch error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
