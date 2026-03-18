"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Users,
  BookOpen,
  ShoppingCart,
  BarChart2,
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

type Stats = {
  totalUsers: number;
  totalFreelancers: number;
  totalCourses: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
};

type DayData = {
  day: string;
  value: number;
};

type ReportData = {
  stats: Stats;
  revenueByDay: DayData[];
  newUsersByDay: DayData[];
};

function formatMNT(n: number) {
  if (n >= 1_000_000) return `₮${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₮${(n / 1_000).toFixed(0)}K`;
  return `₮${n}`;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />
);

function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  loading: boolean;
}) {
  if (loading) return <Skeleton className="h-28" />;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <span className={iconColor}>{icon}</span>
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
        <p className="font-bold text-blue-600">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(7);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/admin/reports?days=${range}`)
      .then((res) => {
        if (!res.ok) throw new Error("Тайлан ачаалж чадсангүй");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [range]);

  const maxNewUsers = data
    ? Math.max(...data.newUsersByDay.map((d) => d.value), 1)
    : 1;

  const totalNewUsers =
    data?.newUsersByDay.reduce((sum, item) => sum + item.value, 0) ?? 0;

  const downloadReport = async () => {
    const res = await fetch(`/api/report?days=${range}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${range}-days.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Тайлан</h1>
          <p className="text-sm text-gray-400">
            Хэрэглэгч, захиалга, орлогын нэгтгэсэн тайлан
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setRange(7)}
              className={`px-3 py-2 rounded-xl text-sm border ${
                range === 7 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              7 хоног
            </button>
            <button
              onClick={() => setRange(30)}
              className={`px-3 py-2 rounded-xl text-sm border ${
                range === 30 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              30 хоног
            </button>
          </div>

          <button
            onClick={downloadReport}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 transition shadow-sm"
          >
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

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          loading={loading}
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Нийт хэрэглэгчид"
          value={(data?.stats.totalUsers ?? 0).toLocaleString()}
        />
        <StatCard
          loading={loading}
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          label="Фрилансерүүд"
          value={(data?.stats.totalFreelancers ?? 0).toLocaleString()}
        />
        <StatCard
          loading={loading}
          icon={<BookOpen className="w-5 h-5" />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          label="Нийт хичээлүүд"
          value={(data?.stats.totalCourses ?? 0).toLocaleString()}
        />
        <StatCard
          loading={loading}
          icon={<BarChart2 className="w-5 h-5" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          label="Нийт орлого"
          value={formatMNT(data?.stats.totalRevenue ?? 0)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Нийт захиалга</p>
          <p className="text-2xl font-bold text-gray-900">
            {(data?.stats.totalBookings ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Баталгаажсан</p>
          <p className="text-2xl font-bold text-green-600">
            {(data?.stats.confirmedBookings ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Хүлээгдэж буй</p>
          <p className="text-2xl font-bold text-yellow-600">
            {(data?.stats.pendingBookings ?? 0).toLocaleString()}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-5 gap-4">
          <Skeleton className="col-span-3 h-72" />
          <Skeleton className="col-span-2 h-72" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900">Орлого</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatMNT(data?.stats.totalRevenue ?? 0)}
              </p>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={data?.revenueByDay ?? []}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="reportRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                <Tooltip
                  formatter={(value: number) => formatMNT(value)}
                  labelFormatter={(label) => `${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#reportRevGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900">
                Шинэ хэрэглэгчид
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                +{totalNewUsers.toLocaleString()}
              </p>
            </div>

            <ResponsiveContainer width="100%" height={220}>
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
    </div>
  );
}