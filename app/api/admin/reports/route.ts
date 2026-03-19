import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type DayPoint = {
  day: string;
  value: number;
};

function formatDay(date: Date) {
  return date.toISOString().slice(5, 10); // MM-DD
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const days = Number(searchParams.get("days") ?? 7);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days + 1);
    fromDate.setHours(0, 0, 0, 0);

    const [totalUsers, totalFreelancers, totalCourses, bookings, newUsers] =
      await Promise.all([
        prisma.user.count(),
        prisma.freelancerProfile.count(),
        prisma.course.count(),
        prisma.booking.findMany({
          where: {
            createdAt: {
              gte: fromDate,
            },
          },
          select: {
            id: true,
            status: true,
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
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.user.findMany({
          where: {
            createdAt: {
              gte: fromDate,
            },
          },
          select: {
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        }),
      ]);

    const confirmedBookings = bookings.filter(
      (b) => b.status === "CONFIRMED"
    );

    const pendingBookings = bookings.filter(
      (b) => b.status === "PENDING"
    ).length;

    const confirmedCount = confirmedBookings.length;

    const cancelledCount = bookings.filter(
      (b) => b.status === "CANCELLED"
    ).length;

    const totalRevenue = confirmedBookings.reduce((sum, booking) => {
      return sum + (booking.course?.price ?? 0);
    }, 0);

    const revenueMap: Record<string, number> = {};
    const usersMap: Record<string, number> = {};

    for (const booking of confirmedBookings) {
      const key = formatDay(new Date(booking.createdAt));
      revenueMap[key] = (revenueMap[key] ?? 0) + (booking.course?.price ?? 0);
    }

    for (const user of newUsers) {
      const key = formatDay(new Date(user.createdAt));
      usersMap[key] = (usersMap[key] ?? 0) + 1;
    }

    const revenueByDay: DayPoint[] = [];
    const newUsersByDay: DayPoint[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = formatDay(d);

      revenueByDay.push({
        day: key,
        value: revenueMap[key] ?? 0,
      });

      newUsersByDay.push({
        day: key,
        value: usersMap[key] ?? 0,
      });
    }

    const paidBookings = confirmedBookings.map((b) => ({
      id: b.id.slice(0, 8),
      client: b.user?.name || b.user?.email || "Хэрэглэгч",
      freelancer:
        b.course?.freelancer?.user?.name ||
        b.course?.freelancer?.user?.email ||
        "Фрилансер",
      courseTitle: b.course?.title || "Хичээл",
      amount: b.course?.price ?? 0,
      createdAt: b.createdAt,
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalFreelancers,
        totalCourses,
        totalBookings: bookings.length,
        pendingBookings,
        confirmedBookings: confirmedCount,
        cancelledBookings: cancelledCount,
        totalRevenue,
      },
      revenueByDay,
      newUsersByDay,
      paidBookings,
    });
  } catch (error) {
    console.error("REPORTS API ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}