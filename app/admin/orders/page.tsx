"use client";

import { useEffect, useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";

type OrderItem = {
  id: string;
  customer: string;
  freelancer: string;
  course: string;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  isApproved: boolean;
  startAt: string;
  endAt: string;
  createdAt: string;
};

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function statusBadge(status: OrderItem["status"]) {
  if (status === "CONFIRMED") {
    return "bg-green-50 text-green-700 border-green-100";
  }
  if (status === "PENDING") {
    return "bg-yellow-50 text-yellow-700 border-yellow-100";
  }
  return "bg-red-50 text-red-700 border-red-100";
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`/api/admin/orders?search=${encodeURIComponent(search)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch orders");
          return res.json();
        })
        .then((data) => setOrders(data))
        .catch((err) => {
          console.error(err);
          setOrders([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Захиалгууд</h1>
        <p className="text-sm text-gray-400">
          Бүх booking болон төлбөрийн мэдээлэл
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Хэрэглэгч, фрилансер эсвэл хичээлээр хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2 text-sm border border-gray-100 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-5 text-sm text-gray-400">Уншиж байна...</div>
        ) : orders.length === 0 ? (
          <div className="p-5 text-sm text-gray-400">Захиалга олдсонгүй</div>
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
                  "ТӨЛӨВ",
                  "БАТАЛСАН",
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
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                    {order.id.slice(0, 8)}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {order.freelancer}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {order.course}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900">
                    {order.amount.toLocaleString()}₮
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${statusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {order.isApproved ? "Тийм" : "Үгүй"}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}