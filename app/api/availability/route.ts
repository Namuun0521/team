import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
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
      return NextResponse.json({ error: "Профайл олдсонгүй" }, { status: 403 });
    }

    const body = await req.json();
    const { slots } = body;

    if (!slots || !Array.isArray(slots) || slots.length === 0) {
      return NextResponse.json(
        { error: "Хамгийн багадаа 1 өдрийн цаг оруулна уу" },
        { status: 400 },
      );
    }

    // Хуучин хуваарийг устгаад шинээр бичих
    await prisma.availability.deleteMany({
      where: { freelancerId: profile.id },
    });

    const created = await prisma.availability.createMany({
      data: slots.map(
        (s: {
          dayOfWeek: number;
          startTime: string;
          endTime: string;
          slotDuration?: number;
        }) => ({
          freelancerId: profile.id,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          slotDuration: s.slotDuration || 60,
        }),
      ),
    });

    return NextResponse.json({ count: created.count }, { status: 201 });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json(
      { error: "Цагийн хуваарь хадгалахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

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
      return NextResponse.json([]);
    }

    const availability = await prisma.availability.findMany({
      where: { freelancerId: profile.id },
      orderBy: { dayOfWeek: "asc" },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error("GET availability error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
