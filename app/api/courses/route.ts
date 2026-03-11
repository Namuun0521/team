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
import { Category } from "@prisma/client";

function isValidCategory(value: string): value is Category {
  return Object.values(Category).includes(value as Category);
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryParam = searchParams.get("category");

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
      where: {
        ...(category && { category }),
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
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
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json(
      { error: "Дотоод серверийн алдаа" },
      { status: 500 },
    );
  }
}
