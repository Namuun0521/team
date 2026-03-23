import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";

    const bookings = await prisma.booking.findMany({
      where: search
        ? {
            OR: [
              {
                user: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                user: {
                  email: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                course: {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                freelancer: {
                  user: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {},
      select: {
        id: true,
        status: true,
        isApproved: true,
        startAt: true,
        endAt: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            title: true,
            price: true,
          },
        },
        freelancer: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = bookings.map((booking) => ({
      id: booking.id,
      customer: booking.user.name ?? booking.user.email ?? "User",
      freelancer:
        booking.freelancer.user.name ??
        booking.freelancer.user.email ??
        "Freelancer",
      course: booking.course.title,
      amount: booking.course.price,
      status: booking.status,
      isApproved: booking.isApproved,
      startAt: booking.startAt,
      endAt: booking.endAt,
      createdAt: booking.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("ORDERS API ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}