import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const days = Number(searchParams.get("days") ?? 7);
    const search = searchParams.get("search") ?? "";

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    // ── Stats ─────────────────────────────
    const [totalUsers, totalFreelancers, totalCourses] =
      await Promise.all([
        prisma.user.count(),
        prisma.freelancerProfile.count(),
        prisma.course.count(),
      ]);

    // ── Bookings ──────────────────────────
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
      include: {
        course: true,
      },
    });

    // ── Total Revenue ─────────────────────
    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.course?.price ?? 0),
      0
    );

    // ── Revenue by day ────────────────────
    const revenueMap: Record<string, number> = {};

    bookings.forEach((b) => {
      const day = new Date(b.createdAt)
        .toLocaleDateString("en-CA") // YYYY-MM-DD
        .slice(5); // MM-DD

      revenueMap[day] =
        (revenueMap[day] ?? 0) + (b.course?.price ?? 0);
    });

    // бүх өдрийг fill хийнэ
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

    // ── New users ─────────────────────────
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

    // ── Paid bookings table ───────────────
    const paidBookings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        createdAt: {
          gte: fromDate,
        },
      },
      include: {
        user: true,
        freelancer: {
          include: { user: true },
        },
        course: true,
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