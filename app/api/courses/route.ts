import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Category } from "@prisma/client";

function isValidCategory(value: string): value is Category {
  return Object.values(Category).includes(value as Category);
}

export async function GET(req: NextRequest) {
  try {
    const categoryParam = req.nextUrl.searchParams.get("category");

    let category: Category | undefined;
    if (categoryParam) {
      if (!isValidCategory(categoryParam)) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 },
        );
      }
      category = categoryParam;
    }

    const courses = await prisma.course.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        category: true,
        freelancer: {
          select: {
            user: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}

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
      include: { user: true },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Эхлээд профайл үүсгэнэ үү" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { title, description, price, category, imageUrl } = body;

    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { error: "Бүх талбарыг бөглөнө үү" },
        { status: 400 },
      );
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { error: "Үнэ зөв оруулна уу" },
        { status: 400 },
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: numericPrice,
        category,
        imageUrl: imageUrl || null,
        freelancerId: profile.id,
      },
    });

    // Хичээл үүсгэсний дараа FREELANCER role өгөх
    if (profile.user.role !== "FREELANCER") {
      await prisma.user.update({
        where: { id: profile.user.id },
        data: { role: "FREELANCER" },
      });
    }

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Course creation error:", error);
    return NextResponse.json(
      { error: "Хичээл үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}