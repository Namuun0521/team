// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // import { Category } from "@prisma/client";  <-- устгав

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get("category");

//   // Хэрэв та category-г шалгах хүсвэл enum-г өөрийн коддоо тодорхойлж болно
//   const validCategories = ["web", "design", "marketing"]; // жишээ
//   if (category && !validCategories.includes(category)) {
//     return NextResponse.json({ message: "Invalid category" }, { status: 400 });
//   }

//   const courses = await prisma.course.findMany({
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       price: true,
//       freelancer: {
//         select: {
//           user: {
//             select: { name: true },
//           },
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return NextResponse.json(courses);
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
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
  });

  return NextResponse.json(courses);
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
        { error: "Зөвхөн фрилансер хичээл үүсгэх боломжтой" },
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

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Course creation error:", error);
    return NextResponse.json(
      { error: "Хичээл үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
