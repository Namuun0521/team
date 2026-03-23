import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";

    const courses = await prisma.course.findMany({
      where: search
        ? {
            title: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
      orderBy: {
        createdAt: "desc",
      },
      include: {
        freelancer: {
          include: {
            user: true,
          },
        },
      },
    });

    const formatted = courses.map((course) => ({
      id: course.id,
      title: course.title,
      price: course.price,
      category: course.category,
      createdAt: course.createdAt,
      instructor: course.freelancer?.user?.name ?? "No name",
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}