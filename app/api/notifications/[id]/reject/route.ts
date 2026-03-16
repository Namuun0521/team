import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
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

    await prisma.booking.delete({
      where: { id: notification.bookingId },
    });

    await prisma.notification.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification reject error:", error);
    return NextResponse.json(
      { error: "Татгалзахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
