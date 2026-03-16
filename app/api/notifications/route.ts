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

    const notifications = await prisma.notification.findMany({
      where: {
        freelancerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        booking: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notifications GET error:", error);
    return NextResponse.json(
      { error: "Мэдэгдэл авахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
