import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const notification = await prisma.notification.findUnique({
      where: { id },
      include: {
        booking: true,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 },
      );
    }

    await prisma.booking.update({
      where: { id: notification.booking.id },
      data: {
        status: "CANCELLED",
      },
    });

    await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reject error:", error);
    return NextResponse.json(
      { error: "Reject хийхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
