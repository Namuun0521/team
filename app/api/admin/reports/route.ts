import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const days = Number(searchParams.get("days") ?? 7);
    const search = searchParams.get("search") ?? "";

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const [totalUsers, totalFreelancers, totalCourses] =
      await Promise.all([
        prisma.user.count(),
        prisma.freelancerProfile.count(),
        prisma.course.count(),
      ]);

    const bookings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        createdAt: {
          gte: fromDate,
        },
        ...(search && {
          user: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        course: {
          select: {
            price: true,
          },
        },
      },
    });

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.course?.price ?? 0),
      0
    );

    const revenueMap: Record<string, number> = {};

    bookings.forEach((b) => {
      const day = new Date(b.createdAt)
        .toLocaleDateString("en-CA")
        .slice(5);

      revenueMap[day] =
        (revenueMap[day] ?? 0) + (b.course?.price ?? 0);
    });

    const revenueByDay = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const key = d.toLocaleDateString("en-CA").slice(5);

      revenueByDay.push({
        day: key,
        value: revenueMap[key] ?? 0,
      });
    }

    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: fromDate,
        },
      },
      select: { createdAt: true },
    });

    const userMap: Record<string, number> = {};

    users.forEach((u) => {
      const day = new Date(u.createdAt)
        .toLocaleDateString("en-CA")
        .slice(5);

      userMap[day] = (userMap[day] ?? 0) + 1;
    });

    const newUsersByDay = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const key = d.toLocaleDateString("en-CA").slice(5);

      newUsersByDay.push({
        day: key,
        value: userMap[key] ?? 0,
      });
    }

    const paidBookings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        createdAt: {
          gte: fromDate,
        },
      },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        freelancer: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        course: {
          select: {
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const formattedBookings = paidBookings.map((b) => ({
      id: b.id.slice(0, 8),
      client: b.user.name ?? "User",
      freelancer: b.freelancer.user.name ?? "Freelancer",
      courseTitle: b.course.title,
      amount: b.course.price,
      createdAt: b.createdAt,
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalFreelancers,
        totalCourses,
        totalRevenue,
      },
      revenueByDay,
      newUsersByDay,
      paidBookings: formattedBookings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}