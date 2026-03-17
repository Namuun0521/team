import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET - Get all notifications for current freelancer
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    // Check if user is a freelancer
    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Freelancer эрх шаардлагатай" },
        { status: 403 },
      );
    }

    const notifications = await prisma.notification.findMany({
      where: { freelancerId: profile.id },
      include: {
        booking: {
          include: {
            course: true,
            user: { select: { name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    return NextResponse.json(
      { error: "Notification авахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
