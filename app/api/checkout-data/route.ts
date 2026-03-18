import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId,
      status: "CONFIRMED",
    },
    include: {
      course: true,
    },
  });

  const totalPrice = bookings.reduce(
    (sum: number, b: any) => sum + (b.course?.price ?? 0),
    0,
  );

  return NextResponse.json({
    bookingIds: bookings.map((b: { id: string }) => b.id),
    totalPrice,
  });
}
