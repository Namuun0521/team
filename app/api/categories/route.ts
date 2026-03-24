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
