import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type UserItem = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "FREELANCER";
  createdAt: Date;
  updatedAt: Date;
};

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) return notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хэрэглэгчийн мэдээлэл</h1>
        <p className="text-sm text-gray-400">Дэлгэрэнгүй мэдээлэл</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">ID</p>
            <p className="mt-1 text-sm text-gray-900">{user.id}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Нэр</p>
            <p className="mt-1 text-sm text-gray-900">{user.name ?? "No name"}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Имэйл</p>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Role</p>
            <p className="mt-1 text-sm text-gray-900">{user.role}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Бүртгүүлсэн</p>
            <p className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Шинэчлэгдсэн</p>
            <p className="mt-1 text-sm text-gray-900">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}