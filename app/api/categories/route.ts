// // app/api/categories/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   const categories = [
//     { id: "1", name: "Хөгжүүлэгч" },
//     { id: "2", name: "Дизайнер" },
//     { id: "3", name: "Маркетинг" },
//   ];

//   return NextResponse.json(categories);
// }
import { NextResponse } from "next/server";

export async function GET() {
  const categories = [
    { id: "Дизайн", name: "Дизайн" },
    { id: "ХӨГЖҮҮЛЭГЧ", name: "Хөгжүүлэгч" },
    { id: "Хэл_сурах", name: "Хэл сурах" },
    { id: "Маркетинг", name: "Маркетинг" },
    { id: "Фитнес", name: "Фитнес" },
    { id: "Ерөнхий_эрдэм", name: "Ерөнхий эрдэм" },
    { id: "Бусад", name: "Бусад" },
  ];

  return NextResponse.json(categories);
}
