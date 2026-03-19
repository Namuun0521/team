import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  if (!course) return notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хичээлийн мэдээлэл</h1>
        <p className="text-sm text-gray-400">Дэлгэрэнгүй мэдээлэл</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">ID</p>
            <p className="mt-1 text-sm text-gray-900">{course.id}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Гарчиг</p>
            <p className="mt-1 text-sm text-gray-900">{course.title}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Үнэ</p>
            <p className="mt-1 text-sm text-gray-900">{course.price.toLocaleString()}₮</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Ангилал</p>
            <p className="mt-1 text-sm text-gray-900">{course.category}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Багш</p>
            <p className="mt-1 text-sm text-gray-900">
              {course.freelancer?.user?.name ?? "No name"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Үүссэн</p>
            <p className="mt-1 text-sm text-gray-900">{formatDate(course.createdAt)}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase text-gray-400">Тайлбар</p>
          <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
            {course.description || "Тайлбар байхгүй"}
          </p>
        </div>
      </div>
    </div>
  );
}