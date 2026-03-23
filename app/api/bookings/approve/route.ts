import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { BookingStatus, NotificationType } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        freelancer: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.freelancer.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CONFIRMED,
      },
    });

    await prisma.notification.create({
      data: {
        receiverId: booking.userId,
        bookingId: booking.id,
        title: "Захиалга зөвшөөрөгдлөө",
        message: "Таны захиалгыг зөвшөөрлөө",
        type: NotificationType.BOOKING_APPROVED,
        isRead: false,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Approve booking error:", error);
    return NextResponse.json({ error: "Approve failed" }, { status: 500 });
  }
}