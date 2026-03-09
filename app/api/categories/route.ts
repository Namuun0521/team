// app/api/categories/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const categories = [
    { id: "1", name: "Хөгжүүлэгч" },
    { id: "2", name: "Дизайнер" },
    { id: "3", name: "Маркетинг" },
  ];
  
  return NextResponse.json(categories);
}