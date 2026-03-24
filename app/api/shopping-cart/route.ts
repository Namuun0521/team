import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
        paymentStatus: { not: "PAID" },
      },
      include: {
        course: {
          include: {
            freelancer: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        freelancer: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Shopping cart fetch error:", error);
    return NextResponse.json(
      { error: "Сагс ачаалахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
