import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      take: 5,
      include: {
        freelancer: {
          include: {
            user: true,
          },
        },
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to fetch recommended courses:", error);
    return NextResponse.json(
      { error: "Recommended courses авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}