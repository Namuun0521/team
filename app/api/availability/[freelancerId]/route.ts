import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidUUID(id: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ freelancerId: string }> },
) {
  try {
    const { freelancerId } = await context.params;

    if (!freelancerId) {
      return NextResponse.json(
        { error: "Freelancer ID шаардлагатай" },
        { status: 400 },
      );
    }

    if (!isValidUUID(freelancerId)) {
      return NextResponse.json(
        { error: "Freelancer ID буруу format байна" },
        { status: 400 },
      );
    }

    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { id: freelancerId },
      select: { id: true, userId: true },
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer олдсонгүй" },
        { status: 404 },
      );
    }

    const availability = await prisma.availability.findMany({
      where: { freelancerId },
      orderBy: { dayOfWeek: "asc" },
    });

    return NextResponse.json({
      freelancerId,
      count: availability.length,
      availability,
    });
  } catch (error) {
    console.error("GET availability error:", error);

    return NextResponse.json(
      { error: "Цагийн хуваарь авах үед алдаа гарлаа" },
      { status: 500 },
    );
  }
}
