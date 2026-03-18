// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({
//         allowed: false,
//         message: "Нэвтрэх шаардлагатай",
//       });
//     }

//     const bookings = await prisma.booking.findMany({
//       where: {
//         userId,
//         status: "PENDING",
//       },
//     });

//     if (bookings.length === 0) {
//       return NextResponse.json({
//         allowed: false,
//         message: "Сагс хоосон байна",
//       });
//     }

//     const allApproved = bookings.every((booking) => booking.isApproved === true);

//     if (!allApproved) {
//       return NextResponse.json({
//         allowed: false,
//         message: "Таны захиалга хараахан баталгаажаагүй байна",
//       });
//     }

//     return NextResponse.json({
//       allowed: true,
//       message: "Checkout хийх боломжтой",
//     });
//   } catch (error) {
//     console.error("Checkout validate error:", error);

//     return NextResponse.json({
//       allowed: false,
//       message: "Шалгах үед алдаа гарлаа",
//     });
//   }
// }
