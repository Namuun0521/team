import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;

  if (category && !Object.values(Category).includes(category)) {
    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }

  const courses = await prisma.course.findMany({
    where: category ? { category } : undefined,
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      category: true,
      freelancer: {
        select: {
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

  return NextResponse.json(courses);
}
