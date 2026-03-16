import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return NextResponse.json(
        { error: "Мэдэгдэл олдсонгүй" },
        { status: 404 },
      );
    }

    if (notification.freelancerId !== userId) {
      return NextResponse.json({ error: "Хандах эрхгүй" }, { status: 403 });
    }

    await prisma.booking.update({
      where: { id: notification.bookingId },
      data: {
        status: "CONFIRMED",
      },
    });

    const updated = await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Notification accept error:", error);
    return NextResponse.json(
      { error: "Зөвшөөрөхөд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
