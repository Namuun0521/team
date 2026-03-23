import { prisma } from "@/lib/prisma";

function escapeCsv(value: string | number | boolean | null | undefined) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(date: Date) {
  return new Date(date).toISOString();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const days = Number(searchParams.get("days") ?? 7);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days + 1);
    fromDate.setHours(0, 0, 0, 0);

    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: fromDate,
        },
      },
      include: {
        user: true,
        course: true,
        freelancer: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const headers = [
      "Booking ID",
      "Customer Name",
      "Customer Email",
      "Freelancer Name",
      "Freelancer Email",
      "Course Title",
      "Course Category",
      "Amount",
      "Status",
      "Approved",
      "Start At",
      "End At",
      "Created At",
    ];

    const rows = bookings.map((booking) => [
      booking.id,
      booking.user.name ?? "",
      booking.user.email,
      booking.freelancer.user.name ?? "",
      booking.freelancer.user.email,
      booking.course.title,
      booking.course.category,
      booking.course.price,
      booking.status,
      booking.isApproved ? "YES" : "NO",
      formatDate(booking.startAt),
      formatDate(booking.endAt),
      formatDate(booking.createdAt),
    ]);

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) => row.map(escapeCsv).join(",")),
    ].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="report-${days}-days.csv"`,
      },
    });
  } catch (error) {
    console.error("REPORT CSV API ERROR:", error);

    return new Response("Server error", {
      status: 500,
    });
  }
}