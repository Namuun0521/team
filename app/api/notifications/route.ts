import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    console.log("auth userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const freelancerProfile = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    console.log("freelancerProfile:", freelancerProfile);

    if (!freelancerProfile) {
      return NextResponse.json([]);
    }

    const notifications = await prisma.notification.findMany({
      where: {
        freelancerId: freelancerProfile.id,
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

    console.log("notifications:", notifications);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notifications GET error FULL:", error);
    return NextResponse.json(
      {
        error: "Мэдэгдэл авахад алдаа гарлаа",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
