import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// import { Category } from "@prisma/client";  <-- устгав

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  // Хэрэв та category-г шалгах хүсвэл enum-г өөрийн коддоо тодорхойлж болно
  const validCategories = ["web", "design", "marketing"]; // жишээ
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