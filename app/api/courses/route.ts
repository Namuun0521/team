import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  
  const validCategories = ["web", "design", "marketing"];
  if (category && !validCategories.includes(category)) {
    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      freelancer: {
        select: {
          user: {
            select: { name: true },
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