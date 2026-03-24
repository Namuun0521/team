import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { action } = body;

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Үйлдэл буруу байна" },
        { status: 400 },
      );
    }

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Freelancer эрх шаардлагатай" },
        { status: 403 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { notifications: true },
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

    const result = await prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id },
        data: {
          isApproved: action === "approve",
          status: action === "approve" ? "CONFIRMED" : "CANCELLED",
        },
      });

      await tx.notification.updateMany({
        where: { bookingId: id },
        data: { isRead: true },
      });

      return updatedBooking;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Booking action error:", error);
    return NextResponse.json(
      { error: "Үйлдэл гүйцэтгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
