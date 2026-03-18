import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";

    const courses = await prisma.course.findMany({
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      include: {
        freelancer: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = courses.map((course) => ({
      id: course.id,
      title: course.title,
      price: course.price,
      category: course.category,
      createdAt: course.createdAt,
      instructor:
        course.freelancer.user.name ??
        course.freelancer.user.email ??
        "Freelancer",
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("COURSES API ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}