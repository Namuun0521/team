"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingCart,
  BarChart2,
  Settings,
  Search,
  Bell,
  Download,
  Calendar,
  ChevronDown,
  Eye,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ── Types ──────────────────────────────────────────────────
type Stats = {
  totalUsers: number;
  totalFreelancers: number;
  totalCourses: number;
  totalRevenue: number;
};

type DayData = { day: string; value: number };

type PaidBooking = {
  id: string;
  client: string;
  freelancer: string;
  courseTitle: string;
  amount: number;
  createdAt: string;
};

type DashboardData = {
  stats: Stats;
  revenueByDay: DayData[];
  newUsersByDay: DayData[];
  paidBookings: PaidBooking[];
};

// ── Helpers ────────────────────────────────────────────────
function formatMNT(n: number) {
  if (n >= 1_000_000) return `₮${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₮${(n / 1_000).toFixed(0)}K`;
  return `₮${n}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const AVATAR_COLORS = [
  "#3b82f6",
  "#f97316",
  "#ec4899",
  "#10b981",
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b",
  "#6366f1",
];
function avatarColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const navItems = [
  { icon: LayoutDashboard, label: "Хянах самбар" },
  { icon: Users, label: "Хэрэглэгчид" },
  { icon: BookOpen, label: "Хичээлүүд" },
  { icon: ShoppingCart, label: "Захиалгууд" },
  { icon: BarChart2, label: "Тайлан" },
  { icon: Settings, label: "Тохиргоо" },
];

// ── Skeleton block ─────────────────────────────────────────
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />
);

// ── Stat Card ──────────────────────────────────────────────
function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  change,
  positive,
  loading,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  loading: boolean;
}) {
  if (loading) return <Skeleton className="h-28" />;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          <span className={iconColor}>{icon}</span>
        </div>
        <span
          className={`text-xs font-semibold ${positive ? "text-green-500" : "text-gray-400"}`}
        >
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-xs">
        <p className="text-gray-500">{label}</p>
        <p className="font-bold text-blue-600">{formatMNT(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

// ── Main ───────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error("Хандалт хаалттай");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const maxNewUsers = data
    ? Math.max(...data.newUsersByDay.map((d) => d.value), 1)
    : 1;

  const totalNewUsers =
    data?.newUsersByDay.reduce((s, d) => s + d.value, 0) ?? 0;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-600" fill="#2563eb" />
            </div>
            <span className="font-bold text-gray-900 text-sm leading-tight">
              Freelancer
              <br />
              <span className="text-blue-600">Marketplace</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveNav(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeNav === i
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mx-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2">
            Системийн төлөв
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-600">Хэвийн ажиллаж байна</span>
          </div>
          <button className="w-full text-xs font-medium text-gray-700 border border-gray-200 rounded-lg py-1.5 hover:bg-white transition">
            Шинэчлэл үзэх
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Header ── */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 shrink-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Хайх..."
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 border border-gray-100"
            />
          </div>
          <div className="flex-1" />
          <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded-lg">
            АДМИН
          </span>
          <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition">
            <Bell className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-900">Админ</p>
              <p className="text-[10px] text-gray-400">Ерөнхий админ</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              А
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Title row */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Админ самбар</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Өнөөдрийн байдлаар зах зээлийн тойм.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-4 py-2 bg-white hover:bg-gray-50 transition">
                <Calendar className="w-4 h-4" />
                Сүүлийн 30 хоног
              </button>
              <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 transition shadow-sm">
                <Download className="w-4 h-4" />
                Тайлан татах
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              loading={loading}
              icon={<Users className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              label="Нийт хэрэглэгчид"
              value={(data?.stats.totalUsers ?? 0).toLocaleString()}
              change=""
              positive={false}
            />
            <StatCard
              loading={loading}
              icon={<Users className="w-5 h-5" />}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              label="Идэвхтэй фрилансерүүд"
              value={(data?.stats.totalFreelancers ?? 0).toLocaleString()}
              change=""
              positive={false}
            />
            <StatCard
              loading={loading}
              icon={<BookOpen className="w-5 h-5" />}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
              label="Нийт хичээлүүд"
              value={(data?.stats.totalCourses ?? 0).toLocaleString()}
              change=""
              positive={false}
            />
            <StatCard
              loading={loading}
              icon={<BarChart2 className="w-5 h-5" />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
              label="Нийт орлого (₮)"
              value={formatMNT(data?.stats.totalRevenue ?? 0)}
              change=""
              positive={false}
            />
          </div>

          {/* ── Charts ── */}
          {loading ? (
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="col-span-3 h-64" />
              <Skeleton className="col-span-2 h-64" />
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {/* Revenue area chart */}
              <div className="col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Орлого
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatMNT(data?.stats.totalRevenue ?? 0)}
                      </span>
                      {(data?.stats.totalRevenue ?? 0) > 0 && (
                        <span className="flex items-center gap-0.5 text-xs font-semibold text-green-500">
                          <TrendingUp className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-medium border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition">
                    Сүүлийн 7 хоног <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart
                    data={data?.revenueByDay ?? []}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={formatMNT}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      fill="url(#revGrad)"
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: "#3b82f6",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* New users bar chart */}
              <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Шинэ хэрэглэгчид
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl font-bold text-gray-900">
                        +{totalNewUsers.toLocaleString()}
                      </span>
                      {totalNewUsers === 0 && (
                        <span className="text-xs text-gray-400">7 хоногт</span>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={data?.newUsersByDay ?? []}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    barSize={18}
                  >
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {(data?.newUsersByDay ?? []).map((entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            entry.value === maxNewUsers && entry.value > 0
                              ? "#3b82f6"
                              : "#e2e8f0"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ── Paid / Confirmed Bookings Table ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Төлөгдсөн захиалгууд
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Зөвхөн баталгаажсан / төлөгдсөн
                </p>
              </div>
              <span className="text-xs font-semibold bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
                БИЕЛСЭН
              </span>
            </div>

            {loading ? (
              <div className="p-5 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : (data?.paidBookings ?? []).length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <ShoppingCart className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  Төлөгдсөн захиалга байхгүй байна
                </p>
                <p className="text-xs text-gray-400">
                  Захиалга баталгаажсаны дараа энд харагдана
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {[
                      "ID",
                      "ЗАХИАЛАГЧ",
                      "ФРИЛАНСЕР",
                      "ХИЧЭЭЛ",
                      "ДҮН",
                      "ОГНОО",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 tracking-wider uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.paidBookings ?? []).map((b, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                    >
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">
                        {b.id}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ backgroundColor: avatarColor(b.client) }}
                          >
                            {initials(b.client)}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {b.client}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{
                              backgroundColor: avatarColor(b.freelancer + "x"),
                            }}
                          >
                            {initials(b.freelancer)}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {b.freelancer}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 max-w-[180px] truncate">
                        {b.courseTitle}
                      </td>
                      <td className="px-5 py-3.5 text-sm font-bold text-gray-900">
                        {b.amount.toLocaleString()}₮
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-400">
                        {formatDate(b.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
