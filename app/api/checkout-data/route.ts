import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    console.log("👤 USER ID:", userId);

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

    console.log("📦 BOOKINGS:", bookings);

    // ❗ booking байхгүй бол алдаа буцаана
    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { error: "No confirmed bookings found" },
        { status: 400 },
      );
    }

    // ❗ course null хамгаалалт
    const totalPrice = bookings.reduce((sum: number, b: any) => {
      if (!b.course) {
        console.warn("⚠️ Course байхгүй booking:", b.id);
        return sum;
      }
      return sum + (b.course.price ?? 0);
    }, 0);

    console.log("💰 TOTAL PRICE:", totalPrice);

    // ❗ price 0 бол Stripe ажиллахгүй
    if (totalPrice <= 0) {
      return NextResponse.json(
        { error: "Invalid total price" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      bookingIds: bookings.map((b) => b.id),
      totalPrice,
    });
  } catch (error) {
    console.error("❌ CHECKOUT-DATA ERROR:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
