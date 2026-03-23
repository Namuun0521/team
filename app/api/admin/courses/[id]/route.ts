import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        freelancer: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: course.id,
      title: course.title,
      price: course.price,
      category: course.category,
      description: course.description,
      createdAt: course.createdAt,
      instructor: course.freelancer?.user?.name ?? "No name",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title: body.title,
        price: Number(body.price),
        category: body.category,
        description: body.description,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}