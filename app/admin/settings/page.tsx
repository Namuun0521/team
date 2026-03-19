"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  BookOpen,
  Users,
  ShoppingCart,
  Briefcase,
  ArrowRight,
  Bell,
  CreditCard,
  Lock,
  Settings2,
  Server,
} from "lucide-react";

type Stats = {
  totalUsers: number;
  totalFreelancers: number;
  totalCourses: number;
  totalBookings: number;
};

const quickLinks = [
  {
    title: "Хэрэглэгчид",
    description: "User болон freelancer жагсаалт удирдах",
    href: "/admin/users",
    icon: Users,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Хичээлүүд",
    description: "Платформ дээрх бүх хичээлүүдийг харах",
    href: "/admin/courses",
    icon: BookOpen,
    color: "text-orange-500 bg-orange-50",
  },
  {
    title: "Захиалгууд",
    description: "Booking болон төлөвүүдийг шалгах",
    href: "/admin/orders",
    icon: ShoppingCart,
    color: "text-green-600 bg-green-50",
  },
  {
    title: "Тайлан",
    description: "Орлого, хэрэглэгч, системийн тайлан",
    href: "/admin/reports",
    icon: Briefcase,
    color: "text-purple-600 bg-purple-50",
  },
];

const settingBlocks = [
  {
    title: "Админ хандалт",
    description: "Admin эрх, session, хамгаалалтын тохиргоо",
    icon: ShieldCheck,
    color: "text-blue-600 bg-blue-50",
    items: ["Admin role", "Session timeout", "Protected routes"],
  },
  {
    title: "Өгөгдлийн сан",
    description: "Prisma + PostgreSQL системийн мэдээлэл",
    icon: Database,
    color: "text-green-600 bg-green-50",
    items: ["DB status", "Migration state", "Connection health"],
  },
  {
    title: "Мэдэгдэл",
    description: "Email, notification, template тохиргоо",
    icon: Bell,
    color: "text-pink-600 bg-pink-50",
    items: ["Welcome email", "Booking alerts", "Admin notifications"],
  },
  {
    title: "Төлбөр",
    description: "Commission, fee, төлбөрийн тохиргоо",
    icon: CreditCard,
    color: "text-yellow-600 bg-yellow-50",
    items: ["Platform fee", "Payment methods", "Refund policy"],
  },
  {
    title: "Нууцлал",
    description: "Security болон audit log хэсэг",
    icon: Lock,
    color: "text-red-600 bg-red-50",
    items: ["Access log", "Sensitive actions", "Permission rules"],
  },
  {
    title: "Систем",
    description: "Maintenance болон platform behavior",
    icon: Server,
    color: "text-indigo-600 bg-indigo-50",
    items: ["Maintenance mode", "Site name", "Default configs"],
  },
];

export default function AdminSettingsPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalFreelancers: 0,
    totalCourses: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, coursesRes, ordersRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/courses"),
          fetch("/api/admin/orders"),
        ]);

        const users = usersRes.ok ? await usersRes.json() : [];
        const courses = coursesRes.ok ? await coursesRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];

        setStats({
          totalUsers: users.length,
          totalFreelancers: users.filter((u: { role: string }) => u.role === "FREELANCER").length,
          totalCourses: courses.length,
          totalBookings: orders.length,
        });
      } catch (error) {
        console.error("Failed to load settings stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Тохиргоо</h1>
          <p className="text-sm text-gray-400">
            Системийн ерөнхий мэдээлэл, quick actions, admin тохиргоо
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <Settings2 className="h-4 w-4" />
          Admin Control Center
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-400">Нийт хэрэглэгч</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {loading ? "..." : stats.totalUsers}
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-400">Фрилансер</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {loading ? "..." : stats.totalFreelancers}
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-400">Хичээл</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {loading ? "..." : stats.totalCourses}
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-400">Захиалга</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {loading ? "..." : stats.totalBookings}
          </h3>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900">Хурдан удирдлага</h2>
          <p className="text-sm text-gray-400">
            Хамгийн их ашиглагддаг admin хэсгүүд рүү хурдан орох
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900">Системийн тохиргооны хэсгүүд</h2>
          <p className="text-sm text-gray-400">
            Дараа нь API болон form-той холбож бүрэн ажиллагаатай болгож болно
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {settingBlocks.map((block) => {
            const Icon = block.icon;

            return (
              <div
                key={block.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${block.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900">{block.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{block.description}</p>

                <div className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm text-gray-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}