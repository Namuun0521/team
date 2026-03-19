// app/api/my-courses/route.ts
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

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Freelancer профайл олдсонгүй" },
        { status: 403 },
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        freelancerId: profile.id,
        paymentStatus: "PAID",
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            category: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("My courses fetch error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
