import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
        imageUrl: true,
      },
      take: 10,
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search error" }, { status: 500 });
  }
}
