// app/api/my-courses/[bookingId]/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const { bookingId } = await params;

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Freelancer профайл олдсонгүй" },
        { status: 403 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Захиалга олдсонгүй" },
        { status: 404 },
      );
    }

    if (booking.freelancerId !== profile.id) {
      return NextResponse.json({ error: "Хандах эрхгүй" }, { status: 403 });
    }

    if (booking.paymentStatus !== "PAID") {
      return NextResponse.json(
        { error: "Захиалга төлөгдөөгүй байна" },
        { status: 400 },
      );
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { paymentStatus: "COMPLETED" },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Complete booking error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
